import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { Hdrs } from 'src/ui/0-elements/basic-elements/Hdrs.tsx'
import Card from 'src/ui/0-elements/cards/Card.tsx'
import { CardS } from 'src/ui/0-elements/cards/CardS.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import DialogButtons from 'src/ui/1-widgets/modals/DialogButtons'
import { TypeU } from 'src/util/common/TypeU.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import React from 'react'
import { ModalElement } from 'src/ui/1-widgets/modals/ModalElement.tsx'
import Modal from 'src/ui/components/modal/Modal/Modal.tsx'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import Callback = TypeU.Callback
import Puro = TypeU.Puro
import attrExists = TypeU.attrExists
import rowC = EmotionCommon.rowC
import card2S = CardS.card2S
import WarnTriangleOutlinedIc = SvgIconsPack.WarnTriangleOutlinedIc
import { AppWidgetStyle } from 'mini-libs/widget-style-6/WidgetStyle'






type ModalDialogProps = Puro<{
  isOpen: boolean
  title: string
  
  onModal: Callback
  
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
    onModal,
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
      <Modal
        css={ModalElement.modalCenteredStyle}
        onClick={() => onModal?.()}
      >
        <Card
          css={cardS}
          data-danger={attrExists(onDangerYes)}
        >
          
          <DialogContent>
            {onDangerYes && (
              <WarnTriangleOutlinedIc css={SvgIconS6.t(warnIcS)} />
            )}
            <TitleBox>
              <Hdrs.ItemTitle>{title}</Hdrs.ItemTitle>
            </TitleBox>
          </DialogContent>
          
          <DialogButtons
            //onClear={onClear}
            onClose={onClose}
            onBack={onBack}
            onCancel={onCancel}
            onOk={onOk}
            onYes={onYes}
            onDangerYes={onDangerYes}
          />
          
        </Card>
      </Modal>
    </ModalPortal>
  )
  return undefined
})
export default ModalDialog


const cardS = (t: AppTheme.Theme) => css`
  ${ModalElement.card2Style};
  ${card2S(t)};
  &[data-danger] {
    /*background-image: linear-gradient(
      to bottom right,
      transparent 65%,
      #ff6b6bcc 100%
    );*/
    background-image: none;
  }
`


const warnIcS: AppWidgetStyle = t => [SvgIconS6.Parts.base, {
  iconSz: 56,
  iconColor: t.toast.accentDanger[0],
}]

const DialogContent = styled.div`
  ${rowC};
  gap: 10px;
`

const TitleBox = styled.div`
  width: 100%;
  min-height: 46px;
  ${rowC};
`


