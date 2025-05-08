import Card from 'src/ui/0-elements/Card/Card.tsx'
import { CardS } from 'src/ui/0-elements/Card/CardS.ts'
import DialogButtons from 'src/ui/1-widgets/modals/DialogButtons'
import { TypeU } from 'src/util/common/TypeU.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import React from 'react'
import { ModalElement } from 'src/ui/components/modal/ModalElement.tsx'
import Modal from 'src/ui/components/modal/Modal/Modal.tsx'
import Textarea, { TextareaRefElement } from 'src/ui/0-elements/Textarea/Textarea.tsx'
import { TextareaStyle } from 'src/ui/0-elements/Textarea/TextareaStyle.ts'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import Callback = TypeU.Callback
import Pu = TypeU.Pu
import { Hdrs } from 'ui/0-elements/basic-elements/Hdrs'




export type ModalTextareaProps =
  React.ComponentPropsWithRef<typeof Textarea>
  & Pu<{
    title: string
    isOpen: boolean
    onClose: Callback
    onClear: Callback
    onCancel: Callback
  }>



const ModalTextarea = React.memo((props: ModalTextareaProps) => {
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
    <Modal css={ModalElement.modalForInputStyle} onClick={onClose}>
      <Card css={[CardS.card2S, ModalElement.card2Style]}>
        
        <Hdrs.InputTitleBold>{title}</Hdrs.InputTitleBold>
        
        <Textarea css={TextareaStyle.small}
          autoFocus
          {...restProps}
        />
        
        <DialogButtons
          //onCancel={onCancel}
          //onClear={onClear}
          onOk={onClose}
        />
        
      </Card>
    </Modal>
  )
  return undefined
})
ModalTextarea.displayName = 'ModalTextarea'
export default ModalTextarea

