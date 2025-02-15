import { ObjectU } from '@util/common/ObjectU.ts'
import { AttachRootElemParams, Widget, WidgetState } from 'src/mini-libs/widget-style-6/Widget.ts'
import { WidgetElem } from 'src/mini-libs/widget-style-6/WidgetEntity.ts'
import {
  AppStyle,
  AppWidgetStyle,
  combinePartsToTypeShapeSizeColor,
  WidgetStyle,
} from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import ObjectPrefixCapitalizeKeys = ObjectU.ObjectPrefixCapitalizeKeys
import row = WidgetStyleCommon.row




// TODO Style - need to extend emotion css``
export namespace HeaderArrowS6 {
  
  export function buildWidgetElems(up?: AttachRootElemParams) {
    const buttonElems = ButtonS6.buildWidgetElems(up)
    const header = WidgetElem.of({
      upElem: buttonElems.button, upSelector: '>', className: 'rruiHeader',
    })
    const arrowElems = ObjectPrefixCapitalizeKeys('arrow', SvgIconS6.buildWidgetElems({
      upElem: buttonElems.button, upSelector: '>',
    }))
    
    return {
      ...buttonElems,
      header,
      ...arrowElems,
    } as const
  }
  
  export function buildWidgetStates(elems: ReturnType<typeof buildWidgetElems>) {
    return ButtonS6.buildWidgetStates(elems)
  }
  
  const WidgetElems = buildWidgetElems()
  const WidgetStates = buildWidgetStates(WidgetElems)
  const WidgetProps = { }
  
  export const W = Widget.of({
    rootElem: WidgetElems.button,
    elems: WidgetElems,
    states: WidgetStates,
    props: WidgetProps,
  })
  
  export const t0 = (style: WidgetStyle) => () => W.t(undefined, style)
  export const t = (style: AppWidgetStyle): AppStyle => t => W.t(t, style)
  
  
  
  
  export namespace Parts {
    export const base: WidgetStyle = [
      ButtonS6.Parts.base,
      { arrow: SvgIconS6.Parts.base },
      {
        button: {
          w: 'full', hMin: 44, g: 8,
          ...row, alignItems: 'center', justifyContent: 'space-between',
        },
        header: {
          // TODO Style - need to extend emotion css`` here
        },
        arrowIcon: { h: 26 },
      },
    ]
    
    export namespace Type {
      
      export namespace text {
        export namespace Shape {
          export namespace rect {
            //export const baseSize: WidgetStyleObj = { ...base }
            export namespace Size {
              // type: text, shape: rect, size: md
              export const md: WidgetStyle = [base, {
              
              }]
              // type: text, shape: rect, size: lg
              export const lg: WidgetStyle = [base, {
              
              }]
            }
          }
        }
        
        export const baseColor: AppWidgetStyle = t => ({
          arrowIcon: {
            color: t.page.ct1,
          },
        })
        export namespace Color {
          // type: text, color: normal
          export const normal: AppWidgetStyle = t => [baseColor, {
          
          }]
          // type: text, color: accent
          export const accent: AppWidgetStyle = t => [baseColor, {
          
          }]
        }
      }
      
    }
  }
  
  export const S = combinePartsToTypeShapeSizeColor(Parts)
  
}

