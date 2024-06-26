import React from 'react'
import ModalInput from 'src/ui/widgets/modal-element/ModalInput/ModalInput.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { PlaceholderUiText } from 'src/ui-props/ui-values/PlaceholderUiText.ts'
import { TitleUiText } from 'src/ui-props/ui-values/TitleUiText.ts'
import OptionItem from 'src/ui/widgets/OptionItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from '@util/mini-libs/form-validation/components/ValidationWrap.tsx'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import GiftBoxGradIc = SvgGradIcons.GiftBoxGradIc





const overlayName = 'birthDate'


const ProfileBirthDateOption =
React.memo(
(props: ValidationWrapRenderProps<string>)=>{
  const titleText = useUiValues(TitleUiText)
  const placeholderText = useUiValues(PlaceholderUiText)
  
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  
  
  return <>
    <OptionItem
      icon={<GiftBoxGradIc />}
      title={titleText.birthDate}
      value={props.value}
      data-error={props.highlight}
      onClick={open}
    />
    
    <ModalInput
      title={titleText.birthDate}
      isOpen={isOpen}
      onClose={close}
      
      autoFocus
      inputMode="numeric"
      placeholder={placeholderText.birthDate.toLowerCase()}
      {...props.inputProps}
      hasError={props.highlight}
      onBlur={ev => {
        ev.currentTarget.focus()
        props.inputProps.onBlur()
      }}
    />
  
  </>
})
export default ProfileBirthDateOption


