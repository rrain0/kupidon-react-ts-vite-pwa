import { StringU } from '@util/common/StringU.ts'
import uncapitalize = StringU.uncapitalize


type Transformed = { entity: object, value: string, media?: object }


export class WidgetElemState {
  
  constructor(
    readonly values: string[] = [],
  ) { }
  
  
  transform(value: string = ''): Transformed | Transformed[] {
    
    
    return { } as any
  }
  
}


const states = {
  type: new WidgetElemState(['radio', 'checkbox']),
}




function transform(selectProp: string) {
  const data: Record<string, any>[][] = []
  
  type Entries = Record<string, WidgetElemState | true>
  const entries: Entries = { }
  
  {
    const d: Record<string, any>[] = []
    while (selectProp) {
      selectProp = uncapitalize(selectProp)
      // apply state context
      const entries2: Entries = { ...entries, ...states }
      
      for (const [name, entity] of Object.entries(entries2)) {
        
        if (selectProp.startsWith(name)) {
          selectProp = selectProp.slice(name.length)
          
          if (entity instanceof WidgetElemState) {
            d.push(entity)
          }
          if (entity === true) {
          
          }
          
        }
        
        throw new Error(`Unknown property: ${selectProp}`)
      }
    }
  }
  
}

transform('typeRadio')

