import React, { useMemo, useState } from 'react'
import WineBottleAlcoholGradIc
  from 'src/components/elems/icons/GradSvgIcons/pack/special/WineBottleAlcoholGradIc.tsx'
import { useOverlayUrl } from 'src/components/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { OptionUiText } from 'src/locales/translations/OptionUiText.ts'
import { TitleUiText } from 'src/locales/translations/TitleUiText.ts'
import ModalSingleSelectList
  from 'src/components/widgets/modals/ModalSingleSelectList/ModalSingleSelectList'
import OptionItem from 'src/components/widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from '@libs/ui-text/useUiText.ts'







const overlayName = 'profileAlcohol'





const ProfileAlcoholOption = React.memo(() => {
  const optionText = useUiValues(OptionUiText)
  const titleText = useUiValues(TitleUiText)
  
  const text = useMemo(() => ({
    attitudeToAlcohol: 'Отношение к алкоголю',
    notSelected: optionText.notSelected,
    itNegative: 'Отрицательное',
    itNeutral: 'Нейтральное',
    itPositive: 'Положительное',
  }), [titleText, optionText])
  
  
  const options = useMemo(() => [
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
  ], [text])
  
  
  const [saved, setSaved] = useState('')
  const [selected, setSelected] = useState(saved)
  
  const onCancel = () => setSelected(saved)
  
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  
  const onClose = () => {
    setSaved(selected)
    close()
  }
  
  const valueText = options.find(opt => opt.id === selected)?.text ?? text.notSelected
  
  
  return (
    <>
      <OptionItem
        icon={<WineBottleAlcoholGradIc/>}
        title={text.attitudeToAlcohol}
        value={valueText}
        onClick={open}
      />
      
      
      <ModalSingleSelectList
        isOpen={isOpen}
        onClose={onClose}
        title={text.attitudeToAlcohol}
        options={options}
        selected={selected}
        setSelected={setSelected}
        notSelectedValue=''
        onCancel={onCancel}
      />
    </>
  )
})
ProfileAlcoholOption.displayName = 'ProfileAlcoholOption'
export default ProfileAlcoholOption



