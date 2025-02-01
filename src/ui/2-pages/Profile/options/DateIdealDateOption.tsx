import React, { useMemo, useState } from 'react'
import ModalTextarea from 'src/ui/1-widgets/modals/ModalTextarea/ModalTextarea'
import { useOverlayUrl } from 'src/ui/components/action-providers/UseOverlayUrl/hook/useOverlayUrl.ts'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import EditableTextCard from 'src/ui/components/EditableTextCard/EditableTextCard'



const overlayName = 'dateIdealDate'



const DateIdealDateOption = React.memo(() => {
  const optionText = useUiValues(OptionUiText)
  const titleText = useUiValues(TitleUiText)
  
  const uiText = useMemo(() => ({
    whatWillMakeYourDatePerfect: 'Что сделает ваше свидание идеальным?',
  }), [titleText, optionText])
  
  
  const [saved, setSaved] = useState('')
  const [text, setText] = useState(saved)
  
  const onCancel = () => setText(saved)
  const onClear = () => setText('')
  
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  
  const onClose = () => {
    setSaved(text)
    close()
  }
  
  //const valueText = text || uiText.wonderAboutYourIdealDate
  
  return (
    <>
      <EditableTextCard
        title={uiText.whatWillMakeYourDatePerfect}
        text={saved}
        onClick={open}
      />
      
      
      <ModalTextarea
        isOpen={isOpen}
        onClose={onClose}
        title={uiText.whatWillMakeYourDatePerfect}
        value={text}
        onChange={ev => setText(ev.currentTarget.value)}
        onClear={onClear}
        onCancel={onCancel}
      />
    </>
  )
})
export default DateIdealDateOption



