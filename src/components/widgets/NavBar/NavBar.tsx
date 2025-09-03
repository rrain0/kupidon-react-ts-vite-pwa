import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'
import { TypeU } from '@utils/common/TypeU.ts'
import { flexStyle } from '@utils/react/short-props/style/flexStyle.ts'
import React from 'react'
import { AppRoutes } from 'src/configs/AppRoutes.ts'
import { StyleVals } from 'src/styles/StyleVals.ts'
import { WidgetStyleCommon } from 'src/styles/common/WidgetStyleCommon.ts'
import { AppTheme } from 'src/styles/themes/AppTheme.ts'
import { IconButtonS6 } from 'src/components/elems/buttons/IconButton/IconButtonS6.ts'
import BowArrowGradIc from 'src/components/elems/icons/GradSvgIcons/pack/special/BowArrowGradIc.tsx'
import CardsHeartGradIc
  from 'src/components/elems/icons/GradSvgIcons/pack/special/CardsHeartGradIc.tsx'
import ChatRoundGradIc from 'src/components/elems/icons/GradSvgIcons/pack/ui/ChatRoundGradIc.tsx'
import ProfileGradIc from 'src/components/elems/icons/GradSvgIcons/pack/ui/ProfileGradIc.tsx'
import AppNavLink from 'src/components/components/app-router/AppNavLink.tsx'
import UseOverlayUrl from 'src/components/components/UseOverlayUrl/UseOverlayUrl.tsx'
import { TitleUiText } from 'src/locales/translations/TitleUiText.ts'
import { useUiValues } from '@libs/ui-text/useUiText.ts'
import Button from 'src/components/elems/buttons/Button/Button.tsx'
import GearOutlinedIc from 'src/components/elems/icons/SvgIcons/pack/ui/GearOutlinedIc.tsx'
import RootRoute = AppRoutes.RootRoute
import QuickSettings, {
  QuickSettingsOverlayName,
} from 'src/components/widgets/QuickSettings/QuickSettings.tsx'
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
        styles={css({
          ':root': {
            '--bottom-nav-bar-h': '50px',
          },
        })}
      />
      
      <NavBox data-display-name='NavBar'>
        
        <AppNavLink toFull={RootRoute.profile}>
          <Button
            data-selected={toEmptyAttr(place === 'profile')}
            css={nav}
          >
            <ProfileGradIc/>
            {/* <div>{titleText.profile}</div> */}
          </Button>
        </AppNavLink>
        
        <AppNavLink toFull={RootRoute.chats}>
          <Button
            data-selected={toEmptyAttr(place === 'chat')}
            css={nav}
          >
            <ChatRoundGradIc/>
            {/* <div>{titleText.chat}</div> */}
          </Button>
        </AppNavLink>
        
        <AppNavLink toFull={RootRoute.findPair}>
          <Button
            data-selected={toEmptyAttr(place === 'findPair')}
            css={nav}
          >
            <CardsHeartGradIc/>
            {/* <div>{titleText.hearts}</div> */}
          </Button>
        </AppNavLink>
        
        <AppNavLink toFull={RootRoute.bowAndArrows}>
          <Button
            data-selected={toEmptyAttr(place === 'bowAndArrows')}
            css={nav}
          >
            <BowArrowGradIc/>
            {/* <div>{titleText.bowAndArrows}</div> */}
          </Button>
        </AppNavLink>
        
        <UseOverlayUrl overlayName={QuickSettingsOverlayName}>
          {overlay => (
            <>
              <Button
                data-selected={toEmptyAttr(place === 'settings')}
                css={nav}
                onClick={overlay.open}
              >
                <GearOutlinedIc/>
                {/* <div>{titleText.settings}</div> */}
              </Button>
              
              <QuickSettings isOpen={overlay.isOpen} close={overlay.closeWithAction}/>
            </>
          )}
        </UseOverlayUrl>
        
      </NavBox>
      
    </>
  )
})
NavBar.displayName = 'NavBar'
export default NavBar




const NavBox = styled.nav(({ theme: t }) => flexStyle({
  fixedBottom: true, z: modalFloor500,
  pb: 'var(--bottom-nav-offest-bottom)',
  contentBox: true, h: 'var(--bottom-nav-bar-h)',
  row: true, justifySpaceBetween: true,
  bgColor: t.nav.bg,
  //bgColor: '#ff000077',
}))




const nav = (t: AppTheme.Theme) => css`
  ${IconButtonS6.t([IconButtonS6.S.trans.round.lg.normal, {
    button: {
      w: 'auto', h: '50px', flex: 1, r: 10, /* p: [5, 0, 2], */ p: [11, 0, 11],
      display: 'grid', /* rows: '1fr 13px', */ rows: '1fr', placeItems: 'center', g: 2,
      bg: null,
      color: t.navButton.ct,
      ...WidgetStyleCommon.Txt.s10,
    },
    icon: {
      //sz: 27,
      h: '100%',
      color: t.navButton.ct,
    },
    gradIcon: {
      //sz: 27,
      h: '100%',
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

