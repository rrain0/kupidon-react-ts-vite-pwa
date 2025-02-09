import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import DialogButtons from 'src/ui/1-widgets/modals/DialogButtons'
import { TypeU } from 'src/util/common/TypeU.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import React from 'react'
import { ModalElement } from 'src/ui/1-widgets/modals/ModalElement.tsx'
import Modal from 'src/ui/components/modal/Modal/Modal.tsx'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import { ItemTitle } from 'src/ui/0-elements/basic-elements/ItemTitle.tsx'
import Card2 from 'src/ui/0-elements/cards/Card2.tsx'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import Callback = TypeU.Callback
import Puro = TypeU.Puro
import attrExists = TypeU.attrExists
import rowC = EmotionCommon.rowC






type ModalDialogProps = Puro<{
  isOpen: boolean
  title: string
  
  onClose: Callback
  onBack: Callback
  
  onCancel: Callback
  
  onOk: Callback
  onYes: Callback
  onDangerYes: Callback
}>



const ModalDialog = React.memo((props: ModalDialogProps) => {
  const {
    isOpen,
    title,
    onClose,
    onBack,
    onCancel,
    onOk,
    onYes,
    onDangerYes,
  } = props
  
  //console.log('title', title)
  
  const actionText = useUiValues(ActionUiText)
  
  if (isOpen) return (
    <ModalPortal>
      <Modal css={ModalElement.modalCenteredStyle} onClick={onClose}>
        <Card2
          css={cardS}
          data-danger={attrExists(onDangerYes)}
        >
          <TitleBox>
            <ItemTitle>{title}</ItemTitle>
          </TitleBox>
          
          <DialogButtons
            //onCancel={onCancel}
            //onClear={onClear}
            onClose={onClose}
            onBack={onBack}
            onOk={onOk}
            onYes={onYes}
            onDangerYes={onDangerYes}
          />
        </Card2>
      </Modal>
    </ModalPortal>
  )
  return undefined
})
export default ModalDialog


const cardS = (t: AppTheme.Theme) => css`
  ${ModalElement.card2Style};
  &[data-danger] {
    background-image: linear-gradient(
      to bottom right,
      /* TODO Theme */
      transparent 65%,
      /* TODO Theme */
      #ff6b6b 100%
    )
  }
`

const TitleBox = styled.div`
  width: 100%;
  min-height: 46px;
  ${rowC};
`


