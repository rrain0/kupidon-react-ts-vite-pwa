import {
  Attrs1,
  ComplexTransformers1, ElemTransformer1,
  Props1, Pseudos1,
  WidgetStyle,
  transform1, PseudoElements1,
} from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform1.ts'
import { transform2 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform2.ts'
import { transform3 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform3.ts'
import { transform4 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform4.ts'
import { transform5 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform5.ts'
import { transform6 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform6.ts'




export const CommonProps2 = {
  width: Props1.width,
  w: Props1.width,
  height: Props1.height,
  h: Props1.height,
  size: ComplexTransformers1.size,
  sz: ComplexTransformers1.size,
  background: Props1.background,
  bg: Props1.background,
}
export const CommonStates2 = {
  before: PseudoElements1.before,
  after: PseudoElements1.after,
  type: Attrs1.type,
  radio: ComplexTransformers1.radio,
  hover: ComplexTransformers1.hoverableHover,
  focus: Pseudos1.focus,
  focusVisible: Pseudos1.focusVisible,
  inFocus: ComplexTransformers1.inFocus,
}
export const Elements2 = {
  frame: {
    elem: 'rruiFrame', type: 'elem', isAtomic: true,
    states: CommonStates2,
  } satisfies ElemTransformer1,
  box: {
    elem: 'rruiBox', type: 'elem', isAtomic: true,
    states: {
      hover: ComplexTransformers1.hoverableHover,
      focus: Pseudos1.focus,
    },
  } satisfies ElemTransformer1,
}
export const RootElemStates2 = {
  type: Attrs1.type,
  hover: ComplexTransformers1.hoverableHover,
  focus: Pseudos1.focus,
  focusVisible: Pseudos1.focusVisible,
}



export function testWidget51StyleTransform() {
  const widgetStyle: WidgetStyle = {
    hoverTypeRadioBg: 'white',
    frameHoverAfterBg: 'aqua',
    frameTypeCheckboxBoxSz: '40%',
    frameRadioBg: 'indianred',
    frameRadioBoxHoverFocusBg: 'aquamarine',
    typeRadio: {
      bg: 'black',
      sz: 100,
    },
    type: {
      checkbox: {
        bg: 'red',
        sz: 200,
      },
      radio: {
        bg: 'green',
        sz: 'full',
      },
    },
  }
  console.log('widgetStyle', widgetStyle)
  
  /*
  console.time('transform')
  transform6(transform5(transform4(transform3(transform2(transform1(
    widgetStyle,
    [CommonProps2, Elements2, RootElemStates2, undefined, undefined]
  ))))))
  console.timeEnd('transform')
   */
  
  const transformed1 = transform1(
    widgetStyle,
    [CommonProps2, Elements2, RootElemStates2, undefined, undefined]
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
  console.log('transformed6', transformed6)
  
  
}
