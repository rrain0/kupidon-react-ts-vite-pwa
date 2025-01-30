import { WidgetStyleWithProps } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'


export namespace WidgetStyleCommon {
  
  export const contents: WidgetStyleWithProps = { display: 'contents' }
  export const abs: WidgetStyleWithProps = { pos: 'abs', a: 0 }
  export const fixed: WidgetStyleWithProps = { pos: 'fixed', a: 0 }
  export const fixedTop: WidgetStyleWithProps = { pos: 'fixed', at: 0, ah: 0 }
  export const fixedBottom: WidgetStyleWithProps = { pos: 'fixed', ab: 0, ah: 0 }
  export const round: WidgetStyleWithProps = { r: '999999px' }
  
  
  export const row: WidgetStyleWithProps = { display: 'flex', flexFlow: 'row nowrap' }
  export const rowC: WidgetStyleWithProps = { display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }
  export const rowWrap: WidgetStyleWithProps = { display: 'flex', flexFlow: 'row wrap' }
  
  
  export const noPointer: WidgetStyleWithProps = { pointerEvents: 'none' }
  export const noBorderOutlineBoxShadow: WidgetStyleWithProps = {
    bd: null,
    outline: null,
    boxShadow: null,
  }
  
  
  export const reset = (() => {
    const reset: WidgetStyleWithProps = {
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
  
  export const resetButton: WidgetStyleWithProps = {
    ...reset,
    cursor: 'pointer',
    hover: noBorderOutlineBoxShadow,
    active: noBorderOutlineBoxShadow,
    focus: noBorderOutlineBoxShadow,
    focusVisible: noBorderOutlineBoxShadow,
    disabled: { cursor: 'not-allowed' },
  }
  
  
  
  
  export namespace Txt {
    
    export const lg18: WidgetStyleWithProps = {
      fontWeight: '400',
      fontSize: '18px',
      lineHeight: 'normal',
      letterSpacing: 'normal',
    }
    export const lg18lh150: WidgetStyleWithProps = {
      fontWeight: '400',
      fontSize: '18px',
      lineHeight: '150%',
      letterSpacing: '0.05em',
    }
    
    
    export const lg16b: WidgetStyleWithProps = {
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: 'normal',
      letterSpacing: 'normal',
    }
    
    
    export const md16: WidgetStyleWithProps = {
      fontWeight: '300',
      fontSize: '16px',
      lineHeight: '129%',
      letterSpacing: 'normal',
    }
    
    
    
    export const md14: WidgetStyleWithProps = {
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '129%',
      letterSpacing: '0.05em',
    }
    export const md14bold: WidgetStyleWithProps = {
      fontWeight: '600',
      fontSize: '14px',
      lineHeight: '129%',
      letterSpacing: '0.05em',
    }
    
    
    
    export const md15thin: WidgetStyleWithProps = {
      fontWeight: '300',
      fontSize: '15px',
      lineHeight: '129%',
      letterSpacing: 'normal',
    }
    
  }
}

