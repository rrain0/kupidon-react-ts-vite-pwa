import React, { useMemo, useState } from 'react'
import { OptionUiText } from 'src/ui-props/ui-values/OptionUiText.ts'
import ModalInput from 'src/ui/widgets/modal-element/ModalInput/ModalInput.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { TitleUiText } from 'src/ui-props/ui-values/TitleUiText.ts'
import OptionItem from 'src/ui/widgets/OptionItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from '@util/mini-libs/form-validation/components/ValidationWrap.tsx'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import RulerVerticalGradIc = SvgGradIcons.RulerVerticalGradIc




const overlayName = 'height'


const ProfileHeightOption =
React.memo(
(props: ValidationWrapRenderProps<string>)=>{
  const titleText = useUiValues(TitleUiText)
  const optionText = useUiValues(OptionUiText)
  
  const text = useMemo(()=>({
    height: titleText.height,
    heightL: titleText.height.toLowerCase(),
    notSpecified: optionText.notSpecified,
    cm: optionText.cm.toLowerCase(),
  }), [titleText, optionText])
  
  const [height, setHeight] = useState('')
  
  const textValue = (height: string) => {
    if (!height) return text.notSpecified
    return `${height} ${text.cm}`
  }
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  
  return <>
    <OptionItem
      icon={<RulerVerticalGradIc />}
      title={text.height}
      value={textValue(height)}
      //value={props.value}
      //data-error={props.highlight}
      onClick={open}
    />
    
    <ModalInput
      title={text.height}
      isOpen={isOpen}
      onClose={close}
      
      autoFocus
      type="number"
      placeholder={text.heightL}
      
      value={height}
      onChange={ev=>setHeight(ev.currentTarget.value)}
      
      /* {...props.inputProps}
      hasError={props.highlight}
      onBlur={ev => {
        ev.currentTarget.focus()
        props.inputProps.onBlur()
      }} */
    />
    
  </>
})
export default ProfileHeightOption


