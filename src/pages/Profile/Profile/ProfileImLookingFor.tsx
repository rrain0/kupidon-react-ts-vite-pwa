/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useMemo, useState } from 'react'
import UseFakePointerRef from 'src/components/ActionProviders/UseFakePointerRef'
import ModalPortal from 'src/components/Modal/ModalPortal'
import OptionItem from 'src/components/OptionItem/OptionItem'
import UseBool from 'src/components/StateCarriers/UseBool'
import { ProfileUiText } from 'src/pages/Profile/uiText'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import {
  ValidationWrapRenderProps
} from 'src/utils/form-validation/ValidationWrap'
import { useUiValues } from 'src/utils/lang/useUiText'
import BottomSheetBasic from 'src/views/BottomSheet/BottomSheetBasic'
import UseBottomSheetState from 'src/views/BottomSheet/UseBottomSheetState'
import { SvgIcons } from 'src/views/icons/SvgIcons'
import RadioInput from 'src/views/Inputs/RadioInput/RadioInput'
import RadioInputGroup from 'src/views/Inputs/RadioInput/RadioInputGroup'
import { RadioInputStyle } from 'src/views/Inputs/RadioInput/RadioInputStyle'
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
      
      <UseFakePointerRef>{({ ref })=>
        <OptionItem
          icon={<Search2Ic css={css`height: 50%`}/>}
          title={uiText.imLookingFor.text}
          value={preferredPeopleOptions.find(it => it.value === 'notSelected')!.text}
          nextIcon={<Arrow6NextIc css={css`height: 44%`}/>}
          
          //onClick={bool.setTrue}
          ref={ref as any}
          {...onPointerClick(bool.setTrue)}
        />
      }</UseFakePointerRef>
      
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