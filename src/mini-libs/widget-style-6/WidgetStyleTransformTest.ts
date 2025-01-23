import {
  WidgetStyle,
  transform1, WidgetMultiAnyTransformer, newWidgetElem,
} from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform1.ts'
import { transform2 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform2.ts'
import { transform3 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform3.ts'
import { transform4 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform4.ts'
import { transform5 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform5.ts'
import { transform6 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform6.ts'
import {
  CommonProps,
  CommonStates, newWidget,
  transformWidgetStyle,
} from 'src/mini-libs/widget-style-6/Widget.ts'






/*
 States order to select in CSS:
   normal - no selector
   checked / selected - :checked / :selected
   hover - :hover
   active - :active
   focus - :focus
   focusVisible - :focus-visible
   readOnly - :read-only
   disabled - :disabled
   error - [error]
 */



export namespace WidgetStyle6Test {
  
  const elemFrame = newWidgetElem({
    className: 'rruiFrame',
    states: CommonStates,
  })
  const elemInput = newWidgetElem({
    className: 'rruiInput',
    upSelector: '>', upElem: elemFrame,
    states: CommonStates,
  })
  const elemBox = newWidgetElem({
    className: 'rruiBox',
    upSelector: '>', upElem: elemFrame,
    states: CommonStates,
  })
  const WidgetElements = {
    frame: elemFrame,
    input: elemInput,
    box: elemBox,
  }
  
  const radioWidgetState: WidgetMultiAnyTransformer = {
    name: 'widgetHover', type: 'widget', isAtomic: false,
    transform: () => [[elemInput, CommonStates.radio]],
  }
  const typeWidgetState: WidgetMultiAnyTransformer = {
    name: 'widgetType', type: 'widget', isAtomic: false,
    values: CommonStates.type.values,
    transform: () => [
      [elemInput, CommonStates.type],
    ],
  }
  const hoverWidgetState: WidgetMultiAnyTransformer = {
    name: 'widgetHover', type: 'widget', isAtomic: false,
    transform: () => [[elemFrame, CommonStates.hover]],
  }
  const inFocusWidgetState: WidgetMultiAnyTransformer = {
    name: 'widgetHover', type: 'widget', isAtomic: false,
    transform: () => [[elemFrame, CommonStates.hover], [elemInput, CommonStates.focusVisible]],
  }
  const WidgetStates = {
    radio: radioWidgetState,
    type: typeWidgetState,
    hover: hoverWidgetState,
    inFocus: inFocusWidgetState,
  }
  
  export const InputWidgetElements = { ...WidgetStates, ...WidgetElements }
  
  
  
  export const inputWidgetStyle: WidgetStyle = {
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
  }
  
  
  export function testTransform() {
    console.log('widgetStyle', inputWidgetStyle)
    
    /*
     console.time('transform')
     transform6(transform5(transform4(transform3(transform2(transform1(
       widgetStyle,
       [CommonProps2, Elements2, undefined, undefined, undefined]
     ))))))
     // 1.7ms is OK
     console.timeEnd('transform')
     */
    
    const transformed1 = transform1(
      inputWidgetStyle,
      [CommonProps, InputWidgetElements, undefined, undefined, undefined]
    )
    console.log('transformed1', transformed1)
    
    const transformed2 = transform2(transformed1)
    console.log('transformed2', transformed2)
    
    const transformed3 = transform3(transformed2)
    console.log('transformed3', transformed3)
    
    const transformed4 = transform4(transformed3)
    console.log('transformed4', transformed4)
    
    const transformed5 = transform5(transformed4)
    console.log('transformed5', transformed5)
    
    const transformed6 = transform6(transformed5)
    console.log('transformed6', '\n', transformed6)
  }
  
  
  export function testWidget() {
    const inputWidget = newWidget(InputWidgetElements.frame, InputWidgetElements)
    
    const css = transformWidgetStyle(inputWidget, inputWidgetStyle)
    console.log('widget css', '\n',  css)
    /*
     widget css
     .rruiFrame>.rruiInput {
     -webkit-tap-highlight-color: transparent;
     }
     @media (hover: hover) and (pointer: fine) {
     .rruiFrame:hover>.rruiInput[type=radio] {
     background: white;
     }}
     @media (hover: hover) and (pointer: fine) {
     .rruiFrame:hover::after {
     background: aqua;
     }}
     .rruiFrame[type=checkbox]>.rruiBox {
     width: 40%;
     height: 40%;
     }
     @media (hover: hover) and (pointer: fine) {
     .rruiFrame:has(>.rruiInput[data-error])>.rruiBox:hover {
     background: indianred;
     }}
     .rruiFrame:has(>.rruiInput[data-error])>.rruiBox:focus-visible {
     background: indianred;
     }
     @media (hover: hover) and (pointer: fine) {
     .rruiFrame[type=radio]>.rruiBox:hover:focus {
     background: aquamarine;
     }}
     .rruiFrame:has(>.rruiInput[type=radio])>.rruiBox {
     background: black;
     width: 100px;
     height: 100px;
     }
     .rruiFrame:has(>.rruiInput[type=checkbox])>.rruiBox {
     background: red;
     width: 200px;
     height: 200px;
     }
     .rruiFrame:has(>.rruiInput[type=radio])>.rruiBox {
     background-image: linear-gradient(to bottom, green, yellow);
     width: 100%;
     height: 100%;
     }
     */
  }
  
  
}




