import React, { useMemo } from 'react'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/useOverlayUrl.ts'
import { OptionUiText } from 'src/ui-props/ui-values/OptionUiText.ts'
import { TitleUiText } from 'src/ui-props/ui-values/TitleUiText.ts'
import OptionItem from 'src/ui/widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from '@util/ui-text/useUiText.ts'







const overlayName = 'partnerCharacterAndPersonalQualities'





const PartnerCharacterAndPersonalQualitiesOption =
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
      title={'Характер и личные качества партнера'}
      value={'Не выбрано'}
      onClick={open}
    />
    
    
  </>
})
export default PartnerCharacterAndPersonalQualitiesOption



