import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useMemo, useState } from 'react'
import UseFakePointerRef from 'src/ui/components/ActionProviders/UseFakePointerRef.tsx'
import ModalPortal from 'src/ui/components/Modal/ModalPortal.tsx'
import OptionItem from 'src/ui/components/OptionItem/OptionItem.tsx'
import UseBool from 'src/ui/components/StateCarriers/UseBool.tsx'
import { ProfileUiText } from 'src/ui/pages/Profile/uiText.ts'
import { EmotionCommon } from 'src/ui/styles/EmotionCommon.ts'
import { ReactUtils } from '@util/common/ReactUtils.ts'
import {
  ValidationWrapRenderProps
} from '@util/form-validation/ValidationWrap.tsx'
import { useUiValues } from 'src/ui/ui-text/useUiText.ts'
import BottomSheetBasic from 'src/ui/widgets/BottomSheet/BottomSheetBasic.tsx'
import UseBottomSheetState from 'src/ui/widgets/BottomSheet/UseBottomSheetState.tsx'
import { SvgIcons } from 'src/ui/widgets/icons/SvgIcons.tsx'
import RadioInput from 'src/ui/widgets/inputs/RadioInput/RadioInput.tsx'
import RadioInputGroup from 'src/ui/widgets/inputs/RadioInput/RadioInputGroup.tsx'
import { RadioInputStyle } from 'src/ui/widgets/inputs/RadioInput/RadioInputStyle.ts'
import Arrow6NextIc = SvgIcons.ArrowAngledRoundedIc
import onPointerClick = ReactUtils.onPointerClick
import col = EmotionCommon.col
import Search2Ic = SvgIcons.Search2Ic







type PreferredPeopleOption = 'notSelected'|'ofGuys'|'ofGirls'|'ofGuysAndGirls'


const ProfileImLookingFor =
React.memo(
(/* props: ValidationWrapRenderProps<PreferredPeopleOption> */)=>{
  const uiText = useUiValues(ProfileUiText)
  
  
  
  /* const [preferredPeople, setPreferredPeople] =
    useState('notSelected' as PreferredPeopleOption) */
  const preferredPeopleOptions = useMemo(
    ()=>[
      {
        value: 'notSelected',
        text: uiText.notSelected.text,
      },{
        value: 'ofGuys',
        text: uiText.ofGuys.text,
      },{
        value: 'ofGirls',
        text: uiText.ofGirls.text,
      },{
        value: 'ofGuysAndGirls',
        text: uiText.ofGuysAndGirls.text,
      }
    ] satisfies { value: PreferredPeopleOption, text: string }[],
    [uiText]
  )
  
  
  
  return <UseBool>{bool =>
    <>
    
      <OptionItem
        icon={<Search2Ic css={css`height: 50%`}/>}
        title={uiText.imLookingFor.text}
        value={preferredPeopleOptions.find(it => it.value === 'notSelected')!.text}
        nextIcon={<Arrow6NextIc css={css`height: 44%`}/>}
        
        //onClick={bool.setTrue}
        {...onPointerClick(bool.setTrue)}
      />
      
      {/* <UseBottomSheetState
        open={bool.value}
        onClosed={bool.setFalse}
      >
        {sheetProps =>
          <ModalPortal>
            <BottomSheetBasic
              {...sheetProps.sheetProps}
              header={uiText.gender.text}
            >
              <RadioInputGroup css={selectItemsContainer}>
                {genderOptions.map(opt => <RadioInput
                  css={RadioInputStyle.radio}
                  childrenPosition="start"
                  {...props.radioInputProps(opt.value)}
                  value={opt.value}
                  key={opt.value}
                  onClick={sheetProps.setClosing}
                >
                  <div css={selectItemText}>
                    {opt.text}
                  </div>
                </RadioInput>)}
              
              </RadioInputGroup>
            </BottomSheetBasic>
          </ModalPortal>
        }</UseBottomSheetState> */}
    </>
  }</UseBool>
})
export default ProfileImLookingFor




const selectItemsContainer = css`
  ${col};
  padding-bottom: 20px;
`
const selectItemText = css`
  flex: 1;
  padding-top: 4px;
  padding-bottom: 4px;
`