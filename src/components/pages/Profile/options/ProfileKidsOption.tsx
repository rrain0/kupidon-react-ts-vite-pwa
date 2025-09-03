import React, { useMemo, useState } from 'react'
import BabyGradIc from 'src/components/elems/icons/GradSvgIcons/pack/special/BabyGradIc.tsx'
import { useOverlayUrl } from 'src/components/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { OptionUiText } from 'src/locales/translations/OptionUiText.ts'
import { TitleUiText } from 'src/locales/translations/TitleUiText.ts'
import ModalSingleSelectList
  from 'src/components/widgets/modals/ModalSingleSelectList/ModalSingleSelectList'
import OptionItem from 'src/components/widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from '@libs/ui-text/useUiText.ts'



const overlayName = 'profileKids'



const ProfileKidsOption = React.memo(
  () => {
    const optionText = useUiValues(OptionUiText)
    const titleText = useUiValues(TitleUiText)
    
    const text = useMemo(() => ({
      notSelected: optionText.notSelected,
      kids: 'Дети',
      has: 'Есть',
      hasNot: 'Нет',
    }), [titleText, optionText])
    
    
    
    
    const options = useMemo(() => [
      {
        id: 'Есть',
        text: 'Есть',
      },
      {
        id: 'Нет',
        text: 'Нет',
      },
      {
        id: '',
        text: text.notSelected,
      },
    ], [text])
    
    
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
          icon={<BabyGradIc/>}
          title={text.kids}
          value={value}
          onClick={open}
        />
        
        
        <ModalSingleSelectList
          isOpen={isOpen}
          onClose={onClose}
          title={text.kids}
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
export default ProfileKidsOption



