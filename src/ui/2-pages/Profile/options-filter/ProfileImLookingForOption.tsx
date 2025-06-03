import React, { useMemo, useState } from 'react'
import { PartnerGender } from 'src/api/model/PartnerGender.ts'
import { Option } from 'src/ui-data/models/Option.ts'
import ModalRadio from 'src/ui/1-widgets/modals/ModalRadio/ModalRadio.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { GradSvgIconsPack } from 'src/ui/0-elements/icons/GradSvgIcons/GradSvgIconsPack.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import ModalSingleSelectList
  from 'src/ui/1-widgets/modals/ModalSingleSelectList/ModalSingleSelectList'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { FormFieldWrapRenderProps } from 'src/mini-libs/form-data/components/FormFieldWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import SearchGradIc = GradSvgIconsPack.SearchGradIc




const overlayName = 'imLookingFor'


export type PartnerGenderOptionValues = PartnerGender | ''
export type PartnerGenderUiOptions = Option<PartnerGenderOptionValues>[]


// Partner Gender
const ProfileImLookingForOption = React.memo(
  () => {
    const titleText = useUiValues(TitleUiText)
    const optionText = useUiValues(OptionUiText)
    
    const text = useMemo(() => ({
      ofGuys: optionText.ofGuys,
      ofGirls: optionText.ofGirls,
      ofGuysAndGirls: optionText.ofGuysAndGirls,
      notSelected: optionText.notSelected,
    }), [titleText, optionText])
    
    
    const options = useMemo(() => [
      {
        id: 'MALE',
        text: text.ofGuys,
      },
      {
        id: 'FEMALE',
        text: text.ofGirls,
      },
      {
        id: 'MALE_FEMALE',
        text: text.ofGuysAndGirls,
      },
      {
        id: '',
        text: text.notSelected,
      },
    ] satisfies PartnerGenderUiOptions, [text])
    
    
    const [saved, setSaved] = useState('')
    const [selected, setSelected] = useState('')
    
    const onCancel = () => setSelected(saved)
    
    
    const { isOpen, open, close } = useOverlayUrl(overlayName)
    
    const onClose = () => {
      setSaved(selected)
      close()
    }
    
    const value = options.find(opt => opt.id === selected)?.text ?? ''
    
    return (
      <>
        <OptionItem
          icon={<SearchGradIc/>}
          title={titleText.imLookingFor}
          value={value}
          onClick={open}
        />
        
        
        <ModalSingleSelectList
          isOpen={isOpen}
          onClose={onClose}
          title={titleText.imLookingFor}
          options={options}
          selected={selected}
          setSelected={setSelected}
          notSelectedValue={''}
          onCancel={onCancel}
        />
      </>
    )
  }
)
export default ProfileImLookingForOption


