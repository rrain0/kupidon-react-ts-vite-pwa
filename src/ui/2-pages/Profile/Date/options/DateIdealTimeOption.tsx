import React, { useMemo, useState } from 'react'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText'
import { Option } from 'src/ui-data/models/Option.ts'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import ModalMultiSelectList from 'ui/1-widgets/modals/ModalMultiSelectList/ModalMultiSelectList'



const overlayName = 'dateTime'


const DateIdealTimeOption = React.memo(
  () => {
    const optionText = useUiValues(OptionUiText)
    const titleText = useUiValues(TitleUiText)
    
    const text = useMemo(() => ({
      yourIdealTimeForDate: 'Ваше идеальное время для свидания',
      notSelected: optionText.notSelected,
      morning: 'Утро',
      day: 'День',
      evening: 'Вечер',
      night: 'Ночь',
      doesNotMatter: 'Не имеет значения',
    }), [titleText, optionText])
    
    const [selected, setSelected] = useState<string[]>([])
    
    const options = useMemo(() => {
      return [
        {
          id: text.morning,
          text: text.morning,
        },
        {
          id: text.day,
          text: text.day,
        },
        {
          id: text.evening,
          text: text.evening,
        },
        {
          id: text.night,
          text: text.night,
        },
        {
          id: text.doesNotMatter,
          text: text.doesNotMatter,
        },
      ] satisfies Option<string>[]
    }, [text])
    
    const { isOpen, open, close } = useOverlayUrl(overlayName)
    
    const valueText = selected
      .map(v => options.find(o => o.id === v))
      .filter(o => !!o)
      .map(o => o.text)
      .join(', ')
      || text.notSelected
    
    
    return (
      <>
        <OptionItem
          //icon={<GenderGradIc />}
          title={text.yourIdealTimeForDate}
          value={valueText}
          onClick={open}
        />
        
        
        <ModalMultiSelectList
          isOpen={isOpen}
          close={close}
          title={text.yourIdealTimeForDate}
          options={options}
          selected={selected}
          setSelected={setSelected}
        />
      
      </>
    )
  }
)
export default DateIdealTimeOption


