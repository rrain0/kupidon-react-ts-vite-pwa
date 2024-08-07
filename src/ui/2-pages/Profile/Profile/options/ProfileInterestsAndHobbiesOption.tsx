import React, { useMemo, useState } from 'react'
import { OPTION_CUSTOM } from 'src/ui-data/models/Option'
import ModalMultiSelectList from 'src/ui/1-widgets/modals/ModalMultiSelectList/ModalMultiSelectList'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import TelescopeGradIc = SvgGradIcons.TelescopeGradIc







const overlayName = 'interestsAndHobbies'





const ProfileInterestsAndHobbiesOption = React.memo(
  () => {
    const optionText = useUiValues(OptionUiText)
    const titleText = useUiValues(TitleUiText)
    
    const text = useMemo(() => ({
      notSelected: optionText.notSelected,
    }), [titleText, optionText])
    
    
    const [selected, setSelected] = useState([] as string[])
    const [customOptionText, setCustomOptionText] = useState('')
    
    const options = useMemo(
      () => [
        {
          value: '1',
          text: 'Путешествия',
        }, {
          value: '2',
          text: 'Музыка',
        }, {
          value: '3',
          text: 'Спорт',
        }, {
          value: '4',
          text: 'Кино',
        }, {
          value: '5',
          text: 'Искусство',
        }, {
          value: OPTION_CUSTOM,
          text: '',
        },
      ],
      [text]
    )
    
    
    
    const { isOpen, open, close } = useOverlayUrl(overlayName)
    
    const value = selected
      .map(v => options.find(o => o.value === v))
      .filter(o => !!o)
      .map(o => o!.text)
      .join(', ')
      || text.notSelected
    
    
    return (
      <>
        <OptionItem
          icon={<TelescopeGradIc />}
          title={'Интересы и хобби'}
          value={value}
          onClick={open}
        />
        
        
        <ModalMultiSelectList
          isOpen={isOpen}
          close={close}
          title={'Интересы и хобби'}
          options={options}
          selected={selected}
          setSelected={setSelected}
          customOptionText={customOptionText}
          setCustomOptionText={setCustomOptionText}
        />
      </>
    )
  }
)
export default ProfileInterestsAndHobbiesOption



