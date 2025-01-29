import { WidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'


export namespace WidgetStyleCommon {
  
  export const contents: WidgetStyle = { display: 'contents' }
  export const abs: WidgetStyle = { pos: 'abs', a: 0 }
  export const fixed: WidgetStyle = { pos: 'fixed', a: 0 }
  export const fixedTop: WidgetStyle = { pos: 'fixed', at: 0, ah: 0 }
  export const fixedBottom: WidgetStyle = { pos: 'fixed', ab: 0, ah: 0 }
  export const round: WidgetStyle = { r: '999999px' }
  
  
  export const row: WidgetStyle = { display: 'flex', flexFlow: 'row nowrap' }
  export const rowC: WidgetStyle = { display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }
  export const rowWrap: WidgetStyle = { display: 'flex', flexFlow: 'row wrap' }
  
  
  export const noPointer: WidgetStyle = { pointerEvents: 'none' }
  export const noBorderOutlineBoxShadow: WidgetStyle = {
    bd: null,
    outline: null,
    boxShadow: null,
  }
  
  
  export const reset = (() => {
    const reset: WidgetStyle = {
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
  
  export const resetButton: WidgetStyle = {
    ...reset,
    cursor: 'pointer',
    hover: noBorderOutlineBoxShadow,
    active: noBorderOutlineBoxShadow,
    focus: noBorderOutlineBoxShadow,
    focusVisible: noBorderOutlineBoxShadow,
    disabled: { cursor: 'not-allowed' },
  }
  
  
  
  
  export namespace Txt {
    
    export const lg18: WidgetStyle = {
      fontWeight: '400',
      fontSize: '18px',
      lineHeight: 'normal',
      letterSpacing: 'normal',
    }
    export const lg18lh150: WidgetStyle = {
      fontWeight: '400',
      fontSize: '18px',
      lineHeight: '150%',
      letterSpacing: '0.05em',
    }
    
    
    export const lg16b: WidgetStyle = {
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: 'normal',
      letterSpacing: 'normal',
    }
    
    
    export const md16: WidgetStyle = {
      fontWeight: '300',
      fontSize: '16px',
      lineHeight: '129%',
      letterSpacing: 'normal',
    }
    
    
    
    export const md14: WidgetStyle = {
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '129%',
      letterSpacing: '0.05em',
    }
    export const md14bold: WidgetStyle = {
      fontWeight: '600',
      fontSize: '14px',
      lineHeight: '129%',
      letterSpacing: '0.05em',
    }
    
    
    
    export const md15thin: WidgetStyle = {
      fontWeight: '300',
      fontSize: '15px',
      lineHeight: '129%',
      letterSpacing: 'normal',
    }
    
  }
}

