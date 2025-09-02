import { TypeU } from 'src/utils/common/TypeU.ts'
import Pu = TypeU.Pu




export type PointerShortProps = Pu<{
  noPointer: boolean // true => { pointerEvents: 'none' }
  noTouchAction: boolean // true = > { touchAction: 'none' }
}>



export const processPointerShortProps = <P extends object>(
  props: P & PointerShortProps
) => {
  const {
    noPointer, noTouchAction,
    ...pointerRest
  } = props
  
  
  
  const pointer = {
    ...noPointer && { pointerEvents: 'none' },
    ...noTouchAction && { touchAction: 'none' },
  }
  
  return { pointer, pointerRest }
}



