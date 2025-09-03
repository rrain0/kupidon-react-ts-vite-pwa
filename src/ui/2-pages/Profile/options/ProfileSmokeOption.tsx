import React, { useMemo, useState } from 'react'
import { Option } from 'src/models/ui/Option.ts'
import SmokeCigaretteGradIc
  from 'src/ui/0-elements/icons/GradSvgIcons/pack/special/SmokeCigaretteGradIc.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { OptionUiText } from 'src/locales/translations/OptionUiText.ts'
import { TitleUiText } from 'src/locales/translations/TitleUiText.ts'
import ModalSingleSelectList
  from 'src/ui/1-widgets/modals/ModalSingleSelectList/ModalSingleSelectList'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'







const overlayName = 'profileSmoke'





const ProfileSmokeOption = React.memo(
  () => {
    const optionText = useUiValues(OptionUiText)
    const titleText = useUiValues(TitleUiText)
    
    const text = useMemo(() => ({
      attitudeTowardsSmoke: 'Отношение к курению',
      notSelected: optionText.notSelected,
      itNegative: 'Отрицательное',
      itNeutral: 'Нейтральное',
      itPositive: 'Положительное',
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
          icon={<SmokeCigaretteGradIc/>}
          title={text.attitudeTowardsSmoke}
          value={value}
          onClick={open}
        />
        
        
        <ModalSingleSelectList
          isOpen={isOpen}
          onClose={onClose}
          title={text.attitudeTowardsSmoke}
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
export default ProfileSmokeOption



