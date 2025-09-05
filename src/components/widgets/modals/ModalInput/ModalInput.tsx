import Card from 'src/components/elems/Card/Card.tsx'
import { CardS } from 'src/components/elems/Card/CardS.ts'
import DialogButtons from 'src/components/widgets/modals/DialogButtons'

import { useUiValues } from '@libs/ui-text/useUiText.ts'
import React from 'react'
import { ModalElements } from 'src/components/components/modal/ModalElements.tsx'
import Modal from 'src/components/components/modal/Modal.tsx'
import Input from 'src/components/elems/inputs/Input/Input.tsx'
import { InputStyle } from 'src/components/elems/inputs/Input/InputStyle.ts'
import { ActionUiText } from 'src/locales/translations/ActionUiText.ts'
import { Callback } from '@utils/base/typeUtils.ts'
import { Pu } from '@utils/base/typeUtils.ts'
import { Hdrs } from 'components/elems/basic-elements/Hdrs'






type ModalInputProps = React.ComponentProps<typeof Input> & Pu<{
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


