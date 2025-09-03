import React, { useMemo, useState } from 'react'
import { Option } from 'src/models/ui/Option.ts'
import BasketballGradIc
  from 'src/ui/0-elements/icons/GradSvgIcons/pack/special/BasketballGradIc.tsx'
import ModalSingleSelectList
  from 'src/ui/1-widgets/modals/ModalSingleSelectList/ModalSingleSelectList'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { OptionUiText } from 'src/locales/translations/OptionUiText.ts'
import { TitleUiText } from 'src/locales/translations/TitleUiText.ts'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'







const overlayName = 'sportFrequency'





const ProfileSportFrequencyOption = React.memo(
  () => {
    const optionText = useUiValues(OptionUiText)
    const titleText = useUiValues(TitleUiText)
    
    const text = useMemo(() => ({
      notSelected: optionText.notSelected,
    }), [titleText, optionText])
    
    
    
    
    const options = useMemo(() => [
      {
        id: '1',
        text: 'Ежедневно',
      }, {
        id: '2',
        text: 'Несколько раз в неделю',
      }, {
        id: '3',
        text: 'Периодически по настроению',
      }, {
        id: '4',
        text: 'Редко',
      }, {
        id: '5',
        text: 'Не занимаюсь спортом',
      }, {
        id: '',
        text: text.notSelected,
      },
    ] satisfies Option<string>[], [text])
    
    
    const [selected, setSelected] = useState<string>('')
    
    const { isOpen, open, close } = useOverlayUrl(overlayName)
    const value = options.find(opt => opt.id === selected)?.text ?? ''
    
    
    return (
      <>
        <OptionItem
          icon={<BasketballGradIc/>}
          title={'Как часто вы занимаетесь спортом'}
          value={value}
          onClick={open}
        />
        
        
        <ModalSingleSelectList
          isOpen={isOpen}
          onClose={close}
          title={'Как часто вы занимаетесь спортом'}
          options={options}
          selected={selected}
          setSelected={setSelected}
          notSelectedValue={''}
        />
      </>
    )
  }
)
export default ProfileSportFrequencyOption



