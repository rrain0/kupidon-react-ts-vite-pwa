import { AnimatedProperty } from '@animated/AnimatedProperty.ts'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { DateU } from '@util/date/DateU.ts'
import { useBool } from '@util/react-state/useBool.ts'
import React from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { IconButtonStyle } from 'src/ui/0-elements/buttons/IconButton/IconButtonStyle.ts'
import { SvgGradIconsPack } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIconsPack.tsx'
import { SvgIconS } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import DotsScrollIndicator from 'src/ui/1-widgets/DotsScrollIndicator/DotsScrollIndicator.tsx'
import { ScrollbarVerticalStyle } from 'src/ui/1-widgets/Scrollbar/ScrollbarVerticalStyle.ts'
import PreviewInfo from 'src/ui/2-pages/Profile/Preview/parts/PreviewInfo.tsx'
import { ReactU } from 'src/util/react/ReactU'
import { TypeU } from 'src/util/common/TypeU'
import Puro = TypeU.Puro
import ClassStyle = ReactU.ClassStyle
import col = EmotionCommon.col
import colC = EmotionCommon.colC
import Getter = TypeU.Getter
import Heart2Ic = SvgIconsPack.Heart2Ic
import ArrowAngledRounded2GradIc = SvgGradIconsPack.ArrowAngledRounded2GradIc
import ArrowReload2GradIc = SvgGradIconsPack.ArrowReload2GradIc
import Cross2GradIc = SvgGradIconsPack.Cross2GradIc
import trueOrUndef = TypeU.trueOrUndef
import ArrowBackGradIc = SvgGradIconsPack.ArrowBackGradIc




export type PreviewInfoOverlayProps = ClassStyle & Puro<{
  isDragging: boolean
  getWasDragged: Getter<boolean>
  photoProgress: AnimatedProperty<any, number>
  photosCnt: number
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
    name = '',
    birthDate = '',
    aboutMe = '',
  } = props
  
  const [isInfoOpen, openInfo, closeInfo] = useBool(false)
  
  const nameAge = [name, DateU.age(birthDate)].filter(it => it).join(', ')
  
  return (
    <>
      <PreviewInfoBox
        data-display-name="PreviewInfoOverlay"
      >
        
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
            onClick={() => {
              if (getWasDragged?.()) return
              openInfo()
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
            onClick={() => {
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
            onClick={() => {
              if (getWasDragged?.()) return
            }}
          >
            <Cross2GradIc />
          </Button>
          <Button
            css={likeButtonS}
            disabled={isDragging}
            onClick={() => {
              if (getWasDragged?.()) return
            }}
          >
            <Heart2Ic />
          </Button>
          <Button
            css={infoButtonS}
            disabled={isDragging}
            onClick={() => {
              if (getWasDragged?.()) return
              openInfo()
            }}
          >
            <ArrowAngledRounded2GradIc />
          </Button>
        </ActionButtonsBox>
      
      </PreviewInfoBox>
      
      
      
      <PreviewInfo isOpen={isInfoOpen} close={closeInfo} />
    </>
  )
})
PreviewInfoOverlay.displayName = 'PreviewInfo'
export default PreviewInfoOverlay





const PreviewInfoBox = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10;
  display: grid;
  grid:
    '.... .... ind ' auto
    'info .... btns' auto
    /1fr  8px  auto;
`


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
  // todo move to styles
  :disabled {
    transition: opacity 0.3s;
    opacity: 0.3;
  }
`
const dislikeButtonS = (t: AppTheme.Theme) => css`
  ${IconButtonStyle.icPreviewNormalBigger(t)};
  ${IconButtonStyle.W.use.s.normal().e.iconGrad().thisUse} {
    ${SvgIconS.W.e.icon.p.size.set('35.5%')}
  }
  // todo move to styles
  :disabled {
    transition: opacity 0.2s;
    opacity: 0.3;
  }
`
const likeButtonS = (t: AppTheme.Theme) => css`
  ${IconButtonStyle.icPreviewMain(t)};
  ${IconButtonStyle.W.use.s.normal().e.icon().thisUse} {
    ${SvgIconS.W.e.icon.p.size.set('51.05%')}
  }
  // todo move to styles
  :disabled {
    transition: opacity 0.2s;
    opacity: 0.3;
  }
`
const infoButtonS = (t: AppTheme.Theme) => css`
  ${IconButtonStyle.icPreviewNormal(t)};
  ${IconButtonStyle.W.use.s.normal().e.iconGrad().thisUse} {
    ${SvgIconS.W.e.icon.p.size.set('50%')};
    translate: 0 10%;
  }
  // todo move to styles
  :disabled {
    transition: opacity 0.2s;
    opacity: 0.3;
  }
`


const ShortInfoContainer = styled.div`
  grid-area: info;
  place-self: end start;
  ${col};
  align-items: start;
  justify-content: end;
  //padding-left: 10px;
  //padding-bottom: 10px;
`
const ShortInfoBox = styled.div`
  ${col};
  align-items: start;
  justify-content: end;
  gap: 14px;
  padding: 10px 14px;
  //border-radius: 12px;
  //background: #00000066;
  cursor: pointer;
  &[data-disabled] {
    cursor: auto;
  }
`
const Name = styled.div`
  background-color: ${p => p.theme.previewInfoBox.bg};
  color: ${p => p.theme.previewInfoBox.ct};
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
    ${p => p.theme.previewInfoBox.ctGrad[1]} 8px,
    ${p => p.theme.previewInfoBox.ctGrad[0]} 40px
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




// OLD
const scrollbarVerticalStyle = (t: AppTheme.Theme) => css`
  ${ScrollbarVerticalStyle.scrollbar(t)};
  ${ScrollbarVerticalStyle.El.track.thiz()}{
    width: 4px;
    height: 150px;
    position: absolute;
    top: 16px;
    right: 16px;
  }
`

const FadeButtonBar = styled.div`
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 200px;
  background: linear-gradient(to top,
    #ffffffff 0%, #ffffff88 10%, #ffffff88 70%, #ffffff00 100%
  );
  
  ${col};
  gap: 4px;
  padding: 10px;
  padding-top: 30px;
`
