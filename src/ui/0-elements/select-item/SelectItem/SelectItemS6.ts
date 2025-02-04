import { ObjectU } from '@util/common/ObjectU.ts'
import { AttachRootElemParams, Widget, WidgetState } from 'src/mini-libs/widget-style-6/Widget.ts'
import { AdditionalStates } from 'src/mini-libs/widget-style-6/WidgetEntities.ts'
import { WidgetElem } from 'src/mini-libs/widget-style-6/WidgetEntity.ts'
import {
  AppStyle,
  AppWidgetStyle, combinePartsToTypeShapeSizeColor,
  WidgetStyle,
  WidgetStyleObj,
} from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import { SelectMeterS6 } from 'src/ui/0-elements/select-item/SelectMeter/SelectMeterS6.ts'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import flexC = WidgetStyleCommon.flexC
import abs = WidgetStyleCommon.abs




export namespace SelectItemS6 {
  
  import ObjectPrefixCapitalizeKeys = ObjectU.ObjectPrefixCapitalizeKeys
  
  export function buildWidgetElems(up?: AttachRootElemParams) {
    const selectItem = WidgetElem.of({
      ...up, className: 'rruiSelectItemFrame',
      states: { 
        selected: AdditionalStates.selected,
      },
    })
    
    const buttonElems = ButtonS6.buildWidgetElems({ upElem: selectItem, upSelector: '>' })
    
    const meterFrame = WidgetElem.of({
      upElem: selectItem, upSelector: '>', className: 'rruiMeterFrame',
    })
    const meterElems = SelectMeterS6.buildWidgetElems({ upElem: meterFrame, upSelector: '>' })
    
    const editBtnElems = ObjectPrefixCapitalizeKeys(
      'edit',
      IconButtonS6.buildWidgetElems({ upElem: selectItem, upSelector: '>' })
    )
    
    //const addIconBox = 0
    
    return {
      selectItem,
      ...buttonElems,
      meterFrame, ...meterElems,
      ...editBtnElems,
    } as const
  }
  
  const WidgetElems = buildWidgetElems()
  const WidgetStates = {
    ...ButtonS6.W.states!,
    selected: WidgetState.of([WidgetElems.selectItem, WidgetElems.selectItem.ss!.selected]),
  }
  const WidgetProps = { }
  
  export const W = Widget.of({
    rootElem: WidgetElems.selectItem,
    elems: WidgetElems,
    states: WidgetStates,
    props: WidgetProps,
  })
  
  export const t0 = (style: WidgetStyle) => () => W.t(undefined, style)
  export const t = (style: AppWidgetStyle): AppStyle => t => W.t(t, style)
  
  
  export namespace Parts {
    export const base = {
      selectItem: {
        pos: 'rel',
        w: 300, hMin: 80, h: 'ct', '--br': '20px', r: 'var(--br)',
        ...flexC,
        overflow: 'hidden',
      },
      ...ButtonS6.Parts.base,
      button: { ...ButtonS6.Parts.base.button,
        ...abs,
        display: 'grid', autoFlow: 'col', placeItems: 'stretch center', g: 10,
      },
      
      //addIconBox
      
    } satisfies WidgetStyleObj
    
    export namespace Type {
      
      export namespace filled {
        export namespace Shape {
          export namespace rect {
            //export const baseSize: WidgetStyleObj = { ...base }
            export namespace Size {
              // type: filled, shape: rect, size: md
              /* export const md: WidgetStyle = [base, {
              
              }] */
              // type: filled, shape: rect, size: lg
              export const lg: WidgetStyle = [base, {
              
              }]
            }
          }
        }
        
        export const baseColor: AppWidgetStyle = t => ({
        
        })
        export namespace Color {
          // type: filled, color: normal
          export const normal: AppWidgetStyle = t => [baseColor, {
          
          }]
        }
      }
      
    }
  }
  
  export const S = combinePartsToTypeShapeSizeColor(Parts)
  
}


