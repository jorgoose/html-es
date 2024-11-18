export const tagMappings: Record<string, string> = {
    // Full English words that need Spanish translation
    'titulo': 'title',          // Full word
    'cuerpo': 'body',          // Full word
    'cabeza': 'head',          // Full word
    'lienzo': 'canvas',        // Full word
    'articulo': 'article',     // Full word
    'seccion': 'section',      // Full word
    'pie': 'footer',           // Full word
    'formulario': 'form',      // Full word
    'boton': 'button',         // Full word
    'etiqueta': 'label',       // Full word
    
    // Abbreviations that don't make sense in Spanish
    'el': 'li',               // elemento -> el (list item -> li)
    'nv': 'nav',              // navegación -> nv (navigation -> nav)
    
    // Tags that need conversion due to English-specific abbreviations
    'lo': 'ol',               // lista ordenada -> lo (ordered list -> ol)
    'ld': 'ul',               // lista desordenada -> ld (unordered list -> ul)
    'ec': 'th',               // encabezado -> ec (table header -> th)
    'ce': 'td',               // celda -> ce (table data -> td)
    
    // Don't convert these (they work in Spanish):
    // 'img' stays 'img'      // imagen/image
    // 'p' stays 'p'          // párrafo/paragraph
    // 'div' stays 'div'      // división/division
    // 'span' stays 'span'    // extensión/span
    // 'h1'-'h6' stay as is   // numbers are universal
    // 'br' stays 'br'        // break works in Spanish
    // 'hr' stays 'hr'        // horizontal rule works in Spanish
    
    // Examples of usage:
    // Spanish: <titulo>Mi Página</titulo>
    // English: <title>Mi Página</title>
    
    // Spanish: <lo>
    //           <el>Primer elemento</el>
    //           <el>Segundo elemento</el>
    //         </lo>
    // English: <ol>
    //           <li>Primer elemento</li>
    //           <li>Segundo elemento</li>
    //         </ol>
};

// Documentation for abbreviations
export const abbreviationMeanings = {
    // List-related tags
    'el': {
        spanish: 'elemento',
        english: 'list item',
        explanation: 'Abbreviated from "elemento" - represents a single item in a list'
    },
    'lo': {
        spanish: 'lista ordenada',
        english: 'ordered list',
        explanation: 'Abbreviated from "lista ordenada" - represents a numbered list'
    },
    'ld': {
        spanish: 'lista desordenada',
        english: 'unordered list',
        explanation: 'Abbreviated from "lista desordenada" - represents a bullet point list'
    },

    // Table-related tags
    'ce': {
        spanish: 'celda',
        english: 'table data',
        explanation: 'Abbreviated from "celda" - represents a data cell in a table'
    },
    'ec': {
        spanish: 'encabezado',
        english: 'table header',
        explanation: 'Abbreviated from "encabezado" - represents a header cell in a table'
    },

    // Navigation
    'nv': {
        spanish: 'navegación',
        english: 'navigation',
        explanation: 'Abbreviated from "navegación" - represents a navigation section'
    }
};