import styled from '@emotion/styled'
import { ReactU } from '@util/react/ReactU.ts'
import React from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon'
import { StyleVals } from 'src/ui-data/style/StyleVals'
import Button from 'src/ui/0-elements/buttons/Button/Button'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import { TypeU } from 'src/util/common/TypeU'
import Callback = TypeU.Callback
import Puro = TypeU.Puro
import fixedBottom = EmotionCommon.fixedBottom
import col = EmotionCommon.col
import CheckmarkIc = SvgIconsPack.CheckmarkIc
import CrossIc = SvgIconsPack.CrossIc
import Children = ReactU.Children


export type LeftBottomButtonBarProps = Children & Puro<{
  onCancel?: Callback
  onAccept?: Callback
}>
const LeftBottomButtonBar = React.memo((props: LeftBottomButtonBarProps) => {
  const { onCancel, onAccept, children } = props
  
  return (
    <LeftBottomButtonBarFrame>
      <ButtonsContainer>
        {onCancel && <CancelButton onClick={onCancel} />}
        {onAccept && <AcceptButton onClick={onAccept} />}
        {children}
      </ButtonsContainer>
    </LeftBottomButtonBarFrame>
  )
})
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




const CancelButton = React.memo(({ onClick }: { onClick: Callback }) => {
  return (
    <Button
      css={IconButtonS6.t(IconButtonS6.S.filled.round.lg2.normal2)}
      onClick={onClick}
    >
      <CrossIc />
    </Button>
  )
})

const AcceptButton = React.memo(({ onClick }: { onClick: Callback }) => {
  return (
    <Button
      css={IconButtonS6.t(IconButtonS6.S.filled.round.lg2.accent)}
      onClick={onClick}
    >
      <CheckmarkIc />
    </Button>
  )
})
