import { useOverlay } from '@util/react/useOverlay.ts'
import React from 'react'
import ModalInput from 'src/ui/components/modal/ModalInput/ModalInput.tsx'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { TitleUiText } from 'src/ui/ui-values/TitleUiText.ts'
import OptionItem from 'src/ui/widgets/OptionAndValueItem/OptionItem.tsx'
import {
  ValidationWrapRenderProps
} from '@util/form-validation/ValidationWrap.tsx'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import NameCardGradIc = SvgGradIcons.NameCardGradIc




const overlayName = 'name'


const ProfileName =
React.memo(
(props: ValidationWrapRenderProps<string>)=>{
  const titleText = useUiValues(TitleUiText)
  
  
  const [isOpen, open, close] = useOverlay(overlayName)
  
  
  return <>
      
    <OptionItem
      icon={<NameCardGradIc />}
      title={titleText.name}
      value={props.value}
      data-error={props.highlight}
      onClick={open}
    />
    
    <ModalInput
      title={titleText.name}
      isOpen={isOpen}
      onClose={close}
      
      autoFocus
      placeholder={titleText.name.toLowerCase()}
      {...props.inputProps}
      hasError={props.highlight}
      onBlur={ev => {
        ev.currentTarget.focus()
        props.inputProps.onBlur()
      }}
    />
    
  </>
})
export default ProfileName


