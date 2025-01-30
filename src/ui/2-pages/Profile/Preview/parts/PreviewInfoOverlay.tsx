import { AnimatedProperty } from '@animated/AnimatedProperty.ts'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { DateU } from '@util/date/DateU.ts'
import React from 'react'
import { EmptyS6 } from 'src/mini-libs/widget-style-6/EmptyS6.ts'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { IconButtonStyle } from 'src/ui/0-elements/buttons/IconButton/IconButtonStyle.ts'
import { SvgGradIconsPack } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIconsPack.tsx'
import { SvgIconS } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import DotsScrollIndicator from 'src/ui/1-widgets/DotsScrollIndicator/DotsScrollIndicator.tsx'
import { ReactU } from 'src/util/react/ReactU'
import { TypeU } from 'src/util/common/TypeU'
import Puro = TypeU.Puro
import ClassStyle = ReactU.ClassStyle
import col = EmotionCommon.col
import colC = EmotionCommon.colC
import Getter = TypeU.Getter
import Heart2Ic = SvgIconsPack.Heart2Ic
import ArrowAngledRounded2GradIc = SvgGradIconsPack.ArrowAngledRounded2GradIc
import Cross2GradIc = SvgGradIconsPack.Cross2GradIc
import trueOrUndef = TypeU.trueOrUndef
import ArrowBackGradIc = SvgGradIconsPack.ArrowBackGradIc
import Callback = TypeU.Callback
import rowC = EmotionCommon.rowC
import Txt = EmotionCommon.Txt




export type PreviewInfoOverlayProps = ClassStyle & Puro<{
  isDragging: boolean
  getWasDragged: Getter<boolean>
  photoProgress: AnimatedProperty<any, number>
  photosCnt: number
  openInfo: Callback
  name: string
  birthDate: string
  aboutMe: string
}>
export const PreviewInfoOverlay = React.memo((props: PreviewInfoOverlayProps) => {
  const {
    isDragging = false,
    getWasDragged,
    photoProgress,
    photosCnt = 1,
    openInfo,
    name = '',
    birthDate = '',
    aboutMe = '',
  } = props
  
  const match = 'XX'
  
  const nameAge = [name, DateU.age(birthDate)].filter(it => it).join(', ')
  
  /*
  const infoButtonRef = useCallback((elem: HTMLButtonElement | null) => {
    if (elem) {
      elem.onfocus = () => {
        console.log('ref onfocus')
      }
      elem.onpointerup = (ev) => {
        console.log('ref onpointerup')
        elem.focus()
      }
      elem.onblur = () => {
        console.log('ref onblur')
      }
      elem.onclick = () => {
        console.log('ref onclick')
        openInfo?.()
      }
    }
  }, [])
   */
  
  return (
    <PreviewInfoBox
      data-display-name="PreviewInfoOverlay"
    >
      
      
      <Match>Совпадение - {match}%</Match>
      
      {photosCnt >= 2 && (
        <ScrollIndicatorBox>
          <DotsScrollIndicator
            cnt={photosCnt}
            progress={photoProgress}
          />
        </ScrollIndicatorBox>
      )}
      
      <ShortInfoContainer>
        <ShortInfoBox
          data-disabled={trueOrUndef(isDragging)}
          onClick={ev => {
            ev.stopPropagation()
            if (getWasDragged?.()) return
            openInfo?.()
          }}
        >
          <Name>{nameAge}</Name>
          <AboutMe>{aboutMe}</AboutMe>
        </ShortInfoBox>
      </ShortInfoContainer>
      
      <ActionButtonsBox>
        <Button
          css={backButtonS}
          disabled={isDragging}
          onClick={ev => {
            ev.stopPropagation()
            console.log('wasDragged', getWasDragged?.())
            console.log('back')
            if (getWasDragged?.()) return
          }}
        >
          <ArrowBackGradIc />
        </Button>
        <Button
          css={dislikeButtonS}
          disabled={isDragging}
          onClick={ev => {
            ev.stopPropagation()
            if (getWasDragged?.()) return
          }}
        >
          <Cross2GradIc />
        </Button>
        <Button
          css={likeButtonS}
          disabled={isDragging}
          onClick={ev => {
            ev.stopPropagation()
            if (getWasDragged?.()) return
          }}
        >
          <Heart2Ic />
        </Button>
        <Button
          //ref={infoButtonRef}
          css={infoButtonS}
          disabled={isDragging}
          onClick={ev => {
            ev.stopPropagation()
            if (getWasDragged?.()) return
            openInfo?.()
          }}
        >
          <ArrowAngledRounded2GradIc />
        </Button>
      </ActionButtonsBox>
    
    </PreviewInfoBox>
  )
})
PreviewInfoOverlay.displayName = 'PreviewInfoOverlay'
export default PreviewInfoOverlay





