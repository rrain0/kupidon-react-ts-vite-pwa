import { css } from '@emotion/react'
import React from 'react'
import LangOptions from 'src/ui/components/settings-options/LangOptions.tsx'
import BottomSheetDialogBasic from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetDialogBasic.tsx'
import UseBottomSheetState from 'src/ui/1-widgets/BottomSheet/UseBottomSheetState.tsx'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { TypeU } from '@util/common/TypeU.ts'
import Setter = TypeU.Callback1
import col = EmotionCommon.col
import PartialUndef = TypeU.PartialUndef





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
    <UseBottomSheetState isOpen={props.open} close={()=>props.setOpen(false)}>
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
