import styled from '@emotion/styled'
import React from 'react'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText'
import Button from 'src/ui/0-elements/buttons/Button/Button'
import { ButtonS } from 'src/ui/0-elements/buttons/Button/ButtonS'
import { TypeU } from 'src/util/common/TypeU'
import Puro = TypeU.Puro
import Callback = TypeU.Callback
import rowWrap = EmotionCommon.rowWrap



const DialogButtonsFrame = styled.div`
  width: 100%;
  ${rowWrap};
  row-gap: 4px;
  justify-content: end;
`


type DialogButtonsProps = Puro<{
  position: 'center' | 'end'
  //variant: 'primarySmall' | 'textSmall'
  onCancel: Callback
  onClear: Callback
  onOk: Callback
}>
const DialogButtons = React.memo(
  (props: DialogButtonsProps) => {
    const { onCancel, onClear, onOk, position } = props
    
    const actionText = useUiValues(ActionUiText)
    
    return (
      <DialogButtonsFrame
        style={{
          ...position === 'center' && { justifyContent: 'center' },
        }}
      >
        {onCancel && (
          <Button css={ButtonS.textRoundedNormal2Normal}
            onClick={onCancel}
          >
            {actionText.cancel}
          </Button>
        )}
        {onClear && (
          <Button css={ButtonS.textRoundedNormal2Normal}
            onClick={onClear}
          >
            {actionText.clear}
          </Button>
        )}
        {onOk && (
          <Button css={ButtonS.textRoundedNormal2Normal}
            onClick={onOk}
          >
            {actionText.accept}
          </Button>
        )}
      </DialogButtonsFrame>
    )
  }
)
export default DialogButtons
