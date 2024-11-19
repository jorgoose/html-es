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
    'guion': 'script',
    'tiempo': 'time',
    'enlace': 'link',
    'imagen': 'picture',
    'pequeño': 'small',
    'menú': 'menu',
    'seleccionar': 'select',
    'grupoopciones': 'optgroup',
    'opción': 'option',
    'tabla': 'table',
    'subtítulo': 'caption',
    'columna': 'col',
    'grupocolumnas': 'colgroup',
    'entrada': 'input',
    'áreatexto': 'textarea',
    'cita': 'cite',
    'código': 'code',
    'datos': 'data',
    'detalles': 'details',
    'diálogo': 'dialog',
    'plantilla': 'template',
    'leyenda': 'legend',
    'fuente': 'source',

    // Heading tags mapped to t1 - t6
    't1': 'h1',
    't2': 'h2',
    't3': 'h3',
    't4': 'h4',
    't5': 'h5',
    't6': 'h6',

    // Abbreviations adapted to Spanish (for tags that are abbreviations in English)
    'el': 'li',      // 'elemento de lista' -> 'li' (list item)
    'lo': 'ol',      // 'lista ordenada' -> 'ol' (ordered list)
    'ld': 'ul',      // 'lista desordenada' -> 'ul' (unordered list)
    'ct': 'td',      // 'celda de tabla' -> 'td' (table data)
    'et': 'th',      // 'encabezado de tabla' -> 'th' (table header)
    'ft': 'tr',      // 'fila de tabla' -> 'tr' (table row)
};

// Tags that remain unchanged in Spanish (common HTML tags):
// a, img, div, span, p, br, hr, b, i, u, s, del, ins, kbd, var, pre, samp,
// meta, noscript, iframe, embed, video, audio, track, canvas, svg, math,
// blockquote, q, abbr, area, base, bdi, bdo, data, datalist, dd, dfn, dl,
// dt, fieldset, nav, wbr, tbody, tfoot, thead
