import { WidgetStyle } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform1.ts'



export namespace WidgetStyleCommon {
  
  export const contents: WidgetStyle = { display: 'contents' }
  export const abs: WidgetStyle = { pos: 'abs', a: 0 }
  export const fixed: WidgetStyle = { pos: 'fixed', a: 0 }
  export const fixedTop: WidgetStyle = { pos: 'fixed', at: 0, ah: 0 }
  export const fixedBottom: WidgetStyle = { pos: 'fixed', ab: 0, ah: 0 }
  export const round: WidgetStyle = { borderRadius: '999999px' }
  
  
  export const noPointer: WidgetStyle = { pointerEvents: 'none' }
  export const noBorderOutlineBoxShadow: WidgetStyle = {
    border: null,
    outline: null,
    boxShadow: null,
  }
  
  
  export const reset = (() => {
    const reset = {
      //appearance: 'none',
      boxSizing: 'border-box',
      bg: null,
      ...noBorderOutlineBoxShadow,
      m: 0,
      p: 0,
      g: 0,
      '-webkit-tap-highlight-color': 'transparent',
    }
    return {
      ...reset,
      before: reset,
      after: reset,
    }
  })()
  
  export const resetButton = {
    ...reset,
    cursor: 'pointer',
    hover: noBorderOutlineBoxShadow,
    active: noBorderOutlineBoxShadow,
    focus: noBorderOutlineBoxShadow,
    focusVisible: noBorderOutlineBoxShadow,
    disabled: { cursor: 'not-allowed' },
  }
  
}

