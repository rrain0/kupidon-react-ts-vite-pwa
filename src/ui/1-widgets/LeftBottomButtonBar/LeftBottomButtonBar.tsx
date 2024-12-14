import styled from '@emotion/styled'
import React from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon'
import { StyleVals } from 'src/ui-data/style/StyleVals'
import Button from 'src/ui/0-elements/buttons/Button/Button'
import { IconButtonStyle } from 'src/ui/0-elements/buttons/IconButton/IconButtonStyle'
import { SvgIcons } from 'src/ui/0-elements/icons/SvgIcons/SvgIcons'
import { TypeU } from 'src/util/common/TypeU'
import Callback = TypeU.Callback
import Puro = TypeU.Puro
import fixedBottom = EmotionCommon.fixedBottom
import col = EmotionCommon.col
import CheckmarkIc = SvgIcons.CheckmarkIc
import CrossIc = SvgIcons.CrossIc


export type LeftBottomButtonBarProps = Puro<{
  onCancel?: Callback
  onAccept?: Callback
}>
const LeftBottomButtonBar = React.memo(
  (props: LeftBottomButtonBarProps) => {
    const { onCancel, onAccept } = props
    
    return (
      <LeftBottomButtonBarFrame>
        <ButtonsContainer>
          {onCancel && <CancelButton onClick={onCancel} />}
          {onAccept && <AcceptButton onClick={onAccept} />}
        </ButtonsContainer>
      </LeftBottomButtonBarFrame>
    )
  }
)
export default LeftBottomButtonBar




const LeftBottomButtonBarFrame = styled.section`
  pointer-events: none;
  ${fixedBottom};
  padding-bottom: var(--bottom-nav-height);
  display: grid;
  place-items: end start;
`

const ButtonsContainer = styled.div`
  pointer-events: none;
  & > * {
    pointer-events: auto;
  }
  ${col};
  padding: ${StyleVals.itemListGapPx};
  gap: ${StyleVals.itemListGapPx};
`




const CancelButton = React.memo(
  ({ onClick }: { onClick: Callback }) => {
    return (
      <Button css={IconButtonStyle.icBig2Normal2}
        onClick={onClick}
      >
        <CrossIc />
      </Button>
    )
  }
)

const AcceptButton = React.memo(
  ({ onClick }: { onClick: Callback }) => {
    return (
      <Button css={IconButtonStyle.icBig2Accent}
        onClick={onClick}
      >
        <CheckmarkIc />
      </Button>
    )
  }
)
