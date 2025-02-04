import { Widget, WidgetState } from 'src/mini-libs/widget-style-6/Widget.ts'
import { CommonStates } from 'src/mini-libs/widget-style-6/WidgetCommonEntities.ts'
import { WidgetElem } from 'src/mini-libs/widget-style-6/WidgetEntity.ts'
import {
  AppStyle,
  AppWidgetStyle, combinePartsToTypeShapeSizeColor,
  WidgetStyle,
  WidgetStyleObj,
} from 'src/mini-libs/widget-style-6/WidgetStyle.ts'




export namespace SelectItemS6 {
  
  export function buildWidgetElems(up?: { upElem: WidgetElem, upSelector: string }) {
    const frame = WidgetElem.of({
      ...up, className: 'rruiSelectItemFrame',
    })
    
    const border = WidgetElem.of({
      upElem: frame, upSelector: '>', className: 'rruiBorder',
    })
    //const rippleElems = RippleS6.buildWidgetElems({ upElem: border, upSelector: '>' })
    
    const indicatorFrame = WidgetElem.of({
      upElem: frame, upSelector: '>', className: 'rruiIndicatorFrame',
    })
    //const indicator
    
    const editBtn = WidgetElem.of({
      upElem: frame, upSelector: '>', className: 'rruiEditIconBox',
    })
    //const editRippleElems = RippleS6.buildWidgetElems({ upElem: border, upSelector: '>' })
    //const editIconElems
    
    const cont = WidgetElem.of({
      upElem: frame, upSelector: '>', className: 'rruiContent',
    })
    
    return {
      frame,
      border, //...rippleElems,
      editBtn, //...editRippleElems, ...editIconElems,
      indicatorFrame, //indicator,
      cont,
      //...ObjectPrefixCapitalizeKeys('ripple', rippleElems),
    } as const
  }
  
  const WidgetElems = buildWidgetElems()
  const WidgetStates = {
    inFocus: WidgetState.of([WidgetElems.frame, CommonStates.inFocus]),
    disabled: WidgetState.of([WidgetElems.frame, CommonStates.disabled]),
    error: WidgetState.of([WidgetElems.frame, CommonStates.error]),
  }
  const WidgetProps = { }
  
  export const W = Widget.of({
    rootElem: WidgetElems.frame,
    elems: WidgetElems,
    states: WidgetStates,
    props: WidgetProps,
  })
  
  export const t0 = (style: WidgetStyle) => () => W.t(undefined, style)
  export const t = (style: AppWidgetStyle): AppStyle => t => W.t(t, style)
  
  
  export namespace Parts {
    export const base: WidgetStyleObj = {
    
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


