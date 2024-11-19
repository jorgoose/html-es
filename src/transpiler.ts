import { HTMLEsValidator } from './validator';
import { tagMappings } from './mappings/tags';
import { attributeMappings } from './mappings/attributes';

export interface TranspileOptions {
    strictMode?: boolean;  // If true, throw on any validation errors
    ignoreWarnings?: boolean;  // If true, only throw on critical errors
}

export class HTMLEsTranspiler {
    private validator: HTMLEsValidator;

    constructor() {
        this.validator = new HTMLEsValidator();
    }

    transpile(source: string, options: TranspileOptions = {}): string {
        // Validate first
        const errors = this.validator.validateSource(source);
        
        if (errors.length > 0) {
            if (options.strictMode) {
                throw new Error(
                    'Errores de validación:\n' + 
                    errors.map(e => `Línea ${e.line}, Columna ${e.column}: ${e.message}`).join('\n')
                );
            } else {
                // Log warnings but continue with transpilation
                console.warn(
                    'Advertencias de validación:\n' +
                    errors.map(e => `Línea ${e.line}, Columna ${e.column}: ${e.message}`).join('\n')
                );
            }
        }

        let result = source;

        // Sort mappings by length for proper replacement order
        const sortedTags = Object.entries(tagMappings)
            .sort(([a], [b]) => b.length - a.length);

        const sortedAttrs = Object.entries(attributeMappings)
            .sort(([a], [b]) => b.length - a.length);

        // Process tags
        sortedTags.forEach(([spanish, english]) => {
            result = result.replace(
                new RegExp(`<${spanish}([^>]*?)/>`, 'gi'),
                `<${english}$1/>`
            );
            result = result.replace(
                new RegExp(`<${spanish}(?=[^a-zñáéíóúü]|>)([^>]*?)>`, 'gi'),
                `<${english}$1>`
            );
            result = result.replace(
                new RegExp(`</${spanish}(?=[^a-zñáéíóúü]|>)>`, 'gi'),
                `</${english}>`
            );
        });

        // Process attributes
        sortedAttrs.forEach(([spanish, english]) => {
            result = result.replace(
                new RegExp(`(?<=\\s)${spanish}(?=(\\s|=|>|"))`, 'g'),
                english
            );
        });

        return result;
    }
}