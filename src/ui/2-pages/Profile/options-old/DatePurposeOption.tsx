import React, { useMemo, useState } from 'react'
import { Option } from 'src/models/ui/Option.ts'
import ModalRadio from 'src/ui/1-widgets/modals/ModalRadio/ModalRadio.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { OptionUiText } from 'src/locales/translations/OptionUiText.ts'
import { TitleUiText } from 'src/locales/translations/TitleUiText.ts'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'



const overlayName = 'datePurpose'



const DatePurposeOption = React.memo(
  () => {
    const optionText = useUiValues(OptionUiText)
    const titleText = useUiValues(TitleUiText)
    
    const text = useMemo(() => ({
      notSelected: optionText.notSelected,
    }), [titleText, optionText])
    
    
    const [selected, setSelected] = useState('')
    
    
    const genderOptions = useMemo(
      () => [
        {
          id: '1',
          text: 'Романтика',
        },
        {
          id: '2',
          text: 'Дружба',
        },
        {
          id: '3',
          text: 'Серьезные отношения',
        },
        {
          id: '4',
          text: 'Свой ответ',
        },
        {
          id: '',
          text: text.notSelected,
        },
      ] satisfies Option<string>[],
      [text]
    )
    
    
    
    const { isOpen, open, close } = useOverlayUrl(overlayName)
    const value = genderOptions.find(opt => opt.id === selected)?.text ?? ''
    
    
    return (
      <>
        <OptionItem
          //icon={<GenderGradIc/>}
          title={'Цель свидания'}
          value={value}
          onClick={open}
        />
        
        <ModalRadio
          isOpen={isOpen}
          close={close}
          title={'Цель свидания'}
          options={genderOptions}
          value={selected}
          onSelect={setSelected}
        />
      </>
    )
  }
)
export default DatePurposeOption



