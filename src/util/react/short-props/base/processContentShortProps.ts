import { TypeU } from 'src/util/common/TypeU.ts'
import Pu = TypeU.Pu




export type ContentShortProps = Pu<{
  noOverflow: boolean // true => { overflow: 'hidden' }
}>



export const processContentShortProps = <P extends object>(
  props: P & ContentShortProps
) => {
  const {
    noOverflow,
    ...contentRest
  } = props
  
  
  
  const content = {
    ...noOverflow && { overflow: 'hidden' },
  }
  
  return { content, contentRest }
}



