import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useLayoutEffect } from 'react'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import UseOverlayUrl from 'src/ui/components/UseOverlayUrl/UseOverlayUrl.tsx'
import QuickSettings, {
  QuickSettingsOverlayName,
} from 'src/ui/1-widgets/QuickSettings/QuickSettings.tsx'
import QuickSettingsButton from 'src/ui/0-elements/buttons/QuickSettingsButton.tsx'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { useBool } from '@util/react-state/useBool.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import { SvgIconS } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS.ts'
import fixedBottom = EmotionCommon.fixedBottom
import row = EmotionCommon.row
import ArrowReloadIc = SvgIconsPack.ArrowReloadIc
import rotateAnim = EmotionCommon.rotateAnim
import fixedTop = EmotionCommon.fixedTop
import Pu = TypeU.Pu
import Callback = TypeU.Callback




export namespace ButtonBarComponents {
  
  
  
  export const TopButtonBarFrame = styled.section`
    pointer-events: none;
    ${fixedTop};
    //padding-bottom: var(--bottom-nav-height);
    height: var(--top-button-bar-height);
    display: grid;
    place-items: start stretch;
  `
  export const BottomButtonBarFrame = styled.section`
    pointer-events: none;
    ${fixedBottom};
    padding-bottom: var(--bottom-nav-height);
    display: grid;
    place-items: end stretch;
  `
  
  
  
  export const ButtonsContainer = styled.div`
    pointer-events: none;
    height: var(--bottom-button-bar-height);
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    padding: 10px;
    gap: 10px;
  `
  
  export const LeftButtonsContainer = styled.div`
    pointer-events: none;
    height: 100%;
    ${row};
    align-items: center;
    justify-content: start;
    gap: 10px;
  `
  export const CenterButtonsContainer = styled.div`
    pointer-events: none;
    height: 100%;
    ${row};
    align-items: center;
    gap: 10px;
  `
  export const RightButtonsContainer = styled.div`
    pointer-events: none;
    height: 100%;
    ${row};
    align-items: center;
    justify-content: end;
    gap: 10px;
  `
  
  
  
  
  
  export const SettingsBtn = React.memo(() => {
    return (
      <UseOverlayUrl overlayName={QuickSettingsOverlayName}>
        {overlay => (
          <>
            <QuickSettingsButton onClick={overlay.open}/>
            
            <QuickSettings isOpen={overlay.isOpen} close={overlay.closeWithAction}/>
          </>
        )}
      </UseOverlayUrl>
    )
  })
  
  
  
  
  
  
  export const RefreshPageBtn = React.memo(() => {
    const [isReloading, reload] = useBool(false)
    
    useEffect(() => {
      if (isReloading) window.location.reload()
    }, [isReloading])
    
    
    return (
      <Button
        css={IconButtonS6.t(IconButtonS6.S.trans.round.lg2.secondary)}
        onClick={reload}
      >
        <ArrowReloadIc css={isReloading && css`
          ${SvgIconS.El.icon.thiz()} {
            animation: ${rotateAnim} 650ms linear infinite;
          }
        `}
        />
      </Button>
    )
  })
  
  
  
  export type SoftRefreshBtnProps = Pu<{
    isLoading: boolean
    refresh: Callback
  }>
  export const SoftRefreshBtn = React.memo((props: SoftRefreshBtnProps) => {
    
    const [isAnimating, animate, finishAnimate] = useBool(false)
    
    useLayoutEffect(() => {
      if (props.isLoading) animate()
    }, [props.isLoading])
    
    return (
      <Button
        css={IconButtonS6.t(IconButtonS6.S.trans.round.lg2.secondary)}
        onClick={props.refresh}
      >
        <ArrowReloadIc
          css={isAnimating && css`
            ${SvgIconS.El.icon.thiz()} {
              animation: ${rotateAnim} 650ms linear infinite;
            }
          `}
          onAnimationIteration={ev => {
            if (ev.animationName === rotateAnim.name && !props.isLoading) finishAnimate()
          }}
        />
      </Button>
    )
  })
  
  
  
}