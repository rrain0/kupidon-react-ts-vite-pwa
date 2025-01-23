import {
  ElemTransformer1,
  WidgetStyle,
  transform1, MultiWidgetTransformer1,
} from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform1.ts'
import { transform2 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform2.ts'
import { transform3 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform3.ts'
import { transform4 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform4.ts'
import { transform5 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform5.ts'
import { transform6 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform6.ts'
import {
  CommonProps,
  CommonStates,
  transformWidgetStyle,
  Widget,
} from 'src/mini-libs/widget-style-6/Widget.ts'









export namespace WidgetStyle6Test {
  
  const elemFrame: ElemTransformer1 = {
    className: 'rruiFrame', type: 'elem', isAtomic: true,
    states: CommonStates,
  }
  const elemInput: ElemTransformer1 = {
    className: 'rruiInput', type: 'elem', isAtomic: true,
    states: CommonStates,
    upSelector: '>', upElem: elemFrame,
  }
  const elemBox: ElemTransformer1 = {
    className: 'rruiBox', type: 'elem', isAtomic: true,
    states: CommonStates,
    upSelector: '>', upElem: elemFrame,
  }
  const WidgetElements = {
    frame: elemFrame,
    input: elemInput,
    box: elemBox,
  }
  
  const radioWidgetState: MultiWidgetTransformer1 = {
    name: 'widgetHover', type: 'widget', isAtomic: false,
    transform: () => [[elemInput, CommonStates.radio]],
  }
  const typeWidgetState: MultiWidgetTransformer1 = {
    name: 'widgetType', type: 'widget', isAtomic: false,
    values: CommonStates.type.values,
    transform: () => [
      [elemInput, CommonStates.type],
    ],
  }
  const hoverWidgetState: MultiWidgetTransformer1 = {
    name: 'widgetHover', type: 'widget', isAtomic: false,
    transform: () => [[elemFrame, CommonStates.hover]],
  }
  const inFocusWidgetState: MultiWidgetTransformer1 = {
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
  export const inputWidgetStyle: WidgetStyle = {
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
        bg: 'green',
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
    const inputWidget: Widget = {
      rootElem: InputWidgetElements.frame,
      elems: InputWidgetElements,
    }
    
    const css = transformWidgetStyle(inputWidget, inputWidgetStyle)
    console.log('widget css', '\n',  css)
  }
  
  
}




