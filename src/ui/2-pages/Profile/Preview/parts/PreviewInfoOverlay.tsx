import { AnimatedProperty } from '@animated/AnimatedProperty.ts'
import AnimatedDiv from '@animated/elements/AnimatedDiv.tsx'
import AnimatedState from '@animated/elements/AnimatedState.tsx'
import styled from '@emotion/styled'
import { DateU } from '@util/date/DateU.ts'
import { useWasDragged } from '@util/pointer/useWasDragged.ts'
import React from 'react'
import { EmptyS6 } from 'src/mini-libs/widget-style-6/EmptyS6.ts'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import { SvgGradIconsPack } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIconsPack.tsx'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import DotsScrollIndicator from 'src/ui/1-widgets/DotsScrollIndicator/DotsScrollIndicator.tsx'
import {
  ProfileShowcaseAction,
} from 'src/ui/1-widgets/ProfileShowcase/ProfileShowcase.tsx'
import { ReactU } from 'src/util/react/ReactU'
import { TypeU } from 'src/util/common/TypeU'
import Pu = TypeU.Pu
import ClassStyle = ReactU.ClassStyle
import col = EmotionCommon.col
import colC = EmotionCommon.colC
import HeartFilledIc = SvgIconsPack.HeartFilledIc
import ArrowAngledRounded2GradIc = SvgGradIconsPack.ArrowAngledRounded2GradIc
import Cross2GradIc = SvgGradIconsPack.Cross2GradIc
import ArrowBackGradIc = SvgGradIconsPack.ArrowBackGradIc
import Callback = TypeU.Callback
import attrExists = TypeU.attrEmpty
import abs = EmotionCommon.abs
import flexC = EmotionCommon.flexC
import gridStackC = EmotionCommon.gridStackC
import full = EmotionCommon.full
import CrossIc = SvgIconsPack.CrossIc
import ArrowBackIc = SvgIconsPack.ArrowBackIc




export type PreviewInfoOverlayProps = ClassStyle & Pu<{
  actionButtonsDisabled: boolean
  animatedInfo: AnimatedProperty<{
    indicatorProgress: number,
    reactionIconOpacity: number,
    action: ProfileShowcaseAction
  }>
  photosCnt: number
  openInfo: Callback
  name: string
  birthDate: string
  aboutMe: string
  
  onAccept: Callback
  onReject: Callback
  onBack: Callback
}>
export const PreviewInfoOverlay = React.memo((props: PreviewInfoOverlayProps) => {
  const {
    actionButtonsDisabled,
    animatedInfo,
    photosCnt = 1,
    openInfo,
    name = '',
    birthDate = '',
    aboutMe = '',
    
    onAccept,
    onReject,
    onBack,
  } = props
  
  const match = 'XX'
  
  const { getWasDragged } = useWasDragged()
  
  const nameAge = [name, DateU.age(birthDate)].filter(it => it).join(', ')
  
  return (
    <PreviewInfoBox
      data-display-name="PreviewInfoOverlay"
    >
      
      
      <Match>Совпадение - {match}%</Match>
      
      {photosCnt >= 2 && (
        <ScrollIndicatorBox>
          <DotsScrollIndicator
            cnt={photosCnt}
            progress={animatedInfo?.map(ai => ai.indicatorProgress)}
          />
        </ScrollIndicatorBox>
      )}
      
      <ShortInfoContainer>
        <ShortInfoBox
          data-disabled={attrExists(actionButtonsDisabled)}
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
          css={IconButtonS6.t(backButtonS)}
          disabled={actionButtonsDisabled}
          onClick={ev => {
            ev.stopPropagation()
            if (getWasDragged?.()) return
            onBack?.()
          }}
        >
          <ArrowBackGradIc/>
        </Button>
        <Button
          css={IconButtonS6.t(dislikeButtonS)}
          disabled={actionButtonsDisabled}
          onClick={ev => {
            ev.stopPropagation()
            if (getWasDragged?.()) return
            onReject?.()
          }}
        >
          <Cross2GradIc/>
        </Button>
        <Button
          css={IconButtonS6.t(likeButtonS)}
          disabled={actionButtonsDisabled}
          onClick={ev => {
            ev.stopPropagation()
            if (getWasDragged?.()) return
            onAccept?.()
          }}
        >
          <HeartFilledIc/>
        </Button>
        <Button
          css={IconButtonS6.t(infoButtonS)}
          disabled={actionButtonsDisabled}
          onClick={ev => {
            ev.stopPropagation()
            console.log('click openInfo')
            if (getWasDragged?.()) return
            openInfo?.()
          }}
        >
          <ArrowAngledRounded2GradIc/>
        </Button>
      </ActionButtonsBox>
      
      <ActionFrame>
        <ActionWidgetBox
          animatedStyle={{
            opacity: animatedInfo?.map(ai => ai.reactionIconOpacity),
          }}
        >
          <AnimatedState
            animatedState={{
              action: animatedInfo?.map(ai => ai.action),
            }}
          >
            {({ action }) => (
              <>
                {action ==='accept' && (
                  <ActionWidget>
                    <ActionIconBox>
                      <HeartFilledIc css={SvgIconS6.t(actionHeartS)}/>
                    </ActionIconBox>
                  </ActionWidget>
                )}
                {action ==='reject' && (
                  <ActionWidget>
                    <ActionIconBox>
                      <CrossIc css={SvgIconS6.t(actionCrossS)}/>
                    </ActionIconBox>
                  </ActionWidget>
                )}
                {action ==='back' && (
                  <ActionWidget>
                    <ActionIconBox>
                      <ArrowBackIc css={SvgIconS6.t(actionArrowBackS)}      />
                    </ActionIconBox>
                  </ActionWidget>
                )}
              </>
            )}
          </AnimatedState>
        </ActionWidgetBox>
      </ActionFrame>
    
    </PreviewInfoBox>
  )
})
PreviewInfoOverlay.displayName = 'PreviewInfoOverlay'
export default PreviewInfoOverlay





