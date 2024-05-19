import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'
import clsx from 'clsx'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import UseOverlay from 'src/ui/components/UseOverlay/UseOverlay.tsx'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { TitleUiText } from 'src/ui/ui-values/TitleUiText.ts'
import UseBool from 'src/ui/components/UseBool/UseBool.tsx'
import { NavButtonStyle } from 'src/ui/widgets/NavBar/NavButtonStyle.ts'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import { RouteBuilder } from '@util/react/route-builder/RouteBuilder.tsx'
import Button from 'src/ui/elements/buttons/Button.tsx'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons/SvgIcons.tsx'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import row = EmotionCommon.row
import Gear2Ic = SvgIcons.Gear2Ic
import RootRoute = AppRoutes.RootRoute
import full = RouteBuilder.full
import fixedBottom = EmotionCommon.fixedBottom
import QuickSettings, {
  QuickSettingsOverlayName,
} from 'src/ui/widgets/QuickSettings/QuickSettings.tsx'
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
      
      <UseBool>{overlayBool=>
        <>
          <UseOverlay
            overlayName={QuickSettingsOverlayName}
            isOpen={overlayBool.value}
            setIsOpen={overlayBool.setValue}
          />
          
          <Button css={NavButtonStyle.nav}
            onClick={overlayBool.setTrue}
          >
            <Gear2Ic/>
            <div>{titleText.settings}</div>
          </Button>
          
          <QuickSettings isOpen={overlayBool.value} close={overlayBool.setFalse}/>
        </>
      }</UseBool>
        
    
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




