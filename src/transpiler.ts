import { EsHTMLValidator } from './validator';
import { tagMappings } from './mappings/tags';
import { attributeMappings, attributeValueMappings } from './mappings/attributes';

export interface TranspileOptions {
    strictMode?: boolean;  // If true, throw on any validation errors
    ignoreWarnings?: boolean;  // If true, only throw on critical errors
}

export class EsHTMLTranspiler {
    private validator: EsHTMLValidator;

    constructor() {
        this.validator = new EsHTMLValidator();
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

        // Process attribute values
        const sortedAttrValues = Object.entries(attributeValueMappings)
            .sort(([a], [b]) => b.length - a.length);

        sortedAttrValues.forEach(([spanish, english]) => {
            // Match attribute values in double quotes
            result = result.replace(
                new RegExp(`="\\s*${spanish}\\s*"`, 'gi'),
                `="${english}"`
            );
            // Match attribute values in single quotes
            result = result.replace(
                new RegExp(`='\\s*${spanish}\\s*'`, 'gi'),
                `='${english}'`
            );
        });

        return result;
    }
}