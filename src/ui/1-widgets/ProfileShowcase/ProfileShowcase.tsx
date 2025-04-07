import { AnimatedProperty } from '@animated/AnimatedProperty.ts'
import styled from '@emotion/styled'
import { getLoopedCarouselProps } from '@util/animated/carousel/carouselProps.ts'
import { createTrackPropsGetter } from '@util/animated/carousel/createTrackPropsGetter.ts'
import { useCarousel } from '@util/animated/carousel/useCarousel.ts'
import { useBool } from '@util/react-state/useBool.ts'
import { useResizeRef } from '@util/view/useResizeRef.ts'
import { getViewProps } from '@util/view/ViewProps.ts'
import { ViewU } from '@util/view/ViewU.ts'
import React, { useCallback, useMemo, useRef } from 'react'
import AnimatedDiv from '@animated/elements/AnimatedDiv.tsx'
import AnimatedImg from '@animated/elements/AnimatedImg.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText'
import { Images } from 'src/ui-data/Images'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import { imPlaceholderIcS } from 'src/ui/0-elements/imageParts.tsx'
import { GenderOptionValues } from 'src/ui/2-pages/Profile/options/ProfileGenderOption.tsx'
import PreviewFullInfo from 'src/ui/2-pages/Profile/Preview/parts/PreviewFullInfo.tsx'
import PreviewInfoOverlay from 'src/ui/2-pages/Profile/Preview/parts/PreviewInfoOverlay.tsx'
import { ProfilePhoto } from 'src/ui/2-pages/Profile/ProfilePage.model.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { ArrayU } from 'src/util/common/ArrayU'
import { RangeU } from 'src/util/common/RangeU'
import Txt = EmotionCommon.Txt
import flexC = EmotionCommon.flexC
import fill = EmotionCommon.fill
import arrOfIndices = ArrayU.arrOfIndices
import gridStackC = EmotionCommon.gridStackC
import PictureIc = SvgIconsPack.PictureIc
import gridC = EmotionCommon.gridC
import abs = EmotionCommon.abs
import { AppWidgetStyle } from 'mini-libs/widget-style-6/WidgetStyle'
import minRatioPort = StyleVals.minRatioPort
import maxRatioPort = StyleVals.maxRatioPort
import full = EmotionCommon.full




// Текущий прогресс отражает именно отображаемые вьюхи (range 0..3)
//  Если вьюха отобразилась, то она всегда отображает одну картинку,
//  покуда картинка источника по данному индексу не изменится,
//  то есть пока вьюха не переедет из низа колоды наверх или наоборот.
// Дальше этот range 0..3 мапается в range источника картинок,
//  чтобы вычислить правильный индекс картинки
// Key отображаемых элементов всегда одинаковый - индекс в array

/*
 TODO
 Состояния фото: загрузка / обработка... взять из profile summary
 Snap points & инерция
 
 */

// Максимальное кол-во отображаемых фоток.
// Во время анимации пролистывания их 4, в дефолтном состоянии их видно 3,
// потому что 4ая прозрачная.
const maxVisiblePhotosCnt = 4





