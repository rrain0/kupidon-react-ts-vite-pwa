import React, { useMemo } from 'react'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui-props/ui-values/OptionUiText.ts'
import { TitleUiText } from 'src/ui-props/ui-values/TitleUiText.ts'
import OptionItem from 'src/ui/widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from '@util/ui-text/useUiText.ts'
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



