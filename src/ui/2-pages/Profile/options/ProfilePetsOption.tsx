import React, { useMemo, useState } from 'react'
import { Option } from 'src/ui-data/models/Option.ts'
import ModalRadio from 'src/ui/1-widgets/modals/ModalRadio/ModalRadio.tsx'
import ModalSingleSelectList
  from 'src/ui/1-widgets/modals/ModalSingleSelectList/ModalSingleSelectList'
import { useOverlayUrl } from 'src/ui/components/action-providers/UseOverlayUrl/hook/useOverlayUrl.ts'
import { SvgGradIconsPack } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIconsPack.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from 'src/mini-libs/form-validation/components/ValidationWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import BengalCatGradIc = SvgGradIconsPack.BengalCatGradIc







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
          icon={<BengalCatGradIc />}
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



