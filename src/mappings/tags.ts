export const tagMappings: Record<string, string> = {
    // Full English words translated to Spanish (with accent marks)
    'título': 'title',
    'texto': 'text',    // Add mapping for 'text' tag
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
    'áreatexto': 'textarea',
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
    'entrada': 'input',        // Add mapping for form input

    // Abbreviations adapted to Spanish (for tags that are abbreviations in English)
    'el': 'li',      // 'elemento de lista' -> 'li' (list item)
    'lo': 'ol',      // 'lista ordenada' -> 'ol' (ordered list)
    'ld': 'ul',      // 'lista desordenada' -> 'ul' (unordered list)
    'ct': 'td',      // 'celda de tabla' -> 'td' (table data)
    'et': 'th',      // 'encabezado de tabla' -> 'th' (table header)
    'ft': 'tr',      // 'fila de tabla' -> 'tr' (table row)
};

// Tags that remain the same (no mapping needed)
// These tags are the same in both English and Spanish and can be used directly:
// 'a', 'img', 'div', 'span', 'p', 'br', 'hr', 'b', 'i', 'u', 's', 'del', 'ins', 'kbd', 'var',
// 'pre', 'samp', 'meta', 'script', 'noscript', 'style', 'iframe', 'embed', 'video', 'audio',
// 'source', 'track', 'canvas', 'svg', 'math', 'blockquote', 'q', 'abbr', 'area', 'base', 'bdi',
// 'bdo', 'button', 'data', 'datalist', 'dd', 'dfn', 'dl', 'dt', 'fieldset', 'form', 'h1', 'h2',
// 'h3', 'h4', 'h5', 'h6', 'label', 'menu', 'picture', 'small', 'table', 'tbody', 'tfoot', 'thead',
// 'wbr', 'nav'  // Moved 'nav' here as per your instruction
