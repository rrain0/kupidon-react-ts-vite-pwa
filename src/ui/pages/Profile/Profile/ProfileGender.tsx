import { css } from '@emotion/react'
import React, { useMemo } from 'react'
import { Gender } from 'src/api/model/Gender.ts'
import ModalRadio, { Option } from 'src/ui/components/modal-element/ModalRadio/ModalRadio.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui/ui-values/OptionUiText.ts'
import { TitleUiText } from 'src/ui/ui-values/TitleUiText.ts'
import OptionItem from 'src/ui/widgets/OptionAndValueItem/OptionItem.tsx'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import { ValidationWrapRenderProps } from '@util/form-validation/ValidationWrap.tsx'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import col = EmotionCommon.col
import GenderGradIc = SvgGradIcons.GenderGradIc







const overlayName = 'gender'



export type GenderOptionValues = Gender | ''
export type GenderUiOptions = Option<Gender>[]


const ProfileGender =
React.memo(
(props: ValidationWrapRenderProps<Gender|''>)=>{
  const optionText = useUiValues(OptionUiText)
  const titleText = useUiValues(TitleUiText)
  
  
  
  const genderOptions = useMemo(
    ()=>[
      {
        value: 'MALE',
        text: optionText.male,
      },{
        value: 'FEMALE',
        text: optionText.female,
      }
    ] satisfies GenderUiOptions,
    [optionText]
  )
  
  
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  
  
  return <>
    <OptionItem
      icon={<GenderGradIc />}
      title={titleText.gender}
      value={genderOptions.find(opt => opt.value === props.value)?.text ?? ''}
      onClick={open}
    />
    
    <ModalRadio
      isOpen={isOpen}
      close={close}
      title={titleText.gender}
      options={genderOptions}
      radioInputProps={(value: GenderOptionValues)=>props.radioInputProps(value)}
    />
    
    {/* <UseBottomSheetState isOpen={isOpen} close={close}>
      {sheetProps =>
        <ModalPortal>
          <BottomSheetDialogBasic
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
          </BottomSheetDialogBasic>
        </ModalPortal>
      }</UseBottomSheetState> */}
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