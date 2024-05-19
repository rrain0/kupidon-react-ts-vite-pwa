import { useBool } from '@util/react/useBool.ts'
import React from 'react'
import ModalInput from 'src/ui/components/modal/ModalInput/ModalInput.tsx'
import UseOverlay from 'src/ui/components/UseOverlay/UseOverlay.tsx'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { PlaceholderUiText } from 'src/ui/ui-values/PlaceholderUiText.ts'
import { TitleUiText } from 'src/ui/ui-values/TitleUiText.ts'
import OptionItem from 'src/ui/widgets/OptionAndValueItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from '@util/form-validation/ValidationWrap.tsx'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import GiftBoxGradIc = SvgGradIcons.GiftBoxGradIc





const overlayName = 'birthDate'


const ProfileBirthDate =
React.memo(
(props: ValidationWrapRenderProps<string>)=>{
  const titleText = useUiValues(TitleUiText)
  const placeholderText = useUiValues(PlaceholderUiText)
  
  const [isOpen, open, close, setIsOpen] = useBool(false)
  
  
  return <>
    <UseOverlay
      overlayName={overlayName}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
    
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
export default ProfileBirthDate


