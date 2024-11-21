# EsHTML (Work in Progress)

A transpiler that converts Spanish-based HTML (EsHTML) to standard HTML - designed for Spanish-speaking developers learning web development.

> ⚠️ **Note**: This project is currently under active development. Features and documentation may change.

## Description

EsHTML is an educational tool that allows writing HTML using Spanish keywords and attributes, making web development more accessible to Spanish speakers. The html-es package provides a transpiler that converts EsHTML code into standard HTML, enabling learners to focus on understanding core web concepts without the additional challenge of English terminology.

## Installation

```bash
npm install html-es # Note: Package not yet published
```

## Basic Usage

```javascript
import { EsHTMLTranspiler } from 'html-es';

const transpiler = new EsHTMLTranspiler();

// Write HTML using Spanish keywords (EsHTML)
const eshtml = `
<artículo>
    <título>¡Hola Mundo!</título>
    <sección clase="contenido">
        <párrafo>Este es un ejemplo de EsHTML</párrafo>
        <botón deshabilitado>Enviar</botón>
    </sección>
</artículo>
`;

// Convert EsHTML to standard HTML
const html = transpiler.transpile(eshtml);
```

### Generated HTML:
```html
<article>
    <title>¡Hola Mundo!</title>
    <section class="content">
        <p>Este es un ejemplo de EsHTML</p>
        <button disabled>Enviar</button>
    </section>
</article>
```

## Features

> 🚧 **Development Status**: The following features are planned or in development

- Write HTML using Spanish keywords and attributes (EsHTML syntax)
- Built-in validation of EsHTML syntax
- Support for all standard HTML elements
- Development mode with strict validation

## Examples

### Form Elements
```html
<formulario método="post" acción="/enviar">
    <entrada tipo="texto" requerido nombre="usuario">
    <botón tipo="enviar">Enviar</botón>
</formulario>
```

### Headings
```html
<e1>Título Principal</e1>
<e2>Subtítulo</e2>
<e3>Sección</e3>
```

### Tables
```html
<tabla>
    <ft>
        <et>Encabezado</et>
    </ft>
    <ct>Dato</ct>
</tabla>
```

## API

### EsHTMLTranspiler
```javascript
const transpiler = new EsHTMLTranspiler();
transpiler.transpile(source: string, options?: TranspileOptions): string;
```

### Options
```typescript
interface TranspileOptions {
    strictMode?: boolean;      // Throws errors on invalid syntax
    ignoreWarnings?: boolean;  // Ignores non-critical validation warnings
}
```

## License

MIT

## Author

Logan Jorgensen

## Links

- [GitHub Repository](https://github.com/username/html-es)
- [Issue Tracker](https://github.com/username/html-es/issues)
