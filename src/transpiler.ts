import { tagMappings } from './mappings/tags';
import { ConversionOptions } from './types';

export class HTMLEsTranspiler {  //
  private mappings: Record<string, string>;

  constructor(options: ConversionOptions = {}) {
    this.mappings = {
      ...tagMappings,
      ...options.customMappings
    };
  }

  public transpile(source: string): string {  // Changed from to HTML
    let result = source;
    
    Object.entries(this.mappings).forEach(([spanish, english]) => {
      // Convert opening tags with potential attributes
      result = result.replace(
        new RegExp(`<${spanish}(\\s[^>]*>|>)`, 'g'),
        `<${english}$1`
      );
      
      // Convert closing tags
      result = result.replace(
        new RegExp(`</${spanish}>`, 'g'),
        `</${english}>`
      );
    });
    
    return result;
  }

  public reverseTranspile(source: string): string {  // Changed from toSpanish
    let result = source;
    
    Object.entries(this.mappings).forEach(([spanish, english]) => {
      result = result.replace(
        new RegExp(`<${english}(\\s[^>]*>|>)`, 'g'),
        `<${spanish}$1`
      );
      result = result.replace(
        new RegExp(`</${english}>`, 'g'),
        `</${spanish}>`
      );
    });
    
    return result;
  }
}