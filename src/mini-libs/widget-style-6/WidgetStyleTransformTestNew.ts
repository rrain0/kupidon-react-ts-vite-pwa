import { StringU } from '@utils/common/StringU.ts'
import { transform1 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform1.ts'
import { transformNew1 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransformNew1.ts'
import {
  WidgetMultiAnyTransformer, WidgetElem, WidgetProp,
} from 'src/mini-libs/widget-style-6/WidgetEntity.ts'
import {
  transform2,
} from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform2.ts'
import { transform3 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform3.ts'
import { transform4 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform4.ts'
import { transform5 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform5.ts'
import { transform6 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform6.ts'
import { transform7 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform7.ts'
import {
  transformWidgetStyle, Widget,
} from 'src/mini-libs/widget-style-6/Widget.ts'
import {
  CommonProps, CommonStates,
} from 'src/mini-libs/widget-style-6/WidgetCommonEntities.ts'
import { WidgetStyleWithProps } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { Light } from 'src/ui-data/theme/themes/Light.tsx'
import { BottomSheetBasicS6 } from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetBasicS6.ts'






/*
 States order to select in CSS:
   normal - no selector
   checked / selected - :checked / :selected
   focus - :focus
   focusVisible - :focus-visible
   hover - :hover
   active - :active - applied to button during press
   readOnly - :read-only
   disabled - :disabled
   error - [error]
 */



export namespace WidgetStyle6NewTest {
  
  import camelCaseToWords = StringU.camelCaseToWords
  const elemFrame = WidgetElem.of({
    className: 'rruiFrame',
    props: { colorAccent: WidgetProp.ofName('--color-accent') },
  })
  const elemInput = WidgetElem.of({
    upElem: elemFrame, upSelector: '>', className: 'rruiInput',
  })
  const elemBox = WidgetElem.of({
    upElem: elemFrame, upSelector: '>', className: 'rruiBox',
  })
  
  export const WidgetElements = {
    frame: elemFrame,
    input: elemInput,
    box: elemBox,
  }
  
  
  const radioWidgetState = WidgetMultiAnyTransformer.of({
    title: 'widgetHover',
    transform: () => [[elemInput, CommonStates.radio]],
  })
  const typeWidgetState =  WidgetMultiAnyTransformer.of({
    title: 'widgetType',
    values: CommonStates.type.values,
    transform: () => [[elemInput, CommonStates.type]],
  })
  const hoverWidgetState = WidgetMultiAnyTransformer.of({
    title: 'widgetHover',
    transform: () => [[elemFrame, CommonStates.hover]],
  })
  const inFocusWidgetState = WidgetMultiAnyTransformer.of({
    title: 'widgetHover',
    transform: () => [[elemFrame, CommonStates.hover], [elemInput, CommonStates.focusVisible]],
  })
  
  export const WidgetStates = {
    radio: radioWidgetState,
    type: typeWidgetState,
    hover: hoverWidgetState,
    inFocus: inFocusWidgetState,
  }
  
  export type InputWidgetStyleProps = {
    mode: 'light' | 'dark'
    sz: 'md' | 'lg'
  }
  
  export const inputWidgetStyleProps: InputWidgetStyleProps = {
    mode: 'dark',
    sz: 'lg',
  }
  
  export const inputWidgetStyle: WidgetStyleWithProps<InputWidgetStyleProps> = [
    {
      box: {
        after: {
          content: 'unset',
          bg: 'orange',
        },
        r: 20,
      },
      r: 14,
      boxP: [8, 16],
    },
    t => ({ boxM: t.sz === 'md' ? [8, 16] : t.sz === 'lg' ? [16, 32] : undefined }),
    {
      boxAbs: 0,
      input: { '-webkit-tap-highlight-color': 'transparent' },
      hoverTypeRadioBg: 'white',
      frameHoverAfterBg: 'aqua',
      frameTypeCheckboxBoxSz: '40%',
      inputErrorBoxInFocusBg: 'indianred',
      frameRadioBoxHoverFocusBg: 'aquamarine',
      typeRadioBox: {
        bg: 'black',
        sz: 100,
      },
      type: {
        checkboxBox: {
          bg: 'red',
          sz: 200,
        },
        radioBox: {
          backgroundImage: 'linear-gradient(to bottom, green, yellow)',
          sz: 'full',
        },
      },
    },
  ]
  
  
  const widgetStyle = inputWidgetStyle
  const widgetStyleProps = inputWidgetStyleProps
  const widgetProps = { }
  const widgetStates = WidgetStates
  const widgetElements = WidgetElements
  
  // const widgetStyle = bottomSheetS
  // const widgetStyleProps = Light
  // const widgetProps = BottomSheetBasicS6.W.props
  // const widgetStates = BottomSheetBasicS6.W.states
  // const widgetElements = BottomSheetBasicS6.W.els
  
  
  
  
  // TODO Style - Idea 1 - multivalues
  const styleIdea1 = [
    {
      selected: {
        buttonOutline: '3px solid #AD28CE',
        buttonOutlineOffset: '3px',
      },
    },
    {
      selected: {
        buttonOutline: ['3px solid #AD28CE', { offset: 3 }],
      },
    },
    {
      selected: {
        buttonOutline: [3, 'solid', '#AD28CE', { offset: 3 }],
      },
    },
  ]
  
  // TODO Style - Idea 1 - add to array
  const styleIdea2 = [
    {
      buttonTransition: ['background-color 200ms linear'],
    },
    {
      // <prop-name>+ - добавит к свойству значения
      'buttonTransition+': ['opacity 200ms linear'],
    },
  ]
  
  
  
  export function testTransformSimple() {
    const style = {
      // bd: 'orange',
      // wMin: 8,
      //randomProp: 'random',
      // gridRandomProp: true,
      // background: {
      //   position: 'absolute',
      //   color: 'white',
      // },
      hover: {
        bdColor: 'orange',
        color: 'orange',
        active: {
          randomProp: 'green',
          wMin: 20,
        },
        randomState: {
          prop: 'eee',
          prop2: 'aaaa',
        },
      },
      // focus: {
      //   bdColor: 'orange',
      //   visible: {
      //     bg: 'orange',
      //     wMin: 20,
      //   },
      //   wMin: 10,
      //   bg: 'red',
      // },
    }
    const transformedNew1 = transformNew1(
      style, undefined, [
        CommonProps, undefined, CommonStates, undefined,
        undefined, undefined, undefined, undefined,
      ]
    )
    console.log('transformedNew1', transformedNew1)
  }
  
  
  export function testTransform() {
    console.log('widgetStyle', widgetStyle)
    
    /*
    console.time('transform')
    transform7(transform6(transform5(transform4(transform3(transform2(
      transform1(inputWidgetStyle),
      [CommonProps, { ...WidgetStates, ...WidgetElements }, undefined, undefined, undefined],
    ))))))
    // 1.7ms is OK
    // 2.6ms - after supporting of array styles
    console.timeEnd('transform')
     */
    
    const transformed1 = transform1(widgetStyle, widgetStyleProps)
    console.log('transformed1', transformed1)
    
    const transformed2 = transform2(
      transformed1,
      [
        CommonProps,
        undefined,
        CommonStates,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ]
    )
    console.log('transformed2', transformed2)
    
    const transformed3 = transform3(transformed2)
    console.log('transformed3', transformed3)
    
    const transformed4 = transform4(transformed3)
    console.log('transformed4', transformed4)
    
    const transformed5 = transform5(transformed4)
    console.log('transformed5', transformed5)
    
    const transformed6 = transform6(transformed5)
    console.log('transformed6', transformed6)
    
    const transformed7 = transform7(transformed6)
    console.log('transformed7', '\n', transformed7)
  }
  
  
  export function testWidget() {
    const inputWidget = Widget.of({
      rootElem: WidgetElements.frame,
      elems: WidgetElements,
      states: WidgetStates,
    })
    
    const css = transformWidgetStyle(inputWidget, inputWidgetStyleProps, inputWidgetStyle)
    console.log('widget css', '\n',  css)
    /*
&.rruiFrame>.rruiBox {
padding: 8px 16px;
margin: 16px 32px;
top: 0px;
right: 0px;
bottom: 0px;
left: 0px;
}
&.rruiFrame>.rruiInput {
-webkit-tap-highlight-color: transparent;
}
&.rruiFrame>.rruiBox::after {
background: orange;
}
@media (hover: hover) and (pointer: fine) {
&.rruiFrame:hover>.rruiInput[type=radio] {
background: white;
}}
@media (hover: hover) and (pointer: fine) {
&.rruiFrame:hover::after {
background: aqua;
}}
&.rruiFrame[type=checkbox]>.rruiBox {
width: 40%;
height: 40%;
}
@media (hover: hover) and (pointer: fine) {
&.rruiFrame:has(>.rruiInput[data-error])>.rruiBox:hover {
background: indianred;
}}
&.rruiFrame:has(>.rruiInput[data-error])>.rruiBox:focus-visible {
background: indianred;
}
@media (hover: hover) and (pointer: fine) {
&.rruiFrame[type=radio]>.rruiBox:hover:focus {
background: aquamarine;
}}
&.rruiFrame:has(>.rruiInput[type=radio])>.rruiBox {
background: black;
width: 100%;
height: 100%;
}
&.rruiFrame:has(>.rruiInput[type=checkbox])>.rruiBox {
background: red;
width: 200px;
height: 200px;
}
&.rruiFrame:has(>.rruiInput[type=radio])>.rruiBox {
background-image: linear-gradient(to bottom, green, yellow);
}
     */
  }
  
  
}




