import React from 'react'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { ProfilePageValidation } from 'src/ui/pages/Profile/validation.ts'
import { OptionUiText } from 'src/ui/ui-values/OptionUiText.ts'
import { TitleUiText } from 'src/ui/ui-values/TitleUiText.ts'
import OptionItem from 'src/ui/elements/OptionAndValueItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from '@util/form-validation/ValidationWrap.tsx'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import ModalRangePicker from 'src/ui/widgets/modal-element/ModalRangePicker/ModalRangePicker.tsx'
import RulerVerticalGradIc = SvgGradIcons.RulerVerticalGradIc
import UserValues = ProfilePageValidation.UserValues







const overlayName = 'height'


const PartnerHeightOption =
React.memo(
(props: ValidationWrapRenderProps<UserValues['partnerHeight']>)=>{
  const optionText = useUiValues(OptionUiText)
  const titleText = useUiValues(TitleUiText)
  
  
  const text = {
    any: optionText.any.toLowerCase(),
    from: optionText.from.toLowerCase(),
    to: optionText.to.toLowerCase(),
    cm: optionText.cm.toLowerCase(),
  }
  const textValue = function(){
    const [from, to] = props.value
    if (from===null && to===null) return text.any
    if (from===null) return `${text.to} ${to} ${text.cm}`
    if (to===null) return `${from}+ ${text.cm}`
    return `${from}-${to} ${text.cm}`
  }()
  
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  
  
  return <>
    <OptionItem
      icon={<RulerVerticalGradIc />}
      title={titleText.partnerHeight}
      value={textValue}
      onClick={open}
    />
    
    
    <ModalRangePicker
      isOpen={isOpen}
      close={close}
      title={titleText.partnerHeight}
    />
    
  </>
})
export default PartnerHeightOption


