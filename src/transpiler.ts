import { EsHTMLValidator, ValidationError } from './validator';
import { tagMappings } from './mappings/tags';
import { attributeMappings, attributeValueMappings } from './mappings/attributes';

export interface TranspileOptions {
    strictMode?: boolean;  // If true, throw on any validation errors
    ignoreWarnings?: boolean;  // If true, only throw on critical errors
}

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface CompiledMapping {
    spanish: string;
    english: string;
    selfClosing: RegExp;
    opening: RegExp;
    closing: RegExp;
}

interface CompiledAttributeMapping {
    spanish: string;
    english: string;
    pattern: RegExp;
}

interface CompiledValueMapping {
    spanish: string;
    english: string;
    doubleQuotePattern: RegExp;
    singleQuotePattern: RegExp;
}

// ============================================================================
// PURE UTILITY FUNCTIONS
// ============================================================================

/**
 * Formats validation errors into a human-readable message
 * @pure
 */
const formatValidationErrors = (errors: ValidationError[]): string => {
    return errors
        .map(e => `Línea ${e.line}, Columna ${e.column}: ${e.message}`)
        .join('\n');
};

/**
 * Handles validation errors based on options (throws or warns)
 * @impure - may throw error or log to console
 */
const handleValidationErrors = (errors: ValidationError[], options: TranspileOptions): void => {
    if (errors.length === 0) return;

    const errorMessage = `${options.strictMode ? 'Errores' : 'Advertencias'} de validación:\n${formatValidationErrors(errors)}`;

    if (options.strictMode) {
        throw new Error(errorMessage);
    }

    if (!options.ignoreWarnings) {
        console.warn(errorMessage);
    }
};

/**
 * Pre-compiles tag mappings into regex patterns for better performance
 * @pure
 */
const compileTagMappings = (mappings: Record<string, string>): CompiledMapping[] => {
    return Object.entries(mappings)
        .sort(([a], [b]) => b.length - a.length) // Sort by length (longest first)
        .map(([spanish, english]) => ({
            spanish,
            english,
            selfClosing: new RegExp(`<${spanish}([^>]*?)/>`, 'gi'),
            opening: new RegExp(`<${spanish}(?=[^a-zñáéíóúü]|>)([^>]*?)>`, 'gi'),
            closing: new RegExp(`</${spanish}(?=[^a-zñáéíóúü]|>)>`, 'gi'),
        }));
};

/**
 * Pre-compiles attribute mappings into regex patterns
 * @pure
 */
const compileAttributeMappings = (mappings: Record<string, string>): CompiledAttributeMapping[] => {
    return Object.entries(mappings)
        .sort(([a], [b]) => b.length - a.length)
        .map(([spanish, english]) => ({
            spanish,
            english,
            pattern: new RegExp(`(?<=\\s)${spanish}(?=(\\s|=|>|"|/))`, 'g'),
        }));
};

/**
 * Pre-compiles attribute value mappings into regex patterns
 * @pure
 */
const compileValueMappings = (mappings: Record<string, string>): CompiledValueMapping[] => {
    return Object.entries(mappings)
        .sort(([a], [b]) => b.length - a.length)
        .map(([spanish, english]) => ({
            spanish,
            english,
            doubleQuotePattern: new RegExp(`="\\s*${spanish}\\s*"`, 'gi'),
            singleQuotePattern: new RegExp(`='\\s*${spanish}\\s*'`, 'gi'),
        }));
};

/**
 * Applies a single tag mapping to source
 * @pure
 */
const applyTagMapping = (source: string, mapping: CompiledMapping): string => {
    return source
        .replace(mapping.selfClosing, `<${mapping.english}$1/>`)
        .replace(mapping.opening, `<${mapping.english}$1>`)
        .replace(mapping.closing, `</${mapping.english}>`);
};

/**
 * Applies all tag mappings to source using reduce
 * @pure
 */
const replaceTagsInSource = (source: string, mappings: CompiledMapping[]): string => {
    return mappings.reduce(
        (acc, mapping) => applyTagMapping(acc, mapping),
        source
    );
};

/**
 * Applies a single attribute mapping to source
 * @pure
 */
const applyAttributeMapping = (source: string, mapping: CompiledAttributeMapping): string => {
    return source.replace(mapping.pattern, mapping.english);
};

/**
 * Applies all attribute mappings to source using reduce
 * @pure
 */
const replaceAttributesInSource = (source: string, mappings: CompiledAttributeMapping[]): string => {
    return mappings.reduce(
        (acc, mapping) => applyAttributeMapping(acc, mapping),
        source
    );
};

/**
 * Applies a single attribute value mapping to source
 * @pure
 */
const applyValueMapping = (source: string, mapping: CompiledValueMapping): string => {
    return source
        .replace(mapping.doubleQuotePattern, `="${mapping.english}"`)
        .replace(mapping.singleQuotePattern, `='${mapping.english}'`);
};

/**
 * Applies all attribute value mappings to source using reduce
 * @pure
 */
const replaceAttributeValuesInSource = (source: string, mappings: CompiledValueMapping[]): string => {
    return mappings.reduce(
        (acc, mapping) => applyValueMapping(acc, mapping),
        source
    );
};

/**
 * Composes functions left-to-right (pipeline)
 * @pure
 */
const pipe = <T>(...fns: Array<(arg: T) => T>) => (value: T): T => {
    return fns.reduce((acc, fn) => fn(acc), value);
};

// ============================================================================
// TRANSPILER CLASS
// ============================================================================

export class EsHTMLTranspiler {
    private validator: EsHTMLValidator;
    private readonly compiledTagMappings: CompiledMapping[];
    private readonly compiledAttributeMappings: CompiledAttributeMapping[];
    private readonly compiledValueMappings: CompiledValueMapping[];

    constructor() {
        this.validator = new EsHTMLValidator();

        // Pre-compile all regex patterns once during construction
        this.compiledTagMappings = compileTagMappings(tagMappings);
        this.compiledAttributeMappings = compileAttributeMappings(attributeMappings);
        this.compiledValueMappings = compileValueMappings(attributeValueMappings);
    }

    /**
     * Transpiles EsHTML source code to standard HTML
     *
     * This method follows a functional pipeline approach:
     * 1. Validate source (early return on strict mode errors)
     * 2. Replace tags: <botón> → <button>
     * 3. Replace attributes: clase="..." → class="..."
     * 4. Replace attribute values: tipo="texto" → type="text"
     */
    transpile(source: string, options: TranspileOptions = {}): string {
        // Guard clause: validate and handle errors early
        const validationErrors = this.validator.validateSource(source);
        handleValidationErrors(validationErrors, options);

        // Functional pipeline: transform source through pure functions
        return pipe<string>(
            (s: string) => replaceTagsInSource(s, this.compiledTagMappings),
            (s: string) => replaceAttributesInSource(s, this.compiledAttributeMappings),
            (s: string) => replaceAttributeValuesInSource(s, this.compiledValueMappings)
        )(source);
    }
}