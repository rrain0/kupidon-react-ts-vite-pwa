import Card from 'src/components/elems/Card/Card.tsx'
import { CardS } from 'src/components/elems/Card/CardS.ts'
import DialogButtons from 'src/components/widgets/modals/DialogButtons'

import { useUiValues } from '@libs/ui-text/useUiText.ts'
import React from 'react'
import { ModalElements } from 'src/components/components/modal/ModalElements.tsx'
import Modal from 'src/components/components/modal/Modal.tsx'
import Textarea from 'src/components/elems/Textarea/Textarea.tsx'
import { TextareaStyle } from 'src/components/elems/Textarea/TextareaStyle.ts'
import { ActionUiText } from 'src/locales/translations/ActionUiText.ts'
import { Cb } from '@utils/base/tsUtils.ts'
import { Pu } from '@utils/base/tsUtils.ts'
import { Hdrs } from 'components/elems/basic-elements/Hdrs'




export type ModalTextareaProps = React.ComponentProps<typeof Textarea> & Pu<{
  title: string
  isOpen: boolean
  onClose: Cb
  onClear: Cb
  onCancel: Cb
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
    <Modal css={ModalElements.modalInputBoxS} onClick={onClose}>
      <Card css={[ModalElements.cardBoxInModalS, CardS.card2S]}>
        
        <Hdrs.InputTitleBold>{title}</Hdrs.InputTitleBold>
        
        <Textarea hFitText css={TextareaStyle.small}
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