const PreviewInfoBox = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10;
  display: grid;
  grid:
    '.... .... match .... ind ' auto
    'info info info  .... btns' auto
    /1fr  auto auto  8px  1fr;
`

const matchS: AppWidgetStyle = t => ({
  gridArea: 'match',
  placeSelf: 'start center',
  h: 33, mt: 12, w: 'ct', ph: 14, r: 10,
  ...WidgetStyleCommon.rowC,
  bgColor: t.previewOverlayInfoMatchIndicator.bg,
  backdropFilter: 'blur(5px)',
  boxShadow: `0px 4px 15px ${t.previewOverlayInfoMatchIndicator.shadow}`,
  ...WidgetStyleCommon.Txt.lg16,
  color: t.previewOverlayInfoMatchIndicator.ct,
})
const Match = styled.div(({ theme: t }) => EmptyS6.W.t(t, matchS))


const ActionButtonsBox = styled.div`
  grid-area: btns;
  place-self: end;
  padding-right: 16px;
  padding-bottom: 36px;
  ${colC};
  gap: 22px;
`
const backButtonS = (t: AppTheme.Theme) => css`
  ${IconButtonStyle.icPreviewNormal(t)};
  ${IconButtonStyle.W.use.s.normal().e.iconGrad().thisUse} {
    ${SvgIconS.W.e.icon.p.size.set('54%')}
    rotate: 0.5turn;
    translate: -7% -5%;
  }
`
const dislikeButtonS = (t: AppTheme.Theme) => css`
  ${IconButtonStyle.icPreviewNormalBigger(t)};
  ${IconButtonStyle.W.use.s.normal().e.iconGrad().thisUse} {
    ${SvgIconS.W.e.icon.p.size.set('35.5%')}
  }
`
const likeButtonS = (t: AppTheme.Theme) => css`
  ${IconButtonStyle.icPreviewMain(t)};
  ${IconButtonStyle.W.use.s.normal().e.icon().thisUse} {
    ${SvgIconS.W.e.icon.p.size.set('51.05%')}
  }
`
const infoButtonS = (t: AppTheme.Theme) => css`
  ${IconButtonStyle.icPreviewNormal(t)};
  ${IconButtonStyle.W.use.s.normal().e.iconGrad().thisUse} {
    ${SvgIconS.W.e.icon.p.size.set('50%')};
    translate: 0 10%;
  }
`


const ShortInfoContainer = styled.div`
  grid-area: info;
  place-self: end start;
  ${col};
  align-items: start;
  justify-content: end;
`
const ShortInfoBox = styled.div`
  ${col};
  align-items: start;
  justify-content: end;
  gap: 14px;
  padding: 10px 14px;
  cursor: pointer;
  &[data-disabled] {
    cursor: auto;
  }
`
const Name = styled.div`
  background-color: ${p => p.theme.previewOverlayInfoBox.bg};
  color: ${p => p.theme.previewOverlayInfoBox.ct};
  font-weight: 600;
  font-size: 32px;
  line-height: 100%;
  letter-spacing: normal;
`
const AboutMe = styled.div`
  max-height: 94px;
  font-weight: 400;
  font-size: 17px;
  line-height: 129%;
  letter-spacing: normal;
  
  background-image: linear-gradient(
    to top,
    ${p => p.theme.previewOverlayInfoBox.ctGrad[1]} 8px,
    ${p => p.theme.previewOverlayInfoBox.ctGrad[0]} 40px
  );
  background-clip: text;
  background-size: 100% 94px;
  
  color: transparent;
  overflow: hidden;
`


const ScrollIndicatorBox = styled.div`
  grid-area: ind;
  place-self: start end;
  padding-top: 24px;
  padding-right: 16px;
`


