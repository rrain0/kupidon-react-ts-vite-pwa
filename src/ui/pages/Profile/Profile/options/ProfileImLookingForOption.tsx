import React, { useMemo } from 'react'
import { PartnerGender } from 'src/api/model/PartnerGender.ts'
import { Option } from 'src/ui-data/models/Option.ts'
import ModalRadio from 'src/ui/widgets/modals/ModalRadio/ModalRadio.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import ModalSingleSelectList
  from 'src/ui/widgets/modals/ModalSingleSelectList/ModalSingleSelectList'
import OptionItem from 'src/ui/widgets/OptionItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from 'src/mini-libs/form-validation/components/ValidationWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import Search2GradIc = SvgGradIcons.Search2GradIc




const overlayName = 'imLookingFor'


export type PartnerGenderOptionValues = PartnerGender | ''
export type PartnerGenderUiOptions = Option<PartnerGenderOptionValues>[]



const ProfileImLookingForOption = React.memo(
(props: ValidationWrapRenderProps<PartnerGenderOptionValues>) => {
    const titleText = useUiValues(TitleUiText)
    const optionText = useUiValues(OptionUiText)
    
    const text = useMemo(() => ({
      ofGuys: optionText.ofGuys,
      ofGirls: optionText.ofGirls,
      ofGuysAndGirls: optionText.ofGuysAndGirls,
      notSelected: optionText.notSelected,
    }), [titleText, optionText])
    
    
    const options = useMemo(
      () => [
        {
          value: 'MALE',
          text: text.ofGuys,
        }, {
          value: 'FEMALE',
          text: text.ofGirls,
        }, {
          value: 'MALE_FEMALE',
          text: text.ofGuysAndGirls,
        }, {
          value: '',
          text: text.notSelected,
        },
      ] satisfies PartnerGenderUiOptions,
      [text]
    )
    
    
    const { isOpen, open, close } = useOverlayUrl(overlayName)
    const value = options.find(opt => opt.value === props.value)?.text ?? ''
    
    return (
      <>
        <OptionItem
          icon={<Search2GradIc />}
          title={titleText.imLookingFor}
          value={value}
          onClick={open}
        />
        
        
        <ModalSingleSelectList
          isOpen={isOpen}
          close={close}
          title={titleText.imLookingFor}
          options={options}
          selected={props.value}
          setSelected={props.setValue}
        />
      </>
    )
  }
)
export default ProfileImLookingForOption


