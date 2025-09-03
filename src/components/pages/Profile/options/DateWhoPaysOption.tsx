import React, { useMemo, useState } from 'react'
import { Option } from 'src/models/ui/Option.ts'
import CardsDollarGradIc
  from 'src/components/elems/icons/GradSvgIcons/pack/special/CardsDollarGradIc.tsx'
import { useOverlayUrl } from 'src/components/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { OptionUiText } from 'src/locales/translations/OptionUiText.ts'
import { TitleUiText } from 'src/locales/translations/TitleUiText.ts'
import OptionItem from 'src/components/widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import ModalSingleSelectList from 'src/components/widgets/modals/ModalSingleSelectList/ModalSingleSelectList'







const overlayName = 'dateWhoPays'





const DateWhoPaysOption = React.memo(() => {
  const optionText = useUiValues(OptionUiText)
  const titleText = useUiValues(TitleUiText)
  
  const text = useMemo(() => ({
    yourPreferenceForAPaymentOnADate: 'Ваши предпочтения по оплате на свидании',
    notSelected: optionText.notSelected,
    iAlwaysPay: 'Я всегда оплачиваю',
    invoiceIsPaidByPartner: 'Счёт оплачивает партнёр',
    iPreferToSplitTheBill: 'Предпочитаю делить счёт',
    doesNotMatter: 'Не имеет значения',
  }), [titleText, optionText])
  
  
  const options = useMemo(() => [
    {
      id: text.iAlwaysPay,
      text: text.iAlwaysPay,
    },
    {
      id: text.invoiceIsPaidByPartner,
      text: text.invoiceIsPaidByPartner,
    },
    {
      id: text.iPreferToSplitTheBill,
      text: text.iPreferToSplitTheBill,
    },
    {
      id: text.doesNotMatter,
      text: text.doesNotMatter,
    },
  ] satisfies Option<string>[], [text])
  
  
  
  const [saved, setSaved] = useState('')
  const [selected, setSelected] = useState(saved)
  
  const onCancel = () => setSelected(saved)
  
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  
  const onClose = () => {
    setSaved(selected)
    close()
  }
  
  const valueText = options.find(opt => opt.id === selected)?.text ?? text.notSelected
  
  
  return (
    <>
      <OptionItem
        icon={<CardsDollarGradIc/>}
        title={text.yourPreferenceForAPaymentOnADate}
        value={valueText}
        onClick={open}
      />
      
      
      <ModalSingleSelectList
        isOpen={isOpen}
        onClose={onClose}
        title={text.yourPreferenceForAPaymentOnADate}
        options={options}
        selected={selected}
        setSelected={setSelected}
        notSelectedValue={''}
        onCancel={onCancel}
      />
    </>
  )
})
export default DateWhoPaysOption



