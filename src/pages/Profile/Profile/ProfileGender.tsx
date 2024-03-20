/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { GenderEnum } from 'src/api/entity/GenderEnum'
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
import GenderIc = SvgIcons.GenderIc
import onPointerClick = ReactUtils.onPointerClick
import col = EmotionCommon.col









const ProfileGender =
React.memo(
(props: ValidationWrapRenderProps<GenderEnum|''>)=>{
  const uiText = useUiValues(ProfileUiText)
  
  
  
  const genderOptions = useMemo(
    ()=>[
      {
        value: 'MALE',
        text: uiText.male.text,
      },{
        value: 'FEMALE',
        text: uiText.female.text,
      }
    ] satisfies { value: GenderEnum, text: string }[],
    [uiText]
  )
  
  
  
  return <UseBool>{bool =>
    <>
      
      <UseFakePointerRef>{({ ref })=>
        <OptionItem
          icon={<GenderIc css={css`height: 50%`}/>}
          title={uiText.gender.text}
          value={genderOptions.find(opt => opt.value === props.value)?.text ?? ''}
          nextIcon={<Arrow6NextIc css={css`height: 44%`}/>}
          
          //onClick={bool.setTrue}
          ref={ref as any}
          {...onPointerClick(bool.setTrue)}
        />
      }</UseFakePointerRef>
      
      <UseBottomSheetState
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
        }</UseBottomSheetState>
    </>
  }</UseBool>
})
export default ProfileGender




const selectItemsContainer = css`
  ${col};
  padding-bottom: 20px;
`
const selectItemText = css`
  flex: 1;
  padding-top: 4px;
  padding-bottom: 4px;
`