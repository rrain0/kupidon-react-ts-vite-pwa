/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback, useEffect, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UseFakePointerRef from 'src/components/ActionProviders/UseFakePointerRef'
import QuickSettings from 'src/components/QuickSettings/QuickSettings'
import SettingsButton from 'src/components/SettingsButton'
import UseBool from 'src/components/StateCarriers/UseBool'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { useBoolState } from 'src/utils/react/useBoolState'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import { SvgIcons } from 'src/views/icons/SvgIcons'
import { SvgIcStyle } from 'src/views/icons/SvgIcStyle'
import fixedBottom = EmotionCommon.fixedBottom
import row = EmotionCommon.row
import Arrow5FwdIc = SvgIcons.ArrowLinesSharp1Ic
import ArrowReloadIc = SvgIcons.ArrowReloadIc
import rotateKfs = EmotionCommon.rotateKfs
import fixedTop = EmotionCommon.fixedTop
import PartialUndef = TypeUtils.PartialUndef
import Callback = TypeUtils.Callback
import onPointerClick = ReactUtils.onPointerClick




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
    return <UseBool>{bool => <>
      
      <UseFakePointerRef>{({ ref })=>
        <SettingsButton
          ref={ref as any}
          // onClick={bool.setTrue}
          {...onPointerClick(bool.setTrue)}
        />
      }</UseFakePointerRef>
      
      <QuickSettings open={bool.value} setOpen={bool.setValue}/>
      
    </>}</UseBool>
  })
  
  
  export const BackBtn =
  React.memo(
  ()=>{
    const navigate = useNavigate()
    const back = useCallback(
      ()=>navigate(-1),
      [navigate]
    )
    
    return <Button css={ButtonStyle.iconTransparent}
      onClick={back}
    >
      <Arrow5FwdIc css={css`rotate: 0.5turn;`} />
    </Button>
  })
  
  
  
  export const RefreshPageBtn =
  React.memo(
  ()=>{
    
    const [isReloading, reload] = useBoolState(false)
    
    useEffect(
      ()=>{
        if (isReloading) window.location.reload()
      },
      [isReloading]
    )
    
    
    return <Button css={ButtonStyle.iconTransparent}
      onClick={reload}
    >
      <ArrowReloadIc css={isReloading && css`
        ${SvgIcStyle.El.thiz.icon} {
          animation: ${rotateKfs} 650ms linear infinite;
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
    
    const [isAnimating, animate, finishAnimate] = useBoolState(false)
    
    useLayoutEffect(
      ()=>{ if (props.isLoading) animate() },
      [props.isLoading]
    )
    
    return <Button css={ButtonStyle.iconTransparent}
      onClick={props.refresh}
    >
      <ArrowReloadIc css={isAnimating && css`
        ${SvgIcStyle.El.thiz.icon} {
          animation: ${rotateKfs} 650ms linear infinite;
        }
      `}
        onAnimationIteration={ev=>{
          if (ev.animationName===rotateKfs.name && !props.isLoading) finishAnimate()
        }}
      />
    </Button>
  })
  
  
  
}