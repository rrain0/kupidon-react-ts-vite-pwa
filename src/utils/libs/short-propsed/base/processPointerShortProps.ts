
import { Pu } from 'src/utils/base/math/typeUtils.ts'




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



