import { ArrayU } from '@util/common/ArrayU.ts'
import { StringU } from '@util/common/StringU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import uncapitalize = StringU.uncapitalize
import anyobj = TypeU.anyobj
import lastI = ArrayU.lastI



type Transformed = {
  elem: anyobj,
  value: string,
  media?: anyobj
}



export class WidgetElemState {
  
  constructor(
    readonly values: Record<string, any> = { },
  ) { }
  
  
  transform(value: string = ''): Transformed | Transformed[] {
    
    
    return { } as any
  }
  
}


const states = {
  type: new WidgetElemState({ radio: '', checkbox: '' }),
}




function transform(selectProp: string) {
  const data: Record<string, any>[][] = []
  
  type EntityEntries = Record<string, WidgetElemState | any>
  let contextStack: Array<EntityEntries | undefined> = [states]
  // slot indexes for entities
  const commonI = 0
  const elemI = 1
  const pseudoClassI = 2
  const attrI = 3
  const attrValueI = 4
  
  {
    const d: Record<string, any>[] = []
    loop: while (selectProp) {
      selectProp = uncapitalize(selectProp)
      
      for (let c = lastI(contextStack); c >= 0; c--) {
        const context = contextStack[c]
        if (context) for (const [name, entity] of Object.entries(context)) {
          // TODO split 'selectProp' by capital letters and check using 'in' operator
          
          if (selectProp.startsWith(name)) {
            selectProp = selectProp.slice(name.length)
            
            // found attr
            if (entity instanceof WidgetElemState) {
              d.push({ attr: name })
              contextStack = contextStack.slice(0, attrI + 1)
              contextStack[attrI] = entity
              if (entity.values) contextStack[attrValueI] = entity.values
            }
            // found value
            else {
              if (!d.length) d.push({ })
              d.at(-1)!.value = name
              contextStack = contextStack.slice(0, attrValueI)
            }
            
            continue loop
          }
          
          throw new Error(`Unknown property: ${selectProp}`)
        }
      }
    }
    data.push(d)
  }
  
  return data
}


export function testWidget51Transform() {
  console.log('transform(\'typeRadio\')', transform('typeRadio'))
}