export type ProfileShowcaseCssProps = {
  '--photos-w': '<length>'
  '--photos-h': '<length>'
}
export type ProfileShowcaseProps = {
  photos: ProfilePhoto[]
  name: string
  birthDate: string
  gender: GenderOptionValues
  aboutMe: string
  animatedStackProps?: undefined | AnimatedProperty<{
    zIndex: number
    transform: string
    scale: number
    opacity: number
  }>
}
export const ProfileShowcase = React.memo((props: ProfileShowcaseProps) => {
  const {
    photos,
    name,
    birthDate,
    gender,
    aboutMe,
    animatedStackProps,
  } = props
  
  //effectLog('photos', photos)
  
  const uiValues = useMemo(() => ({
    noPhotos: TitleUiText.noPhotos,
  }), [])
  const uiText = useUiValues(uiValues)
  
  const availablePhotos = useMemo(() => {
    return photos.filter(it => !it.isEmpty)
  }, [photos])
  const photosCnt = availablePhotos.length
  const isPhotosDraggable = photosCnt >= 2
  
  // if photosCnt is 0, then display 1 placeholder
  const visiblePhotosCnt = Math.min(maxVisiblePhotosCnt, photosCnt + 1)
  //const visiblePhotosCnt = 1
  
  // TODO изначально фотки не получены, поэтому изображение грузится
  const placeholderIm = useMemo(() => {
    if (photosCnt) return undefined
    //return Images.forBlur[0]
    return ArrayU.randomElem(Images.forBlur)
  }, [photosCnt])
  
  
  
  
  const itemsCnt = photosCnt
  const viewsCnt = visiblePhotosCnt
  
  const photosBoxRef = useRef<HTMLDivElement>(null)
  const getTrackProps = createTrackPropsGetter(photosBoxRef)
  
  
  const {
    isDragging,
    getIsDragging,
    getWasDragged,
    onTrackDrag,
    
    getStartProgress,
    getStartItemProgress,
    getDeltaProgress,
    animatedDeltaProgress,
    
    animateTo,
  } = useCarousel({
    itemsCnt,
    viewsCnt,
    getTrackProps,
    axis: 'y',
    inverted: false,
    noDrag: !isPhotosDraggable,
  }, [availablePhotos])
  
  
  const [isInfoOpen, openInfo, closeInfo] = useBool(false)
  
  
  const animatedPhotoProgress = useMemo(() => {
    return animatedDeltaProgress.map(cp => getStartItemProgress() + cp)
  }, [animatedDeltaProgress])
  
  const animatedProps = animatedDeltaProgress.map(dp => (viewI: number) => {
    return  getLoopedCarouselProps({
      startP: getStartProgress(),
      startItemP: getStartItemProgress(),
      deltaP: dp,
      itemsCnt,
      viewsCnt,
      startViewI: 0,
      currViewI: viewI,
    })
  })
  
  
  
  const onShowcaseFrameSetWh = useResizeRef<HTMLDivElement>(useCallback(frame => {
    if (frame) {
      const props = getViewProps(frame)
      const { w, h } = props
      const { w: photosW, h: photosH } = ViewU.clampRatio({
        minRatio: minRatioPort,
        maxRatio: maxRatioPort,
        w: w,
        h: h,
      })
      props.setCssProps({
        '--w': `${w}px`,
        '--h': `${h}px`,
        '--photos-w': `${photosW}px`,
        '--photos-h': `${photosH}px`,
      })
    }
  }, []))
  
  
  //console.log('rerender')
  
  return (
    <ShowcaseFrame
      data-display-name="ProfileShowcase"
      ref={onShowcaseFrameSetWh}
    >
      
        
        
      <PhotosStackBox>
        <PhotosStack
          ref={photosBoxRef}
          {...onTrackDrag()}
          onClick={() => {
            if (getWasDragged?.()) return
            closeInfo()
          }}
          animatedStyle={{
            zIndex: animatedStackProps?.map(p => p.zIndex),
            transform: animatedStackProps?.map(p => p.transform),
            scale: animatedStackProps?.map(p => p.scale),
            opacity: animatedStackProps?.map(p => p.opacity),
          }}
        >
          {arrOfIndices(visiblePhotosCnt).map(i => {
            return (
              <AnimatedPhotoBox
                key={i}
                animatedStyle={{
                  zIndex: animatedProps.map(ap => {
                    const { viewPosI } = ap(i)
                    const z = -viewPosI + visiblePhotosCnt - 1
                    return z
                  }),
                  transform: animatedProps.map(ap => {
                    const { viewPosI, pCurr } = ap(i)
                    const y = (() => {
                      if (viewPosI === 0) return pCurr
                      return -(viewPosI - RangeU.map(pCurr, [0, 80, 100], [0, 0, 1]))
                    })()
                    return `translateY(${y}%)`
                  }),
                  scale: animatedProps.map(ap => {
                    const { viewPosI, pCurr } = ap(i)
                    const s = (() => {
                      if (viewPosI === 0) return 100
                      return 100 - 5 * (viewPosI - RangeU.map(pCurr, [0, 80, 100], [0, 0, 1]))
                    })()
                    return s / 100
                  }),
                  opacity: animatedProps.map(ap => {
                    const { viewPosI, pCurr } = ap(i)
                    const o = (() => {
                      if (viewPosI === 0) return 100 - RangeU.map(
                        pCurr,
                        [0, 30, 100],
                        [0, 0, 100],
                      )
                      if (viewPosI === visiblePhotosCnt - 1) return RangeU.map(
                        pCurr,
                        [0, 80, 100],
                        [0, 0, 100],
                      )
                      return 100
                    })()
                    return o / 100
                  }),
                }}
              >
                {!!photosCnt && (
                  <AnimatedPhoto
                    animatedAttrs={{
                      src: animatedProps.map(ap => {
                        const { viewItemI } = ap(i)
                        return availablePhotos[viewItemI]?.dataUrl ?? ''
                      }),
                    }}
                  />
                )}
                {!photosCnt && (
                  <>
                    <Photo src={placeholderIm} />
                    <Blur />
                    <NoImagesBox>
                      <PictureIc css={SvgIconS6.t(imSmallPlaceholderIcS)} />
                      <NoImagesTitle>{uiText.noPhotos}</NoImagesTitle>
                    </NoImagesBox>
                  </>
                )}
                <PhotoFade />
                {/* <div
                 css={css`
                 position: absolute;
                 top: 20px;
                 left: 20px;
                 color: aquamarine;
                 font-size: 40px;
                 `}
                 >
                 {i}
                 </div> */}
              </AnimatedPhotoBox>
            )
          })}
          
          <PreviewInfoOverlay
            isDragging={isDragging}
            photosCnt={photosCnt}
            openInfo={openInfo}
            photoProgress={animatedPhotoProgress}
            name={name}
            birthDate={birthDate}
            aboutMe={aboutMe}
          />
        
        </PhotosStack>
      </PhotosStackBox>
      
      
      
      
      <PreviewFullInfo
        isOpen={isInfoOpen}
        close={closeInfo}
        name={name}
        birthDate={birthDate}
        gender={gender}
        aboutMe={aboutMe}
      />
    
    </ShowcaseFrame>
  )
})
ProfileShowcase.displayName = 'ProfileShowcase'
export default ProfileShowcase




