import React, { useMemo } from 'react'
import { useOverlayUrl } from 'src/components/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { OptionUiText } from 'src/locales/translations/OptionUiText.ts'
import { TitleUiText } from 'src/locales/translations/TitleUiText.ts'
import OptionItem from 'src/components/widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from '@libs/ui-text/useUiText.ts'







const overlayName = 'dateDesiredPlaceOrEvent'





const DateDesiredPlaceOrEventOption = React.memo(() => {
  const optionText = useUiValues(OptionUiText)
  const titleText = useUiValues(TitleUiText)
  
  const text = useMemo(() => ({
  
  }), [titleText, optionText])
  
  
  
  
  
  
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  
  
  return (
    <>
      <OptionItem
        //icon={<GenderGradIc/>}
        title={'Какое событие или место вы бы хотели посетить вместе с партнером?'}
        value={'Не выбрано'}
        //onClick={open}
      />
    </>
  )
})
export default DateDesiredPlaceOrEventOption



