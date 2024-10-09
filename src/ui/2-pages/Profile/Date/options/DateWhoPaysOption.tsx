import React, { useMemo, useState } from 'react'
import { Gender } from 'src/api/model/Gender.ts'
import { Option } from 'src/ui-data/models/Option.ts'
import ModalRadio from 'src/ui/1-widgets/modals/ModalRadio/ModalRadio.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from 'src/mini-libs/form-validation/components/ValidationWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import GenderGradIc = SvgGradIcons.GenderGradIc
import ModalSingleSelectList from 'ui/1-widgets/modals/ModalSingleSelectList/ModalSingleSelectList'







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
  
  
  const [selected, setSelected] = useState('')
  
  
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
  
  
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  
  const valueText = options.find(opt => opt.id === selected)?.text ?? text.notSelected
  
  
  return (
    <>
      <OptionItem
        //icon={<GenderGradIc />}
        title={text.yourPreferenceForAPaymentOnADate}
        value={valueText}
        onClick={open}
      />
      
      
      <ModalSingleSelectList
        isOpen={isOpen}
        close={close}
        title={text.yourPreferenceForAPaymentOnADate}
        options={options}
        selected={selected}
        setSelected={setSelected}
        notSelectedValue={''}
      />
    </>
  )
})
export default DateWhoPaysOption



