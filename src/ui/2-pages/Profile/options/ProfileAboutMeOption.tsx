import { TypeU } from '@utils/common/TypeU.ts'
import React, { useState } from 'react'
import ModalTextarea from 'src/ui/1-widgets/modals/ModalTextarea/ModalTextarea.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { PlaceholderUiText } from 'src/ui-data/translations/PlaceholderUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import EditableTextCard from 'src/ui/components/EditableTextCard/EditableTextCard.tsx'
import { FormFieldWrapRenderProps } from 'src/mini-libs/form-data/components/FormFieldWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import toEmptyAttr = TypeU.toEmptyAttr


const overlayName = 'profileAboutMe'


const ProfileAboutMeOption = React.memo(
  (props: FormFieldWrapRenderProps<string>) => {
    const titleText = useUiValues(TitleUiText)
    const placeholderText = useUiValues(PlaceholderUiText)
    
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
        <EditableTextCard
          title={titleText.aboutMe}
          text={props.value}
          placeholder={placeholderText.aboutMe}
          data-error={toEmptyAttr(props.highlight)}
          onClick={onOpen}
        />
        
        <ModalTextarea
          title={titleText.aboutMe}
          isOpen={isOpen}
          onClose={close}
          onClear={() => props.setValue('')}
          onCancel={onCancel}
          
          placeholder={titleText.aboutMe.toLowerCase()}
          {...props.inputProps}
          isError={props.highlight}
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


