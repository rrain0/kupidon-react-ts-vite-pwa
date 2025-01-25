import { TypeU } from '@util/common/TypeU.ts'
import {
  WidgetElem,
  WidgetStyle,
  transform1,
  WidgetAttrs,
  WidgetComplexTransformers,
  WidgetPseudos,
  WidgetProps,
  WidgetPseudoElements, WidgetMultiAnyTransformer, WidgetAnyPropTransformer,
} from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform1.ts'
import { transform2 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform2.ts'
import { transform3 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform3.ts'
import { transform4 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform4.ts'
import { transform5 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform5.ts'
import { transform6 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform6.ts'
import RecordRo = TypeU.RecordRo




export const CommonProps = (() => {
  const props = {
    width: WidgetProps.width,
    height: WidgetProps.height,
    minWidth: WidgetProps.minWidth,
    minHeight: WidgetProps.minHeight,
    maxWidth: WidgetProps.maxWidth,
    maxHeight: WidgetProps.maxHeight,
    size: WidgetComplexTransformers.size,
    
    w: WidgetProps.width,
    h: WidgetProps.height,
    wMin: WidgetProps.minWidth,
    hMin: WidgetProps.minHeight,
    wMax: WidgetProps.maxWidth,
    hMax: WidgetProps.maxHeight,
    sz: WidgetComplexTransformers.size,
    
    margin: WidgetProps.margin,
    m: WidgetProps.margin,
    
    padding: WidgetProps.padding,
    paddingTop: WidgetProps.paddingTop,
    paddingRight: WidgetProps.paddingRight,
    paddingBottom: WidgetProps.paddingBottom,
    paddingLeft: WidgetProps.paddingLeft,
    p: WidgetProps.padding,
    pt: WidgetProps.paddingTop,
    pr: WidgetProps.paddingRight,
    pb: WidgetProps.paddingBottom,
    pl: WidgetProps.paddingLeft,
    ph: WidgetComplexTransformers.ph,
    pv: WidgetComplexTransformers.pv,
    
    gap: WidgetProps.gap,
    g: WidgetProps.gap,
    
    position: WidgetProps.position,
    top: WidgetProps.top,
    right: WidgetProps.right,
    bottom: WidgetProps.bottom,
    left: WidgetProps.left,
    
    pos: WidgetProps.position,
    abs: WidgetComplexTransformers.abs,
    absT: WidgetProps.top,
    absR: WidgetProps.right,
    absB: WidgetProps.bottom,
    absL: WidgetProps.left,
    absH: WidgetComplexTransformers.absH,
    absV: WidgetComplexTransformers.absV,
    a: WidgetComplexTransformers.abs,
    at: WidgetProps.top,
    ar: WidgetProps.right,
    ab: WidgetProps.bottom,
    al: WidgetProps.left,
    ah: WidgetComplexTransformers.absH,
    av: WidgetComplexTransformers.absV,
    
    background: WidgetProps.background,
    backgroundColor: WidgetProps.backgroundColor,
    border: WidgetProps.border,
    borderRadius: WidgetProps.borderRadius,
    outline: WidgetProps.outline,
    boxShadow: WidgetProps.boxShadow,
    
    bg: WidgetProps.background,
    bgColor: WidgetProps.backgroundColor,
    r: WidgetProps.borderRadius,
  }
  const sortedProps = Object.entries(props)
    .sort((([propA], [propB]) => propB.length - propA.length))
    .reduce((acc, curr) => { acc[curr[0]] = curr[1]; return acc }, { } as typeof props)
  return sortedProps
})()


export const CommonStates = {
  before: WidgetPseudoElements.before,
  after: WidgetPseudoElements.after,
  type: WidgetAttrs.type,
  radio: WidgetComplexTransformers.radio,
  
  // States
  checked: WidgetPseudos.checked,
  selected: WidgetPseudos.selected,
  // hoverable AND hover
  hover: WidgetComplexTransformers.hoverableHover,
  active: WidgetPseudos.active,
  focus: WidgetPseudos.focus,
  focusVisible: WidgetPseudos.focusVisible,
  // hoverable hover OR focusVisible
  inFocus: WidgetComplexTransformers.inFocus,
  readOnly: WidgetPseudos.readOnly,
  disabled: WidgetPseudos.disabled,
  error: WidgetAttrs.error,
}






export class Widget<const out Es extends Record<string, WidgetElem> = any> {
  
  constructor(
    readonly rootElem: WidgetElem,
    readonly elems: Es,
    readonly states?: RecordRo<string, WidgetMultiAnyTransformer> | undefined,
    // Additional CSS prop transformers
    readonly props?: RecordRo<string, WidgetAnyPropTransformer> | undefined,
  ) { }
  
  static of<const Es extends Record<string, WidgetElem> = any>(params: {
    rootElem: WidgetElem,
    elems: Es,
    states?: RecordRo<string, WidgetMultiAnyTransformer> | undefined,
    props?: RecordRo<string, WidgetAnyPropTransformer> | undefined,
  }): Widget<Es> {
    return new Widget(params.rootElem, params.elems, params.states, params.props)
  }
  
  get es() { return this.elems }
  
  // TODO Style - selectThis = true
  t(style: WidgetStyle) {
    return transformWidgetStyle(this, style)
  }
}




export const transformWidgetStyle = (widget: Widget, style: WidgetStyle): string => {
  const css = transform6(transform5(transform4(transform3(transform2(transform1(
    style,
    [
      { ...CommonProps, ...widget.props },
      { ...widget.states, ...widget.elems },
      undefined,
      undefined,
      undefined,
    ]
  ))))))
  return css
}