const ShowcaseFrame = styled.div`
  position: relative;
  ${full};
  --photo-r: 16px;
  --photo-w: var(--photos-w);
  --photo-h: calc( var(--photos-h) * (100 - ${maxVisiblePhotosCnt - 1}) / 100 );
  //overflow: hidden;
  ${flexC};
`
const PhotosStackBox = styled.div`
  width: var(--photos-w);
  height: var(--photos-h);
  display: grid;
  place-items: end center;
`
const PhotosStack = styled(AnimatedDiv)`
  width: 100%;
  height: var(--photo-h);
  position: relative;
  
  // allow intercept only single finger left / right swipe gestures
  touch-action: pan-x;
  pointer-events: none;
  & > * { pointer-events: auto; }
`

const AnimatedPhotoBox = styled(AnimatedDiv)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: var(--photo-r);
  ${gridStackC};
  overflow: hidden;
  // TODO add some bg gradient while image not loaded already
  background-color: indianred;
  
  user-select: none;
  pointer-events: auto;
  
  transform-origin: 50% 0;
  will-change: transform, z-index, scale, opacity;
`
const Photo = styled.img`
  ${fill};
  object-position: center;
  object-fit: cover;
  
  pointer-events: none; // or attr draggable="false"
`
const AnimatedPhoto = styled(AnimatedImg)`
  ${fill};
  object-position: center;
  object-fit: cover;
  
  pointer-events: none; // or attr draggable="false"
`
const PhotoFade = styled.div`
  ${abs};
  background-image: linear-gradient(
    to bottom,
    ${p => p.theme.previewOverlayInfoBox.bgFadeGrad[0]} 0% 60%,
    ${p => p.theme.previewOverlayInfoBox.bgFadeGrad[1]} 90%
  );
`


const Blur = styled.div`
  ${fill};
  backdrop-filter: blur(18px);
  //background-color: #00000044;
`

const NoImagesBox = styled.div`
  width: 250px;
  height: 180px;
  position: relative;
  z-index: 1;
  border-radius: var(--photo-r);
  background-color: ${p => p.theme.boxSemitrans.bg};
  ${gridC};
  grid:
    '.' 1fr
    'p' 1.6fr
    't' 1fr
    / 100%;
  ;
  color: ${p => p.theme.boxSemitrans.ct};
`
const imSmallPlaceholderIcS: AppWidgetStyle = t => [imPlaceholderIcS, {
  icon: {
    area: 'p', sz: '112%', color: t.boxSemitrans.ct,
  },
}]
const NoImagesTitle = styled.div`
  grid-area: t;
  ${gridC};
  ${Txt.s24Wide};
`

