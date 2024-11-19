// src/__tests__/validator.test.ts
import { HTMLEsValidator, ValidationError } from '../src/validator';

describe('HTMLEsValidator', () => {
    let validator: HTMLEsValidator;

    beforeEach(() => {
        validator = new HTMLEsValidator();
    });

    describe('Basic Structure Validation', () => {
        test('detects unmatched brackets', () => {
            const cases = [
                '<div>test',
                'test</div>',
                '<div><span></div>',
                '<div>test</span>'
            ];
            cases.forEach(input => {
                const errors = validator.validateSource(input);
                expect(errors.length).toBeGreaterThan(0);
            });
        });

        test('passes valid structures', () => {
            const cases = [
                '<div>test</div>',
                '<div><span>test</span></div>',
                '<img/>',
                '<div class="test">content</div>'
            ];
            cases.forEach(input => {
                const errors = validator.validateSource(input);
                expect(errors).toHaveLength(0);
            });
        });
    });

    describe('Spanish Tag Validation', () => {
        test('validates known Spanish tags', () => {
            const cases = [
                '<artículo>test</artículo>',
                '<sección>test</sección>',
                '<título>test</título>'
            ];
            cases.forEach(input => {
                const errors = validator.validateSource(input);
                expect(errors).toHaveLength(0);
            });
        });

        test('detects unknown tags', () => {
            const cases = [
                '<invalidoTag>test</invalidoTag>',
                '<tagDesconocido/>',
                '<noExiste>test</noExiste>'
            ];
            cases.forEach(input => {
                const errors = validator.validateSource(input);
                expect(errors.length).toBeGreaterThan(0);
            });
        });
    });

    describe('Attribute Validation', () => {
        test('validates known Spanish attributes', () => {
            const cases = [
                '<div clase="test"></div>',
                '<botón deshabilitado></botón>',
                '<img fte="test.jpg" ta="desc">'
            ];
            cases.forEach(input => {
                const errors = validator.validateSource(input);
                expect(errors).toHaveLength(0);
            });
        });

        test('allows data and aria attributes', () => {
            const cases = [
                '<div data-test="value">test</div>',
                '<button aria-label="test">test</button>',
                '<div data-custom-attr="test"></div>'
            ];
            cases.forEach(input => {
                const errors = validator.validateSource(input);
                expect(errors).toHaveLength(0);
            });
        });

        test('detects unknown attributes', () => {
            const cases = [
                '<div atributoInvalido="test"></div>',
                '<div noExiste="value"></div>',
                '<div desconocido></div>'
            ];
            cases.forEach(input => {
                const errors = validator.validateSource(input);
                expect(errors.length).toBeGreaterThan(0);
            });
        });
    });

    describe('Error Details', () => {
        test('provides line and column information', () => {
            const input = '\n  <invalidoTag>\n    test\n  </invalidoTag>';
            const errors = validator.validateSource(input);
            expect(errors[0].line).toBe(2);
            expect(errors[0].column).toBe(3);
            expect(errors[0].message).toBe('La etiqueta "invalidoTag" no es una etiqueta HTML en español válida');
        });

        test('handles multiple errors', () => {
            const input = '<invalido attr="test"><otro></invalido>';
            const errors = validator.validateSource(input);
            expect(errors.length).toBeGreaterThan(1);
            expect(errors[0].message).toBe('La etiqueta "invalido" no es una etiqueta HTML en español válida');
            expect(errors[1].message).toBe('La etiqueta "otro" no es una etiqueta HTML en español válida');
        });
    });

    describe('Edge Cases', () => {
        test('handles empty input', () => {
            const errors = validator.validateSource('');
            expect(errors).toHaveLength(0);
        });

        test('handles whitespace only', () => {
            const errors = validator.validateSource('   \n\t   ');
            expect(errors).toHaveLength(0);
        });

        test('validates complex nested structures', () => {
            const input = `
                <artículo>
                    <título>Test</título>
                    <sección clase="test">
                        <lo>
                            <el>Item 1</el>
                            <el>Item 2</el>
                        </lo>
                    </sección>
                </artículo>
            `;
            const errors = validator.validateSource(input);
            expect(errors).toHaveLength(0);
        });
    });
});