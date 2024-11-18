import { HTMLEsTranspiler } from '../src/transpiler';
import { tagMappings } from '../src/mappings/tags';

describe('HTMLEsTranspiler', () => {
  let transpiler: HTMLEsTranspiler;

  beforeEach(() => {
    transpiler = new HTMLEsTranspiler();
  });

  describe('basic transpilation', () => {
    it('should convert basic Spanish tags to English', () => {
      const input = '<título>Hola Mundo</título>';
      const expected = '<title>Hola Mundo</title>';
      expect(transpiler.transpile(input)).toBe(expected);
    });

    it('should handle multiple tags on same line', () => {
      const input = '<título>Hola</título><cuerpo>Mundo</cuerpo>';
      const expected = '<title>Hola</title><body>Mundo</body>';
      expect(transpiler.transpile(input)).toBe(expected);
    });
  });

  describe('nested structures', () => {
    it('should handle nested tags', () => {
      const input = '<artículo><sección><título>Primer item</título></sección></artículo>';
      const expected = '<article><section><title>Primer item</title></section></article>';
      expect(transpiler.transpile(input)).toBe(expected);
    });

    it('should handle complex nested structures', () => {
      const input = `
        <artículo>
          <encabezado><título>Mi Lista</título></encabezado>
          <sección>
            <título>Sección Principal</título>
            <p>Contenido</p>
          </sección>
        </artículo>
      `;
      const expected = `
        <article>
          <header><title>Mi Lista</title></header>
          <section>
            <title>Sección Principal</title>
            <p>Contenido</p>
          </section>
        </article>
      `;
      expect(transpiler.transpile(input)).toBe(expected);
    });
  });

  describe('attributes handling', () => {
    it('should preserve attributes during conversion', () => {
      const input = '<botón class="primary" id="enviar">Enviar</botón>';
      const expected = '<button class="primary" id="enviar">Enviar</button>';
      expect(transpiler.transpile(input)).toBe(expected);
    });

    it('should handle self-closing tags with attributes', () => {
      const input = '<lienzo width="100" height="100" />';
      const expected = '<canvas width="100" height="100" />';
      expect(transpiler.transpile(input)).toBe(expected);
    });
  });

  describe('custom mappings', () => {
    it('should allow custom tag mappings', () => {
      const customTranspiler = new HTMLEsTranspiler({
        customMappings: {
          'pagina': 'page',
          'texto': 'text'
        }
      });
      const input = '<pagina><texto>Contenido</texto></pagina>';
      const expected = '<page><text>Contenido</text></page>';
      expect(customTranspiler.transpile(input)).toBe(expected);
    });
  });

  describe('reverse transpilation', () => {
    it('should convert English tags back to Spanish', () => {
      const input = '<title>Hello World</title>';
      const expected = '<título>Hello World</título>';
      expect(transpiler.reverseTranspile(input)).toBe(expected);
    });

    it('should handle complex reverse transpilation', () => {
      const input = `
        <article>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </article>
      `;
      const expected = `
        <artículo>
          <ld>
            <el>Item 1</el>
            <el>Item 2</el>
          </ld>
        </artículo>
      `;
      expect(transpiler.reverseTranspile(input)).toBe(expected);
    });
  });

  describe('preservation rules', () => {
    it('should not convert tags that should remain unchanged', () => {
      const unchangedTags = [
        '<img src="foto.jpg">',
        '<p>Párrafo</p>',
        '<div>División</div>',
        '<span>Texto</span>',
        '<h1>Título</h1>',
        '<br>',
        '<hr>'
      ];
      
      unchangedTags.forEach(tag => {
        expect(transpiler.transpile(tag)).toBe(tag);
        expect(transpiler.reverseTranspile(tag)).toBe(tag);
      });
    });
  });

  describe('edge cases', () => {
    it('should handle empty string', () => {
      expect(transpiler.transpile('')).toBe('');
      expect(transpiler.reverseTranspile('')).toBe('');
    });

    it('should ignore unknown tags', () => {
      const input = '<unknownTag>Test</unknownTag>';
      expect(transpiler.transpile(input)).toBe(input);
      expect(transpiler.reverseTranspile(input)).toBe(input);
    });

    it('should handle malformed HTML gracefully', () => {
      const input = '<título>Texto sin cerrar';
      const expected = '<title>Texto sin cerrar';
      expect(transpiler.transpile(input)).toBe(expected);
    });
  });
});