const PreviewInfoBox = styled.div`
  ${abs};
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
  ...WidgetStyleCommon.Txt.s16Wide,
  color: t.previewOverlayInfoMatchIndicator.ct,
})
const Match = styled.div(p => EmptyS6.t(matchS)(p.theme))


const ActionButtonsBox = styled.div`
  grid-area: btns;
  place-self: end;
  padding-right: 16px;
  padding-bottom: 36px;
  ${colC};
  gap: 22px;
`



const icPreviewNormal: AppWidgetStyle = t => [
  IconButtonS6.Parts.Type.filled.Shape.round.Size.lg2,
  IconButtonS6.Parts.Type.filled.baseColor,
  {
    buttonBgColor: t.previewButtonNorm.bg,
    buttonColor: t.previewButtonNorm.ct,
    rippleColor: t.previewButtonNorm.ctRipple,
    gradIconColor0: t.previewButtonNorm.ctGrad[0],
    gradIconColor1: t.previewButtonNorm.ctGrad[2],
    inFocus: {
      buttonBgColor: t.previewButtonNorm.bgFc,
      buttonColor: t.previewButtonNorm.ctFc,
    },
  },
  {
    button: {
      p: 0,
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15)',
    },
    disabled: {
      buttonTransition: 'opacity 0.2s',
      buttonOpacity: 0.3,
    },
    
    // TODO Style - remove and apply :where to resetButton
    buttonHover: {
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15)',
    },
    buttonActive: {
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15)',
    },
    buttonFocus: {
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15)',
    },
    buttonFocusVisible: {
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15)',
    },
  },
]
const icPreviewMain: AppWidgetStyle = t => [
  IconButtonS6.Parts.Type.filled.Shape.round.Size.lg2,
  IconButtonS6.Parts.Type.filled.baseColor,
  {
    buttonBg: {
      color: t.previewButtonMain.bg,
      im: `linear-gradient(
        to bottom,
        ${t.previewButtonMain.bgGrad[0]} 25%,
        ${t.previewButtonMain.bgGrad[1]} 50% 100%
      )`,
      pos: '0 0',
      sz: '100% 200%',
    },
    buttonColor: t.previewButtonMain.ct,
    rippleColor: t.previewButtonMain.ctRipple,
    iconColor: t.previewButtonMain.ct,
    inFocus: {
      buttonTransition: 'background-position 0.3s',
      buttonBgPos: '0 30%',
    },
  },
  {
    button: {
      sz: 60, p: 0,
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15)',
    },
    disabled: {
      buttonTransition: 'opacity 0.2s',
      buttonOpacity: 0.3,
    },
    
    // TODO Style - remove and apply :where to resetButton
    buttonHover: {
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15)',
    },
    buttonActive: {
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15)',
    },
    buttonFocus: {
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15)',
    },
    buttonFocusVisible: {
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15)',
    },
  },
]





const backButtonS: AppWidgetStyle = t => [icPreviewNormal, {
  gradIcon: {
    sz: '54%',
    rotate: '0.5turn',
    translate: '-7% -5%',
  },
}]
const dislikeButtonS: AppWidgetStyle = t => [icPreviewNormal, {
  buttonSz: 58,
  gradIconSz: '35.5%',
}]
const likeButtonS: AppWidgetStyle = t => [icPreviewMain, {
  iconSz: '51.05%',
}]
const infoButtonS: AppWidgetStyle = t => [icPreviewNormal, {
  gradIcon: {
    sz: '50%',
    translate: '0 10%',
  },
}]


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



const ActionFrame = styled.div`
  ${abs};
  ${flexC};
  pointer-events: none;
`
const ActionWidgetBox = styled(AnimatedDiv)`
  width: 30%;
  aspect-ratio: 1;
  will-change: opacity;
`
const ActionWidget = styled.div`
  ${full};
  border-radius: 999999px;
  // TODO theme
  background-color: white;
  ${flexC};
`
const ActionIconBox = styled.div`
  width: 50%;
  height: 50%;
  ${gridStackC};
`
const actionHeartS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  icon: {
    mt: 2,
    // TODO theme
    color: '#cb3357',
  },
}]
const actionCrossS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  icon: {
    // TODO theme
    color: '#1F1F1F',
  },
}]
const actionArrowBackS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  icon: {
    // TODO theme
    color: '#1F1F1F',
    size: '108%',
    rotate: '0.5turn',
    translate: '-7% -5%',
  },
}]


