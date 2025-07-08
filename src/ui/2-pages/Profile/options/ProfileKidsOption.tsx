import React, { useMemo, useState } from 'react'
import BabyGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/special/BabyGradIc.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import ModalSingleSelectList
  from 'src/ui/1-widgets/modals/ModalSingleSelectList/ModalSingleSelectList'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'



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



