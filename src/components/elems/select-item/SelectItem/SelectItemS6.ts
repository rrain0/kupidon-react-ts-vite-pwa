import { ObjectU } from '@utils/common/ObjectU.ts'
import { AttachRootElemParams, Widget, WidgetState } from '@libs/widget-style-6/Widget.ts'
import { AdditionalStates } from '@libs/widget-style-6/WidgetEntities.ts'
import { WidgetElem } from '@libs/widget-style-6/WidgetEntity.ts'
import {
  AppStyle,
  AppWidgetStyle, combinePartsToTypeShapeSizeColor,
  WidgetStyle,
} from '@libs/widget-style-6/WidgetStyle.ts'
import { ButtonS6 } from 'src/components/elems/buttons/Button/ButtonS6.ts'
import { IconButtonS6 } from 'src/components/elems/buttons/IconButton/IconButtonS6.ts'
import { SvgIconS6 } from 'src/components/elems/icons/SvgIcons/SvgIconS6.ts'
import { SelectMeterS6 } from 'src/components/elems/select-item/SelectMeter/SelectMeterS6.ts'
import { WidgetStyleCommon } from 'src/styles/common/WidgetStyleCommon.ts'
import flexC = WidgetStyleCommon.flexC
import absTrbl = WidgetStyleCommon.absTrbl
import col = WidgetStyleCommon.col
import Txt = WidgetStyleCommon.Txt
import ObjectPrefixCapitalizeKeys = ObjectU.ObjectPrefixCapitalizeKeys




export namespace SelectItemS6 {
  
  
  export function buildWidgetElems(up?: AttachRootElemParams) {
    const selectItem = WidgetElem.of({
      className: 'rruiSelectItemFrame', ...up,
      states: { 
        selected: AdditionalStates.selected,
      },
    })
    
    const buttonElems = ButtonS6.buildWidgetElems({
      upElem: selectItem, upSelector: '>',
    })
    
    const meterBox = WidgetElem.of({
      upElem: selectItem, upSelector: '>', className: 'rruiMeterBox',
    })
    const meterElems = SelectMeterS6.buildWidgetElems({
      upElem: meterBox, upSelector: '>',
    })
    
    const addBox = WidgetElem.of({
      upElem: buttonElems.button, upSelector: '>', className: 'rruiAddIconBox',
    })
    const addElems = ObjectPrefixCapitalizeKeys('add', SvgIconS6.buildWidgetElems({
      upElem: addBox, upSelector: '>',
    }))
    
    // TODO Style - make WidgetElem to become Widget
    // TODO Style - make widget builders with its elems, states & props
    // Element consumes underlying button WIDGET state
    const editBox = WidgetElem.of({
      upElem: selectItem, upSelector: '>', className: 'rruiEditButtonBox',
    })
    const edit = WidgetElem.of({
      upElem: editBox, upSelector: '', className: '',
    })
    // TODO Style - edit widget states - include them in elements build function
    const _editElems = IconButtonS6.buildWidgetElems({
      upElem: edit, upSelector: '>',
    })
    const editElems = ObjectPrefixCapitalizeKeys('edit', _editElems)
    const _editStates = IconButtonS6.buildWidgetStates(_editElems)
    // @ts-ignore // TODO Style
    ;(edit.states as any) = _editStates
    
    return {
      selectItem,
      ...buttonElems,
      meterBox, ...meterElems,
      addBox, ...addElems,
      editBox, edit, ...editElems,
    } as const
  }
  
  export function buildWidgetStates(elems: ReturnType<typeof buildWidgetElems>) {
    return {
      ...ButtonS6.buildWidgetStates(elems),
      selected: WidgetState.of([elems.selectItem, elems.selectItem.ss!.selected]),
    } as const
  }
  
  const WidgetElems = buildWidgetElems()
  const WidgetStates = buildWidgetStates(WidgetElems)
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
      { edit: IconButtonS6.Parts.base },
      {
        selectItem: {
          pos: 'rel',
          w: 300, hMin: 80, h: 'ct', '--br': '20px', r: 'var(--br)',
          ...flexC,
          overflow: 'hidden',
        },
        
        
        button: {
          ...absTrbl, p: [20, 26], ...flexC, g: 10, r: 'inherit',
          ...Txt.s16LhNorm,
        },
        
        add: {
          box: {
            placeSelf: 'center',
            sz: 44, r: 10, p: 2, ...flexC,
          },
        },
        
        meterBox: {
          ...absTrbl, ...col, p: [6, 16], pointer: false,
        },
        
        edit: {
          box: {
            pos: 'abs', a: [0, 0, null, null], sz: 40, r: 'var(--br)',
            overflow: 'hidden',
          },
          button: {
            ...absTrbl, p: 11, ...flexC,
            overflow: 'hidden',
          },
        },
        
        selected: {
          bord: {
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
        
        export const baseColor: AppWidgetStyle = t => ({ })
        export namespace Color {
          // type: filled, color: normal
          export const normal: AppWidgetStyle = t => [
            baseColor,
            ButtonS6.Parts.Type.filled.Color.normal,
            { add: SvgIconS6.Parts.Type.icon.Color.normal },
            SelectMeterS6.Parts.Type.row.Color.normal,
            { edit: IconButtonS6.Parts.Type.trans.Color.secondary },
            {
              buttonColor: t.boxDefault3.ct,
              buttonBgColor: t.boxDefault3.bg,
              editIconColor: t.boxDefault4.ct,
              inFocus: {
                buttonColor: t.boxDefault2.ct,
                buttonBgColor: t.boxDefault2.cta,
              },
              selected: {
                bordBdColor: t.boxDefault4.ct,
              },
            },
          ]
        }
      }
      
    }
  }
  
  export const S = combinePartsToTypeShapeSizeColor(Parts)
  
}


