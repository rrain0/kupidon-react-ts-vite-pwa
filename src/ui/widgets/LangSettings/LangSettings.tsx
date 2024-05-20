import { css } from '@emotion/react'
import React from 'react'
import LangOptions from 'src/ui/components/settings-options/LangOptions.tsx'
import BottomSheetDialogBasic from 'src/ui/elements/BottomSheetBasic/BottomSheetDialogBasic.tsx'
import UseBottomSheetState from 'src/ui/elements/BottomSheet/UseBottomSheetState.tsx'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import Setter = TypeUtils.Callback1
import col = EmotionCommon.col
import PartialUndef = TypeUtils.PartialUndef





export type LangSettingsProps = {
  open: boolean
  setOpen: Setter<boolean>
} & PartialUndef<{
  closeable: boolean
}>



const LangSettings =
React.memo(
(props: LangSettingsProps)=>{
  
  
  return <>
    <UseBottomSheetState isOpen={props.open} onClosed={()=>props.setOpen(false)}>
      { ({ sheetProps })=>
      <BottomSheetDialogBasic
        {...sheetProps}
        closeable={props.closeable}
        header={<div css={css`height: 1em;`}/>}
      >
        <div css={css`
          ${col};
          padding-bottom: 20px;
        `}
        >
          
          <LangOptions />
          
        </div>
      </BottomSheetDialogBasic>}
    </UseBottomSheetState>
  </>
})
export default LangSettings
