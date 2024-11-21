import { HTMLEsTranspiler } from "../src/transpiler";

describe("HTMLEsTranspiler", () => {
  let transpiler: HTMLEsTranspiler;

  beforeEach(() => {
    transpiler = new HTMLEsTranspiler();
  });

  describe("Tag Translations", () => {
    test("translates basic tags", () => {
      const cases = [
        ["<título>Test</título>", "<title>Test</title>"],
        ["<sección>Test</sección>", "<section>Test</section>"],
        ["<artículo>Test</artículo>", "<article>Test</article>"],
        ["<formulario>Test</formulario>", "<form>Test</form>"],
        ["<botón>Test</botón>", "<button>Test</button>"],
        ["<pie>Footer</pie>", "<footer>Footer</footer>"],
        ["<encabezado>Header</encabezado>", "<header>Header</header>"],
        ["<imagen src='test.jpg' alt='Test'/>", "<picture src='test.jpg' alt='Test'/>"],
      ];
      cases.forEach(([input, expected]) => {
        expect(transpiler.transpile(input)).toBe(expected);
      });
    });

    test("preserves tags that will be the same in English, like <img> or <a>", () => {
      const cases = [
        ["<img src='test.jpg'/>", "<img src='test.jpg'/>"],
        ["<a href='https://google.com'>Google</a>", "<a href='https://google.com'>Google</a>"],
      ];
      cases.forEach(([input, expected]) => {
        expect(transpiler.transpile(input)).toBe(expected);
      });
    });

    test("translates heading tags", () => {
      const cases = [
        ["<e1>Título Principal</e1>", "<h1>Título Principal</h1>"],
        ["<e2>Subtítulo</e2>", "<h2>Subtítulo</h2>"],
        ["<e3>Sección</e3>", "<h3>Sección</h3>"],
        ["<e4>Tema</e4>", "<h4>Tema</h4>"],
        ["<e5>Subtema</e5>", "<h5>Subtema</h5>"],
        ["<e6>Nota</e6>", "<h6>Nota</h6>"],
      ];
      cases.forEach(([input, expected]) => {
        expect(transpiler.transpile(input)).toBe(expected);
      });
    });

    test("translates nested tags", () => {
      const input = "<sección><artículo><título>Test</título></artículo></sección>";
      const expected = "<section><article><title>Test</title></article></section>";
      expect(transpiler.transpile(input)).toBe(expected);
    });

    test("handles unknown tags gracefully", () => {
      const input = "<desconocido>Test</desconocido>";
      expect(transpiler.transpile(input)).toBe("<desconocido>Test</desconocido>");
    });
  });

  describe("Attribute Translations", () => {
    test("translates full word attributes", () => {
      const cases = [
        ['<div clase="test"></div>', '<div class="test"></div>'],
        ['<entrada tipo="text">', '<input type="text">'],
        ["<botón deshabilitado></botón>", "<button disabled></button>"],
        ["<entrada requerido>", "<input required>"],
        ["<seleccionar múltiple></seleccionar>", "<select multiple></select>"],
        ['<imagen fte="image.png"/>', '<picture src="image.png"/>'],
      ];
      cases.forEach(([input, expected]) => {
        expect(transpiler.transpile(input)).toBe(expected);
      });
    });

    test("translates abbreviated attributes", () => {
      const cases = [
      ['<img fte="test.jpg" ta="desc">', '<img src="test.jpg" alt="desc">'],
      ['<ct ec="2"></ct>', '<td colspan="2"></td>'],
      ['<ct ef="3"></ct>', '<td rowspan="3"></td>'],
      ['<a rd="stylesheet"></a>', '<a rel="stylesheet"></a>'],
      ['<html idio="es"></html>', '<html lang="es"></html>'],
      ];
      cases.forEach(([input, expected]) => {
      expect(transpiler.transpile(input)).toBe(expected);
      });
    });

    test("handles unknown attributes gracefully", () => {
      const input = '<div desconocido="valor"></div>';
      expect(transpiler.transpile(input)).toBe('<div desconocido="valor"></div>');
    });
  });

  describe("Complex Examples", () => {
    test("handles nested forms", () => {
      const input =
        '<formulario método="post"><entrada tipo="text" requerido><botón>Enviar</botón></formulario>';
      const expected =
        '<form method="post"><input type="text" required><button>Enviar</button></form>';
      expect(transpiler.transpile(input)).toBe(expected);
    });

    test("handles tables", () => {
      const input =
        '<tabla><ft><et ec="2">Cabeza</et></ft><ft><ct ef="2">Dato</ct></ft></tabla>';
      const expected =
        '<table><tr><th colspan="2">Cabeza</th></tr><tr><td rowspan="2">Dato</td></tr></table>';
      expect(transpiler.transpile(input)).toBe(expected);
    });

    test("handles mixed known and unknown tags -- mixed is okay", () => {
      const input = '<div><etiqueta>Nueva</etiqueta><p>Texto</p></div>';
      const expected = '<div><label>Nueva</label><p>Texto</p></div>';
      expect(transpiler.transpile(input)).toBe(expected);
    });
  });

  describe("Validation", () => {
    test("throws in strict mode for invalid tags", () => {
      expect(() => {
        transpiler.transpile("<tagInvalido>", { strictMode: true });
      }).toThrow();
    });

    test("warns but continues in non-strict mode", () => {
      const consoleSpy = jest.spyOn(console, "warn").mockImplementation();
      const result = transpiler.transpile("<tagInvalido>");
      expect(consoleSpy).toHaveBeenCalled();
      expect(result).toBe("<tagInvalido>");
      consoleSpy.mockRestore();
    });

    test("throws error for mismatched tags in strict mode", () => {
      expect(() => {
        transpiler.transpile("<div><p>Test</div>", { strictMode: true });
      }).toThrow();
    });

    test("warns and outputs in non-strict mode for mismatched tags", () => {
      const consoleSpy = jest.spyOn(console, "warn").mockImplementation();
      const result = transpiler.transpile("<div><p>Test</div>");
      expect(consoleSpy).toHaveBeenCalled();
      expect(result).toBe("<div><p>Test</div>");
      consoleSpy.mockRestore();
    });
  });

  describe("Edge Cases", () => {
    test("handles empty input", () => {
      expect(transpiler.transpile("")).toBe("");
    });

    test("handles self-closing tags", () => {
      expect(transpiler.transpile('<img fte="test.jpg"/>')).toBe(
        '<img src="test.jpg"/>'
      );
      expect(transpiler.transpile("<br/>")).toBe("<br/>");
    });

    test("preserves special content", () => {
      const cases = [
        "<!-- comentario -->",
        "<!-- <comment> Testing this mock comment tag </comment> -->",
        "<!-- <h1> Testing comment with a real tag inside </h1> -->",
        "<![CDATA[datos]]>",
      ];
      cases.forEach((input) => {
        expect(transpiler.transpile(input)).toBe(input);
      });
    });

    test("handles HTML entities", () => {
      const input = "<p>5 &gt; 3 &amp;&amp; 2 &lt; 4</p>";
      const expected = "<p>5 &gt; 3 &amp;&amp; 2 &lt; 4</p>";
      expect(transpiler.transpile(input)).toBe(expected);
    });

    test("handles special characters in attributes", () => {
      const input = '<entrada tipo="text" placeholder="Nombre &amp; Apellido"/>';
      const expected = '<input type="text" placeholder="Nombre &amp; Apellido"/>';
      expect(transpiler.transpile(input)).toBe(expected);
    });
  });
});
