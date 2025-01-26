import {
  WidgetAttrs,
  WidgetComplexTransformers, WidgetMultiPropTransformer, WidgetProp,
  WidgetProps, WidgetPropValue, WidgetPseudoElements, WidgetPseudos,
} from 'src/mini-libs/widget-style-6/WidgetEntities.ts'


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
    
    color: WidgetProps.color,
    background: WidgetProps.background,
    backgroundColor: WidgetProps.backgroundColor,
    backgroundImage: WidgetProps.backgroundImage,
    backgroundPosition: WidgetProps.backgroundPosition,
    backgroundSize: WidgetProps.backgroundSize,
    border: WidgetProps.border,
    borderRadius: WidgetProps.borderRadius,
    outline: WidgetProps.outline,
    boxShadow: WidgetProps.boxShadow,
    
    bg: WidgetProps.background,
    bgColor: WidgetProps.backgroundColor,
    bgIm: WidgetProps.backgroundImage,
    bgPos: WidgetProps.backgroundPosition,
    bgSz: WidgetProps.backgroundSize,
    bd: WidgetProps.border,
    radius: WidgetProps.borderRadius,
    r: WidgetProps.borderRadius,
  }
  const sortedProps = Object.entries(props)
    .sort((([propA], [propB]) => propB.length - propA.length))
    .reduce((acc, curr) => { acc[curr[0]] = curr[1]; return acc }, { } as typeof props)
  return sortedProps
})()


export const CommonStates = (() => {
  const states = {
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
  const sortedProps = Object.entries(states)
    .sort((([propA], [propB]) => propB.length - propA.length))
    .reduce((acc, curr) => { acc[curr[0]] = curr[1]; return acc }, { } as typeof states)
  return sortedProps
})()



export namespace AdditionalProps {
  // --color: value;
  export const varColor = WidgetProp.ofName('--color')
  // color: value; --color: value;
  export const colorAndVarColor = WidgetMultiPropTransformer.of({
    transform: value => [
      [WidgetProps.color, WidgetPropValue.of(value)],
      [AdditionalProps.varColor, WidgetPropValue.of(value)],
    ],
  })
}


