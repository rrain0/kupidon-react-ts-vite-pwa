import { TypeUtils } from '@util/common/TypeUtils.ts'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import React from 'react'
import { ModalElement } from 'src/ui/widgets/modal-element/ModalElement.tsx'
import Modal from 'src/ui/components/modal/Modal/Modal.tsx'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import UserActionsConsumer from 'src/ui/components/UserActionsConsumer/UserActionsConsumer.tsx'
import ItemLabel from 'src/ui/elements/basic-elements/ItemLabel.tsx'
import Button from 'src/ui/elements/buttons/Button.tsx'
import { ButtonStyle } from 'src/ui/elements/buttons/ButtonStyle.ts'
import Card2 from 'src/ui/elements/cards/Card2.tsx'
import Input, { InputProps, InputRefElement } from 'src/ui/elements/inputs/Input/Input.tsx'
import { InputStyle } from 'src/ui/elements/inputs/Input/InputStyle.ts'
import { ActionUiText } from 'src/ui-props/ui-values/ActionUiText.ts'
import Callback = TypeUtils.Callback




export type ModalInputCustomProps = {
  isOpen: boolean
  onClose: Callback
  title: string
}
export type ModalInputForwardRefProps = InputProps
export type ModalInputRefElement = InputRefElement
export type ModalInputProps = ModalInputCustomProps & ModalInputForwardRefProps



const ModalInput =
React.memo(
React.forwardRef<ModalInputRefElement, ModalInputProps>(
(props, forwardedRef)=>{
  const {
    isOpen, onClose, title,
    ...restProps
  } = props
  
  const actionText = useUiValues(ActionUiText)
  
  
  return isOpen && <ModalPortal>
    <UserActionsConsumer>
      <Modal css={ModalElement.modalStyle} onClick={onClose}>
        <UserActionsConsumer>
          <Card2 css={ModalElement.card2Style}>
            <ItemLabel>{title}</ItemLabel>
            <Input css={InputStyle.outlinedRectSmallNormal}
              {...restProps}
              ref={forwardedRef}
            />
            <ModalElement.DialogButtons>
              <Button css={ButtonStyle.roundedTransparent}
                onClick={onClose}
                children={actionText.ok.toLowerCase()}
              />
            </ModalElement.DialogButtons>
          </Card2>
        </UserActionsConsumer>
      </Modal>
    </UserActionsConsumer>
  </ModalPortal>
}))
export default ModalInput


