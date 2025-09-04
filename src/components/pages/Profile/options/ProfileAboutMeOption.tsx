
import React, { useState } from 'react'
import ModalTextarea from 'src/components/widgets/modals/ModalTextarea/ModalTextarea.tsx'
import { useOverlayUrl } from 'src/components/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { PlaceholderUiText } from 'src/locales/translations/PlaceholderUiText.ts'
import { TitleUiText } from 'src/locales/translations/TitleUiText.ts'
import EditableTextCard from 'src/components/components/EditableTextCard/EditableTextCard.tsx'
import { FormFieldWrapRenderProps } from '@libs/form-data/components/FormFieldWrap.tsx'
import { useUiValues } from '@libs/ui-text/useUiText.ts'
import { toEmptyAttr } from '@utils/base/math/typeUtils.ts'


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


