import { css } from '@emotion/react'



export const addSafeInsetsForFilledBars = css`
  padding-top: var(--top-bars-inset);
  padding-bottom: var(--bottom-bars-inset);
`


export const addSafeInsetsForTransBars = css`
  padding-top: max(30px, var(--top-floating-bar-h));
  padding-bottom: max(50px, var(--bottom-floating-bar-h));
`
