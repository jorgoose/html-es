export const attributeMappings: Record<string, string> = {
    // Full English word attributes that need Spanish translation
    'título': 'title',
    'estilo': 'style',
    'oculto': 'hidden',
    'nombre': 'name',
    'valor': 'value',
    'múltiple': 'multiple',
    'seleccionado': 'selected',
    'deshabilitado': 'disabled',
    'requerido': 'required',
    'marcado': 'checked',
    'máximo': 'max',
    'mínimo': 'min',
    'patrón': 'pattern',
    'tamaño': 'size',
    'ancho': 'width',
    'alto': 'height',
    'filas': 'rows',
    'columnas': 'cols',
    'clase': 'class',
    'tipo': 'type',
    'función': 'role',
    'objetivo': 'target',
    'para': 'for',
    'lista': 'list',
    'paso': 'step',
    'acepta': 'accept',
    'autofoco': 'autofocus',
    'completado': 'autocomplete',
    'modo': 'mode',
    'lugar': 'placeholder',
    'solo-lectura': 'readonly',
    'cargando': 'loading',
    'método': 'method',
    'acción': 'action',
    'texto': 'text',
    
    // Abbreviations for Spanish versions
    'od': 'src',              // origen digital -> od (source -> src)
    'rd': 'rel',              // relación digital -> rd (relation -> rel)
    'ta': 'alt',              // texto alternativo -> ta (alternative text -> alt)
    'ec': 'colspan',          // expansión columna -> ec (column span -> colspan)
    'ef': 'rowspan',          // expansión fila -> ef (row span -> rowspan)
    'idio': 'lang',             // idioma -> id (language -> lang)
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