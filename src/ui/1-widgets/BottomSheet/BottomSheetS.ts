import { Widget } from 'src/mini-libs/widget-style-6/Widget.ts'
import { CommonStates } from 'src/mini-libs/widget-style-6/WidgetCommonEntities.ts'
import { WidgetElem } from 'src/mini-libs/widget-style-6/WidgetEntity.ts'
import {
  AppStyle,
  AppWidgetStyle,
  WidgetStyle,
  WidgetStyleObj,
} from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import fixed = WidgetStyleCommon.fixed
import modalFloor1 = StyleVals.modalFloor1
import noPointer = WidgetStyleCommon.noPointer


export namespace BottomSheetS {
  
  export function buildWidgetElems(up?: { upElem: WidgetElem, upSelector: string }) {
    const frame = WidgetElem.of({
      className: 'rruiBottomSheetFrame',
      ...up,
      states: CommonStates,
    })
    const sheet = WidgetElem.of({
      className: 'rruiBottomSheet',
      upElem: frame, upSelector: '>*>',
    })
    return {
      frame,
      sheet,
    } as const
  }
  
  const WidgetElems = buildWidgetElems()
  
  export const W = Widget.of({
    rootElem: WidgetElems.frame,
    elems: WidgetElems,
  })
  
  export const t0 = (style: WidgetStyle) => () => W.t(undefined, style)
  export const t = (style: AppWidgetStyle): AppStyle => t => W.t(t, style)
  
  
  export namespace S {
    
    export const base: WidgetStyleObj = {
      frame: {
        ...fixed,
        z: modalFloor1,
        ...noPointer,
        display: 'grid',
        placeItems: 'end center',
      },
      sheet: {
        w: 'full',
        hMax: 'full', // must be here
        display: 'grid',
        rows: 'auto 1fr',
        justifyItems: 'stretch',
        ...noPointer,
      },
    }
    
  }
  
  
}



