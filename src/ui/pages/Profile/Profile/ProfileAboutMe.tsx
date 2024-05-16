import { css } from '@emotion/react'
import { useOverlay } from '@util/react/useOverlay.ts'
import React from 'react'
import UserActionsConsumer from 'src/ui/components/UserActionsConsumer/UserActionsConsumer.tsx'
import ItemLabel from 'src/ui/elements/basic-elements/ItemLabel.tsx'
import Modal from 'src/ui/components/modal/Modal/Modal.tsx'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import { ModalStyle } from 'src/ui/components/modal/ModalPortal/ModalStyle.ts'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { PlaceholderUiText } from 'src/ui/ui-values/PlaceholderUiText.ts'
import { TitleUiText } from 'src/ui/ui-values/TitleUiText.ts'
import EditableTextCard from 'src/ui/widgets/EditableTextCard/EditableTextCard.tsx'
import OptionItem from 'src/ui/widgets/OptionAndValueItem/OptionItem.tsx'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import {
  ValidationWrapRenderProps
} from '@util/form-validation/ValidationWrap.tsx'
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
  const actionText = useUiValues(ActionUiText)
  
  
  const [isOpen, open, close] = useOverlay(overlayName)
  
  
  return <>
    
    <EditableTextCard
      title={titleText.aboutMe}
      text={props.value}
      placeholder={placeholderText.aboutMe}
      data-error={props.highlight}
      onClick={open}
    />
    
    { isOpen &&
      <ModalPortal><UserActionsConsumer>
        <Modal css={ModalStyle.modal}
          onClick={close}
        >
          <div css={css`
            width: 100%;
            height: 100%;
            padding: 20px;
            padding-bottom: 140px;
            display: grid;
            place-items: end center;
          `}>
            
            <Card2 css={css`
              min-width: 220px;
              width: 100%;
              max-width: 500px;
              gap: 10px;
            `}
              onClick={ev => ev.stopPropagation()}
            >
              <ItemLabel>{titleText.aboutMe}</ItemLabel>
              <Input css={InputStyle.inputSmall}
                autoFocus
                placeholder={titleText.aboutMe.toLowerCase()}
                {...props.inputProps}
                hasError={props.highlight}
                onBlur={ev => {
                  ev.currentTarget.focus()
                  props.inputProps.onBlur()
                }}
              />
              <div css={css`
                ${row};
                gap: 10px;
                justify-content: end;
              `}>
                <Button css={ButtonStyle.roundedSmallSecondary}
                  onClick={close}
                  children={actionText.ok}
                />
              </div>
            </Card2>
          </div>
        </Modal>
      </UserActionsConsumer></ModalPortal>
    }
    
  </>
})
export default ProfileAboutMe


