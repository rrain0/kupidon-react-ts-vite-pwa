import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback, useEffect, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UseOverlay from 'src/ui/components/UseOverlay/UseOverlay.tsx'
import { IconButtonStyle } from 'src/ui/elements/buttons/IconButtonStyle.ts'
import QuickSettings, {
  QuickSettingsOverlayName,
} from 'src/ui/widgets/QuickSettings/QuickSettings.tsx'
import SettingsButton from 'src/ui/elements/SettingsButton.tsx'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import { useBool } from '@util/react/useBool.ts'
import Button from 'src/ui/elements/buttons/Button.tsx'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons/SvgIcons.tsx'
import { SvgIconsStyle } from 'src/ui/elements/icons/SvgIcons/SvgIconsStyle.ts'
import fixedBottom = EmotionCommon.fixedBottom
import row = EmotionCommon.row
import Arrow5FwdIc = SvgIcons.ArrowLinesSharp1Ic
import ArrowReloadIc = SvgIcons.ArrowReloadIc
import rotateAnim = EmotionCommon.rotateAnim
import fixedTop = EmotionCommon.fixedTop
import PartialUndef = TypeUtils.PartialUndef
import Callback = TypeUtils.Callback




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
    &>*{
      pointer-events: auto;
    }
  `
  
  export const LeftButtonsContainer = styled.div`
    pointer-events: none;
    height: 100%;
    ${row};
    align-items: center;
    justify-content: start;
    gap: 10px;
    &>*{
      pointer-events: auto;
    }
  `
  export const CenterButtonsContainer = styled.div`
    pointer-events: none;
    height: 100%;
    ${row};
    align-items: center;
    gap: 10px;
    &>*{
      pointer-events: auto;
    }
  `
  export const RightButtonsContainer = styled.div`
    pointer-events: none;
    height: 100%;
    ${row};
    align-items: center;
    justify-content: end;
    gap: 10px;
    &>*{
      pointer-events: auto;
    }
  `
  
  
  
  
  
  export const SettingsBtn =
  React.memo(
  ()=>{
    return <UseOverlay overlayName={QuickSettingsOverlayName}>
      {overlay=><>
        <SettingsButton
          onClick={overlay.open}
        />
        
        <QuickSettings isOpen={overlay.isOpen} close={overlay.close}/>
      </>}
    </UseOverlay>
  })
  
  
  export const BackBtn =
  React.memo(
  ()=>{
    const navigate = useNavigate()
    const back = useCallback(
      ()=>navigate(-1),
      [navigate]
    )
    
    return <Button css={IconButtonStyle.iconTransparent}
      onClick={back}
    >
      <Arrow5FwdIc css={css`rotate: 0.5turn;`} />
    </Button>
  })
  
  
  
  export const RefreshPageBtn =
  React.memo(
  ()=>{
    
    const [isReloading, reload] = useBool(false)
    
    useEffect(
      ()=>{
        if (isReloading) window.location.reload()
      },
      [isReloading]
    )
    
    
    return <Button css={IconButtonStyle.iconTransparent}
      onClick={reload}
    >
      <ArrowReloadIc css={isReloading && css`
        ${SvgIconsStyle.El.icon.thiz()} {
          animation: ${rotateAnim} 650ms linear infinite;
        }
      `}
      />
    </Button>
  })
  
  
  
  export type SoftRefreshBtnProps = PartialUndef<{
    isLoading: boolean
    refresh: Callback
  }>
  export const SoftRefreshBtn =
  React.memo(
  (props: SoftRefreshBtnProps)=>{
    
    const [isAnimating, animate, finishAnimate] = useBool(false)
    
    useLayoutEffect(
      ()=>{ if (props.isLoading) animate() },
      [props.isLoading]
    )
    
    return <Button css={IconButtonStyle.iconTransparent}
      onClick={props.refresh}
    >
      <ArrowReloadIc css={isAnimating && css`
        ${SvgIconsStyle.El.icon.thiz()} {
          animation: ${rotateAnim} 650ms linear infinite;
        }
      `}
        onAnimationIteration={ev=>{
          if (ev.animationName===rotateAnim.name && !props.isLoading) finishAnimate()
        }}
      />
    </Button>
  })
  
  
  
}