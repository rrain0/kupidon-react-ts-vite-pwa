import { AttachRootElemParams, Widget } from 'src/mini-libs/widget-style-6/Widget.ts'
import { WidgetElem } from 'src/mini-libs/widget-style-6/WidgetEntity.ts'
import {
  AppStyle,
  AppWidgetStyle,
  combinePartsToTypeShapeSizeColor,
  WidgetStyle,
} from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import { BottomSheetS6 } from 'src/ui/1-widgets/BottomSheet/BottomSheetS6.ts'
import { OverflowWrapperStyle } from 'src/ui/1-widgets/Scrollbars/OverflowWrapperStyle.ts'
import col = WidgetStyleCommon.col
import colC = WidgetStyleCommon.colC
import flexC = WidgetStyleCommon.flexC



export namespace BottomSheetBasicS6 {
  
  export function buildWidgetElems(up?: AttachRootElemParams) {
    const sheet = BottomSheetS6.buildWidgetElems(up)
    
    const header = WidgetElem.of({
      upElem: sheet.sheet,
      upSelector: '>',
      className: 'rruiBottomSheetHeader',
    })
    const headerHandle = WidgetElem.of({
      upElem: header,
      upSelector: '>',
      className: 'rruiBottomSheetHeaderHandle',
    })
    const headerTitle = WidgetElem.of({
      upElem: header,
      upSelector: '>',
      className: 'rruiBottomSheetHeaderTitle',
    })
    
    const body = WidgetElem.of({
      upElem: sheet.sheet,
      upSelector: '>',
      className: 'rruiBottomSheetBody',
    })
    
    const overflowWrapper = WidgetElem.of({
      upElem: body,
      upSelector: '>',
      className: OverflowWrapperStyle.El.wrapper.name,
    })
    const overflowScroll = WidgetElem.of({
      upElem: overflowWrapper,
      upSelector: OverflowWrapperStyle.El.container.upSelector,
      className: OverflowWrapperStyle.El.container.name,
    })
    const overflowCont = WidgetElem.of({
      upElem: overflowScroll,
      upSelector: OverflowWrapperStyle.El.content.upSelector,
      className: OverflowWrapperStyle.El.content.name,
    })
    
    const cont = WidgetElem.of({
      upElem: overflowCont,
      upSelector: '>',
      className: 'rruiBottomSheetContent',
    })
    
    return {
      ...sheet,
      header, headerHandle, headerTitle,
      body,
      overflowWrapper, overflowScroll, overflowCont,
      cont,
    } as const
  }
  
  const WidgetElems = buildWidgetElems()
  const WidgetStates = BottomSheetS6.W.states
  
  export const W = Widget.of({
    rootElem: WidgetElems.sheetFrame,
    elems: WidgetElems,
    states: WidgetStates,
  })
  
  export const t0 = (style: WidgetStyle) => () => W.t(undefined, style)
  export const t = (style: AppWidgetStyle): AppStyle => t => W.t(t, style)
  
  
  
  export namespace Parts {
    export const base: WidgetStyle = [BottomSheetS6.Parts.base, {
      header: {
        p: 10, ...colC, g: 6,
        touchAction: 'none',
        cursor: 'grab',
      },
      headerHandle: {
        w: 44, h: 4, r: 2,
        bgColor: '#8b8b8b',
      },
      headerTitle: {
        hMin: 20, ...flexC,
        textAlign: 'center',
      },
      body: {
        ...flexC,
        overflow: 'hidden',
      },
      cont: {
        w: 'full', h: 'ct', hMin: 'ct', p: [0, 10, 10], ...col,
      },
      dragging: {
        headerCursor: 'grabbing',
        headerHandleBgColor: '#000000',
      },
    }]
    
    export namespace Type {
      
      export namespace bottom {
        export namespace Shape {
          export namespace sheet {
            //export const baseSize: WidgetStyleObj = { ...base }
            export namespace Size {
              // type: bottom, shape: sheet, size: full
              export const full: WidgetStyle = [base, {
                
              }]
            }
          }
        }
        
        export const baseColor: AppWidgetStyle = t => ({ })
        export namespace Color {
          // type: bottom, color: normal
          export const normal: AppWidgetStyle = t => [baseColor, {
            sheet: {
              bgColor: t.bottomSheet.bg,
              color: t.bottomSheet.ct,
            },
            headerHandle: {
              bgColor: t.bottomSheetHandle.bg,
            },
            dragging: {
              headerHandleBgColor: t.bottomSheetHandle.bgFc,
            },
          }]
        }
      }
      
    }
  }
  
  export const S = combinePartsToTypeShapeSizeColor(Parts)
  
  
  
}


