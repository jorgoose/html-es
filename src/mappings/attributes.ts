/**
 * EsHTML to HTML Attribute Mappings
 *
 * This file defines the mapping between EsHTML (Spanish HTML) attributes and standard HTML attributes.
 * The transpiler uses these mappings to convert Spanish-language attribute names into web-standard
 * English attribute names that browsers can understand.
 *
 * HOW IT WORKS:
 * 1. When the transpiler encounters an EsHTML attribute like clase="contenedor", it looks up 'clase' in this map
 * 2. It finds the corresponding HTML attribute 'class'
 * 3. It replaces the attribute name: clase="contenedor" → class="contenedor"
 * 4. Attribute VALUES are also translated using attributeValueMappings (e.g., tipo="texto" → type="text")
 *
 * MAPPING STRATEGY:
 * - Full Spanish Words: Common attributes get full Spanish translations (e.g., 'clase' → 'class')
 * - Spanish Abbreviations: Some attributes use Spanish abbreviations (e.g., 'fte' → 'src', 'ta' → 'alt')
 * - Unchanged: Technical attributes remain in English (see list at bottom of file)
 *
 * The goal is to make HTML accessible to Spanish speakers while preparing them to transition
 * to standard HTML once they understand the concepts.
 */

export const attributeMappings: Record<string, string> = {
    // ============================================================================
    // FULL SPANISH TRANSLATIONS - Common & Semantic Attributes
    // ============================================================================

    // Global attributes (applicable to all elements)
    'clase': 'class',              // clase="..." → class="..." - CSS class names
    'título': 'title',             // título="..." → title="..." - Tooltip text
    'estilo': 'style',             // estilo="..." → style="..." - Inline CSS styles
    'idioma': 'lang',              // idioma="es" → lang="es" - Document/element language
    'función': 'role',             // función="..." → role="..." - ARIA role
    'oculto': 'hidden',            // oculto → hidden - Hide element from display

    // Form input attributes
    'nombre': 'name',              // nombre="..." → name="..." - Form field name
    'valor': 'value',              // valor="..." → value="..." - Form field value
    'tipo': 'type',                // tipo="texto" → type="text" - Input type (values also translated)
    'lugar': 'placeholder',        // lugar="..." → placeholder="..." - Placeholder text
    'requerido': 'required',       // requerido → required - Mark field as required
    'deshabilitado': 'disabled',   // deshabilitado → disabled - Disable interaction
    'marcado': 'checked',          // marcado → checked - Checkbox/radio checked state
    'seleccionado': 'selected',    // seleccionado → selected - Option selected state
    'autofoco': 'autofocus',       // autofoco → autofocus - Auto-focus on page load
    'múltiple': 'multiple',        // múltiple → multiple - Allow multiple selections/files

    // Form validation attributes
    'patrón': 'pattern',           // patrón="..." → pattern="..." - Regex validation pattern
    'longitudmáxima': 'maxlength', // longitudmáxima="100" → maxlength="100" - Max character length
    'máximo': 'max',               // máximo="100" → max="100" - Maximum value
    'mínimo': 'min',               // mínimo="0" → min="0" - Minimum value
    'paso': 'step',                // paso="1" → step="1" - Increment step for number inputs
    'novalidar': 'novalidate',     // novalidar → novalidate - Skip form validation

    // Form submission attributes
    'método': 'method',            // método="post" → method="post" - HTTP method
    'acción': 'action',            // acción="/enviar" → action="/submit" - Form submission URL
    'destino': 'target',           // destino="_blank" → target="_blank" - Link/form target
    'objetivo': 'target',          // objetivo="_blank" → target="_blank" - Alternate spelling
    'acepta': 'accept',            // acepta=".jpg" → accept=".jpg" - Accepted file types
    'acepta-charset': 'accept-charset', // acepta-charset="UTF-8" → accept-charset="UTF-8" - Character encoding
    'enctype': 'enctype',          // enctype="..." → enctype="..." - Form encoding type (technical)

    // Link and media attributes
    'enlace': 'href',              // enlace="/pagina" → href="/page" - Hyperlink URL
    'relación': 'rel',             // relación="stylesheet" → rel="stylesheet" - Link relationship

    // Size and dimensions
    'ancho': 'width',              // ancho="500" → width="500" - Element width
    'anchura': 'width',            // anchura="500" → width="500" - Alternate spelling for width
    'alto': 'height',              // alto="300" → height="300" - Element height
    'altura': 'height',            // altura="300" → height="300" - Alternate spelling for height
    'tamaño': 'size',              // tamaño="20" → size="20" - Input size
    'filas': 'rows',               // filas="5" → rows="5" - Textarea rows
    'columnas': 'cols',            // columnas="40" → cols="40" - Textarea columns

    // Table attributes
    'encabezados': 'headers',      // encabezados="..." → headers="..." - Associated header cells
    'escopo': 'scope',             // escopo="col" → scope="col" - Header cell scope
    'ec': 'colspan',               // ec="2" → colspan="2" - Column span (abbreviation)
    'ef': 'rowspan',               // ef="2" → rowspan="2" - Row span (abbreviation)

    // Media element attributes
    'autoreproducir': 'autoplay',  // autoreproducir → autoplay - Auto-play media
    'muted': 'muted',              // muted → muted - Mute audio (unchanged, technical)
    'medios': 'media',             // medios="..." → media="..." - Media query
    'srcdoc': 'srcdoc',            // srcdoc="..." → srcdoc="..." - Inline HTML for iframe (technical)
    'srclang': 'srclang',          // srclang="es" → srclang="es" - Track language (technical)
    'tiposrc': 'srcset',           // tiposrc="..." → srcset="..." - Responsive image sources

    // Progress and meter attributes
    'baja': 'low',                 // baja="20" → low="20" - Low threshold for meter
    'optimo': 'optimum',           // optimo="50" → optimum="50" - Optimal value for meter

    // Text and content attributes
    'traduce': 'translate',        // traduce="no" → translate="no" - Translation hint
    'envoltura': 'wrap',           // envoltura="soft" → wrap="soft" - Text wrapping mode
    'saltolinea': 'wrap',          // saltolinea="..." → wrap="..." - Alternate spelling

    // Form association attributes
    'para': 'for',                 // para="input-id" → for="input-id" - Label target
    'lista': 'list',               // lista="datalist-id" → list="datalist-id" - Datalist association

    // Miscellaneous attributes
    'teclaacceso': 'accesskey',    // teclaacceso="s" → accesskey="s" - Keyboard shortcut
    'usemapa': 'usemap',           // usemapa="#mapa" → usemap="#map" - Image map reference
    'tipocontenido': 'content',    // tipocontenido="..." → content="..." - Meta content
    'charset': 'charset',          // charset="UTF-8" → charset="UTF-8" - Character set (unchanged, technical)
    'cruzado': 'crossorigin',      // cruzado="anonymous" → crossorigin="anonymous" - CORS setting
    'integridad': 'integrity',     // integridad="..." → integrity="..." - Subresource integrity
    'asyncrono': 'async',          // asyncrono → async - Async script loading

    // ============================================================================
    // SPANISH ABBREVIATIONS - Shortened forms for common attributes
    // ============================================================================

    'fte': 'src',                  // fte="imagen.jpg" → src="image.jpg" - Source (from 'fuente')
    'rd': 'rel',                   // rd="stylesheet" → rel="stylesheet" - Relation (from 'relación digital')
    'ta': 'alt',                   // ta="descripción" → alt="description" - Alt text (from 'texto alternativo')
    'idio': 'lang',                // idio="es" → lang="es" - Language (from 'idioma')
};

