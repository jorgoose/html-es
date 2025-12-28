import { EsHTMLTranspiler } from "../src/transpiler";

describe("EsHTMLTranspiler", () => {
  let transpiler: EsHTMLTranspiler;

  beforeEach(() => {
    transpiler = new EsHTMLTranspiler();
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
      ['<eshtml idio="es"></eshtml>', '<html lang="es"></html>'],
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

  describe("Attribute Value Translation", () => {
    test("translates input type values", () => {
      const cases = [
        ['<entrada tipo="texto">', '<input type="text">'],
        ['<entrada tipo="archivo">', '<input type="file">'],
        ['<botón tipo="enviar">', '<button type="submit">'],
      ];
      cases.forEach(([input, expected]) => {
        expect(transpiler.transpile(input)).toBe(expected);
      });
    });

    test("translates boolean attribute values", () => {
      const cases = [
        ['<div data-activo="verdadero"></div>', '<div data-activo="true"></div>'],
        ['<div data-activo="falso"></div>', '<div data-activo="false"></div>'],
        ['<div data-mostrar="sí"></div>', '<div data-mostrar="yes"></div>'],
        ['<div data-mostrar="no"></div>', '<div data-mostrar="no"></div>'],
      ];
      cases.forEach(([input, expected]) => {
        expect(transpiler.transpile(input)).toBe(expected);
      });
    });

    test("translates text alignment values", () => {
      const cases = [
        ['<div align="izquierda"></div>', '<div align="left"></div>'],
        ['<div align="derecha"></div>', '<div align="right"></div>'],
        ['<div align="centro"></div>', '<div align="center"></div>'],
        ['<div align="justificado"></div>', '<div align="justify"></div>'],
      ];
      cases.forEach(([input, expected]) => {
        expect(transpiler.transpile(input)).toBe(expected);
      });
    });

    test("handles attribute values with extra whitespace", () => {
      const input = '<entrada tipo="  texto  ">';
      const expected = '<input type="text">';
      expect(transpiler.transpile(input)).toBe(expected);
    });

    test("translates values in single quotes", () => {
      const input = "<entrada tipo='texto'>";
      const expected = "<input type='text'>";
      expect(transpiler.transpile(input)).toBe(expected);
    });

    test("does not translate Spanish text in attribute values", () => {
      const input = '<entrada valor="Escribe texto aquí">';
      const expected = '<input value="Escribe texto aquí">';
      expect(transpiler.transpile(input)).toBe(expected);
    });
  });

  describe("New Spanish Tags", () => {
    test("translates citabloque to blockquote", () => {
      const input = '<citabloque><p>Una cita larga aquí.</p></citabloque>';
      const expected = '<blockquote><p>Una cita larga aquí.</p></blockquote>';
      expect(transpiler.transpile(input)).toBe(expected);
    });

    test("translates listadatos to datalist", () => {
      const input = '<listadatos id="opciones"><opción valor="1"/></listadatos>';
      const expected = '<datalist id="opciones"><option value="1"/></datalist>';
      expect(transpiler.transpile(input)).toBe(expected);
    });

    test("translates grupocampos to fieldset", () => {
      const input = '<grupocampos><leyenda>Título</leyenda></grupocampos>';
      const expected = '<fieldset><legend>Título</legend></fieldset>';
      expect(transpiler.transpile(input)).toBe(expected);
    });

    test("handles new tags with attributes", () => {
      const input = '<citabloque clase="destacado" cita="Autor"><p>Texto</p></citabloque>';
      const expected = '<blockquote class="destacado" cita="Autor"><p>Texto</p></blockquote>';
      expect(transpiler.transpile(input)).toBe(expected);
    });
  });

  describe("Performance", () => {
    test("handles large documents efficiently", () => {
      const largeDoc = '<div>' + '<botón>Test</botón>'.repeat(1000) + '</div>';
      const start = Date.now();
      const result = transpiler.transpile(largeDoc);
      const duration = Date.now() - start;

      expect(result).toContain('<button>Test</button>');
      expect(duration).toBeLessThan(1000); // Should complete in < 1 second
    });

    test("handles deeply nested structures", () => {
      let input = '';
      let expected = '';
      for (let i = 0; i < 50; i++) {
        input += '<sección>';
        expected += '<section>';
      }
      input += 'Contenido';
      expected += 'Contenido';
      for (let i = 0; i < 50; i++) {
        input += '</sección>';
        expected += '</section>';
      }

      expect(transpiler.transpile(input)).toBe(expected);
    });

    test("transpiler instance reuse maintains performance", () => {
      const input = '<botón clase="test">Click</botón>';
      const expected = '<button class="test">Click</button>';

      // Run multiple times to test regex reuse
      for (let i = 0; i < 100; i++) {
        expect(transpiler.transpile(input)).toBe(expected);
      }
    });
  });

  describe("Case Sensitivity", () => {
    test("handles mixed case Spanish tags", () => {
      const input = '<Botón>Click</Botón>';
      const expected = '<button>Click</button>'; // Case-insensitive matching produces lowercase output
      expect(transpiler.transpile(input)).toBe(expected);
    });

    test("handles uppercase Spanish tags", () => {
      const input = '<BOTÓN>Click</BOTÓN>';
      const expected = '<button>Click</button>'; // Case-insensitive matching produces lowercase output
      expect(transpiler.transpile(input)).toBe(expected);
    });

    test("handles mixed case in attribute values", () => {
      const input = '<entrada tipo="Texto">';
      const expected = '<input type="text">'; // Case-insensitive matching produces lowercase output
      expect(transpiler.transpile(input)).toBe(expected);
    });
  });

  describe("Complex Real-World Examples", () => {
    test("handles complete HTML document", () => {
      const input = `<!DOCTYPE html>
<eshtml idioma="es">
  <cabecera>
    <título>Mi Sitio</título>
  </cabecera>
  <cuerpo>
    <encabezado>
      <e1>Bienvenido</e1>
    </encabezado>
    <principal>
      <artículo>
        <e2>Contenido</e2>
        <p>Texto del artículo.</p>
      </artículo>
    </principal>
    <pie>
      <p>© 2025</p>
    </pie>
  </cuerpo>
</eshtml>`;

      const expected = `<!DOCTYPE html>
<html lang="es">
  <head>
    <title>Mi Sitio</title>
  </head>
  <body>
    <header>
      <h1>Bienvenido</h1>
    </header>
    <main>
      <article>
        <h2>Contenido</h2>
        <p>Texto del artículo.</p>
      </article>
    </main>
    <footer>
      <p>© 2025</p>
    </footer>
  </body>
</html>`;

      expect(transpiler.transpile(input)).toBe(expected);
    });

    test("handles form with all features", () => {
      const input = `<formulario método="post" acción="/enviar">
  <grupocampos>
    <leyenda>Información Personal</leyenda>
    <etiqueta para="nombre">Nombre:</etiqueta>
    <entrada tipo="texto" nombre="nombre" requerido/>
    <etiqueta para="correo">Email:</etiqueta>
    <entrada tipo="text" nombre="correo"/>
  </grupocampos>
  <botón tipo="enviar">Enviar</botón>
</formulario>`;

      const expected = `<form method="post" action="/enviar">
  <fieldset>
    <legend>Información Personal</legend>
    <label for="nombre">Nombre:</label>
    <input type="text" name="nombre" required/>
    <label for="correo">Email:</label>
    <input type="text" name="correo"/>
  </fieldset>
  <button type="submit">Enviar</button>
</form>`;

      expect(transpiler.transpile(input)).toBe(expected);
    });

    test("handles table with all features", () => {
      const input = `<tabla clase="datos">
  <subtítulo>Ventas 2025</subtítulo>
  <encabezadot>
    <ft>
      <et>Producto</et>
      <et>Precio</et>
    </ft>
  </encabezadot>
  <cuerpot>
    <ft>
      <ct>Widget</ct>
      <ct>$10</ct>
    </ft>
  </cuerpot>
  <piet>
    <ft>
      <ct ec="2">Total: $10</ct>
    </ft>
  </piet>
</tabla>`;

      const expected = `<table class="datos">
  <caption>Ventas 2025</caption>
  <thead>
    <tr>
      <th>Producto</th>
      <th>Precio</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Widget</td>
      <td>$10</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="2">Total: $10</td>
    </tr>
  </tfoot>
</table>`;

      expect(transpiler.transpile(input)).toBe(expected);
    });
  });

  describe("Functional Programming Improvements", () => {
    test("transpiler is idempotent", () => {
      const input = '<botón>Click</botón>';
      const firstPass = transpiler.transpile(input);
      const secondPass = transpiler.transpile(firstPass);

      expect(firstPass).toBe('<button>Click</button>');
      expect(secondPass).toBe(firstPass); // Should not change on second pass
    });

    test("transpiler handles immutability", () => {
      const input = '<botón>Original</botón>';
      const result1 = transpiler.transpile(input);
      const result2 = transpiler.transpile(input);

      expect(result1).toBe(result2); // Same input → same output
      expect(input).toBe('<botón>Original</botón>'); // Input unchanged
    });
  });
});
