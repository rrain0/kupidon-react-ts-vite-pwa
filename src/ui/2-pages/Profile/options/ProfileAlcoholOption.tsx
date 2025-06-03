import React, { useMemo, useState } from 'react'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { GradSvgIconsPack } from 'src/ui/0-elements/icons/GradSvgIcons/GradSvgIconsPack.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import ModalSingleSelectList
  from 'src/ui/1-widgets/modals/ModalSingleSelectList/ModalSingleSelectList'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import WineBottleAlcoholGradIc = GradSvgIconsPack.WineBottleAlcoholGradIc







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



