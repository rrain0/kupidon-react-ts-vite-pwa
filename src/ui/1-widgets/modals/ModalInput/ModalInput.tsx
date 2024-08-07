import { TypeU } from 'src/util/common/TypeU.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import React from 'react'
import { ModalElement } from 'src/ui/1-widgets/modals/ModalElement.tsx'
import Modal from 'src/ui/components/modal/Modal/Modal.tsx'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import UserActionsConsumer from 'src/ui/components/UserActionsConsumer/UserActionsConsumer.tsx'
import ItemLabel from 'src/ui/0-elements/basic-elements/ItemLabel.tsx'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonStyle } from 'src/ui/0-elements/buttons/Button/ButtonStyle.ts'
import Card2 from 'src/ui/0-elements/cards/Card2.tsx'
import Input from 'src/ui/0-elements/inputs/Input/Input.tsx'
import { InputStyle } from 'src/ui/0-elements/inputs/Input/InputStyle.ts'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import Callback = TypeU.Callback
import Puro = TypeU.Puro






type ModalInputProps = React.ComponentPropsWithoutRef<typeof Input> & Puro<{
  isOpen: boolean
  onClose: Callback
  onClear: Callback
  title: string
}>



const ModalInput = React.memo(
  React.forwardRef<HTMLInputElement, ModalInputProps>(
  (props, forwardedRef) => {
    const {
      isOpen, onClose, onClear, title,
      ...restProps
    } = props
    
    //console.log('title', title)
    
    const actionText = useUiValues(ActionUiText)
    
    if (isOpen) return (
      <ModalPortal>
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
                  {onClear && <Button css={ButtonStyle.textRoundedNormalNormal}
                    onClick={onClear}
                    children={actionText.clear}
                  />}
                  <Button css={ButtonStyle.textUppercaseRoundedNormalNormal}
                    onClick={onClose}
                    children={actionText.ok}
                  />
                </ModalElement.DialogButtons>
              </Card2>
            </UserActionsConsumer>
          </Modal>
        </UserActionsConsumer>
      </ModalPortal>
    )
    return undefined
  })
)
export default ModalInput


