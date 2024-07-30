import React from 'react'
import ModalTextarea from 'src/ui/widgets/modals/ModalTextarea/ModalTextarea.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { PlaceholderUiText } from 'src/ui-data/translations/PlaceholderUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import EditableTextCard from 'src/ui/components/EditableTextCard/EditableTextCard.tsx'
import { ValidationWrapRenderProps } from 'src/mini-libs/form-validation/components/ValidationWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'


const overlayName = 'aboutMe'


const ProfileAboutMeOption = React.memo(
  (props: ValidationWrapRenderProps<string>) => {
    const titleText = useUiValues(TitleUiText)
    const placeholderText = useUiValues(PlaceholderUiText)
    
    
    
    const { isOpen, open, close } = useOverlayUrl(overlayName)
    
    
    return (
      <>
        <EditableTextCard
          title={titleText.aboutMe}
          text={props.value}
          placeholder={placeholderText.aboutMe}
          data-error={props.highlight}
          onClick={open}
        />
        
        <ModalTextarea
          title={titleText.aboutMe}
          isOpen={isOpen}
          onClose={close}
          onClear={() => props.setValue('')}
          
          autoFocus
          placeholder={titleText.aboutMe.toLowerCase()}
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
export default ProfileAboutMeOption


