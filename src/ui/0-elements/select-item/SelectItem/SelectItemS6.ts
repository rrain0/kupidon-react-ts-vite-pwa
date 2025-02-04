import { ObjectU } from '@util/common/ObjectU.ts'
import { AttachRootElemParams, Widget, WidgetState } from 'src/mini-libs/widget-style-6/Widget.ts'
import { AdditionalStates } from 'src/mini-libs/widget-style-6/WidgetEntities.ts'
import { WidgetElem } from 'src/mini-libs/widget-style-6/WidgetEntity.ts'
import {
  AppStyle,
  AppWidgetStyle, combinePartsToTypeShapeSizeColor,
  WidgetStyle,
} from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { RippleS6 } from 'src/ui/0-elements/Ripple/RippleS6.ts'
import { SelectMeterS6 } from 'src/ui/0-elements/select-item/SelectMeter/SelectMeterS6.ts'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import flexC = WidgetStyleCommon.flexC
import abs = WidgetStyleCommon.abs
import col = WidgetStyleCommon.col
import ObjectPrefixCapitalizeKeys = ObjectU.ObjectPrefixCapitalizeKeys




export namespace SelectItemS6 {
  
  
  export function buildWidgetElems(up?: AttachRootElemParams) {
    const selectItem = WidgetElem.of({
      ...up, className: 'rruiSelectItemFrame',
      states: { 
        selected: AdditionalStates.selected,
      },
    })
    
    const buttonElems = ButtonS6.buildWidgetElems({ upElem: selectItem, upSelector: '>' })
    
    const meterBox = WidgetElem.of({
      upElem: selectItem, upSelector: '>', className: 'rruiMeterFrame',
    })
    const meterElems = SelectMeterS6.buildWidgetElems({ upElem: meterBox, upSelector: '>' })
    
    const addBox = WidgetElem.of({
      upElem: buttonElems.button, upSelector: '>', className: 'rruiAddIconBox',
    })
    const addElems = ObjectPrefixCapitalizeKeys(
      'add',
      SvgIconS6.buildWidgetElems({ upElem: addBox, upSelector: '>' })
    )
    
    const editElems = ObjectPrefixCapitalizeKeys(
      'edit',
      IconButtonS6.buildWidgetElems({ upElem: selectItem, upSelector: '>' })
    )
    
    return {
      selectItem,
      ...buttonElems,
      meterBox, ...meterElems,
      addBox, ...addElems,
      ...editElems,
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
    export const base: WidgetStyle = [
      ButtonS6.Parts.base,
      { add: SvgIconS6.Parts.base },
      SelectMeterS6.Parts.base,
      { edit: ButtonS6.Parts.base },
      {
        selectItem: {
          pos: 'rel',
          w: 300, hMin: 80, h: 'ct', '--br': '20px', r: 'var(--br)',
          ...flexC,
          overflow: 'hidden',
        },
        
        
        button: {
          ...abs, p: [20, 26], ...flexC, g: 10,
        },
        
        add: {
          box: {
            placeSelf: 'center',
            sz: 44, r: 10, p: 2, ...flexC,
          },
        },
        
        meterBox: {
          ...abs, ...col, p: [6, 16],
        },
        
        edit: {
          button: {
            pos: 'abs', a: [0, 0], sz: 40, r: 'var(--br)', p: 11,
            ...flexC,
            overflow: 'hidden',
          },
        },
        
        selected: {
          border: {
            bd: '2px solid #444444',
          },
        },
      },
    ]
    
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
                selectItem: { w: 'full' },
              }]
            }
          }
        }
        
        export const baseColor: AppWidgetStyle = t => ({
        
        })
        export namespace Color {
          // type: filled, color: normal
          export const normal: AppWidgetStyle = t => [
            baseColor,
            RippleS6.S.onFilled.round.full.normal,
            { add: SvgIconS6.S.icon.icon.auto.normal },
            SelectMeterS6.S.row.round.md.normal,
            { edit: RippleS6.Parts.base },
            { edit: SvgIconS6.S.icon.icon.auto.normal },
            {
              buttonBgColor: t.boxNormal.bg2[0],
              selected: {
                borderBdColor: t.boxNormal.ct1b[0],
              },
            },
          ]
        }
      }
      
    }
  }
  
  export const S = combinePartsToTypeShapeSizeColor(Parts)
  
}


