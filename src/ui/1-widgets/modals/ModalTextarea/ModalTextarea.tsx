import { DialogButtons } from 'src/ui/1-widgets/modals/DialogButtons'
import { TypeU } from 'src/util/common/TypeU.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import React from 'react'
import { ModalElement } from 'src/ui/1-widgets/modals/ModalElement.tsx'
import Modal from 'src/ui/components/modal/Modal/Modal.tsx'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import UserActionsConsumer from 'src/ui/components/UserActionsConsumer/UserActionsConsumer.tsx'
import ItemLabel from 'src/ui/0-elements/basic-elements/ItemLabel.tsx'
import Card2 from 'src/ui/0-elements/cards/Card2.tsx'
import Textarea, { TextareaRefElement } from 'src/ui/0-elements/Textarea/Textarea.tsx'
import { TextareaStyle } from 'src/ui/0-elements/Textarea/TextareaStyle.ts'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import Callback = TypeU.Callback
import Puro = TypeU.Puro




export type ModalTextareaProps =
  React.ComponentPropsWithoutRef<typeof Textarea>
  & Puro<{
    title: string
    isOpen: boolean
    onClose: Callback
    onClear: Callback
    onCancel: Callback
  }>



const ModalTextarea = React.memo(
  React.forwardRef<TextareaRefElement, ModalTextareaProps>(
    (props, forwardedRef) => {
      const {
        title,
        isOpen,
        onClose,
        onClear,
        onCancel,
        ...restProps
      } = props
      
      const actionText = useUiValues(ActionUiText)
      
      
      if (isOpen) return (
        <ModalPortal>
          <UserActionsConsumer>
            <Modal css={ModalElement.modalStyle} onClick={onClose}>
              <UserActionsConsumer>
                <Card2 css={ModalElement.card2Style}>
                  
                  <ItemLabel>{title}</ItemLabel>
                  
                  <Textarea css={TextareaStyle.small}
                    autoFocus
                    {...restProps}
                    ref={forwardedRef}
                  />
                  
                  <DialogButtons
                    onCancel={onCancel}
                    onClear={onClear}
                    onOk={onClose}
                  />
                  
                </Card2>
              </UserActionsConsumer>
            </Modal>
          </UserActionsConsumer>
        </ModalPortal>
      )
      return undefined
    }
  )
)
export default ModalTextarea

