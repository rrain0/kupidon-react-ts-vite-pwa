import React, { useMemo, useState } from 'react'
import { Option } from 'src/models/ui/Option.ts'
import MapLocationGradIc from 'src/components/elems/icons/GradSvgIcons/pack/ui/MapLocationGradIc.tsx'
import { useOverlayUrl } from 'src/components/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { OptionUiText } from 'src/locales/translations/OptionUiText.ts'
import { TitleUiText } from 'src/locales/translations/TitleUiText.ts'
import ModalSingleSelectList
  from 'src/components/widgets/modals/ModalSingleSelectList/ModalSingleSelectList'
import OptionItem from 'src/components/widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from '@libs/ui-text/useUiText.ts'




const overlayName = 'profilePlaceOfResidence'



const ProfilePlaceOfResidenceOption = React.memo(
  () => {
    const optionText = useUiValues(OptionUiText)
    const titleText = useUiValues(TitleUiText)
    
    const text = useMemo(() => ({
      notSelected: optionText.notSelected,
    }), [titleText, optionText])
    
    
    const options = useMemo(() => [
      {
        id: '1',
        text: 'Октябрьский округ',
      },
      {
        id: '2',
        text: 'Свердловский округ',
      },
      {
        id: '3',
        text: 'Правобережный округ',
      },
      {
        id: '4',
        text: 'Ленинский округ',
      },
      {
        id: '',
        text: text.notSelected,
      },
    ] satisfies Option<string>[], [text])
    
    
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
          icon={<MapLocationGradIc/>}
          title={'Место проживания'}
          value={value}
          onClick={open}
        />
        
        
        <ModalSingleSelectList
          isOpen={isOpen}
          onClose={onClose}
          title={'Место проживания'}
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
export default ProfilePlaceOfResidenceOption



