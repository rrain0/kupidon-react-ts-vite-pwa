/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'



export const PageScrollbarsOverlayFrame = styled.div`
  position: fixed;
  right: 0;
  left: 0;
  bottom: var(--bottom-bars-inset);
  height: calc(100dvh - var(--bottom-bars-inset));
  pointer-events: none;
`