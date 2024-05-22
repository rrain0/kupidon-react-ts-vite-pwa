import React, { useMemo } from 'react'
import { PartnerGender } from 'src/api/model/PartnerGender.ts'
import { Option } from 'src/ui/model/Option.ts'
import ModalRadio from 'src/ui/widgets/modal-element/ModalRadio/ModalRadio.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui/ui-values/OptionUiText.ts'
import { TitleUiText } from 'src/ui/ui-values/TitleUiText.ts'
import OptionItem from 'src/ui/elements/OptionAndValueItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from '@util/form-validation/ValidationWrap.tsx'
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
  
  
  
  const preferredPeopleOptions = useMemo(
    ()=>[
      {
        value: 'MALE',
        text: optionText.ofGuys,
      },{
        value: 'FEMALE',
        text: optionText.ofGirls,
      },{
        value: 'MALE_FEMALE',
        text: optionText.ofGuysAndGirls,
      },{
        value: '',
        text: optionText.notSelected,
      },
    ] satisfies PartnerGenderUiOptions,
    [optionText]
  )
  
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  
  
  return <>
    <OptionItem
      icon={<Search2GradIc />}
      title={titleText.imLookingFor}
      value={preferredPeopleOptions.find(opt => opt.value === props.value)?.text.toLowerCase() ?? ''}
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


