import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { colSmWMax } from 'src/components/components/page/PageContentLayout.tsx'
import gridC = EmotionCommon.gridC
import gridEC = EmotionCommon.gridEC




export namespace ModalElements {
  
  export const modalCenteredS = css([
    gridC, {
      padding: 20,
    },
  ])
  
  export const modalInputBoxS = css([
    gridEC, {
      paddingLeft: 20, paddingRight: 20,
      paddingBottom: 140,
    },
  ])
  
  export const modalContextMenuCardBoxS = css([
    gridEC, { paddingLeft: 12, paddingRight: 12 },
  ])
  
  export const cardBoxInModalS = css({
    width: '100%',
    maxWidth: colSmWMax,
    gap: 10,
  })
  
}
