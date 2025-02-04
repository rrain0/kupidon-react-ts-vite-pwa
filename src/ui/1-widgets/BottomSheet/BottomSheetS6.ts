import { Widget, WidgetState } from 'src/mini-libs/widget-style-6/Widget.ts'
import { WidgetAttr, WidgetElem } from 'src/mini-libs/widget-style-6/WidgetEntity.ts'
import {
  AppStyle,
  AppWidgetStyle, combinePartsToTypeShapeSizeColor,
  WidgetStyle,
  WidgetStyleObj,
} from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import fixed = WidgetStyleCommon.fixed
import modalFloor1 = StyleVals.modalFloor1



export namespace BottomSheetS6 {
  
  export function buildWidgetElems(up?: { upElem: WidgetElem, upSelector: string }) {
    const frame = WidgetElem.of({
      ...up, className: 'rruiBottomSheetFrame',
      states: {
        dragging: WidgetAttr.of('data-dragging'),
      },
    })
    const sheet = WidgetElem.of({
      upElem: frame, upSelector: '>', className: 'rruiBottomSheet',
    })
    return {
      frame,
      sheet,
    } as const
  }
  
  const WidgetElems = buildWidgetElems()
  const WidgetStates = {
    dragging: WidgetState.of([WidgetElems.frame, WidgetElems.frame.ss!.dragging]),
  }
  
  export const W = Widget.of({
    rootElem: WidgetElems.frame,
    elems: WidgetElems,
    states: WidgetStates,
  })
  
  export const t0 = (style: WidgetStyle) => () => W.t(undefined, style)
  export const t = (style: AppWidgetStyle): AppStyle => t => W.t(t, style)
  
  
  
  export namespace Parts {
    export const base: WidgetStyleObj = {
      frame: {
        ...fixed,
        z: modalFloor1,
        display: 'grid',
        placeItems: 'end center',
        pointer: false,
      },
      sheet: {
        w: 'full',
        hMax: 'full', // must be here
        r: [16, 16, 0, 0],
        display: 'grid',
        rows: 'auto 1fr',
        justifyItems: 'stretch',
        bgColor: '#ffffff',
        color: '#000000',
        pointer: true,
        overflow: 'hidden',
      },
    }
    
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
          export const normal: AppWidgetStyle = t => [baseColor, { }]
        }
      }
      
    }
  }
  
  export const S = combinePartsToTypeShapeSizeColor(Parts)
  
}



