import { css, keyframes, SerializedStyles } from '@emotion/react'




export namespace EmotionCommon {
  
  export const contents = css`
    display: contents;
  `
  
  export const abs = css`
    position: absolute;
    inset: 0; // top: 0; right: 0; bottom: 0; left: 0;
  `
  
  export const fixed = css`
    position: fixed;
    inset: 0; // top: 0; right: 0; bottom: 0; left: 0;
  `
  export const fixedTop = css`
    position: fixed;
    top: 0; right: 0; left: 0;
  `
  export const fixedBottom = css`
    position: fixed;
    right: 0; bottom: 0; left: 0;
  `
  
  
  export const round = css`
    border-radius: 999999px;
  `
  
  
  export const row = css`
    display: flex;
    flex-flow: row nowrap;
  `
  
  export const rowC = css`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  `
  
  export const rowWrap = css`
    display: flex;
    flex-flow: row wrap;
  `
  
  export const rowWrapC = css`
    display: flex;
    flex-flow: row wrap;
    align-items: center;
  `
  
  export const col = css`
    display: flex;
    flex-flow: column nowrap;
  `
  
  export const colC = css`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  `
  
  
  export const gridC = css`
    display: grid;
    place-items: center;
  `
  export const flexC = css`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
  `
  export const gridStackC = css`
    display: grid;
    place-items: center;
    grid: 'stack';
    & > * { grid-area: stack; }
  `
  export const centerV = css`
    display: grid;
    place-items: center start;
  `
  export const centerStart = centerV
  export const stretch = css`
    display: grid;
    place-items: stretch;
    place-content: stretch;
  `
  export const stretchAll = css`
    display: grid;
    place-items: stretch;
    grid: 'c';
    & > * { grid-area: c; }
  `
  export const wrapper = css`
    display: grid;
    min-width: fit-content; min-height: fit-content;
    width: fit-content; height: fit-content;
    max-width: fit-content; max-height: fit-content;
  `
  export const fill = css`
    min-width: 100%; min-height: 100%;
    width: 100%; height: 100%;
    max-width: 100%; max-height: 100%;
  `
  
  
  
  
  export const mobileFullWidth = css`
    @media (max-width: 480px) {
      width: 100%;
    }
  `
  
  
  
  export const hoverable = '@media (hover: hover) and (pointer: fine)'
  
  export const onHover = (cssStyle: SerializedStyles) => css`
    ${hoverable}{ :hover {
      ${cssStyle};
    } }
  `
  
  export const mobileWidth = (cssStyle: SerializedStyles) => css`
    @media only screen and (max-width: 480px) {
      ${cssStyle};
    }
  `
  
  
  
  
  export const bgInBorder = css`
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0) border-box;
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0) border-box;

    -webkit-mask-composite: xor;
    mask-composite: exclude;
    
    background-origin: border-box;
  `
  
  
  
  
  export const reset = (() => {
    const reset = css`
      // appearance: none;
      box-sizing: border-box;
      background: none;
      border: none;
      outline: none;
      box-shadow: none;
      margin: 0;
      padding: 0;
      gap: 0;
      -webkit-tap-highlight-color: transparent;
    `
    return css`
      ${reset};
      ::before { ${reset}; }
      ::after { ${reset}; }
    `
  })()
  
  
  
  export const resetInput = css`
    ${reset};
    :where(:hover, :active, :focus-visible, :focus) {
      outline: none;
      box-shadow: none;
      border: none;
    }
    :hover {
      cursor: text;
    }
    &[type=radio]:hover {
      cursor: pointer;
    }
    &[type=checkbox]:hover {
      cursor: pointer;
    }
    ::placeholder {
      opacity: 1;
    }
  `
  export const resetButton = css`
    ${reset};
    cursor: pointer;
    :where(:hover, :active, :focus, :focus-visible) {
      outline: none;
      box-shadow: none;
      border: none;
    }
    :disabled {
      cursor: auto;
    }
  `
  
  export const resetTextarea = css`
    ${reset};
    :where(:hover, :active, :focus, :focus-visible) {
      outline: none;
      box-shadow: none;
      border: none;
    }
    ::placeholder {
      opacity: 1;
    }
  `
  export const resetUl = css`
    ${reset};
    ${col};
    // when using it, you must include <ul role="list"> in html
    list-style: none;
  `
  export const resetPseudoElement = css`
    ${reset};
    ${row};
    content: '';
  `
  export const resetA = css`
    display: contents;
    text-decoration: none;
    color: inherit;
  `
  export const resetH = css`
    font-weight: inherit;
    font-size: inherit;
  `
  
  
  
  export const hiddenFileInput = css`
    position: absolute;
    //opacity: 0;
    display: none;
    pointer-events: none;
  `
  
  
  
