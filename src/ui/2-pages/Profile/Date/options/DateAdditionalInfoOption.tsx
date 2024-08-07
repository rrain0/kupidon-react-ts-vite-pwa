import React, { useMemo } from 'react'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import InfoSquareRoundedGradIc = SvgGradIcons.InfoSquareRoundedGradIc







const overlayName = 'dateAdditionalInfo'





const DateAdditionalInfoOption =
React.memo(
()=>{
  const optionText = useUiValues(OptionUiText)
  const titleText = useUiValues(TitleUiText)
  
  const text = useMemo(()=>({
  
  }), [titleText, optionText])
  
  
  
  
  
  
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  
  
  return <>
    <OptionItem
      icon={<InfoSquareRoundedGradIc />}
      title={'Дополнительная информация о свидании, такие как предпочтения по музыке, еде или другим аспектам свидания'}
      value={'Не выбрано'}
      onClick={open}
    />
    
    
  </>
})
export default DateAdditionalInfoOption