describe('HTMLEsTranspiler Tag Coverage', () => {
  let transpiler: HTMLEsTranspiler;

  beforeEach(() => {
    transpiler = new HTMLEsTranspiler();
  });

  describe('full word tags', () => {
    const fullWordTags = Object.entries(tagMappings).filter(([key]) => 
      !['el', 'lo', 'ld', 'ct', 'et', 'ft'].includes(key)
    );

    fullWordTags.forEach(([spanish, english]) => {
      it(`should convert ${spanish} to ${english} and back`, () => {
        // Use the exact Spanish tag from tagMappings to ensure accents are preserved
        const input = `<${spanish}>contenido</${spanish}>`;
        const expectedEnglish = `<${english}>contenido</${english}>`;
        
        expect(transpiler.transpile(input)).toBe(expectedEnglish);
        expect(transpiler.reverseTranspile(expectedEnglish)).toBe(input);
        
        const inputWithAttrs = `<${spanish} class="test" id="123">contenido</${spanish}>`;
        const expectedWithAttrs = `<${english} class="test" id="123">contenido</${english}>`;
        expect(transpiler.transpile(inputWithAttrs)).toBe(expectedWithAttrs);
        expect(transpiler.reverseTranspile(expectedWithAttrs)).toBe(inputWithAttrs);
      });
    });
  });

  describe('abbreviated tags', () => {
    const abbreviatedTags = {
      'el': 'li',
      'lo': 'ol',
      'ld': 'ul',
      'ct': 'td',
      'et': 'th',
      'ft': 'tr'
    };

    Object.entries(abbreviatedTags).forEach(([spanish, english]) => {
      it(`should convert ${spanish} to ${english} and back`, () => {
        const input = `<${spanish}>contenido</${spanish}>`;
        const expectedEnglish = `<${english}>contenido</${english}>`;
        
        // Test transpilation
        expect(transpiler.transpile(input)).toBe(expectedEnglish);
        // Test reverse transpilation
        expect(transpiler.reverseTranspile(expectedEnglish)).toBe(input);
        
        // Test with attributes
        const inputWithAttrs = `<${spanish} class="test">contenido</${spanish}>`;
        const expectedWithAttrs = `<${english} class="test">contenido</${english}>`;
        expect(transpiler.transpile(inputWithAttrs)).toBe(expectedWithAttrs);
        expect(transpiler.reverseTranspile(expectedWithAttrs)).toBe(inputWithAttrs);
      });
    });

    it('should handle table structure with abbreviated tags', () => {
      const input = `
        <tabla>
          <ft>
            <et>Cabecera</et>
            <ct>Dato</ct>
          </ft>
        </tabla>`;
      const expected = `
        <table>
          <tr>
            <th>Cabecera</th>
            <td>Dato</td>
          </tr>
        </table>`;
      expect(transpiler.transpile(input)).toBe(expected);
      expect(transpiler.reverseTranspile(expected)).toBe(input);
    });

    it('should handle list structure with abbreviated tags', () => {
      const orderedList = `
        <lo>
          <el>Primero</el>
          <el>Segundo</el>
        </lo>`;
      const expectedOrdered = `
        <ol>
          <li>Primero</li>
          <li>Segundo</li>
        </ol>`;
      expect(transpiler.transpile(orderedList)).toBe(expectedOrdered);

      const unorderedList = `
        <ld>
          <el>Primero</el>
          <el>Segundo</el>
        </ld>`;
      const expectedUnordered = `
        <ul>
          <li>Primero</li>
          <li>Segundo</li>
        </ul>`;
      expect(transpiler.transpile(unorderedList)).toBe(expectedUnordered);
    });
  });
});