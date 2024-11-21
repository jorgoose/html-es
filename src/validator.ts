import { tagMappings } from './mappings/tags';
import { attributeMappings } from './mappings/attributes';

export class ValidationError extends Error {
    constructor(
        message: string,
        public line: number,
        public column: number
    ) {
        super(message);
        this.name = 'ValidationError';
    }
}

export class HTMLEsValidator {
    private voidElements = new Set([
        'área', 'base', 'salto', 'columna', 'incrustar', 
        'hr', 'imagen', 'entrada', 'enlace', 'meta',
        'parámetro', 'fuente', 'pista', 'wbr', 'comando',
        'genclave', 'elementomenú', "img", 
    ]);

    validateSource(source: string): ValidationError[] {
        const errors: ValidationError[] = [];

        try {
            // 1. Remove comments before validation
            const cleanedSource = source.replace(/<!--[\s\S]*?-->/g, '');

            // 2. Tag validation first
            this.validateTags(cleanedSource, errors);

            // 3. Attribute validation
            this.validateAttributes(cleanedSource, errors);

            // 4. Basic structure checks only for valid tags
            if (errors.length === 0) {
                this.validateBasicStructure(cleanedSource, errors);
            }
        } catch (e) {
            // Handle unexpected errors if necessary
        }

        return errors;
    }

    private validateTags(source: string, errors: ValidationError[]): void {
        const tagRegex = /<\/?([a-zA-Z\u00C0-\u017F][\w\u00C0-\u017F-]*)[^>]*>/g;
        let match;

        while ((match = tagRegex.exec(source)) !== null) {
            const originalTagName = match[1];
            const tagName = originalTagName.toLowerCase();
            if (!tagName) continue;

            if (!this.isValidSpanishTag(tagName)) {
                const beforeTag = source.substring(0, match.index);
                const lineNumber = beforeTag.split('\n').length;
                const lastNewline = beforeTag.lastIndexOf('\n');
                const column = lastNewline === -1 ? match.index + 1 : match.index - lastNewline;

                errors.push(
                    new ValidationError(
                        `La etiqueta "${originalTagName}" no es una etiqueta HTML en español válida`,
                        lineNumber,
                        column
                    )
                );
            }
        }
    }

    private validateAttributes(source: string, errors: ValidationError[]): void {
        const tagRegex = /<[^/][^>]+>/g;
        let tagMatch;

        while ((tagMatch = tagRegex.exec(source)) !== null) {
            const attrRegex = /\s([a-zA-Z\u00C0-\u017F][a-zA-Z0-9\u00C0-\u017F-]*)(?:=["'][^"']*["'])?/g;
            let attrMatch;

            while ((attrMatch = attrRegex.exec(tagMatch[0])) !== null) {
                const [, attrName] = attrMatch;
                const beforeTag = source.substring(0, tagMatch.index);
                const lineNumber = beforeTag.split('\n').length;
                const lastNewline = beforeTag.lastIndexOf('\n');
                const column = lastNewline === -1 ? tagMatch.index + 1 : tagMatch.index - lastNewline;

                if (!this.isUnchangedAttribute(attrName) && !this.isValidSpanishAttribute(attrName)) {
                    errors.push(new ValidationError(
                        `Atributo desconocido: "${attrName}"`,
                        lineNumber,
                        column
                    ));
                }
            }
        }
    }

    private isUnchangedAttribute(attr: string): boolean {
        const unchangedAttributes = new Set([
            // Standard global attributes
            'id', 'class', 'style', 'title', 'lang', 'dir',
            'data-', 'aria-',

            // Commonly used attributes
            'src', 'href', 'alt', 'value', 'name', 'placeholder',
            'type', 'method', 'action', 'target', 'rel', 'coords',
            'shape', 'width', 'height', 'charset', 'async', 'defer',

            // Any attribute starting with 'data-' or 'aria-' should be treated as valid
        ]);

        // Check if the attribute is exactly in the set or starts with 'data-'/'aria-'
        return unchangedAttributes.has(attr) ||
               attr.startsWith('data-') ||
               attr.startsWith('aria-');
    }

    private isValidSpanishAttribute(attr: string): boolean {
        return attr in attributeMappings ||
               this.isUnchangedAttribute(attr) ||
               // Include other attributes that should be accepted as-is
               ['method', 'action', 'charset', 'href', 'alt', 'title', 'value', 'name', 'placeholder', 'type', 'src', 'width', 'height', 'coords', 'shape', 'rel', 'dir'].includes(attr);
    }

    private validateBasicStructure(source: string, errors: ValidationError[]): void {
        const tagStack: { name: string; originalName: string }[] = [];
        const tagRegex = /<\/?([a-zA-Z\u00C0-\u017F][\w\u00C0-\u017F-]*)[^>]*>/g;
        let match;

        while ((match = tagRegex.exec(source)) !== null) {
            const fullTag = match[0];
            const originalTagName = match[1];
            const tagName = originalTagName.toLowerCase();
            const isClosingTag = fullTag.startsWith('</');
            const lineNumber = source.substring(0, match.index).split('\n').length;
            const lastNewline = source.lastIndexOf('\n', match.index);
            const column = lastNewline === -1 ? match.index + 1 : match.index - lastNewline;

            if (isClosingTag) {
                let lastOpenTag;
                do {
                    lastOpenTag = tagStack.pop();
                } while (lastOpenTag && this.isVoidElement(lastOpenTag.name));

                if (!lastOpenTag || lastOpenTag.name !== tagName) {
                    errors.push(
                        new ValidationError(
                            `La etiqueta de cierre "${originalTagName}" no coincide con la etiqueta de apertura "${lastOpenTag?.originalName || 'ninguna'}"`,
                            lineNumber,
                            column
                        )
                    );
                }
            } else if (!this.isVoidElement(tagName)) {
                tagStack.push({ name: tagName, originalName: originalTagName });
            }
        }

        const unclosedTags = tagStack
            .filter(tag => !this.isVoidElement(tag.name))
            .map(tag => tag.originalName);

        if (unclosedTags.length > 0) {
            errors.push(
                new ValidationError(
                    `Las siguientes etiquetas no están cerradas: ${unclosedTags.join(', ')}`,
                    0,
                    0
                )
            );
        }
    }

    private isVoidElement(tagName: string): boolean {
        return this.voidElements.has(tagName);
    }

    private isValidSpanishTag(tag: string): boolean {
        const normalizedTag = tag.toLowerCase().trim();
        return normalizedTag in tagMappings;
    }
}