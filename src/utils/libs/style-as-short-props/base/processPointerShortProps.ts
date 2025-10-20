import type { Pu } from 'src/utils/base/tsUtils.ts'




export type PointerShortProps = Pu<{
  pointerAuto: boolean // true => { pointerEvents: 'auto' }
  noPointer: boolean // true => { pointerEvents: 'none' }
  noTouchAction: boolean // true = > { touchAction: 'none' }
}>



export const processPointerShortProps = <P extends object>(
  props: P & PointerShortProps
) => {
  const {
    pointerAuto, noPointer, noTouchAction,
    ...pointerRest
  } = props
  
  
  
  const pointerCss = {
    ...pointerAuto && { pointerEvents: 'auto' },
    ...noPointer && { pointerEvents: 'none' },
    ...noTouchAction && { touchAction: 'none' },
  }
  
  return { pointerCss, pointerRest }
}



