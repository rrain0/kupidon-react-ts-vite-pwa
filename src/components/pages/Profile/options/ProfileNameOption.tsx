import React, { useState } from 'react'
import NameCardGradIc from 'src/components/elems/icons/GradSvgIcons/pack/special/NameCardGradIc.tsx'
import ModalInput from 'src/components/widgets/modals/ModalInput/ModalInput.tsx'
import { useOverlayUrl } from 'src/components/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { TitleUiText } from 'src/locales/translations/TitleUiText.ts'
import OptionItem from 'src/components/widgets/OptionItem/OptionItem.tsx'
import { FormFieldWrapRenderProps } from 'src/mini-libs/form-data/components/FormFieldWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'




const overlayName = 'profileName'


const ProfileNameOption = React.memo(
  (props: FormFieldWrapRenderProps<string>) => {
    const titleText = useUiValues(TitleUiText)
    
    const [saved, setSaved] = useState(props.value)
    
    const { isOpen, open, close } = useOverlayUrl(overlayName)
    
    const onOpen = () => {
      setSaved(props.value)
      open()
    }
    const onCancel = () => {
      // TODO access initial value
      props.setValue(saved)
    }
    
    return (
      <>
        <OptionItem
          icon={<NameCardGradIc/>}
          title={titleText.name}
          value={props.value}
          data-error={props.highlight}
          onClick={onOpen}
        />
        
        <ModalInput
          title={titleText.name}
          isOpen={isOpen}
          onClose={close}
          onClear={() => props.setValue('')}
          onCancel={onCancel}
          
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
    )
  }
)
export default ProfileNameOption


