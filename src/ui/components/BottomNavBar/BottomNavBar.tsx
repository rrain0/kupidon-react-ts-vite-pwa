import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'
import classNames from 'classnames'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { BottomNavBarUiText } from 'src/ui/components/BottomNavBar/uiText.ts'
import UseBool from 'src/ui/components/StateCarriers/UseBool.tsx'
import { ReactUtils } from '@util/common/ReactUtils.ts'
import { useUiValues } from 'src/ui/lang/useUiText.ts'
import { RouteBuilder } from '@util/react/route-builder/RouteBuilder.tsx'
import Button from 'src/ui/widgets/Buttons/Button'
import { ButtonStyle } from 'src/ui/widgets/Buttons/ButtonStyle'
import { SvgIcons } from 'src/ui/widgets/icons/SvgIcons'
import { EmotionCommon } from 'src/ui/styles/EmotionCommon.ts'
import row = EmotionCommon.row
import CardsHeartIc = SvgIcons.CardsHeartIc
import ProfileIc = SvgIcons.ProfileIc
import Gear2Ic = SvgIcons.Gear2Ic
import RootRoute = AppRoutes.RootRoute
import full = RouteBuilder.full
import ChatRoundIc = SvgIcons.ChatRoundIc
import fixedBottom = EmotionCommon.fixedBottom
import QuickSettings from 'src/ui/components/QuickSettings/QuickSettings.tsx'
import onPointerClick = ReactUtils.onPointerClick
import BowArrowIc = SvgIcons.BowArrowIc





const BottomNavBar =
React.memo(
()=>{
  
  const uiOptions = useUiValues(BottomNavBarUiText)
  
  
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
          <div>{uiOptions.profile.text}</div>
        </Button>
      </NavLink>
      
      <Button css={ButtonStyle.nav}>
        <ChatRoundIc/>
        <div>{uiOptions.chat.text}</div>
      </Button>
      
      <NavLink to={RootRoute.findPairs[full]()}>
        <Button css={ButtonStyle.nav}>
          <CardsHeartIc/>
          <div>{uiOptions.findCouples.text}</div>
        </Button>
      </NavLink>
      
      <Button css={ButtonStyle.nav}>
        <BowArrowIc/>
        <div>{uiOptions.bowAndArrows.text}</div>
      </Button>
      
      <UseBool>{bool=>
        <>
          <NavLink to={RootRoute.settings[full]()}
            onClick={ev=>ev.preventDefault()} // prevent follow link
          >
            <Button css={ButtonStyle.nav}
              {...onPointerClick(bool.setTrue)}
            >
              <Gear2Ic/>
              <div>{uiOptions.settings.text}</div>
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



