import { AttachRootElemParams, Widget, WidgetState } from 'src/mini-libs/widget-style-6/Widget.ts'
import { WidgetAttr, WidgetElem } from 'src/mini-libs/widget-style-6/WidgetEntity.ts'
import {
  AppStyle,
  AppWidgetStyle, combinePartsToTypeShapeSizeColor,
  WidgetStyle,
} from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { StyleVals } from 'src/styles/StyleVals.ts'
import { WidgetStyleCommon } from 'src/styles/common/WidgetStyleCommon.ts'
import fixed = WidgetStyleCommon.fixed
import modalFloor1k = StyleVals.modalFloor1k



export namespace BottomSheetS6 {
  
  export function buildWidgetElems(up?: AttachRootElemParams) {
    const sheetFrame = WidgetElem.of({
      className: 'rruiBottomSheetFrame', ...up,
      states: {
        dragging: WidgetAttr.of('data-dragging'),
      },
    })
    const sheet = WidgetElem.of({
      upElem: sheetFrame, upSelector: '>', className: 'rruiBottomSheet',
    })
    return {
      sheetFrame,
      sheet,
    } as const
  }
  
  const WidgetElems = buildWidgetElems()
  const WidgetStates = {
    dragging: WidgetState.of([WidgetElems.sheetFrame, WidgetElems.sheetFrame.ss!.dragging]),
  }
  
  export const W = Widget.of({
    rootElem: WidgetElems.sheetFrame,
    elems: WidgetElems,
    states: WidgetStates,
  })
  
  export const t0 = (style: WidgetStyle) => () => W.t(undefined, style)
  export const t = (style: AppWidgetStyle): AppStyle => t => W.t(t, style)
  
  
  
  export namespace Parts {
    export const base: WidgetStyle = {
      sheetFrame: {
        ...fixed,
        z: modalFloor1k,
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
  
  export namespace Addons {
    export const shadow: AppWidgetStyle = t => ({
      sheet: { boxShadow: `${StyleVals.shadowSz} ${t.shadow.bg3OnLight}` },
    })
  }
  
}