/**
 * EsHTML to HTML Attribute VALUE Mappings
 *
 * This file defines the mapping between Spanish attribute VALUES and English attribute VALUES.
 * After translating attribute NAMES (e.g., tipo → type), the transpiler also translates
 * the VALUES of those attributes (e.g., "texto" → "text").
 *
 * HOW IT WORKS:
 * 1. After attributes are translated, the transpiler scans attribute values in quotes
 * 2. It looks up Spanish values like "texto" in this map
 * 3. It replaces them with English equivalents: tipo="texto" → type="text"
 * 4. This ensures forms and inputs work correctly in browsers
 *
 * EXAMPLE FULL TRANSLATION:
 *   <entrada tipo="texto" valor="Hola">
 *   ↓ (translate tag: entrada → input)
 *   <input tipo="texto" valor="Hola">
 *   ↓ (translate attribute names: tipo → type, valor → value)
 *   <input type="texto" value="Hola">
 *   ↓ (translate attribute value: texto → text)
 *   <input type="text" value="Hola">
 *   ✓ Valid HTML that browsers understand!
 */

export const attributeValueMappings: Record<string, string> = {
    // Input types (for type="" attribute)
    'texto': 'text',               // tipo="texto" → type="text" - Text input
    'archivo': 'file',             // tipo="archivo" → type="file" - File upload
    'enviar': 'submit',            // tipo="enviar" → type="submit" - Submit button

    // Boolean values
    'verdadero': 'true',           // ...="verdadero" → ...="true" - Boolean true
    'falso': 'false',              // ...="falso" → ...="false" - Boolean false
    'sí': 'yes',                   // ...="sí" → ...="yes" - Affirmative yes
    'no': 'no',                    // ...="no" → ...="no" - Negative no (unchanged)

    // Text alignment values
    'izquierda': 'left',           // alinear="izquierda" → align="left" - Left alignment
    'derecha': 'right',            // alinear="derecha" → align="right" - Right alignment
    'centro': 'center',            // alinear="centro" → align="center" - Center alignment
    'justificado': 'justify',      // alinear="justificado" → align="justify" - Justified text

    // Add more common attribute values as needed:
    // - Input types: 'contraseña' → 'password', 'correo' → 'email', 'número' → 'number', etc.
    // - Button types: 'restablecer' → 'reset', 'botón' → 'button'
    // - Target values: 'nuevo' → '_blank', 'mismo' → '_self'
    // - HTTP methods: 'obtener' → 'get', 'publicar' → 'post'
};

// Attributes that remain unchanged (no mapping needed)
// These attributes are kept as-is for universal understanding or technical reasons:
// - 'id'          - Universal identifier
// - 'dir'         - Universal direction attribute
// - 'href'        - Universal hyperlink reference
// - 'src'         - Universal source reference (when not using 'od')
// - 'data-*'      - Technical prefix for custom data attributes
// - 'aria-*'      - Accessibility attributes standard
// - 'xmlns'       - XML namespace declaration
// - 'method'      - HTTP method specification
// - 'action'      - Form submission URL
// - 'charset'     - Character encoding specification
// - 'content'     - Meta content specification
// - 'coords'      - Coordinate specifications
// - 'datetime'    - Date and time specifications
// - 'accept'      - MIME type specifications
// - 'crossorigin' - CORS settings attribute
// - 'integrity'   - Subresource integrity
// - 'async'       - Script loading behavior
// - 'defer'       - Script execution timing
// - All event handlers (onclick, onchange, onsubmit, onload, onfocus, onblur, etc.)

// Event attributes are not included as per your request