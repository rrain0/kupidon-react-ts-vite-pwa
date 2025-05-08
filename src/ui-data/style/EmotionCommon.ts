import { css, keyframes, SerializedStyles } from '@emotion/react'




export namespace EmotionCommon {
  
  export const contents = css`
    display: contents;
  `
  
  export const full = css`
    width: 100%; height: 100%;
  `
  export const fullMinMax = css`
    min-width: 100%; min-height: 100%;
    width: 100%; height: 100%;
    max-width: 100%; max-height: 100%;
  `
  
  export const abs = css`
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
  `
  
  export const fixed = css`
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
  `
  export const fixedTop = css`
    position: fixed;
    top: 0; left: 0;
    width: 100%;
  `
  export const fixedBottom = css`
    position: fixed;
    bottom: 0; left: 0;
    width: 100%;
  `
  
  
  export const round = css`
    border-radius: 999999px;
  `
  export const noThisPointer = css`
    pointer-events: none;
    & > * { pointer-events: auto; }
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
  export const flexC = css`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
  `
  
  
  export const gridC = css`
    display: grid;
    place-items: center;
  `
  export const gridStackC = css`
    display: grid;
    place-items: center;
    grid: 'stack';
    & > * { grid-area: stack; }
  `
  export const gridCV = css`
    display: grid;
    place-items: center start;
  `
  export const gridStretch = css`
    display: grid;
    place-items: stretch;
    place-content: stretch;
  `
  export const gridStretchAll = css`
    display: grid;
    place-items: stretch;
    grid: 'c';
    & > * { grid-area: c; }
  `
  
  
  
  export const max1Line = css`
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `
  // Ставит троеточие в конце контейнера, обрезая последнее слово
  // Ширину надо обязательно задать
  // С 'width: 100%' после текста будет оставаться пустое место до конца контейнера
  export const max1LineBox = css`
    display: table;
    table-layout: fixed;
    // на ios это делает ширину 0 и в итоге ничего не показывается
    // width: fit-content;
    width: 100%;
  `
  
  
  // Ставит троеточие после последнего слова, которое влезло!!!
  // Если слово одно и оно не влезло то слово вылезет за пределы родителя!!!
  // После троеточия будет оставаться пустое место до конца контейнера
  export const maxLines = (lines: number) => css`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: ${lines};
  `
  
  
  
  export const hoverable = '@media (hover: hover) and (pointer: fine)'
  
  export const onHover = (cssStyle: SerializedStyles) => css`
    ${hoverable} { :hover {
      ${cssStyle};
    } }
  `
  
  
  
  export const mobileFullWidth = css`
    @media (max-width: 480px) {
      width: 100%;
    }
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
  export const noWindowScrollbars = css`
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
    
    export const s36Bold = css`
      font-weight: 500;
      font-size: 36px;
      line-height: 1.5;
      letter-spacing: normal;
    `
    
    export const s32Bold = css`
      font-weight: 500;
      font-size: 32px;
      line-height: 1.29;
      letter-spacing: normal;
    `
    
    export const s28 = css`
      font-weight: 400;
      font-size: 28px;
      line-height: 1.5;
      letter-spacing: normal;
    `
    export const s28Bold = css`
      font-weight: 500;
      font-size: 28px;
      line-height: 1.5;
      letter-spacing: 0.05em;
    `
    
    
    export const s24 = css`
      font-weight: 400;
      font-size: 24px;
      line-height: 1.29;
      letter-spacing: normal;
    `
    export const s24Wide = css`
      font-weight: 400;
      font-size: 24px;
      line-height: 1.29;
      letter-spacing: 0.05em;
    `
    export const s24Bold = css`
      font-weight: 500;
      font-size: 24px;
      line-height: 1.29;
      letter-spacing: normal;
    `
    export const s24BoldWide = css`
      font-weight: 500;
      font-size: 24px;
      line-height: 1.29;
      letter-spacing: 0.05em;
    `
    
    
    export const s22 = css`
      font-weight: 400;
      font-size: 22px;
      line-height: 1.29;
      letter-spacing: normal;
    `
    export const s22Bold = css`
      font-weight: 500;
      font-size: 22px;
      line-height: 1.29;
      letter-spacing: normal;
    `
    
    
    export const s20 = css`
      font-weight: 400;
      font-size: 20px;
      line-height: 1.29;
      letter-spacing: normal;
    `
    export const s20Bold = css`
      font-weight: 500;
      font-size: 20px;
      line-height: 1.29;
      letter-spacing: normal;
    `
    export const s20Bold600 = css`
      font-weight: 600;
      font-size: 20px;
      line-height: 1.29;
      letter-spacing: normal;
    `
    export const s20Wide = css`
      font-weight: 400;
      font-size: 20px;
      line-height: 1.29;
      letter-spacing: 0.05em;
    `
    
    
    export const s18LhNorm = css`
      font-weight: 400;
      font-size: 18px;
      line-height: normal;
      letter-spacing: normal;
    `
    export const s18BoldWideLhNorm = css`
      font-weight: 500;
      font-size: 18px;
      line-height: normal;
      letter-spacing: 0.05em;
    `
    export const s18WideLh150 = css`
      font-weight: 400;
      font-size: 18px;
      line-height: 1.5;
      letter-spacing: 0.05em;
    `
    
    
    export const s17 = css`
      font-weight: 400;
      font-size: 17px;
      line-height: 1.29;
      letter-spacing: normal;
    `
    export const s17Bold = css`
      font-weight: 500;
      font-size: 17px;
      line-height: 1.29;
      letter-spacing: normal;
    `
    export const s17Wide = css`
      font-weight: 400;
      font-size: 17px;
      line-height: 1.29;
      letter-spacing: 0.05em;
    `
    export const s17Bold600Wide = css`
      font-weight: 600;
      font-size: 17px;
      line-height: normal;
      letter-spacing: 0.05em;
    `
    
    
    export const s16 = css`
      font-weight: 400;
      font-size: 16px;
      line-height: normal;
      letter-spacing: normal;
    `
    export const s16Bold = css`
      font-weight: 500;
      font-size: 16px;
      line-height: 1.29;
      letter-spacing: normal;
    `
    export const s16ExtraBold = css`
      font-weight: 700;
      font-size: 16px;
      line-height: 1.29;
      letter-spacing: normal;
    `
    export const s16Wide = css`
      font-weight: 400;
      font-size: 16px;
      line-height: 1.29;
      letter-spacing: 0.05em;
    `
    export const s16Thin = css`
      font-weight: 300;
      font-size: 16px;
      line-height: 1.29;
      letter-spacing: normal;
    `
    
    
    export const s15 = css`
      font-weight: 400;
      font-size: 15px;
      line-height: 1.29;
      letter-spacing: 0.05em;
    `
    export const s15Tight = css`
      font-weight: 400;
      font-size: 15px;
      line-height: 1.29;
      letter-spacing: normal;
    `
    export const s15Bold = css`
      font-weight: 500;
      font-size: 15px;
      line-height: 1.29;
      letter-spacing: normal;
    `
    export const s15Thin = css`
      font-weight: 300;
      font-size: 15px;
      line-height: 1.29;
      letter-spacing: normal;
    `
    
    
    export const s14 = css`
      font-weight: 400;
      font-size: 14px;
      line-height: 1.29;
      letter-spacing: 0.05em;
    `
    export const s14Bold = css`
      font-weight: 500;
      font-size: 14px;
      line-height: 1.29;
      letter-spacing: 0.05em;
    `
    export const s14BoldWide = css`
      font-weight: 500;
      font-size: 14px;
      line-height: 1.29;
      letter-spacing: 0.05em;
    `
    export const s14Bold600 = css`
      font-weight: 600;
      font-size: 14px;
      line-height: 1.29;
      letter-spacing: normal;
    `
    export const s14Bold600Wide = css`
      font-weight: 600;
      font-size: 14px;
      line-height: 1.29;
      letter-spacing: 0.05em;
    `
    export const s14Thin = css`
      font-weight: 300;
      font-size: 14px;
      line-height: 1.29;
      letter-spacing: normal;
    `
    
    
    export const s13 = css`
      font-weight: 400;
      font-size: 13px;
      line-height: 1.29;
      letter-spacing: normal;
    `
    
    
    export const s12 = css`
      font-weight: 400;
      font-size: 13px;
      line-height: 1.29;
      letter-spacing: normal;
    `
    export const s12Bold = css`
      font-weight: 500;
      font-size: 13px;
      line-height: 1.29;
      letter-spacing: normal;
    `
    
    
    export const s11Bold = css`
      font-weight: 500;
      font-size: 11px;
      line-height: 1.29;
      letter-spacing: normal;
    `
    
    
    export const s10 = css`
      font-weight: 300;
      font-size: 10px;
      line-height: 1.29;
      letter-spacing: normal;
    `
  
  }
  
  
  
  
}