  export const noScrollbars = css`
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `
  export const hideWindowScrollbar = css`
    html { ${noScrollbars} }
  `
  
  
  export const noScroll = css`
    overflow: hidden;
  `
  export const noScrollX = css`
    overflow-x: hidden;
  `
  export const noScrollY = css`
    overflow-y: hidden;
  `
  
  
  export const noSelect = css`
    user-select: none;
  `
  export const noTouchAction = css`
    touch-action: none;
  `
  export const instantScroll = css`
    scroll-behavior: auto;
  `
  
  
  
  
  export const rotateAnim = keyframes`
    from { rotate: 0turn; }
    to { rotate: 1turn; }
  `
  
  
  
  export namespace Txt {
    
    export const lg36Bold = css`
      font-weight: 500;
      font-size: 36px;
      line-height: 150%;
      letter-spacing: normal;
    `
    
    export const lg32Bold = css`
      font-weight: 500;
      font-size: 32px;
      line-height: 129%;
      letter-spacing: normal;
    `
    
    export const lg28 = css`
      font-weight: 400;
      font-size: 28px;
      line-height: 150%;
      letter-spacing: normal;
    `
    export const lg28Bold = css`
      font-weight: 500;
      font-size: 28px;
      line-height: 150%;
      letter-spacing: 0.05em;
    `
    
    
    export const lg24 = css`
      font-weight: 400;
      font-size: 24px;
      line-height: 129%;
      letter-spacing: normal;
    `
    export const lg24Lh150 = css`
      font-weight: 400;
      font-size: 24px;
      line-height: 150%;
      letter-spacing: 0.05em;
    `
    export const lg24Bold = css`
      font-weight: 500;
      font-size: 24px;
      line-height: normal;
      letter-spacing: normal;
    `
    
    
    export const lg20 = css`
      font-weight: 400;
      font-size: 20px;
      line-height: 129%;
      letter-spacing: normal;
    `
    export const lg20bold = css`
      font-weight: 500;
      font-size: 20px;
      line-height: 129%;
      letter-spacing: normal;
    `
    export const s20bold2 = css`
      font-weight: 600;
      font-size: 20px;
      line-height: 129%;
      letter-spacing: normal;
    `
    export const lg20Wide = css`
      font-weight: 400;
      font-size: 20px;
      line-height: 129%;
      letter-spacing: 0.05em;
    `
    
    
    export const lg18 = css`
      font-weight: 400;
      font-size: 18px;
      line-height: normal;
      letter-spacing: normal;
    `
    export const lg18Lh150 = css`
      font-weight: 400;
      font-size: 18px;
      line-height: 150%;
      letter-spacing: 0.05em;
    `
    
    
    export const lg17Bold = css`
      font-weight: 600;
      font-size: 17px;
      line-height: normal;
      letter-spacing: 0.05em;
    `
    export const lg17 = css`
      font-weight: 400;
      font-size: 17px;
      line-height: 129%;
      letter-spacing: normal;
    `
    
    
    export const lg16 = css`
      font-weight: 400;
      font-size: 16px;
      line-height: normal;
      letter-spacing: normal;
    `
    export const lg16Bold = css`
      font-weight: 500;
      font-size: 16px;
      line-height: 129%;
      letter-spacing: normal;
    `
    export const lg16ExtraBold = css`
      font-weight: 700;
      font-size: 16px;
      line-height: 129%;
      letter-spacing: normal;
    `
    export const lg16Wide = css`
      font-weight: 400;
      font-size: 16px;
      line-height: 129%;
      letter-spacing: 0.05em;
    `
    export const lg16Thin = css`
      font-weight: 300;
      font-size: 16px;
      line-height: 129%;
      letter-spacing: normal;
    `
    
    
    export const md15 = css`
      font-weight: 400;
      font-size: 15px;
      line-height: 129%;
      letter-spacing: 0.05em;
    `
    export const s15Bold = css`
      font-weight: 500;
      font-size: 15px;
      line-height: 129%;
      letter-spacing: normal;
    `
    export const md15Thin = css`
      font-weight: 300;
      font-size: 15px;
      line-height: 129%;
      letter-spacing: normal;
    `
    
    
    export const md14 = css`
      font-weight: 400;
      font-size: 14px;
      line-height: 129%;
      letter-spacing: 0.05em;
    `
    export const md14Bold = css`
      font-weight: 600;
      font-size: 14px;
      line-height: 129%;
      letter-spacing: 0.05em;
    `
    export const md14Thin = css`
      font-weight: 300;
      font-size: 14px;
      line-height: 129%;
      letter-spacing: normal;
    `
    
    
    export const sm13 = css`
      font-weight: 400;
      font-size: 13px;
      line-height: 129%;
      letter-spacing: normal;
    `
    
    
    export const sm10 = css`
      font-weight: 300;
      font-size: 10px;
      line-height: 129%;
      letter-spacing: normal;
    `
  
  }
  
  
  
  
}



