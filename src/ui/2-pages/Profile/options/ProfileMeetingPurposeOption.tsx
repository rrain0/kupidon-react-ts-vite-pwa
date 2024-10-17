import React, { useMemo, useState } from 'react'
import { Option } from 'src/ui-data/models/Option.ts'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import ModalSingleSelectList
  from 'src/ui/1-widgets/modals/ModalSingleSelectList/ModalSingleSelectList'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import GoalGradIc = SvgGradIcons.GoalGradIc




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
          icon={<GoalGradIc />}
          title={'Цель знакомства'}
          value={value}
          onClick={open}
        />
        
        
        <ModalSingleSelectList
          isOpen={isOpen}
          close={onClose}
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



