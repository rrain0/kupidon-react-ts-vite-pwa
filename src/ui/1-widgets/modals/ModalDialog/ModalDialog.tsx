import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { Hdrs } from 'src/ui/0-elements/basic-elements/Hdrs.tsx'
import Card from 'src/ui/0-elements/Card/Card.tsx'
import { CardS } from 'src/ui/0-elements/Card/CardS.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import DialogButtons from 'src/ui/1-widgets/modals/DialogButtons'
import { TypeU } from 'src/util/common/TypeU.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import React from 'react'
import { ModalElement } from 'src/ui/components/modal/ModalElement.tsx'
import Modal from 'src/ui/components/modal/Modal/Modal.tsx'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import Callback = TypeU.Callback
import Pu = TypeU.Pu
import rowC = EmotionCommon.rowC
import card2S = CardS.card2S
import WarnTriangleOutlinedIc = SvgIconsPack.WarnTriangleOutlinedIc
import { AppWidgetStyle } from 'mini-libs/widget-style-6/WidgetStyle'






type ModalDialogProps = Pu<{
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
    onModal, onClose, onBack, onCancel, onOk, onYes, onDangerYes,
  } = props
  
  //console.log('title', title)
  
  const actionText = useUiValues(ActionUiText)
  
  if (isOpen) return (
    <Modal css={ModalElement.modalCenteredStyle} onClick={() => onModal?.()}>
      <Card css={[ModalElement.card2Style, card2S]}>
        
        <DialogContent>
          {onDangerYes && (
            <WarnTriangleOutlinedIc css={SvgIconS6.t(warnIcS)}/>
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
  )
  return undefined
})
export default ModalDialog


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


