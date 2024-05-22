import React, { useMemo } from 'react'
import { Gender } from 'src/api/model/Gender.ts'
import { Option } from 'src/ui/model/Option.ts'
import ModalRadio from 'src/ui/widgets/modal-element/ModalRadio/ModalRadio.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui/ui-values/OptionUiText.ts'
import { TitleUiText } from 'src/ui/ui-values/TitleUiText.ts'
import OptionItem from 'src/ui/elements/OptionAndValueItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from '@util/form-validation/ValidationWrap.tsx'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import GenderGradIc = SvgGradIcons.GenderGradIc







const overlayName = 'gender'



export type GenderOptionValues = Gender | ''
export type GenderUiOptions = Option<Gender>[]


const ProfileGenderOption =
React.memo(
(props: ValidationWrapRenderProps<GenderOptionValues>)=>{
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
      value={genderOptions.find(opt => opt.value === props.value)?.text.toLowerCase() ?? ''}
      onClick={open}
    />
    
    <ModalRadio
      isOpen={isOpen}
      close={close}
      title={titleText.gender}
      options={genderOptions}
      radioInputProps={(value: GenderOptionValues)=>props.radioInputProps(value)}
    />
  </>
})
export default ProfileGenderOption



