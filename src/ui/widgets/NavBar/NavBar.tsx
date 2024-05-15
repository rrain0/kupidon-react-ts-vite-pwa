import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'
import clsx from 'clsx'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import UseOverlay from 'src/ui/components/StateCarriers/UseOverlay.tsx'
import { IconButtonStyle } from 'src/ui/elements/buttons/IconButtonStyle.ts'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { TitleUiText } from 'src/ui/ui-values/TitleUiText.ts'
import UseBool from 'src/ui/components/StateCarriers/UseBool.tsx'
import { NavButtonStyle } from 'src/ui/widgets/NavBar/NavButtonStyle.ts'
import { ReactUtils } from 'src/util/common/ReactUtils.ts'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import { RouteBuilder } from '@util/react/route-builder/RouteBuilder.tsx'
import Button from 'src/ui/elements/buttons/Button.tsx'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons/SvgIcons.tsx'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import row = EmotionCommon.row
import CardsHeartIc = SvgIcons.CardsHeartIc
import ProfileIc = SvgIcons.ProfileIc
import Gear2Ic = SvgIcons.Gear2Ic
import RootRoute = AppRoutes.RootRoute
import full = RouteBuilder.full
import ChatRoundIc = SvgIcons.ChatRoundIc
import fixedBottom = EmotionCommon.fixedBottom
import QuickSettings, {
  QuickSettingsOverlayName,
} from 'src/ui/widgets/QuickSettings/QuickSettings.tsx'
import onPointerClick = ReactUtils.onPointerClick
import BowArrowIc = SvgIcons.BowArrowIc
import ProfileGradIc = SvgGradIcons.ProfileGradIc
import ChatRoundGradIc = SvgGradIcons.ChatRoundGradIc
import CardsHeartGradIc = SvgGradIcons.CardsHeartGradIc
import BowArrowGradIc = SvgGradIcons.BowArrowGradIc





const NavBar =
React.memo(
()=>{
  
  const titleText = useUiValues(TitleUiText)
  
  
  return <>
    
    <Global
      styles={css`
        :root {
          --bottom-nav-padding-bottom: max(calc(env(safe-area-inset-bottom, 0px) - 10px), 0px);
          --bottom-nav-height: calc(50px + var(--bottom-nav-padding-bottom));
        }
      `}
    />
    
    <Frame
      className={clsx('rrainuiBottomNavBar')}
    >
      
      <NavLink to={RootRoute.profile[full]()}>
        <Button css={NavButtonStyle.nav}>
          <ProfileGradIc/>
          <div>{titleText.profile}</div>
        </Button>
      </NavLink>
      
      <NavLink to={RootRoute.chat[full]()}>
        <Button css={NavButtonStyle.nav}>
          <ChatRoundGradIc/>
          <div>{titleText.chat}</div>
        </Button>
      </NavLink>
      
      <NavLink to={RootRoute.findPairs[full]()}>
        <Button css={NavButtonStyle.nav}>
          <CardsHeartGradIc/>
          <div>{titleText.findCouple}</div>
        </Button>
      </NavLink>
      
      <NavLink to={RootRoute.bowAndArrows[full]()}>
        <Button css={NavButtonStyle.nav}>
          <BowArrowGradIc/>
          <div>{titleText.bowAndArrows}</div>
        </Button>
      </NavLink>
      
      <UseOverlay overlayName={QuickSettingsOverlayName}>{overlay=>
        <>
          <Button css={NavButtonStyle.nav}
            onClick={overlay.open}
            //{...onPointerClick(overlay.open)}
          >
            <Gear2Ic/>
            <div>{titleText.settings}</div>
          </Button>
          <QuickSettings isOpen={overlay.isOpen} close={overlay.close}/>
        </>
      }</UseOverlay>
        
    
    </Frame>
    
  </>
})
export default NavBar



const Frame = styled.nav`
  ${fixedBottom};
  height: var(--bottom-nav-height);
  min-height: var(--bottom-nav-height);
  padding-bottom: var(--bottom-nav-padding-bottom);
  ${row};
  justify-content: space-between;
  background: ${p=>p.theme.nav.bgc[0]};
`




