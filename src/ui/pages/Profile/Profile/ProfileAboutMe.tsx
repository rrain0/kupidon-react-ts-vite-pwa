import { css } from '@emotion/react'
import { useBool } from '@util/react/useBool.ts'
import React from 'react'
import ModalInput from 'src/ui/components/modal-element/ModalInput/ModalInput.tsx'
import ModalTextarea from 'src/ui/components/modal-element/ModalTextarea/ModalTextarea.tsx'
import UseOverlay from 'src/ui/components/UseOverlay/UseOverlay.tsx'
import UserActionsConsumer from 'src/ui/components/UserActionsConsumer/UserActionsConsumer.tsx'
import ItemLabel from 'src/ui/elements/basic-elements/ItemLabel.tsx'
import Modal from 'src/ui/components/modal/Modal/Modal.tsx'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import { ModalStyle } from 'src/ui/components/modal/ModalPortal/ModalStyle.ts'
import { PlaceholderUiText } from 'src/ui/ui-values/PlaceholderUiText.ts'
import { TitleUiText } from 'src/ui/ui-values/TitleUiText.ts'
import EditableTextCard from 'src/ui/widgets/EditableTextCard/EditableTextCard.tsx'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import { ValidationWrapRenderProps } from '@util/form-validation/ValidationWrap.tsx'
import { ActionUiText } from 'src/ui/ui-values/ActionUiText.ts'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import Button from 'src/ui/elements/buttons/Button.tsx'
import { ButtonStyle } from 'src/ui/elements/buttons/ButtonStyle.ts'
import Card2 from 'src/ui/elements/cards/Card2.tsx'
import Input from 'src/ui/elements/inputs/Input/Input.tsx'
import { InputStyle } from 'src/ui/elements/inputs/Input/InputStyle.ts'
import row = EmotionCommon.row




const overlayName = 'aboutMe'


const ProfileAboutMe =
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
})
export default ProfileAboutMe


