import { css } from '@emotion/react'
import { useOverlay } from '@util/react/useOverlay.ts'
import React, { useMemo } from 'react'
import { GenderEnum } from 'src/api/model/GenderEnum.ts'
import ModalPortal from 'src/ui/components/Modal/ModalPortal.tsx'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui/ui-values/OptionUiText.ts'
import { TitleUiText } from 'src/ui/ui-values/TitleUiText.ts'
import OptionItem from 'src/ui/widgets/OptionAndValueItem/OptionItem.tsx'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import { ReactUtils } from 'src/util/common/ReactUtils.ts'
import {
  ValidationWrapRenderProps
} from '@util/form-validation/ValidationWrap.tsx'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import BottomSheetBasic from 'src/ui/elements/BottomSheet/BottomSheetBasic.tsx'
import UseBottomSheetState from 'src/ui/elements/BottomSheet/UseBottomSheetState.tsx'
import RadioInput from 'src/ui/elements/inputs/RadioInput/RadioInput.tsx'
import RadioInputGroup from 'src/ui/elements/inputs/RadioInput/RadioInputGroup.tsx'
import { RadioInputStyle } from 'src/ui/elements/inputs/RadioInput/RadioInputStyle.ts'
import onPointerClick = ReactUtils.onPointerClick
import col = EmotionCommon.col
import GenderGradIc = SvgGradIcons.GenderGradIc







const overlayName = 'gender'



const ProfileGender =
React.memo(
(props: ValidationWrapRenderProps<GenderEnum|''>)=>{
  const optionText = useUiValues(OptionUiText)
  const titleText = useUiValues(TitleUiText)
  
  
  const [isOpen, open, close] = useOverlay(overlayName)
  
  const genderOptions = useMemo(
    ()=>[
      {
        value: 'MALE',
        text: optionText.male,
      },{
        value: 'FEMALE',
        text: optionText.female,
      }
    ] satisfies { value: GenderEnum, text: string }[],
    [optionText]
  )
  
  
  
  return <>
    <OptionItem
      icon={<GenderGradIc />}
      title={titleText.gender}
      value={genderOptions.find(opt => opt.value === props.value)?.text ?? ''}
      
      onClick={open}
      //{...onPointerClick(open)}
    />
    
    <UseBottomSheetState isOpen={isOpen} onClosed={close}>
      {sheetProps =>
        <ModalPortal>
          <BottomSheetBasic
            {...sheetProps.sheetProps}
            header={titleText.gender}
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