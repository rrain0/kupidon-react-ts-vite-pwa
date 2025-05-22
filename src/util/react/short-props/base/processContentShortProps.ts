import { TypeU } from 'src/util/common/TypeU.ts'
import Pu = TypeU.Pu




export type ContentShortProps = Pu<{
  noOverflow: boolean // true => { overflow: 'hidden' }
  noPointer: boolean // true => { pointerEvents: 'none' }
}>



export const processContentShortProps = <P extends object>(
  props: P & ContentShortProps
) => {
  const {
    noOverflow, noPointer,
    ...contentRest
  } = props
  
  
  
  const content = {
    ...noOverflow && { overflow: 'hidden' },
    ...noPointer && { pointerEvents: 'none' },
  }
  
  return { content, contentRest }
}



