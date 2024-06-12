import React, { useMemo } from 'react'
import { Gender } from 'src/api/model/Gender.ts'
import { Option } from 'src/ui/model/Option.ts'
import ModalRadio from 'src/ui/widgets/modal-element/ModalRadio/ModalRadio.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui-props/ui-values/OptionUiText.ts'
import { TitleUiText } from 'src/ui-props/ui-values/TitleUiText.ts'
import OptionItem from 'src/ui/widgets/OptionItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from '@util/mini-libs/form-validation/components/ValidationWrap.tsx'
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
  
  const text = useMemo(()=>({
    male: optionText.male,
    female: optionText.female,
    gender: titleText.gender,
  }), [titleText, optionText])
  
  
  
  const genderOptions = useMemo(
    ()=>[
      {
        value: 'MALE',
        text: text.male,
      },{
        value: 'FEMALE',
        text: text.female,
      }
    ] satisfies GenderUiOptions,
    [text]
  )
  
  
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  const value = genderOptions.find(opt => opt.value === props.value)?.text ?? ''
  
  
  return <>
    <OptionItem
      icon={<GenderGradIc />}
      title={text.gender}
      value={value}
      onClick={open}
    />
    
    <ModalRadio
      isOpen={isOpen}
      close={close}
      title={text.gender}
      options={genderOptions}
      value={props.value}
      onSelect={props.setValue}
    />
  </>
})
export default ProfileGenderOption



