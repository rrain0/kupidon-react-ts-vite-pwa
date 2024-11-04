


export namespace CssU {
  
  
  
  /*
  .cssClass {
     width: ${abs('var(--w)', 'var(--h)')};
     height: ${abs('var(--w)', 'var(--h)')};
   }
   */
  export function abs(a: string, b: string): string {
    return `max( ${a} - ${b}, ${b} - ${a} )`
  }
  
  
  
  /*
   .cssClass {
     width: ${s('var(--w)', 'var(--h)')};
     height: ${s('var(--w)', 'var(--h)')};
   }
  */
  export const s = (w: string, h: string) => {
    return `calc( min(${w}, ${h}) + ${abs(w, h)} / 3 )`
  }
  
  
  
  /* export function stretchWithin(aspectRatio: string, maxW: string, maxH: string) {
    return ``
  } */
  
  
  
}

