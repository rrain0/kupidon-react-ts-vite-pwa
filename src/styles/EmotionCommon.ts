import { css, keyframes, SerializedStyles } from '@emotion/react'




export namespace EmotionCommon {
  
  export const contents = css`
    display: contents;
  `
  
  
  export const abs = css`
    position: absolute;
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
  
  export const fixed = css`
    position: fixed;
    inset: 0; // top: 0; right: 0; bottom: 0; left: 0;
  `
  
  export const row = css`
    display: flex;
    flex-flow: row nowrap;
  `
  
  export const rowWrap = css`
    display: flex;
    flex-flow: row wrap;
  `
  
  export const col = css`
    display: flex;
    flex-flow: column nowrap;
  `
  
  export const center = css`
    display: grid;
    place-items: center;
  `
  export const centerContent = css`
    display: grid;
    place-content: center;
  `
  export const centerAll = css`
    display: grid;
    place-items: center;
    grid: 'c';
    & > * { grid-area: c; }
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
  
  export const onHover = (cssStyle: SerializedStyles)=>css`
    ${hoverable}{ :hover {
      ${cssStyle};
    } }
  `
  
  export const mobileWidth = (cssStyle: SerializedStyles)=>css`
    @media only screen and (max-width: 480px) {
      ${cssStyle};
    }
  `
  
  
  
  
  export const bgcInBorder = css`
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
  
  
  
  
  const _reset = css`
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
  export const reset = css`
    ${_reset};
    ::before { ${_reset}; }
    ::after { ${_reset}; }
  `
  
  
  
  export const resetInput = css`
    ${reset};
    :hover, :active, :focus-visible, :focus {
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
    ::placeholder {
      opacity: 1;
    }
  `
  export const resetButton = css`
    ${reset};
    cursor: pointer;
    :hover, :active, :focus-visible, :focus {
      outline: none;
      box-shadow: none;
      border: none;
    }
  `
  
  export const resetTextarea = css`
    ${reset};
    :hover, :active, :focus-visible, :focus {
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
  
  
  
  export const rotateKfs = keyframes`
    from { rotate: 0turn; }
    to { rotate: 1turn; }
  `
  
  
  
  export namespace Txt {
    
    export const large4 = css`
      font-weight: 500;
      font-size: 28px;
      line-height: 150%;
      letter-spacing: 0.05em;
    `
    
    export const large3 = css`
      font-weight: 400;
      font-size: 24px;
      line-height: 150%;
      letter-spacing: 0.05em;
    `
    
    export const large2 = css`
      font-weight: 400;
      font-size: 18px;
      line-height: 150%;
      letter-spacing: 0.05em;
    `
    
    export const large1 = css`
      font-weight: 400;
      font-size: 16px;
      line-height: 129%;
      letter-spacing: 0.05em;
    `
    
    export const normal1 = css`
      font-weight: 300;
      font-size: 16px;
      line-height: 129%;
    `
    
    export const small1 = css`
      font-weight: 300;
      font-size: 15px;
      line-height: 129%;
    `
    
    export const small2 = css`
      font-weight: 300;
      font-size: 14px;
      line-height: 129%;
    `
    
    
    
    export const small5 = css`
      font-weight: 300;
      font-size: 10px;
      line-height: 129%;
    `
  
  }
  
  
  
  
  
}






