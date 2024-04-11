import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'
import classNames from 'classnames'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { BottomNavBarUiText } from 'src/ui/widgets/BottomNavBar/uiText.ts'
import UseBool from 'src/ui/components/StateCarriers/UseBool.tsx'
import { ReactUtils } from 'src/util/common/ReactUtils.ts'
import { useUiValues } from 'src/ui/ui-text/useUiText.ts'
import { RouteBuilder } from '@util/react/route-builder/RouteBuilder.tsx'
import Button from 'src/ui/elements/Buttons/Button.tsx'
import { ButtonStyle } from 'src/ui/elements/Buttons/ButtonStyle.ts'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons.tsx'
import { EmotionCommon } from 'src/ui/styles/EmotionCommon.ts'
import row = EmotionCommon.row
import CardsHeartIc = SvgIcons.CardsHeartIc
import ProfileIc = SvgIcons.ProfileIc
import Gear2Ic = SvgIcons.Gear2Ic
import RootRoute = AppRoutes.RootRoute
import full = RouteBuilder.full
import ChatRoundIc = SvgIcons.ChatRoundIc
import fixedBottom = EmotionCommon.fixedBottom
import QuickSettings from 'src/ui/widgets/QuickSettings/QuickSettings.tsx'
import onPointerClick = ReactUtils.onPointerClick
import BowArrowIc = SvgIcons.BowArrowIc





const BottomNavBar =
React.memo(
()=>{
  
  const uiText = useUiValues(BottomNavBarUiText)
  
  
  return <>
    
    <Global
      styles={css`
        :root{
          --bottom-nav-padding-bottom: max(calc(env(safe-area-inset-bottom, 0px) - 10px), 0px);
          --bottom-nav-height: calc(50px + var(--bottom-nav-padding-bottom));
        }
      `}
    />
    
    <Frame
      className={classNames('rrainuiBottomNavBar')}
    >
      
      <NavLink to={RootRoute.profile[full]()}>
        <Button css={ButtonStyle.nav}>
          <ProfileIc/>
          <div>{uiText.profile.text}</div>
        </Button>
      </NavLink>
      
      <NavLink to={RootRoute.chat[full]()}>
        <Button css={ButtonStyle.nav}>
          <ChatRoundIc/>
          <div>{uiText.chat.text}</div>
        </Button>
      </NavLink>
      
      <NavLink to={RootRoute.findPairs[full]()}>
        <Button css={ButtonStyle.nav}>
          <CardsHeartIc/>
          <div>{uiText.findCouples.text}</div>
        </Button>
      </NavLink>
      
      <NavLink to={RootRoute.bowAndArrows[full]()}>
        <Button css={ButtonStyle.nav}>
          <BowArrowIc/>
          <div>{uiText.bowAndArrows.text}</div>
        </Button>
      </NavLink>
      
      <UseBool>{bool=>
        <>
          <NavLink to={RootRoute.settings[full]()}
            onClick={ev=>ev.preventDefault()} // prevent follow link
          >
            <Button css={ButtonStyle.nav}
              {...onPointerClick(bool.setTrue)}
            >
              <Gear2Ic/>
              <div>{uiText.settings.text}</div>
            </Button>
          </NavLink>
          <QuickSettings open={bool.value} setOpen={bool.setValue}/>
        </>
      }</UseBool>
        
    
    </Frame>
    
  </>
})
export default BottomNavBar



const Frame = styled.nav`
  ${fixedBottom};
  height: var(--bottom-nav-height);
  min-height: var(--bottom-nav-height);
  padding-bottom: var(--bottom-nav-padding-bottom);
  ${row};
  justify-content: space-between;
  background: ${p=>p.theme.nav.bgc[0]};
`




