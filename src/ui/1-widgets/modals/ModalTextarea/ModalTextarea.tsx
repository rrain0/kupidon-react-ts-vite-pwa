import Card from 'src/ui/0-elements/cards/Card.tsx'
import { CardS } from 'src/ui/0-elements/cards/CardS.ts'
import DialogButtons from 'src/ui/1-widgets/modals/DialogButtons'
import { TypeU } from 'src/util/common/TypeU.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import React from 'react'
import { ModalElement } from 'src/ui/1-widgets/modals/ModalElement.tsx'
import Modal from 'src/ui/components/modal/Modal/Modal.tsx'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import { ItemTitleBold } from 'src/ui/0-elements/basic-elements/ItemTitle.tsx'
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



const ModalTextarea = React.memo(React.forwardRef<TextareaRefElement, ModalTextareaProps>(
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
        <Modal css={ModalElement.modalForInputStyle} onClick={onClose}>
          <Card css={[CardS.card2S, ModalElement.card2Style]}>
            
            <ItemTitleBold>{title}</ItemTitleBold>
            
            <Textarea css={TextareaStyle.small}
              autoFocus
              {...restProps}
              ref={forwardedRef}
            />
            
            <DialogButtons
              //onCancel={onCancel}
              //onClear={onClear}
              onOk={onClose}
            />
            
          </Card>
        </Modal>
      </ModalPortal>
    )
    return undefined
  }
))
export default ModalTextarea

