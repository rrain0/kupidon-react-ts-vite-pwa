import { css } from '@emotion/react'

import { useBool } from '@utils/state/react/useBool.ts'
import React, { useLayoutEffect } from 'react'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import Button from 'src/components/elems/buttons/Button/Button.tsx'
import { IconButtonS6 } from 'src/components/elems/buttons/IconButton/IconButtonS6.ts'
import ArrowReloadIc from 'src/components/elems/icons/SvgIcons/pack/ui/ArrowReloadIc.tsx'
import { SvgIconS } from 'src/components/elems/icons/SvgIcons/SvgIconS.ts'
import { Pu } from '@utils/base/tsUtils.ts'
import { Cb } from '@utils/base/tsUtils.ts'
import rotateAnim = EmotionCommon.rotateAnim




export type RefreshButtonProps = Pu<{
  isRefreshing: boolean
  onRefresh: Cb
}>
const RefreshButton = React.memo((props: RefreshButtonProps) => {
  
  const [isAnimating, animate, finishAnimate] = useBool(false)
  
  useLayoutEffect(() => {
    if (props.isRefreshing) animate()
  }, [props.isRefreshing])
  
  return (
    <Button
      css={IconButtonS6.t(IconButtonS6.S.trans.round.lg2.secondary)}
      onClick={props.onRefresh}
      data-display-name='RefreshButton'
    >
      <ArrowReloadIc
        css={isAnimating && css({
          [SvgIconS.El.icon.thiz()]: {
            animation: `${rotateAnim} 650ms linear infinite`,
          },
        })}
        onAnimationIteration={ev => {
          if (ev.animationName === rotateAnim.name && !props.isRefreshing) finishAnimate()
        }}
      />
    </Button>
  )
})
RefreshButton.displayName = 'RefreshButton'
export default RefreshButton
