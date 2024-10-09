import React, { useMemo, useState } from 'react'
import ModalTextarea from 'src/ui/1-widgets/modals/ModalTextarea/ModalTextarea'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'







const overlayName = 'dateIdealDate'





const DateIdealDateOption = React.memo(() => {
  const optionText = useUiValues(OptionUiText)
  const titleText = useUiValues(TitleUiText)
  
  const uiText = useMemo(() => ({
    whatWillMakeYourDatePerfect: 'Что сделает ваше свидание идеальным?',
    wonderAboutYourIdealDate: 'Помечтайте о вашем идеальнои свмдании!',
  }), [titleText, optionText])
  
  
  const [text, setText] = useState('')
  
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  
  const valueText = text || uiText.wonderAboutYourIdealDate
  
  return (
    <>
      <OptionItem
        //icon={<GenderGradIc />}
        title={uiText.whatWillMakeYourDatePerfect}
        value={valueText}
        onClick={open}
      />
      
      
      <ModalTextarea
        isOpen={isOpen}
        onClose={close}
        title={uiText.whatWillMakeYourDatePerfect}
        value={text}
        onChange={ev => setText(ev.currentTarget.value)}
        onClear={() => setText('')}
      />
    </>
  )
})
export default DateIdealDateOption



