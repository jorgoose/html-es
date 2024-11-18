export const tagMappings: Record<string, string> = {
    // Full English words translated to Spanish (with accent marks)
    'título': 'title',
    'cuerpo': 'body',
    'cabecera': 'head',          // 'head' is better translated as 'cabecera' in HTML context
    'lienzo': 'canvas',
    'artículo': 'article',
    'sección': 'section',
    'pie': 'footer',
    'formulario': 'form',
    'botón': 'button',
    'etiqueta': 'label',
    'dirección': 'address',
    'aparte': 'aside',
    'figura': 'figure',
    'piefigura': 'figcaption',
    'encabezado': 'header',
    'grupoencabezado': 'hgroup',
    'mapa': 'map',
    'marca': 'mark',
    'medidor': 'meter',
    'objeto': 'object',
    'parámetro': 'param',
    'progreso': 'progress',
    'salida': 'output',
    'resumen': 'summary',
    'estilo': 'style',
    'tiempo': 'time',
    'enlace': 'link',
    'área-texto': 'textarea',
    'cita': 'cite',
    'código': 'code',
    'datos': 'data',
    'detalles': 'details',
    'diálogo': 'dialog',
    'plantilla': 'template',
    'leyenda': 'legend',
    'fuente': 'source',
    'seleccionar': 'select',
    'grupoopciones': 'optgroup',
    'opción': 'option',
    'tabla': 'table',
    'subtítulo': 'caption',
    'columna': 'col',
    'grupocolumnas': 'colgroup',

    // Abbreviations adapted to Spanish (for tags that are abbreviations in English)
    'el': 'li',      // 'elemento de lista' -> 'li' (list item)
    'lo': 'ol',      // 'lista ordenada' -> 'ol' (ordered list)
    'ld': 'ul',      // 'lista desordenada' -> 'ul' (unordered list)
    'ct': 'td',      // 'celda de tabla' -> 'td' (table data)
    'et': 'th',      // 'encabezado de tabla' -> 'th' (table header)
    'ft': 'tr',      // 'fila de tabla' -> 'tr' (table row)
};

// Documentation for abbreviations
export const abbreviationMeanings = {
    // List-related tags
    'el': {
        spanish: 'elemento de lista',
        english: 'list item',
        explanation: 'Abbreviation of "elemento de lista" - represents a single item in a list',
    },
    'lo': {
        spanish: 'lista ordenada',
        english: 'ordered list',
        explanation: 'Abbreviation of "lista ordenada" - represents a numbered list',
    },
    'ld': {
        spanish: 'lista desordenada',
        english: 'unordered list',
        explanation: 'Abbreviation of "lista desordenada" - represents a bullet point list',
    },

    // Table-related tags
    'ct': {
        spanish: 'celda de tabla',
        english: 'table data',
        explanation: 'Abbreviation of "celda de tabla" - represents a data cell in a table',
    },
    'et': {
        spanish: 'encabezado de tabla',
        english: 'table header',
        explanation: 'Abbreviation of "encabezado de tabla" - represents a header cell in a table',
    },
    'ft': {
        spanish: 'fila de tabla',
        english: 'table row',
        explanation: 'Abbreviation of "fila de tabla" - represents a row in a table',
    },
};

// Tags that remain the same (no mapping needed)
// These tags are the same in both English and Spanish and can be used directly:
// 'a', 'img', 'div', 'span', 'p', 'br', 'hr', 'b', 'i', 'u', 's', 'del', 'ins', 'kbd', 'var',
// 'pre', 'samp', 'meta', 'script', 'noscript', 'style', 'iframe', 'embed', 'video', 'audio',
// 'source', 'track', 'canvas', 'svg', 'math', 'blockquote', 'q', 'abbr', 'area', 'base', 'bdi',
// 'bdo', 'button', 'data', 'datalist', 'dd', 'dfn', 'dl', 'dt', 'fieldset', 'form', 'h1', 'h2',
// 'h3', 'h4', 'h5', 'h6', 'label', 'menu', 'picture', 'small', 'table', 'tbody', 'tfoot', 'thead',
// 'wbr', 'nav'  // Moved 'nav' here as per your instruction
