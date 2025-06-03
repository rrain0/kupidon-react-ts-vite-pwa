import React, { useMemo, useState } from 'react'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText'
import { Option } from 'src/ui-data/models/Option.ts'
import { GradSvgIconsPack } from 'src/ui/0-elements/icons/GradSvgIcons/GradSvgIconsPack.tsx'
import {
  GetIndicatorsData
} from 'src/ui/1-widgets/modals/ModalMultiSelectList/modalMultiSelectUtils.ts'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { ArrayU } from 'src/util/common/ArrayU'
import ModalMultiSelectList from 'src/ui/1-widgets/modals/ModalMultiSelectList/ModalMultiSelectList'
import ClockGradIc = GradSvgIconsPack.ClockGradIc



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
    
    const [saved, setSaved] = useState<string[]>([])
    const [selected, setSelected] = useState<string[]>(saved)
    const [selectedMemo, setSelectedMemo] = useState<string[]>([])
    
    const onClear = () => {
      setSelected([])
      setSelectedMemo([])
    }
    const onCancel = () => setSelected(saved)
    
    const onSelect = (id: string) => {
      if (id !== options[4].id) {
        const newSelected = ArrayU.toggleTo(
          ArrayU.removeToIf(selected, options[4].id),
          id
        )
        setSelected(newSelected)
        if (newSelected.length === 4) {
          setSelectedMemo(selected)
          setSelected([options[4].id])
        }
      }
      else {
        if (selected.includes(id)) {
          setSelected(selectedMemo)
        }
        else {
          setSelectedMemo(selected)
          setSelected([id])
        }
      }
    }
    
    const getIndicatorsData: GetIndicatorsData<string> = (options, option, optionI, isSelected) => {
      if (option.id !== options[4].id) return options
        .filter(it => it.id !== options[4].id)
        .map((it, i) => {
          if (!isSelected) return false
          if (option.id !== it.id) return false
          return true
        })
      
      return options
        .filter(it => it.id === options[4].id)
        .map((it, i) => {
          if (!isSelected) return false
          if (option.id !== it.id) return false
          return true
        })
    }
    
    const { isOpen, open, close } = useOverlayUrl(overlayName)
    
    const onClose = () => {
      setSaved(selected)
      close()
    }
    
    const valueText = selected
      .map(v => options.find(o => o.id === v))
      .filter(o => !!o)
      .map(o => o.text)
      .join(', ')
      || text.notSelected
    
    
    return (
      <>
        <OptionItem
          icon={<ClockGradIc/>}
          title={text.yourIdealTimeForDate}
          value={valueText}
          onClick={open}
        />
        
        
        <ModalMultiSelectList
          isOpen={isOpen}
          onClose={onClose}
          title={text.yourIdealTimeForDate}
          options={options}
          selected={selected}
          onSelect={onSelect}
          //getIndicatorsData={getIndicatorsData}
          onClear={onClear}
          onCancel={onCancel}
        />
      
      </>
    )
  }
)
export default DateIdealTimeOption


