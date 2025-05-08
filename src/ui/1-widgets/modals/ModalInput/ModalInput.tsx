import Card from 'src/ui/0-elements/Card/Card.tsx'
import { CardS } from 'src/ui/0-elements/Card/CardS.ts'
import DialogButtons from 'src/ui/1-widgets/modals/DialogButtons'
import { TypeU } from 'src/util/common/TypeU.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import React from 'react'
import { ModalElements } from 'src/ui/components/modal/ModalElements.tsx'
import Modal from 'src/ui/components/modal/Modal.tsx'
import Input from 'src/ui/0-elements/inputs/Input/Input.tsx'
import { InputStyle } from 'src/ui/0-elements/inputs/Input/InputStyle.ts'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import Callback = TypeU.Callback
import Pu = TypeU.Pu
import { Hdrs } from 'ui/0-elements/basic-elements/Hdrs'






type ModalInputProps = React.ComponentPropsWithRef<typeof Input> & Pu<{
  isOpen: boolean
  title: string
  onClose: Callback
  onCancel: Callback
  onClear: Callback
}>



const ModalInput = React.memo((props: ModalInputProps) => {
  const {
    isOpen, title, onClose, onCancel, onClear,
    ...restProps
  } = props
  
  //console.log('title', title)
  
  const actionText = useUiValues(ActionUiText)
  
  if (isOpen) return (
    <Modal css={ModalElements.modalInputBoxS} onClick={onClose}>
      <Card css={[ModalElements.cardBoxInModalS, CardS.card2S]}>
        <Hdrs.InputTitleBold>{title}</Hdrs.InputTitleBold>
        <Input css={InputStyle.outlinedRectSmallNormal}
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
ModalInput.displayName = 'ModalInput'
export default ModalInput


