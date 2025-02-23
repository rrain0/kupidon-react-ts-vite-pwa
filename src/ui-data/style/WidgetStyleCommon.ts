import { WidgetStyle, WidgetStyleObj } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'



export namespace WidgetStyleCommon {
  
  export const contents: WidgetStyleObj = { display: 'contents' }
  export const abs: WidgetStyleObj = { pos: 'abs', a: 0 }
  export const fixed: WidgetStyleObj = { pos: 'fixed', a: 0 }
  export const fixedTop: WidgetStyleObj = { pos: 'fixed', at: 0, ah: 0 }
  export const fixedBottom: WidgetStyleObj = { pos: 'fixed', ab: 0, ah: 0 }
  
  
  export const row: WidgetStyleObj = {
    display: 'flex', flexFlow: 'row nowrap',
  }
  export const rowC: WidgetStyleObj = {
    display: 'flex', flexFlow: 'row nowrap', alignItems: 'center',
  }
  export const rowE: WidgetStyleObj = {
    display: 'flex', flexFlow: 'row nowrap', justifyContent: 'end',
  }
  export const rowWrap: WidgetStyleObj = {
    display: 'flex', flexFlow: 'row wrap',
  }
  export const rowWrapC: WidgetStyleObj = {
    display: 'flex', flexFlow: 'row wrap', alignItems: 'center',
  }
  export const col: WidgetStyleObj = {
    display: 'flex', flexFlow: 'column nowrap',
  }
  export const colC: WidgetStyleObj = {
    display: 'flex', flexFlow: 'column nowrap', alignItems: 'center',
  }
  export const flexC: WidgetStyleObj = {
    display: 'flex', flexFlow: 'column nowrap',
    alignItems: 'center', justifyContent: 'center',
  }
  export const gridC: WidgetStyleObj = {
    display: 'grid', placeItems: 'center',
  }
  export const ___gridStackC: WidgetStyle = {
    display: 'grid', placeItems: 'center', grid: 'stack',
    // TODO Style  '& > *': { area: 'stack' }
    '& > *': { area: 'stack' },
  }
  
  
  export const imgCoverCenter: WidgetStyleObj = {
    objectFit: 'cover', objectPosition: 'center',
  }
  
  
  export const noBorderOutlineBoxShadow: WidgetStyleObj = {
    bd: null,
    outline: null,
    boxShadow: null,
  }
  
  
  export const reset: WidgetStyle = (() => {
    const reset: WidgetStyleObj = {
      //appearance: 'none',
      boxSizing: 'border-box',
      bg: null,
      ...noBorderOutlineBoxShadow,
      m: 0, p: 0, g: 0,
      '-webkit-tap-highlight-color': 'transparent',
    }
    return {
      ...reset,
      before: { content: 'unset', ...reset },
      after: { content: 'unset', ...reset },
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
  
  
  
  
  // line-height: 'normal' is roughly 1.2 and can be different between browsers
  export namespace Txt {
    
    export const s18LhNorm: WidgetStyleObj = {
      fontWeight: '400',
      fontSize: '18px',
      lineHeight: 'normal',
      letterSpacing: 'normal',
    }
    export const s18WideLh150: WidgetStyleObj = {
      fontWeight: '400',
      fontSize: '18px',
      lineHeight: '1.5',
      letterSpacing: '0.05em',
    }
    
    
    export const s16LhNorm: WidgetStyleObj = {
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: 'normal',
      letterSpacing: 'normal',
    }
    export const s16Wide: WidgetStyleObj = {
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '1.29',
      letterSpacing: '0.05em',
    }
    export const s16Thin: WidgetStyleObj = {
      fontWeight: '300',
      fontSize: '16px',
      lineHeight: '1.29',
      letterSpacing: 'normal',
    }
    
    
    
    export const s14: WidgetStyleObj = {
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '1.29',
      letterSpacing: '0.05em',
    }
    export const s14Bold600: WidgetStyleObj = {
      fontWeight: '600',
      fontSize: '14px',
      lineHeight: '1.29',
      letterSpacing: 'normal',
    }
    export const s14Bold600Wide: WidgetStyleObj = {
      fontWeight: '600',
      fontSize: '14px',
      lineHeight: '1.29',
      letterSpacing: '0.05em',
    }
    
    
    
    export const s15: WidgetStyleObj = {
      fontWeight: '400',
      fontSize: '15px',
      lineHeight: '1.29',
      letterSpacing: 'normal',
    }
    export const s15Bold: WidgetStyleObj = {
      fontWeight: '500',
      fontSize: '15px',
      lineHeight: '1.29',
      letterSpacing: 'normal',
    }
    export const s15Thin: WidgetStyleObj = {
      fontWeight: '300',
      fontSize: '15px',
      lineHeight: '1.29',
      letterSpacing: 'normal',
    }
    
    
    export const s10: WidgetStyleObj = {
      fontWeight: '300',
      fontSize: '10px',
      lineHeight: '1.29',
      letterSpacing: 'normal',
    }
    
  }
}

