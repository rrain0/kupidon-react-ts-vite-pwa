import { css } from '@emotion/react'
import { useBool } from '@utils/state/react/base/useBool.ts'
import React, { useEffect } from 'react'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import Button from 'src/components/elems/buttons/Button/Button.tsx'
import { IconButtonS6 } from 'src/components/elems/buttons/IconButton/IconButtonS6.ts'
import { SvgIconS } from 'src/components/elems/icons/SvgIcons/SvgIconS.ts'
import ArrowReloadIc from 'src/components/elems/icons/SvgIcons/pack/ui/ArrowReloadIc.tsx'
import rotateAnim = EmotionCommon.rotateAnim




export const RefreshPageButton = React.memo(() => {
  const [isReloading, reload] = useBool(false)
  
  useEffect(() => {
    if (isReloading) window.location.reload()
  }, [isReloading])
  
  
  return (
    <Button
      css={IconButtonS6.t(IconButtonS6.S.trans.round.lg2.secondary)}
      onClick={reload}
      data-display-name='RefreshPageButton'
    >
      <ArrowReloadIc
        css={isReloading && css({
          [SvgIconS.El.icon.thiz()]: {
            animation: `${rotateAnim} 650ms linear infinite`,
          },
        })}
      />
    </Button>
  )
})
RefreshPageButton.displayName = 'RefreshPageButton'
export default RefreshPageButton

