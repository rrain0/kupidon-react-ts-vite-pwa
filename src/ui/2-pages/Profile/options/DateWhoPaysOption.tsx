import React, { useMemo, useState } from 'react'
import { Option } from 'src/ui-data/models/Option.ts'
import { SvgGradIconsPack } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIconsPack.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { FormFieldWrapRenderProps } from 'src/mini-libs/form-data/components/FormFieldWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import ModalSingleSelectList from 'src/ui/1-widgets/modals/ModalSingleSelectList/ModalSingleSelectList'
import CardsDollarGradIc = SvgGradIconsPack.CardsDollarGradIc







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



