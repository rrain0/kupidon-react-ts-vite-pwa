import { css } from '@emotion/react'
import React from 'react'
import { BottomSheetBasicS6 } from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetBasicS6.ts'
import LangOptions from 'src/ui/components/settings-options/LangOptions.tsx'
import BottomSheetBasic from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetBasic.tsx'
import UseBottomSheetState from 'src/ui/1-widgets/BottomSheet/UseBottomSheetState.tsx'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { TypeU } from '@utils/common/TypeU.ts'
import Setter = TypeU.Callback1
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
