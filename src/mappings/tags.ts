/**
 * EsHTML to HTML Tag Mappings
 *
 * This file defines the mapping between EsHTML (Spanish HTML) tags and standard HTML tags.
 * The transpiler uses these mappings to convert Spanish-language HTML tags into web-standard
 * English HTML tags that browsers can understand.
 *
 * HOW IT WORKS:
 * 1. When the transpiler encounters an EsHTML tag like <botón>, it looks up 'botón' in this map
 * 2. It finds the corresponding HTML tag 'button'
 * 3. It replaces all instances: <botón> → <button> and </botón> → </button>
 * 4. Self-closing tags are also handled: <entrada/> → <input/>
 *
 * MAPPING STRATEGY:
 * - Full Spanish Words: Common semantic elements get full Spanish translations (e.g., 'botón' → 'button')
 * - Spanish Abbreviations: Some elements use Spanish abbreviations (e.g., 'e1' → 'h1', 'ft' → 'tr')
 * - Unchanged: Simple/technical tags remain in English (e.g., 'div', 'span', 'p')
 *
 * The goal is to make HTML accessible to Spanish speakers while preparing them to transition
 * to standard HTML once they understand the concepts.
 */

export const tagMappings: Record<string, string> = {
    // ============================================================================
    // FULL SPANISH TRANSLATIONS - Semantic & Common Elements
    // ============================================================================
    // Root and document structure
    'eshtml': 'html',              // <eshtml> → <html> - Root element for Spanish HTML documents
    'cabecera': 'head',            // <cabecera> → <head> - Document head/metadata section
    'cuerpo': 'body',              // <cuerpo> → <body> - Document body with visible content
    'título': 'title',             // <título> → <title> - Page title shown in browser tab

    // Semantic structure elements
    'encabezado': 'header',        // <encabezado> → <header> - Page or section header
    'pie': 'footer',               // <pie> → <footer> - Page or section footer
    'principal': 'main',           // <principal> → <main> - Main content area
    'aparte': 'aside',             // <aparte> → <aside> - Sidebar or tangential content
    'artículo': 'article',         // <artículo> → <article> - Self-contained composition
    'sección': 'section',          // <sección> → <section> - Thematic grouping of content

    // Forms and interactive elements
    'formulario': 'form',          // <formulario> → <form> - HTML form for user input
    'botón': 'button',             // <botón> → <button> - Clickable button element
    'entrada': 'input',            // <entrada> → <input> - Input field (text, checkbox, etc.)
    'áreatexto': 'textarea',       // <áreatexto> → <textarea> - Multi-line text input
    'etiqueta': 'label',           // <etiqueta> → <label> - Label for form input
    'seleccionar': 'select',       // <seleccionar> → <select> - Dropdown selection menu
    'opción': 'option',            // <opción> → <option> - Option within a select element
    'grupoopc': 'optgroup',        // <grupoopc> → <optgroup> - Group of options in select
    'leyenda': 'legend',           // <leyenda> → <legend> - Caption for fieldset element

    // Table elements
    'tabla': 'table',              // <tabla> → <table> - Table container
    'subtítulo': 'caption',        // <subtítulo> → <caption> - Table caption/title
    'columna': 'col',              // <columna> → <col> - Column definition (stays short, shares prefix)
    'grupocolumnas': 'colgroup',   // <grupocolumnas> → <colgroup> - Group of column definitions

    // Media and embedded content
    'lienzo': 'canvas',            // <lienzo> → <canvas> - Drawing canvas for graphics
    'imagen': 'picture',           // <imagen> → <picture> - Responsive image container (note: 'img' stays as 'img')
    'fuente': 'source',            // <fuente> → <source> - Media source for audio/video/picture
    'empotrar': 'embed',           // <empotrar> → <embed> - External content embedding
    'marcol': 'iframe',            // <marcol> → <iframe> - Inline frame for nested content
    'objeto': 'object',            // <objeto> → <object> - Generic embedded object
    'parámetro': 'param',          // <parámetro> → <param> - Parameter for object element
    'área': 'area',                // <área> → <area> - Clickable area in image map (void element)

    // Text semantics and formatting
    'én': 'em',                    // <én> → <em> - Emphasized text (shortened from 'énfasis')
    'fuerte': 'strong',            // <fuerte> → <strong> - Strong importance/bold text
    'pequeño': 'small',            // <pequeño> → <small> - Smaller text
    'marca': 'mark',               // <marca> → <mark> - Highlighted/marked text
    'código': 'code',              // <código> → <code> - Inline code snippet
    'cita': 'cite',                // <cita> → <cite> - Citation reference
    'abrv': 'abbr',                // <abrv> → <abbr> - Abbreviation (shortened Spanish form)
    'tiempo': 'time',              // <tiempo> → <time> - Date/time element

    // Grouping and metadata
    'figura': 'figure',            // <figura> → <figure> - Self-contained figure with optional caption
    'piefigura': 'figcaption',     // <piefigura> → <figcaption> - Caption for figure element
    'datos': 'data',               // <datos> → <data> - Machine-readable data value
    'dirección': 'address',        // <dirección> → <address> - Contact information
    'mapa': 'map',                 // <mapa> → <map> - Image map definition
    'menú': 'menu',                // <menú> → <menu> - Menu of commands
    'grupoe': 'hgroup',            // <grupoe> → <hgroup> - Group of headings (h1-h6)

    // Interactive disclosure elements
    'detalles': 'details',         // <detalles> → <details> - Disclosure widget (expandable)
    'resumen': 'summary',          // <resumen> → <summary> - Summary/caption for details element
    'diálogo': 'dialog',           // <diálogo> → <dialog> - Dialog box or modal window

    // Progress and measurement
    'medidor': 'meter',            // <medidor> → <meter> - Scalar measurement gauge
    'progreso': 'progress',        // <progreso> → <progress> - Progress indicator
    'salida': 'output',            // <salida> → <output> - Result of calculation/user action

    // Scripting and styling
    'guion': 'script',             // <guion> → <script> - Embedded or referenced script (shortened from 'guión')
    'estilo': 'style',             // <estilo> → <style> - Embedded CSS styles
    'enlace': 'link',              // <enlace> → <link> - External resource link (CSS, favicon, etc.)
    'plantilla': 'template',       // <plantilla> → <template> - HTML template definition
    'ranura': 'slot',              // <ranura> → <slot> - Web component slot

    // Ruby annotations (East Asian typography)
    'rubí': 'ruby',                // <rubí> → <ruby> - Ruby annotation container
    'tr': 'rt',                    // <tr> → <rt> - Ruby text annotation (no conflict: table row is 'ft')
    'pr': 'rp',                    // <pr> → <rp> - Ruby parenthesis fallback

    // Specialized elements
    'buscar': 'search',            // <buscar> → <search> - Search section/form (HTML5.3+)
    'c': 'q',                      // <c> → <q> - Short inline quotation (abbreviated)
    'citabloque': 'blockquote',    // <citabloque> → <blockquote> - Long block quotation
    'listadatos': 'datalist',      // <listadatos> → <datalist> - Predefined input options list
    'grupocampos': 'fieldset',     // <grupocampos> → <fieldset> - Group of form fields


    // ============================================================================
    // SPANISH ABBREVIATIONS - Shortened forms for common elements
    // ============================================================================
    // Heading hierarchy (e = encabezado)
    'e1': 'h1',                    // <e1> → <h1> - Level 1 heading (most important)
    'e2': 'h2',                    // <e2> → <h2> - Level 2 heading
    'e3': 'h3',                    // <e3> → <h3> - Level 3 heading
    'e4': 'h4',                    // <e4> → <h4> - Level 4 heading
    'e5': 'h5',                    // <e5> → <h5> - Level 5 heading
    'e6': 'h6',                    // <e6> → <h6> - Level 6 heading (least important)

    // List elements
    'lo': 'ol',                    // <lo> → <ol> - Ordered list (lista ordenada)
    'ld': 'ul',                    // <ld> → <ul> - Unordered list (lista desordenada)
    'el': 'li',                    // <el> → <li> - List item (elemento de lista)

    // Table structure elements
    'ft': 'tr',                    // <ft> → <tr> - Table row (fila de tabla)
    'ct': 'td',                    // <ct> → <td> - Table data cell (celda de tabla)
    'et': 'th',                    // <et> → <th> - Table header cell (encabezado de tabla)
    'encabezadot': 'thead',        // <encabezadot> → <thead> - Table header section
    'cuerpot': 'tbody',            // <cuerpot> → <tbody> - Table body section (cuerpo de tabla)
    'piet': 'tfoot',               // <piet> → <tfoot> - Table footer section (pie de tabla)

    // ============================================================================
    // UNCHANGED TAGS - Common/technical elements kept in English
    // ============================================================================
    // These tags are kept as-is for several reasons:
    // - Very short and simple (p, a, img, div, span, br, hr)
    // - Technical/specialized (svg, math, video, audio)
    // - Already internationally recognized
    // - Share same prefix in Spanish (col → columna, both start with 'col')

    'html': 'html',                // Unchanged - also accepts <eshtml> as Spanish variant
    'a': 'a',                      // Unchanged - anchor/link (too short, universally known)
    'p': 'p',                      // Unchanged - paragraph (too short, universally known)
    'img': 'img',                  // Unchanged - image (short, universally known; <imagen> maps to <picture>)
    'div': 'div',                  // Unchanged - division (short, universally known)
    'span': 'span',                // Unchanged - span (short, universally known)
    'br': 'br',                    // Unchanged - line break (too short)
    'hr': 'hr',                    // Unchanged - horizontal rule (too short)
    'b': 'b',                      // Unchanged - bold (too short)
    'i': 'i',                      // Unchanged - italic (too short)
    'u': 'u',                      // Unchanged - underline (too short)
    's': 's',                      // Unchanged - strikethrough (too short)
    'sub': 'sub',                  // Unchanged - subscript (short, shares prefix with Spanish)
    'sup': 'sup',                  // Unchanged - superscript (short, shares prefix with Spanish)
    'del': 'del',                  // Unchanged - deleted text (short)
    'ins': 'ins',                  // Unchanged - inserted text (short)
    'pre': 'pre',                  // Unchanged - preformatted text (short)

    // Technical/specialized tags
    'kbd': 'kbd',                  // Unchanged - keyboard input (technical abbreviation)
    'var': 'var',                  // Unchanged - variable (programming term, international)
    'samp': 'samp',                // Unchanged - sample output (technical abbreviation)
    'q': 'q',                      // Unchanged - quotation (too short; <c> is Spanish alternative)
    'dfn': 'dfn',                  // Unchanged - definition term (technical abbreviation)
    'abbr': 'abbr',                // Unchanged - also accepts <abrv> as Spanish variant

    // Metadata and document structure
    'meta': 'meta',                // Unchanged - metadata (technical, international)
    'base': 'base',                // Unchanged - base URL (technical)
    'noscript': 'noscript',        // Unchanged - noscript fallback (technical)

    // Media elements
    'video': 'video',              // Unchanged - video element (international)
    'audio': 'audio',              // Unchanged - audio element (international)
    'track': 'track',              // Unchanged - text track for media (technical)

    // Specialized markup
    'svg': 'svg',                  // Unchanged - scalable vector graphics (technical acronym)
    'math': 'math',                // Unchanged - mathematical markup (MathML)
    'wbr': 'wbr',                  // Unchanged - word break opportunity (technical)

    // Text direction (internationalization)
    'bdi': 'bdi',                  // Unchanged - bidirectional isolate (technical)
    'bdo': 'bdo',                  // Unchanged - bidirectional override (technical)

    // List types
    'dl': 'dl',                    // Unchanged - description list (too short)
    'dt': 'dt',                    // Unchanged - description term (too short)
    'dd': 'dd',                    // Unchanged - description definition (too short)

    // Navigation
    'nav': 'nav',                  // Unchanged - navigation section (too short, universally known)
};
