import {
  AdditionalStates,
  WidgetAttrs,
  WidgetProps,
  WidgetPseudos, AdditionalProps,
} from 'src/mini-libs/widget-style-6/WidgetEntities.ts'




export const CommonProps = (() => {
  const props = {
    width: WidgetProps.width,
    height: WidgetProps.height,
    minWidth: WidgetProps.minWidth,
    minHeight: WidgetProps.minHeight,
    maxWidth: WidgetProps.maxWidth,
    maxHeight: WidgetProps.maxHeight,
    size: AdditionalProps.size,
    minSize: AdditionalProps.minSize,
    maxSize: AdditionalProps.maxSize,
    aspectRation: WidgetProps.aspectRatio,
    w: WidgetProps.width,
    h: WidgetProps.height,
    wMin: WidgetProps.minWidth,
    hMin: WidgetProps.minHeight,
    wMax: WidgetProps.maxWidth,
    hMax: WidgetProps.maxHeight,
    sz: AdditionalProps.size,
    szMin: AdditionalProps.minSize,
    szMax: AdditionalProps.maxSize,
    ratio: WidgetProps.aspectRatio,
    asr: WidgetProps.aspectRatio,
    
    margin: AdditionalProps.margin,
    marginTop: WidgetProps.marginTop,
    marginRight: WidgetProps.marginRight,
    marginBottom: WidgetProps.marginBottom,
    marginLeft: WidgetProps.marginLeft,
    m: AdditionalProps.margin,
    mt: WidgetProps.marginTop,
    mr: WidgetProps.marginRight,
    mb: WidgetProps.marginBottom,
    ml: WidgetProps.marginLeft,
    mh: AdditionalProps.mh,
    mv: AdditionalProps.mv,
    
    padding: AdditionalProps.padding,
    paddingTop: WidgetProps.paddingTop,
    paddingRight: WidgetProps.paddingRight,
    paddingBottom: WidgetProps.paddingBottom,
    paddingLeft: WidgetProps.paddingLeft,
    p: AdditionalProps.padding,
    pt: WidgetProps.paddingTop,
    pr: WidgetProps.paddingRight,
    pb: WidgetProps.paddingBottom,
    pl: WidgetProps.paddingLeft,
    ph: AdditionalProps.ph,
    pv: AdditionalProps.pv,
    
    gap: WidgetProps.gap,
    g: WidgetProps.gap,
    
    position: WidgetProps.position,
    top: WidgetProps.top,
    right: WidgetProps.right,
    bottom: WidgetProps.bottom,
    left: WidgetProps.left,
    zIndex: WidgetProps.zIndex,
    pos: WidgetProps.position,
    abs: AdditionalProps.abs,
    absT: WidgetProps.top,
    absR: WidgetProps.right,
    absB: WidgetProps.bottom,
    absL: WidgetProps.left,
    absH: AdditionalProps.absH,
    absV: AdditionalProps.absV,
    a: AdditionalProps.abs,
    at: WidgetProps.top,
    ar: WidgetProps.right,
    ab: WidgetProps.bottom,
    al: WidgetProps.left,
    ah: AdditionalProps.absH,
    av: AdditionalProps.absV,
    z: WidgetProps.zIndex,
    
    color: AdditionalProps.colorAndVarColor,
    
    background: WidgetProps.background,
    backgroundColor: WidgetProps.backgroundColor,
    backgroundImage: WidgetProps.backgroundImage,
    backgroundPosition: WidgetProps.backgroundPosition,
    backgroundSize: WidgetProps.backgroundSize,
    bg: WidgetProps.background,
    bgColor: WidgetProps.backgroundColor,
    bgIm: WidgetProps.backgroundImage,
    bgPos: WidgetProps.backgroundPosition,
    bgSz: WidgetProps.backgroundSize,
    
    border: WidgetProps.border,
    borderWidth: WidgetProps.borderWidth,
    borderStyle: WidgetProps.borderStyle,
    borderColor: WidgetProps.borderColor,
    borderRadius: WidgetProps.borderRadius,
    bd: WidgetProps.border,
    bdWidth: WidgetProps.borderWidth,
    bdStyle: WidgetProps.borderStyle,
    bdColor: WidgetProps.borderColor,
    radius: WidgetProps.borderRadius,
    r: WidgetProps.borderRadius,
    
    outline: WidgetProps.outline,
    boxShadow: WidgetProps.boxShadow,
    
    gridTemplateRows: WidgetProps.gridTemplateRows,
    gridTemplateColumns: WidgetProps.gridTemplateColumns,
    gridTemplateAreas: WidgetProps.gridTemplateAreas,
    gridAutoRows: WidgetProps.gridAutoRows,
    gridAutoColumns: WidgetProps.gridAutoColumns,
    gridAutoFlow: WidgetProps.gridAutoFlow,
    gridArea: WidgetProps.gridArea,
    rows: WidgetProps.gridTemplateRows,
    cols: WidgetProps.gridTemplateColumns,
    areas: WidgetProps.gridTemplateAreas,
    autoRows: WidgetProps.gridAutoRows,
    autoCols: WidgetProps.gridAutoColumns,
    autoFlow: WidgetProps.gridAutoFlow,
    area: WidgetProps.gridArea,
    
    pointerEvents: WidgetProps.pointerEvents,
    pointer: WidgetProps.pointerEvents,
    content: WidgetProps.content,
  }
  const sortedProps = Object.entries(props)
    .sort((([propA], [propB]) => propB.length - propA.length))
    .reduce((acc, curr) => { acc[curr[0]] = curr[1]; return acc }, { } as typeof props)
  return sortedProps
})()



/*
 STATE ORDER (in CSS):
 normal
 checked / selected
 hover
 active
 focus
 focusVisible
 readOnly
 disabled
 locked - это короткий disabled (используется disabled + locked),
          например во время layout transition.
          Здесь кнопку нельзя нажать, но выглядит она как обычно.
 error
 */

export const CommonStates = (() => {
  const states = {
    before: AdditionalStates.before,
    after: AdditionalStates.after,
    
    type: WidgetAttrs.type,
    radio: AdditionalStates.radio,
    checkbox: AdditionalStates.checkbox,
    
    // States
    checked: WidgetPseudos.checked,
    selected: WidgetPseudos.selected,
    // hoverable AND hover
    hover: AdditionalStates.hoverableHover,
    active: WidgetPseudos.active,
    focus: WidgetPseudos.focus,
    focusVisible: WidgetPseudos.focusVisible,
    // hoverable hover OR focusVisible
    inFocus: AdditionalStates.inFocus,
    readOnly: WidgetPseudos.readOnly,
    disabled: WidgetPseudos.disabled,
    error: WidgetAttrs.dataError,
  }
  const sortedProps = Object.entries(states)
    .sort((([propA], [propB]) => propB.length - propA.length))
    .reduce((acc, curr) => { acc[curr[0]] = curr[1]; return acc }, { } as typeof states)
  return sortedProps
})()


