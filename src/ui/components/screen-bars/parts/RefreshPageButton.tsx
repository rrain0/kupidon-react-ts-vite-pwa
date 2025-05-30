import { css } from '@emotion/react'
import { useBool } from '@util/react-state/useBool.ts'
import React, { useEffect } from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import { SvgIconS } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import ArrowReloadIc = SvgIconsPack.ArrowReloadIc
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

