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
      ];
      cases.forEach(([input, expected]) => {
        expect(transpiler.transpile(input)).toBe(expected);
      });
    });

    test("translates abbreviated tags", () => {
      const cases = [
        ["<lo><el>Item</el></lo>", "<ol><li>Item</li></ol>"],
        ["<ld><el>Item</el></ld>", "<ul><li>Item</li></ul>"],
        ["<ft><ct>Data</ct></ft>", "<tr><td>Data</td></tr>"],
        ["<ft><et>Header</et></ft>", "<tr><th>Header</th></tr>"],
      ];
      cases.forEach(([input, expected]) => {
        expect(transpiler.transpile(input)).toBe(expected);
      });
    });

    test("preserves unchanged tags", () => {
      const cases = [
        "<div>Test</div>",
        "<span>Test</span>",
        "<p>Test</p>",
        "<nav>Test</nav>",
        '<a href="#">Test</a>',
      ];
      cases.forEach((input) => {
        expect(transpiler.transpile(input)).toBe(input);
      });
    });
  });

  describe("Attribute Translations", () => {
    test("translates full word attributes", () => {
      const cases = [
        ['<div clase="test"></div>', '<div class="test"></div>'],
        ['<entrada tipo="text"></entrada>', '<input type="text"></input>'],
        ["<botón deshabilitado></botón>", "<button disabled></button>"],
        ["<entrada requerido></entrada>", "<input required></input>"],
        ["<seleccionar múltiple></seleccionar>", "<select multiple></select>"],
      ];
      cases.forEach(([input, expected]) => {
        expect(transpiler.transpile(input)).toBe(expected);
      });
    });

    test("translates abbreviated attributes", () => {
      const cases = [
        ['<img od="test.jpg" ta="desc">', '<img src="test.jpg" alt="desc">'],
        ['<ct ec="2"></ct>', '<td colspan="2"></td>'],
        ['<ct ef="3"></ct>', '<td rowspan="3"></td>'],
        ['<a rd="stylesheet"></a>', '<a rel="stylesheet"></a>'],
      ];
      cases.forEach(([input, expected]) => {
        expect(transpiler.transpile(input)).toBe(expected);
      });
    });

    test("preserves unchanged attributes", () => {
      const cases = [
        '<div id="test">test</div>',
        '<div data-test="value">test</div>',
        '<div aria-label="test">test</div>',
        '<a href="#test">test</a>',
        '<meta charset="utf-8">',
      ];
      cases.forEach((input) => {
        expect(transpiler.transpile(input)).toBe(input);
      });
    });
  });

  describe("Complex Examples", () => {
    test("handles nested forms", () => {
      const input =
        '<formulario método="post"><entrada tipo="text" requerido></entrada><botón>OK</botón></formulario>';
      const expected =
        '<form method="post"><input type="text" required></input><button>OK</button></form>';
      expect(transpiler.transpile(input)).toBe(expected);
    });

    test("handles tables", () => {
      const input =
        '<tabla><ft><et ec="2">Head</et></ft><ft><ct ef="2">Data</ct></ft></tabla>';
      const expected =
        '<table><tr><th colspan="2">Head</th></tr><tr><td rowspan="2">Data</td></tr></table>';
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
  });

  describe("Edge Cases", () => {
    test("handles empty input", () => {
      expect(transpiler.transpile("")).toBe("");
    });

    test("handles self-closing tags", () => {
      expect(transpiler.transpile('<img od="test.jpg"/>')).toBe(
        '<img src="test.jpg"/>'
      );
    });

    test("preserves special content", () => {
      const cases = [
        "<!-- comment -->",
        '<!-- <tag>comment</tag> -->',
        "<![CDATA[data]]>",
      ];
      cases.forEach((input) => {
        expect(transpiler.transpile(input)).toBe(input);
      });
    });

    test("preserves whitespace", () => {
      const cases = [
        ['<div  clase = "test"></div>', '<div  class = "test"></div>'],
        ["<p>\n  text\n</p>", "<p>\n  text\n</p>"],
      ];
      cases.forEach(([input, expected]) => {
        expect(transpiler.transpile(input)).toBe(expected);
      });
    });
  });
});
