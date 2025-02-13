import Card from 'src/ui/0-elements/cards/Card.tsx'
import { CardS } from 'src/ui/0-elements/cards/CardS.ts'
import DialogButtons from 'src/ui/1-widgets/modals/DialogButtons'
import { TypeU } from 'src/util/common/TypeU.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import React from 'react'
import { ModalElement } from 'src/ui/1-widgets/modals/ModalElement.tsx'
import Modal from 'src/ui/components/modal/Modal/Modal.tsx'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import Input from 'src/ui/0-elements/inputs/Input/Input.tsx'
import { InputStyle } from 'src/ui/0-elements/inputs/Input/InputStyle.ts'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import Callback = TypeU.Callback
import Puro = TypeU.Puro
import { Hdrs } from 'ui/0-elements/basic-elements/Hdrs'






type ModalInputProps = React.ComponentPropsWithoutRef<typeof Input> & Puro<{
  isOpen: boolean
  title: string
  onClose: Callback
  onCancel: Callback
  onClear: Callback
}>



const ModalInput = React.memo(React.forwardRef<HTMLInputElement, ModalInputProps>(
  (props, forwardedRef) => {
    const {
      isOpen, title, onClose, onCancel, onClear,
      ...restProps
    } = props
    
    //console.log('title', title)
    
    const actionText = useUiValues(ActionUiText)
    
    if (isOpen) return (
      <ModalPortal>
        <Modal css={ModalElement.modalForInputStyle} onClick={onClose}>
          <Card css={[CardS.card2S, ModalElement.card2Style]}>
            <Hdrs.InputTitleBold>{title}</Hdrs.InputTitleBold>
            <Input css={InputStyle.outlinedRectSmallNormal}
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
export default ModalInput


