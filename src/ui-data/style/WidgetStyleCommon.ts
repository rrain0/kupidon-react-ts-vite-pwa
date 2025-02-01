import { WidgetStyleObj } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'


export namespace WidgetStyleCommon {
  
  export const contents: WidgetStyleObj = { display: 'contents' }
  export const abs: WidgetStyleObj = { pos: 'abs', a: 0 }
  export const fixed: WidgetStyleObj = { pos: 'fixed', a: 0 }
  export const fixedTop: WidgetStyleObj = { pos: 'fixed', at: 0, ah: 0 }
  export const fixedBottom: WidgetStyleObj = { pos: 'fixed', ab: 0, ah: 0 }
  export const round: WidgetStyleObj = { r: '999999px' }
  
  
  export const row: WidgetStyleObj = { display: 'flex', flexFlow: 'row nowrap' }
  export const rowC: WidgetStyleObj = { display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }
  export const rowWrap: WidgetStyleObj = { display: 'flex', flexFlow: 'row wrap' }
  
  
  export const noBorderOutlineBoxShadow: WidgetStyleObj = {
    bd: null,
    outline: null,
    boxShadow: null,
  }
  
  
  export const reset: WidgetStyleObj = (() => {
    const reset: WidgetStyleObj = {
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
  
  export const resetButton: WidgetStyleObj = {
    ...reset,
    cursor: 'pointer',
    hover: noBorderOutlineBoxShadow,
    active: noBorderOutlineBoxShadow,
    focus: noBorderOutlineBoxShadow,
    focusVisible: noBorderOutlineBoxShadow,
    disabled: { cursor: 'not-allowed' },
  }
  
  
  
  
  export namespace Txt {
    
    export const lg18: WidgetStyleObj = {
      fontWeight: '400',
      fontSize: '18px',
      lineHeight: 'normal',
      letterSpacing: 'normal',
    }
    export const lg18lh150: WidgetStyleObj = {
      fontWeight: '400',
      fontSize: '18px',
      lineHeight: '150%',
      letterSpacing: '0.05em',
    }
    
    
    export const lg16: WidgetStyleObj = {
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '129%',
      letterSpacing: '0.05em',
    }
    export const lg16b: WidgetStyleObj = {
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: 'normal',
      letterSpacing: 'normal',
    }
    
    
    export const md16: WidgetStyleObj = {
      fontWeight: '300',
      fontSize: '16px',
      lineHeight: '129%',
      letterSpacing: 'normal',
    }
    
    
    
    export const md14: WidgetStyleObj = {
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '129%',
      letterSpacing: '0.05em',
    }
    export const md14bold: WidgetStyleObj = {
      fontWeight: '600',
      fontSize: '14px',
      lineHeight: '129%',
      letterSpacing: '0.05em',
    }
    
    
    
    export const md15thin: WidgetStyleObj = {
      fontWeight: '300',
      fontSize: '15px',
      lineHeight: '129%',
      letterSpacing: 'normal',
    }
    
  }
}

