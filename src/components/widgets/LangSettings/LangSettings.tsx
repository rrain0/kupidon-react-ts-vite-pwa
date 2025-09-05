import { css } from '@emotion/react'
import React from 'react'
import { BottomSheetBasicS6 } from 'src/components/widgets/BottomSheetBasic/BottomSheetBasicS6.ts'
import LangOptions from 'src/components/components/settings-options/LangOptions.tsx'
import BottomSheetBasic from 'src/components/widgets/BottomSheetBasic/BottomSheetBasic.tsx'
import UseBottomSheetState from 'src/components/widgets/BottomSheet/UseBottomSheetState.tsx'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'

import { Setter } from '@utils/base/typeUtils.ts'
import col = EmotionCommon.col





export type LangSettingsProps = {
  open: boolean
  setOpen: Setter<boolean>
  closeable?: boolean | undefined
}



const LangSettings = React.memo((props: LangSettingsProps) => {
  
  
  return (
    <>
      <UseBottomSheetState isOpen={props.open} onClose={() => props.setOpen(false)}>
        {({ sheetProps }) => (
          <BottomSheetBasic
            css={BottomSheetBasicS6.t(BottomSheetBasicS6.S.bottom.sheet.full.normal)}
            {...sheetProps}
            closeable={props.closeable}
            title={<div css={css`height: 1em;`}/>}
          >
            <div
              css={css`
                ${col};
                padding-bottom: 20px;
              `}
            >
              
              <LangOptions/>
              
            </div>
          </BottomSheetBasic>
        )}
      </UseBottomSheetState>
    </>
  )
})
export default LangSettings
