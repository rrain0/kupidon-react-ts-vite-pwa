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
import row = EmotionCommon.row



const DialogButtonsFrame = styled.div`
  ${row};
  gap: 10px;
  justify-content: end;
`


type DialogButtonsProps =  Puro<{
  onCancel: Callback
  onClear: Callback
  onOk: Callback
}>
export const DialogButtons = React.memo(
  (props: DialogButtonsProps) => {
    const { onCancel, onClear, onOk } = props
    
    const actionText = useUiValues(ActionUiText)
    
    return (
      <DialogButtonsFrame>
        {onCancel && (
          <Button css={ButtonS.textRoundedSmallNormal}
            onClick={onCancel}
          >
            {actionText.cancel}
          </Button>
        )}
        {onClear && (
          <Button css={ButtonS.textRoundedSmallNormal}
            onClick={onClear}
          >
            {actionText.clear}
          </Button>
        )}
        {onOk && (
          <Button css={ButtonS.textUppercaseRoundedSmallNormal}
            onClick={onOk}
          >
            {actionText.ok}
          </Button>
        )}
      </DialogButtonsFrame>
    )
  }
)
