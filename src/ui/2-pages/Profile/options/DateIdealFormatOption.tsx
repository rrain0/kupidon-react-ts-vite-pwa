import React, { useMemo, useState } from 'react'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText'
import { Option } from 'src/ui-data/models/Option.ts'
import { GradSvgIconsPack } from 'src/ui/0-elements/icons/GradSvgIcons/GradSvgIconsPack.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import ModalMultiSelectList from 'src/ui/1-widgets/modals/ModalMultiSelectList/ModalMultiSelectList'
import { ArrayU } from 'src/util/common/ArrayU'
import Couple2GradIc = GradSvgIconsPack.Couple2GradIc



const overlayName = 'dateFormat'


const DateIdealFormatOption = React.memo(
  () => {
    const optionText = useUiValues(OptionUiText)
    const titleText = useUiValues(TitleUiText)
    
    const text = useMemo(() => ({
      yourIdealDateFormat: 'Ваш идеальный формат свидания',
      notSelected: optionText.notSelected,
      romantic: 'Романтический',
      cultural: 'Культурный',
      active: 'Активный',
      entertaining: 'Развлекательный',
      nonstandard: 'Нестандартный',
    }), [titleText, optionText])
    
    const options = useMemo(() => {
      return [
        {
          id: text.romantic,
          text: text.romantic,
        },
        {
          id: text.cultural,
          text: text.cultural,
        },
        {
          id: text.active,
          text: text.active,
        },
        {
          id: text.entertaining,
          text: text.entertaining,
        },
        {
          id: text.nonstandard,
          text: text.nonstandard,
        },
      ] satisfies Option<string>[]
    }, [text])
    
    
    const [saved, setSaved] = useState<string[]>([])
    const [selected, setSelected] = useState<string[]>(saved)
    
    const onSelect = (id: string) => setSelected(ArrayU.toggleTo(selected, id))
    const onClear = () => setSelected([])
    const onCancel = () => setSelected(saved)
    
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
          icon={<Couple2GradIc/>}
          title={text.yourIdealDateFormat}
          value={valueText}
          onClick={open}
        />
        
        
        <ModalMultiSelectList
          isOpen={isOpen}
          onClose={onClose}
          title={text.yourIdealDateFormat}
          options={options}
          selected={selected}
          onSelect={onSelect}
          onClear={onClear}
          onCancel={onCancel}
        />
        
      </>
    )
  }
)
export default DateIdealFormatOption


