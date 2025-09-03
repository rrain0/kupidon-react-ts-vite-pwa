import React, { useMemo, useState } from 'react'
import { Option } from 'src/models/ui/Option.ts'
import BengalCatGradIc from 'src/components/elems/icons/GradSvgIcons/pack/special/BengalCatGradIc.tsx'
import ModalRadio from 'src/components/widgets/modals/ModalRadio/ModalRadio.tsx'
import ModalSingleSelectList
  from 'src/components/widgets/modals/ModalSingleSelectList/ModalSingleSelectList'
import { useOverlayUrl } from 'src/components/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { OptionUiText } from 'src/locales/translations/OptionUiText.ts'
import { TitleUiText } from 'src/locales/translations/TitleUiText.ts'
import OptionItem from 'src/components/widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'







const overlayName = 'profilePets'





const ProfilePetsOption = React.memo(
  () => {
    const optionText = useUiValues(OptionUiText)
    const titleText = useUiValues(TitleUiText)
    
    const text = useMemo(() => ({
      attitudeTowardsPets: 'Отношение к домашним животным',
      notSelected: optionText.notSelected,
      itPositive: 'Положительное',
      itNeutral: 'Нейтральное',
      itNegative: 'Отрицательное',
    }), [titleText, optionText])
    
    
    const options = useMemo(
      () => [
        {
          id: text.itPositive,
          text: text.itPositive,
        },
        {
          id: text.itNeutral,
          text: text.itNeutral,
        },
        {
          id: text.itNegative,
          text: text.itNegative,
        },
        {
          id: '',
          text: text.notSelected,
        },
      ] satisfies Option<string>[],
      [text]
    )
    
    
    const [saved, setSaved] = useState('')
    const [selected, setSelected] = useState(saved)
    
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
          icon={<BengalCatGradIc/>}
          title={text.attitudeTowardsPets}
          value={value}
          onClick={open}
        />
        
        
        <ModalSingleSelectList
          isOpen={isOpen}
          onClose={onClose}
          title={text.attitudeTowardsPets}
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
export default ProfilePetsOption



