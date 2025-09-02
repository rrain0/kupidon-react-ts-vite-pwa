import styled from '@emotion/styled'
import { StyleVals } from 'src/styles/StyleVals.ts'
import modalFloor100 = StyleVals.modalFloor100



export const PageScrollbarsOverlayFrame = styled.div`
  position: fixed;
  bottom: var(--bottom-action-bars-h);
  height: calc( var(--vp-ct-h) - var(--top-action-bars-h) - var(--bottom-action-bars-h) );
  right: 0;
  left: 0;
  z-index: ${modalFloor100};
  pointer-events: none;
`