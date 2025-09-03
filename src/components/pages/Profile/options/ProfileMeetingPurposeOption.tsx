import React, { useMemo, useState } from 'react'
import { Option } from 'src/models/ui/Option.ts'
import GoalGradIc from 'src/components/elems/icons/GradSvgIcons/pack/special/GoalGradIc.tsx'
import { useOverlayUrl } from 'src/components/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { OptionUiText } from 'src/locales/translations/OptionUiText.ts'
import { TitleUiText } from 'src/locales/translations/TitleUiText.ts'
import ModalSingleSelectList
  from 'src/components/widgets/modals/ModalSingleSelectList/ModalSingleSelectList'
import OptionItem from 'src/components/widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'




const overlayName = 'profileMeetingPurpose'



const ProfileMeetingPurposeOption = React.memo(
  () => {
    const optionText = useUiValues(OptionUiText)
    const titleText = useUiValues(TitleUiText)
    
    const text = useMemo(() => ({
      notSelected: optionText.notSelected,
    }), [titleText, optionText])
    
    
    const options = useMemo(() => [
      {
        id: 'Поиск серьезных отношений',
        text: 'Поиск серьезных отношений',
      },
      {
        id: 'Дружба и общение',
        text: 'Дружба и общение',
      },
      {
        id: 'Легкие романтические отношения',
        text: 'Легкие романтические отношения',
      },
      {
        id: 'Совместные хобби и увлечения',
        text: 'Совместные хобби и увлечения',
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
          icon={<GoalGradIc/>}
          title={'Цель знакомства'}
          value={value}
          onClick={open}
        />
        
        
        <ModalSingleSelectList
          isOpen={isOpen}
          onClose={onClose}
          title={'Цель знакомства'}
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
export default ProfileMeetingPurposeOption



