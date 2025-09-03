import React, { useMemo, useState } from 'react'
import { PartnerGender } from 'src/models/PartnerGender.ts'
import { Option } from 'src/models/ui/Option.ts'
import SearchGradIc from 'src/components/elems/icons/GradSvgIcons/pack/ui/SearchGradIc.tsx'
import { useOverlayUrl } from 'src/components/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { OptionUiText } from 'src/locales/translations/OptionUiText.ts'
import { TitleUiText } from 'src/locales/translations/TitleUiText.ts'
import ModalSingleSelectList
  from 'src/components/widgets/modals/ModalSingleSelectList/ModalSingleSelectList'
import OptionItem from 'src/components/widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from '@libs/ui-text/useUiText.ts'




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


