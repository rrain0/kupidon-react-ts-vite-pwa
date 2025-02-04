import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { Light } from 'src/ui-data/theme/themes/Light.ts'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import UseOverlayUrl from 'src/ui/components/action-providers/UseOverlayUrl/UseOverlayUrl.tsx'
import { SvgGradIconsPack } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIconsPack.tsx'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import row = EmotionCommon.row
import Gear2Ic = SvgIconsPack.Gear2Ic
import RootRoute = AppRoutes.RootRoute
import full = RouteBuilder.full
import fixedBottom = EmotionCommon.fixedBottom
import QuickSettings, {
  QuickSettingsOverlayName,
} from 'src/ui/1-widgets/QuickSettings/QuickSettings.tsx'
import ProfileGradIc = SvgGradIconsPack.ProfileGradIc
import ChatRoundGradIc = SvgGradIconsPack.ChatRoundGradIc
import CardsHeartGradIc = SvgGradIconsPack.CardsHeartGradIc
import BowArrowGradIc = SvgGradIconsPack.BowArrowGradIc





const NavBar = React.memo(() => {
    
  const titleText = useUiValues(TitleUiText)
  
  
  return (
    <>
      
      <Global
        styles={css`
          :root {
            --bottom-nav-padding-bottom: max(calc(env(safe-area-inset-bottom, 0px) - 10px), 0px);
            --bottom-nav-height: calc(50px + var(--bottom-nav-padding-bottom));
          }
        `}
      />
      
      <Frame>
        
        <NavLink to={RootRoute.profile[full]()}>
          <Button css={nav}>
            <ProfileGradIc />
            <div>{titleText.profile}</div>
          </Button>
        </NavLink>
        
        <NavLink to={RootRoute.chat[full]()}>
          <Button css={nav}>
            <ChatRoundGradIc />
            <div>{titleText.chat}</div>
          </Button>
        </NavLink>
        
        <NavLink to={RootRoute.findPairs[full]()}>
          <Button css={nav}>
            <CardsHeartGradIc />
            <div>{titleText.findCouple}</div>
          </Button>
        </NavLink>
        
        <NavLink to={RootRoute.bowAndArrows[full]()}>
          <Button css={nav}>
            <BowArrowGradIc />
            <div>{titleText.bowAndArrows}</div>
          </Button>
        </NavLink>
        
        <UseOverlayUrl overlayName={QuickSettingsOverlayName}>
          {overlay => (
            <>
              <Button css={nav}
                onClick={() => {
                  console.log('settings')
                  overlay.open()
                }}
              >
                <Gear2Ic />
                <div>{titleText.settings}</div>
              </Button>
              
              <QuickSettings isOpen={overlay.isOpen} close={overlay.close} />
            </>
          )}
        </UseOverlayUrl>
        
      </Frame>
      
    </>
  )
})
export default NavBar



const Frame = styled.nav`
  ${fixedBottom};
  height: var(--bottom-nav-height);
  min-height: var(--bottom-nav-height);
  padding-bottom: var(--bottom-nav-padding-bottom);
  ${row};
  justify-content: space-between;
  background: ${p => p.theme.nav.bg};
`




const nav = (t: AppTheme.Theme) => css`
  ${IconButtonS6.t([IconButtonS6.Parts.base, {
    button: {
      w: 'auto', h: 'full', r: 10, p: [5, 0, 2],
      ...WidgetStyleCommon.colC, g: 3, flex: 1,
      bg: null,
      color: t.navButton.ct[0],
      ...WidgetStyleCommon.Txt.sm10,
    },
    icon: {
      sz: 'full',
      color: t.navButton.ct[0],
    },
    gradIcon: {
      sz: 'full',
      color0: t.navButton.ct[0],
      color1: t.navButton.ct[0],
    },
  }])(t)}
  
  
  // TODO Style - a.active ...selector - Doesn't work if single style because it expands to multiple classes
  // link active selector
  // a.active &.btnClass > .iconClass
  a.active ${IconButtonS6.t(t => ({
    buttonColor: t.navButton.cta[0],
  }))(t)}
  a.active ${IconButtonS6.t(t => ({
    iconColor: t.navButton.cta[0],
  }))(t)}
  a.active ${IconButtonS6.t(t => ({
    gradIconColor0: t.gradIcon.ct[0],
    gradIconColor1: t.gradIcon.ct[1],
  }))(t)}
  
  
  ${IconButtonS6.t(t => ({
    inFocusButtonBg: t.navButton.bgFocus[0],
  }))(t)}
`

