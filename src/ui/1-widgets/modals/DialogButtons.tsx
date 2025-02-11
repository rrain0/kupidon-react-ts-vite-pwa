import styled from '@emotion/styled'
import React from 'react'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText'
import Button from 'src/ui/0-elements/buttons/Button/Button'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
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
  
  onClose: Callback
  onBack: Callback
  
  onCancel: Callback
  
  onClear: Callback
  onOk: Callback
  onAccept: Callback
  onYes: Callback
  onDangerYes: Callback
  
  acceptVariant: 'text' | 'filledRounded'
  acceptSize: 'normal2' | 'big'
}>
const DialogButtons = React.memo((props: DialogButtonsProps) => {
  const {
    position = 'end',
    onClose,
    onBack,
    onCancel,
    onClear,
    onOk,
    onAccept,
    onYes,
    onDangerYes,
    acceptVariant = 'text',
  } = props
  
  const actionText = useUiValues(ActionUiText)
  
  return (
    <DialogButtonsFrame
      style={{
        ...({
          center: { justifyContent: 'center' },
          end: undefined,
        } satisfies Record<typeof position, React.CSSProperties | undefined>)[position],
      }}
    >
      {onClose && (
        <Button css={ButtonS6.t(ButtonS6.S.text.rounded.md2.normal)}
          onClick={() => onClose()}
        >
          {actionText.close}
        </Button>
      )}
      {onBack && (
        <Button css={ButtonS6.t(ButtonS6.S.text.rounded.md2.normal)}
          onClick={() => onBack()}
        >
          {actionText.back}
        </Button>
      )}
      {onCancel && (
        <Button css={ButtonS6.t(ButtonS6.S.text.rounded.md2.normal)}
          onClick={() => onCancel()}
        >
          {actionText.cancel}
        </Button>
      )}
      {onClear && (
        <Button css={ButtonS6.t(ButtonS6.S.text.rounded.md2.normal)}
          onClick={() => onClear()}
        >
          {actionText.clear}
        </Button>
      )}
      {onOk && (
        <Button css={ButtonS6.t(ButtonS6.S.text.rounded.md2Uppercase.normal)}
          onClick={() => onOk()}
        >
          {actionText.ok}
        </Button>
      )}
      {onYes && (
        <Button css={ButtonS6.t(ButtonS6.S.text.rounded.md2.normal)}
          onClick={() => onYes()}
        >
          {actionText.yes}
        </Button>
      )}
      {onDangerYes && (
        <Button css={ButtonS6.t(ButtonS6.S.text.rounded.md2.normal)}
          onClick={() => onDangerYes()}
        >
          {actionText.yes}
        </Button>
      )}
      {onAccept && (
        <Button
          css={({
            text: ButtonS6.t(ButtonS6.S.text.rounded.md2.normal),
            filledRounded: ButtonS6.t(ButtonS6.S.filled.rounded.md2.accent),
          } satisfies Record<typeof acceptVariant, any>)[acceptVariant]}
          onClick={() => onAccept()}
        >
          {actionText.accept}
        </Button>
      )}
    </DialogButtonsFrame>
  )
})
export default DialogButtons
