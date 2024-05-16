import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { TypeUtils } from '@util/common/TypeUtils.ts'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import React from 'react'
import Modal from 'src/ui/components/modal/Modal/Modal.tsx'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import { ModalStyle } from 'src/ui/components/modal/ModalPortal/ModalStyle.ts'
import UserActionsConsumer from 'src/ui/components/UserActionsConsumer/UserActionsConsumer.tsx'
import ItemLabel from 'src/ui/elements/basic-elements/ItemLabel.tsx'
import Button from 'src/ui/elements/buttons/Button.tsx'
import { ButtonStyle } from 'src/ui/elements/buttons/ButtonStyle.ts'
import Card2 from 'src/ui/elements/cards/Card2.tsx'
import Input, { InputProps, InputRefElement } from 'src/ui/elements/inputs/Input/Input.tsx'
import { InputStyle } from 'src/ui/elements/inputs/Input/InputStyle.ts'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import { ActionUiText } from 'src/ui/ui-values/ActionUiText.ts'
import Callback = TypeUtils.Callback
import row = EmotionCommon.row




export type ModalInputCustomProps = {
  isOpen: boolean
  onClose: Callback
  title: string
}
export type ModalInputForwardRefProps = InputProps
export type ModalInputRefElement = InputRefElement
export type ModalInputProps = ModalInputCustomProps & ModalInputForwardRefProps



const ModalInput =
React.memo(
React.forwardRef<ModalInputRefElement, ModalInputProps>(
(props, forwardedRef)=>{
  const {
    isOpen, onClose, title,
    ...restProps
  } = props
  
  const actionText = useUiValues(ActionUiText)
  
  
  return isOpen && <ModalPortal>
    <UserActionsConsumer><Modal css={modalStyle} onClick={onClose}>
      <UserActionsConsumer><Card2 css={card2Style}>
        <ItemLabel>{title}</ItemLabel>
        <Input css={InputStyle.inputSmall}
          {...restProps}
          ref={forwardedRef}
        />
        <DialogButtons>
          <Button css={ButtonStyle.roundedSmallAccent}
            onClick={onClose}
            children={actionText.ok.toUpperCase()}
          />
        </DialogButtons>
      </Card2></UserActionsConsumer>
    </Modal></UserActionsConsumer>
  </ModalPortal>
}))
export default ModalInput



const modalStyle = css`
  ${ModalStyle.modal};
  padding: 20px;
  padding-bottom: 140px;
  display: grid;
  place-items: end center;
`
const card2Style = css`
  min-width: 220px;
  width: 100%;
  max-width: 500px;
  gap: 10px;
`
const DialogButtons = styled.div`
  ${row};
  gap: 10px;
  justify-content: end;
`