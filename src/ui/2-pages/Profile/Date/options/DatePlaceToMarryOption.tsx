import React, { useMemo } from 'react'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'







const overlayName = 'datePlaceToMarry'





const DatePlaceToMarryOption =
React.memo(
()=>{
  const optionText = useUiValues(OptionUiText)
  const titleText = useUiValues(TitleUiText)
  
  const text = useMemo(()=>({
  
  }), [titleText, optionText])
  
  
  
  
  
  
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  
  
  return <>
    <OptionItem
      //icon={<GenderGradIc />}
      title={'Предпочтение по месту проведения свадьбы'}
      value={'Не выбрано'}
      onClick={open}
    />
    
    
  </>
})
export default DatePlaceToMarryOption



