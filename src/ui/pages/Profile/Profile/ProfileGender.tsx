import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useOverlayState } from '@util/react/useOverlayState.ts'
import React, { useMemo } from 'react'
import { GenderEnum } from 'src/api/model/GenderEnum.ts'
import UseFakePointerRef from 'src/ui/components/ActionProviders/UseFakePointerRef.tsx'
import ModalPortal from 'src/ui/components/Modal/ModalPortal.tsx'
import OptionAndValueItem from 'src/ui/widgets/OptionAndValueItem/OptionAndValueItem.tsx'
import UseBool from 'src/ui/components/StateCarriers/UseBool.tsx'
import { ProfileUiText } from 'src/ui/pages/Profile/uiText.ts'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import { ReactUtils } from 'src/util/common/ReactUtils.ts'
import {
  ValidationWrapRenderProps
} from '@util/form-validation/ValidationWrap.tsx'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import BottomSheetBasic from 'src/ui/elements/BottomSheet/BottomSheetBasic.tsx'
import UseBottomSheetState from 'src/ui/elements/BottomSheet/UseBottomSheetState.tsx'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons.tsx'
import RadioInput from 'src/ui/elements/inputs/RadioInput/RadioInput.tsx'
import RadioInputGroup from 'src/ui/elements/inputs/RadioInput/RadioInputGroup.tsx'
import { RadioInputStyle } from 'src/ui/elements/inputs/RadioInput/RadioInputStyle.ts'
import Arrow6NextIc = SvgIcons.ArrowAngledRoundedIc
import GenderIc = SvgIcons.GenderIc
import onPointerClick = ReactUtils.onPointerClick
import col = EmotionCommon.col







const overlayName = 'gender'



const ProfileGender =
React.memo(
(props: ValidationWrapRenderProps<GenderEnum|''>)=>{
  const uiText = useUiValues(ProfileUiText)
  
  
  const [isOpen, open, close] = useOverlayState(overlayName)
  
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
  
  
  
  return <>
    <OptionAndValueItem
      icon={<GenderIc css={css`height: 50%`}/>}
      title={uiText.gender.text}
      value={genderOptions.find(opt => opt.value === props.value)?.text ?? ''}
      nextIcon={<Arrow6NextIc css={css`height: 44%`}/>}
      
      //onClick={bool.setTrue}
      {...onPointerClick(open)}
    />
    
    <UseBottomSheetState
      open={isOpen}
      onClosed={close}
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