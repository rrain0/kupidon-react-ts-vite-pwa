import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'
import { TypeU } from '@util/common/TypeU.ts'
import React from 'react'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import AppNavLink from 'src/ui/components/app-router/NavLink.tsx'
import UseOverlayUrl from 'src/ui/components/UseOverlayUrl/UseOverlayUrl.tsx'
import { SvgGradIconsPack } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIconsPack.tsx'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import row = EmotionCommon.row
import GearOutlinedIc = SvgIconsPack.GearOutlinedIc
import RootRoute = AppRoutes.RootRoute
import fixedBottom = EmotionCommon.fixedBottom
import QuickSettings, {
  QuickSettingsOverlayName,
} from 'src/ui/1-widgets/QuickSettings/QuickSettings.tsx'
import ProfileGradIc = SvgGradIconsPack.ProfileGradIc
import ChatRoundGradIc = SvgGradIconsPack.ChatRoundGradIc
import CardsHeartGradIc = SvgGradIconsPack.CardsHeartGradIc
import BowArrowGradIc = SvgGradIconsPack.BowArrowGradIc
import modalFloor500 = StyleVals.modalFloor500
import Pu = TypeU.Pu
import toEmptyAttr = TypeU.toEmptyAttr



export type NavBarPlace = 'profile' | 'chat' | 'findPair' | 'bowAndArrows' | 'settings'

export type NavBarProps = Pu<{
  place: NavBarPlace
}>

const NavBar = React.memo((props: NavBarProps) => {
  const { place } = props
  
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
        
        <AppNavLink toFull={RootRoute.profile}>
          <Button css={nav} data-selected={toEmptyAttr(place === 'profile')}>
            <ProfileGradIc/>
            <div>{titleText.profile}</div>
          </Button>
        </AppNavLink>
        
        <AppNavLink toFull={RootRoute.chatList}>
          <Button css={nav} data-selected={toEmptyAttr(place === 'chat')}>
            <ChatRoundGradIc/>
            <div>{titleText.chat}</div>
          </Button>
        </AppNavLink>
        
        <AppNavLink toFull={RootRoute.findPair}>
          <Button css={nav} data-selected={toEmptyAttr(place === 'findPair')}>
            <CardsHeartGradIc/>
            <div>{titleText.hearts}</div>
          </Button>
        </AppNavLink>
        
        <AppNavLink toFull={RootRoute.bowAndArrows}>
          <Button css={nav} data-selected={toEmptyAttr(place === 'bowAndArrows')}>
            <BowArrowGradIc/>
            <div>{titleText.bowAndArrows}</div>
          </Button>
        </AppNavLink>
        
        <UseOverlayUrl overlayName={QuickSettingsOverlayName}>
          {overlay => (
            <>
              <Button
                css={nav}
                data-selected={toEmptyAttr(place === 'settings')}
                onClick={overlay.open}
              >
                <GearOutlinedIc/>
                <div>{titleText.settings}</div>
              </Button>
              
              <QuickSettings isOpen={overlay.isOpen} close={overlay.closeWithAction}/>
            </>
          )}
        </UseOverlayUrl>
        
      </Frame>
      
    </>
  )
})
NavBar.displayName = 'NavBar'
export default NavBar



const Frame = styled.nav`
  ${fixedBottom};
  z-index: ${modalFloor500};
  height: var(--bottom-nav-height);
  min-height: var(--bottom-nav-height);
  padding-bottom: var(--bottom-nav-padding-bottom);
  ${row};
  justify-content: space-between;
  background: ${p => p.theme.nav.bg};
`




const nav = (t: AppTheme.Theme) => css`
  ${IconButtonS6.t([IconButtonS6.S.trans.round.lg.normal, {
    button: {
      w: 'auto', h: 'full', r: 10, p: [5, 0, 2],
      ...WidgetStyleCommon.colC, g: 3, flex: 1,
      bg: null,
      color: t.navButton.ct,
      ...WidgetStyleCommon.Txt.s10,
    },
    icon: {
      sz: 'full',
      color: t.navButton.ct,
    },
    gradIcon: {
      sz: 'full',
      color0: t.navButton.ct,
      color1: t.navButton.ct,
    },
    selected: {
      buttonColor: t.navButton.cta,
      iconColor: t.navButton.cta,
      gradIconColor0: t.boxAccentCt4.ctGrad[0],
      gradIconColor1: t.boxAccentCt4.ctGrad[1],
    },
  }])(t)}
  
  
  // TODO Style - a.active ...selector - Doesn't work if single style because it expands to multiple classes
  // link active selector
  // a.active &.btnClass > .iconClass
  /*
  a.active ${IconButtonS6.t(t => ({
    buttonColor: t.navButton.cta,
  }))(t)}
  a.active ${IconButtonS6.t(t => ({
    iconColor: t.navButton.cta,
  }))(t)}
  a.active ${IconButtonS6.t(t => ({
    gradIconColor0: t.boxAccentCt4.ctGrad[0],
    gradIconColor1: t.boxAccentCt4.ctGrad[1],
  }))(t)}
  */
  
  
  ${IconButtonS6.t(t => ({
    inFocusButtonBg: t.navButton.bgFc,
  }))(t)}
`

