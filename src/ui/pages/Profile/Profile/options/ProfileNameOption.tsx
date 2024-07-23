import React from 'react'
import ModalInput from 'src/ui/widgets/modals/ModalInput/ModalInput.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import OptionItem from 'src/ui/widgets/OptionItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from 'src/mini-libs/form-validation/components/ValidationWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import NameCardGradIc = SvgGradIcons.NameCardGradIc




const overlayName = 'name'


const ProfileNameOption =
React.memo(
(props: ValidationWrapRenderProps<string>)=>{
  const titleText = useUiValues(TitleUiText)
  
  
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  
  
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
export default ProfileNameOption


