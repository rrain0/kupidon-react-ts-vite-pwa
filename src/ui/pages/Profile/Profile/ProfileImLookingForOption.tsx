import React, { useMemo } from 'react'
import { PartnerGender } from 'src/api/model/PartnerGender.ts'
import { Option } from 'src/ui/model/Option.ts'
import ModalRadio from 'src/ui/widgets/modal-element/ModalRadio/ModalRadio01.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui-props/ui-values/OptionUiText.ts'
import { TitleUiText } from 'src/ui-props/ui-values/TitleUiText.ts'
import OptionItem from 'src/ui/widgets/OptionItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from '@util/mini-libs/form-validation/components/ValidationWrap.tsx'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import Search2GradIc = SvgGradIcons.Search2GradIc




const overlayName = 'imLookingFor'


export type PartnerGenderOptionValues = PartnerGender | ''
export type PartnerGenderUiOptions = Option<PartnerGenderOptionValues>[]



const ProfileImLookingForOption =
React.memo(
(props: ValidationWrapRenderProps<PartnerGenderOptionValues>)=>{
  const titleText = useUiValues(TitleUiText)
  const optionText = useUiValues(OptionUiText)
  
  const text = useMemo(()=>({
    ofGuys: optionText.ofGuys,
    ofGirls: optionText.ofGirls,
    ofGuysAndGirls: optionText.ofGuysAndGirls,
    notSelected: optionText.notSelected,
  }), [titleText, optionText])
  
  
  const preferredPeopleOptions = useMemo(
    ()=>[
      {
        value: 'MALE',
        text: text.ofGuys,
      },{
        value: 'FEMALE',
        text: text.ofGirls,
      },{
        value: 'MALE_FEMALE',
        text: text.ofGuysAndGirls,
      },{
        value: '',
        text: text.notSelected,
      },
    ] satisfies PartnerGenderUiOptions,
    [text]
  )
  
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  const value = preferredPeopleOptions.find(opt => opt.value === props.value)?.text ?? ''
  
  return <>
    <OptionItem
      icon={<Search2GradIc />}
      title={titleText.imLookingFor}
      value={value}
      onClick={open}
    />
    
    <ModalRadio
      isOpen={isOpen}
      close={close}
      title={titleText.imLookingFor}
      options={preferredPeopleOptions}
      radioInputProps={(value)=>props.radioInputProps(value)}
    />
  </>
})
export default ProfileImLookingForOption


