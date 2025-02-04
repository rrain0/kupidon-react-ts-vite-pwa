import { AttachRootElemParams, Widget, WidgetState } from 'src/mini-libs/widget-style-6/Widget.ts'
import { CommonStates } from 'src/mini-libs/widget-style-6/WidgetCommonEntities.ts'
import { AdditionalStates } from 'src/mini-libs/widget-style-6/WidgetEntities.ts'
import { WidgetElem } from 'src/mini-libs/widget-style-6/WidgetEntity.ts'
import {
  AppStyle,
  AppWidgetStyle, combinePartsToTypeShapeSizeColor,
  WidgetStyle,
} from 'src/mini-libs/widget-style-6/WidgetStyle.ts'




/* export */ namespace WidgetS6 {
  
  export function buildWidgetElems(up?: AttachRootElemParams) {
    // widget or widgetFrame
    const widget = WidgetElem.of({
      className: 'rruiWidgetFrame', ...up,
      states: {
        selected: AdditionalStates.selected,
      },
    })
    const box = WidgetElem.of({
      upElem: widget, upSelector: '>', className: 'rruiBox',
    })
    //const rippleElems = RippleS6.buildWidgetElems({ upElem: border, upSelector: '>' })
    return {
      widget,
      box,
      //...ObjectPrefixCapitalizeKeys('ripple', rippleElems),
    } as const
  }
  
  const WidgetElems = buildWidgetElems()
  const WidgetStates = {
    inFocus: WidgetState.of([WidgetElems.widget, CommonStates.inFocus]),
    disabled: WidgetState.of([WidgetElems.widget, CommonStates.disabled]),
    error: WidgetState.of([WidgetElems.widget, CommonStates.error]),
    selected: WidgetState.of([WidgetElems.widget, WidgetElems.widget.ss!.selected]),
  }
  const WidgetProps = { }
  
  export const W = Widget.of({
    rootElem: WidgetElems.widget,
    elems: WidgetElems,
    states: WidgetStates,
    props: WidgetProps,
  })
  
  export const t0 = (style: WidgetStyle) => () => W.t(undefined, style)
  export const t = (style: AppWidgetStyle): AppStyle => t => W.t(t, style)
  
  
  export namespace Parts {
    export const base: WidgetStyle = {
    
    }
    
    export namespace Type {
      
      export namespace typeName {
        export namespace Shape {
          export namespace shapeName {
            //export const baseSize: WidgetStyleObj = { ...base }
            export namespace Size {
              // type: typeName, shape: shapeName, size: md
              export const md: WidgetStyle = [base, {
              
              }]
              // type: typeName, shape: shapeName, size: lg
              export const lg: WidgetStyle = [base, {
              
              }]
            }
          }
        }
        
        export const baseColor: AppWidgetStyle = t => ({
        
        })
        export namespace Color {
          // type: typeName, color: normal
          export const normal: AppWidgetStyle = t => [baseColor, {
          
          }]
          // type: typeName, color: accent
          export const accent: AppWidgetStyle = t => [baseColor, {
          
          }]
        }
      }
      
    }
  }
  
  export const S = combinePartsToTypeShapeSizeColor(Parts)
  
}


