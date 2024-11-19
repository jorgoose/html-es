export const attributeMappings: Record<string, string> = {
    // Full Spanish word attributes that need to be translated to English
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
    'acepta-charset': 'accept-charset',
    'teclaacceso': 'accesskey',
    'autofoco': 'autofocus',
    'autoreproducir': 'autoplay',
    'enctype': 'enctype',
    'novalidar': 'novalidate',
    'encabezados': 'headers',
    'altura': 'height',
    'longitudmáxima': 'maxlength',
    'medios': 'media',
    'muted': 'muted',
    'baja': 'low',
    'optimo': 'optimum',
    'lugar': 'placeholder',
    'saltolinea': 'wrap',
    'srcdoc': 'srcdoc',
    'srclang': 'srclang',
    'traduce': 'translate',
    'escopo': 'scope',
    'tiposrc': 'srcset',
    'usemapa': 'usemap',
    'anchura': 'width',
    'envoltura': 'wrap',

    // Form attributes
    'método': 'method',
    'acción': 'action',
    'destino': 'target',
    'enlace': 'href',
    'relación': 'rel',
    'idioma': 'lang',
    'tipocontenido': 'content',
    'charset': 'charset',
    'cruzado': 'crossorigin',
    'integridad': 'integrity',
    'asyncrono': 'async',
    
    // Abbreviations for Spanish versions
    'fte': 'src',              // fuente de linea -> fte (source -> src)
    'rd': 'rel',              // relación digital -> rd (relation -> rel)
    'ta': 'alt',              // texto alternativo -> ta (alternative text -> alt)
    'ec': 'colspan',          // expansión columna -> ec (column span -> colspan)
    'ef': 'rowspan',          // expansión fila -> ef (row span -> rowspan)
    'idio': 'lang',           // idioma -> lang
    // Add other abbreviations if necessary
};

export const attributeValueMappings: Record<string, string> = {
    'texto': 'text',
    'enviar': 'submit',
    'archivo': 'file',
    'verdadero': 'true',
    'falso': 'false',
    'sí': 'yes',
    'no': 'no',
    'izquierda': 'left',
    'derecha': 'right',
    'centro': 'center',
    'justificado': 'justify',
    // Add other necessary mappings here
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