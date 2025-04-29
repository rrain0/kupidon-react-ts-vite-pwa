import { animatedMapMulti } from '@animated/AnimatedMultiComputed.ts'
import { AnimatedProperty } from '@animated/AnimatedProperty.ts'
import AnimatedState from '@animated/elements/AnimatedState.tsx'
import styled from '@emotion/styled'
import {
  defaultCarouselMergeProgress,
  getLoopedCarouselProps,
} from '@util/animated/carousel/props/defaultCarouselProps.ts'
import { createTrackPropsGetter } from '@util/animated/carousel/createTrackPropsGetter.ts'
import { useCarousel } from '@util/animated/carousel/useCarousel.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { useBool } from '@util/react-state/useBool.ts'
import { useResizeRef } from '@util/view/useResizeRef.ts'
import { getViewProps } from '@util/view/ViewProps.ts'
import { ViewU } from '@util/view/ViewU.ts'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import AnimatedDiv from '@animated/elements/AnimatedDiv.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText'
import { Images } from 'src/ui-data/Images'
import {
  getMediaUiState,
  MediaInArrayDownloadable,
} from 'src/ui-data/models/media/Media.ts'
import MediaUiState from 'src/ui-data/models/media/MediaUiState.tsx'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import {
  ImageParts,
} from 'src/ui/0-elements/ImageParts.tsx'
import SparkingLoadingLine from 'src/ui/0-elements/SparkingLoadingLine/SparkingLoadingLine.tsx'
import { GenderOptionValues } from 'src/ui/2-pages/Profile/options/ProfileGenderOption.tsx'
import PreviewFullInfo from 'src/ui/2-pages/Profile/Preview/parts/PreviewFullInfo.tsx'
import PreviewInfoOverlay from 'src/ui/2-pages/Profile/Preview/parts/PreviewInfoOverlay.tsx'
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
import Callback = TypeU.Callback





export type ProfileShowcaseAction = 'accept' | 'reject' | 'back' | undefined


const displayedPhotosCnt = 3



export type AnimatedStackProps = AnimatedProperty<{
  zIndex: number
  transform: string
  scale: number
  opacity: number
  restItemsOpacity: number
  action: ProfileShowcaseAction
  shadowIntensity: number
  fullInfoOpacity: number
  reactionIconOpacity: number
}>




export type ProfileShowcaseCssProps = {
  '--ph': '<length>' // padding horizontal
  '--pv': '<length>' // padding vertical
}
export type ProfileShowcaseProps = {
  photos?: MediaInArrayDownloadable[] | undefined
  name: string
  birthDate: string
  gender: GenderOptionValues
  aboutMe: string
  
  hideButtons?: boolean | undefined
  action?: ProfileShowcaseAction
  
  animatedStackProps?: undefined | AnimatedStackProps
  
  onAccept?: Callback | undefined
  onReject?: Callback | undefined
  onBack?: Callback | undefined
}
export const ProfileShowcase = React.memo((props: ProfileShowcaseProps) => {
  const {
    photos,
    name,
    birthDate,
    gender,
    aboutMe,
    
    hideButtons: _hideButtons,
    action,
    
    animatedStackProps,
    
    onAccept,
    onReject,
    onBack,
  } = props
  
  //effectLog('photos', photos)
  
  const uiValues = useMemo(() => ({
    noPhotos: TitleUiText.noPhotos,
  }), [])
  const uiText = useUiValues(uiValues)
  
  const [isInited, availablePhotos] = useMemo(() => {
    // Нужно чтобы были получены метаданные всех фоток, иначе не понятно, сколько их, какие пустые
    const isInited = photos?.every(p => p.isInited)
    const availablePhotos = !isInited ? [] : photos?.filter(it => it.isInited && !it.isEmpty) ?? []
    return [isInited, availablePhotos]
  }, [photos])
  const photosCnt = availablePhotos.length
  const isPhotosDraggable = photosCnt >= 2
  
  const [viewsCnt, startViewI] = (() => {
    // display loading placeholder
    if (!isInited) return [1, 0]
    // display no photos placeholder
    if (photosCnt === 0) return [1, 0]
    // display 1 not draggable photo
    if (photosCnt === 1) return [1, 0]
    // display photos + 1 view before & 1 view after
    return [Math.min(photosCnt, displayedPhotosCnt) + 2, -1]
  })()
  
  const placeholderIm = useMemo(() => {
    if (photosCnt || !isInited) return undefined
    //return Images.forBlur[0]
    return ArrayU.randomElem(Images.forBlur)
  }, [photosCnt, isInited])
  
  
  
  
  const itemsCnt = photosCnt
  
  const photosBoxRef = useRef<HTMLDivElement>(null)
  const getTrackProps = createTrackPropsGetter(photosBoxRef)
  
  
  const {
    isDragging: isPhotosDragging,
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
    startViewI,
    getTrackProps,
    axis: 'y',
    inverted: false,
    mergeProgress: defaultCarouselMergeProgress,
    noDrag: !isPhotosDraggable,
  }, [availablePhotos])
  
  const hideButtons = isPhotosDragging || _hideButtons
  
  
  const [isInfoOpen, openInfo, closeInfo] = useBool(false)
  
  useEffect(() => {
    if (action) closeInfo()
  }, [action])
  
  const animatedPhotoProps = useMemo(() => animatedDeltaProgress.map(dp => (viewI = 0) => {
    return getLoopedCarouselProps({
      startP: getStartProgress(),
      startItemP: getStartItemProgress(),
      deltaP: dp,
      itemsCnt,
      viewsCnt,
      startViewI,
      currViewI: viewI,
    })
  }), [itemsCnt])
  
  const animatedPhoto = useMemo(() => animatedMapMulti(
    [animatedPhotoProps, animatedStackProps],
    (ap, as) => (viewI = 0) => {
      const props = ap(viewI)
      const { first, last, minusFirst, pCurr, viewPosI, viewItemI } = props
      const { restItemsOpacity, action, shadowIntensity } = as ?? { }
      
      const z = (viewsCnt - viewPosI) * (viewPosI >= 0 ? 1 : -1)
      
      const y = (() => {
        if (first) return pCurr
        return -(viewPosI - RangeU.map(pCurr, [0, 80, 100], [0, 0, 1]))
      })()
      
      const scale = (() => {
        if (first) return 100
        return 100 - 5 * (viewPosI - RangeU.map(pCurr, [0, 80, 100], [0, 0, 1]))
      })() / 100
      
      const photoOpacity = (() => {
        if (first) return 100 - RangeU.map(
          pCurr,
          [0, 30, 100],
          [0, 0, 100],
        )
        if (last) return RangeU.map(
          pCurr,
          [0, 80, 100],
          [0, 0, 100],
        )
        if (minusFirst) return 0
        return 100
      })() / 100
      
      const restOpacity = (() => {
        if (!first) return restItemsOpacity ?? 1
        return 1
      })()
      
      const opacity = Math.min(photoOpacity, restOpacity)
      
      const boxShadow = (() => {
        const color = (() => {
          // TODO theme
          if (action === 'accept') return '#9e364e'
          if (action === 'reject') return 'black'
        })()
        
        if (first && color && shadowIntensity) {
          const blurR = RangeU.map(shadowIntensity, [0, 1], [6, 30])
          const spreadR = RangeU.map(shadowIntensity, [0, 1], [1, 30])
          return `0 0 ${blurR}px ${spreadR}px ${color}`
        }
        
        return ''
      })()
      
      const photo = availablePhotos[viewItemI]
      //if (viewI === 3) noRepeatLog('viewItemI', viewItemI)
      //if (viewI === 3) noRepeatLog('src', src.slice(0, 200))
      
      return { ...props, z, y, scale, opacity, boxShadow, photo }
    }
  ), [animatedPhotoProps, animatedStackProps, availablePhotos])
  
  
  const animatedInfo = useMemo(() => animatedMapMulti(
    [animatedPhotoProps, animatedStackProps],
    (ap, as) => {
      const { pos0ItemP } = ap()
      const { reactionIconOpacity = 0, action } = as ?? { }
      
      return { indicatorProgress: pos0ItemP, reactionIconOpacity, action }
    }
  ), [animatedPhotoProps, animatedStackProps])
  
  
  
  const onPhotosStackBoxSetWh = useResizeRef<HTMLDivElement>(useCallback(frame => {
    if (frame) {
      const props = getViewProps(frame)
      const { w, h } = props
      const { w: photosW, h: photosH } = ViewU.clampRatio({
        minRatio: minRatioPort,
        maxRatio: maxRatioPort,
        w: w - ph * 2,
        h: h - pv * 2,
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
      ref={onPhotosStackBoxSetWh}
      animatedStyle={{
        zIndex: animatedStackProps?.map(p => p.zIndex),
      }}
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
            transform: animatedStackProps?.map(p => p.transform),
            scale: animatedStackProps?.map(p => p.scale),
            opacity: animatedStackProps?.map(p => p.opacity),
          }}
        >
          {arrOfIndices(viewsCnt).map(viewI => {
            return (
              <AnimatedPhotoBox
                key={viewI}
                animatedStyle={{
                  zIndex: animatedPhoto.map(ap => ap(viewI).z),
                  transform: animatedPhoto.map(ap => `translateY(${ap(viewI).y}%)`),
                  scale: animatedPhoto.map(ap => ap(viewI).scale),
                  opacity: animatedPhoto.map(ap => ap(viewI).opacity),
                  boxShadow: animatedPhoto.map(ap => ap(viewI).boxShadow),
                }}
              >
                {(() => {
                  if (!isInited) return (
                    <SparkingLoadingLine/>
                  )
                  if (!photosCnt) return (
                    <>
                      <Photo src={placeholderIm}/>
                      <Blur/>
                      <NoImagesBox>
                        <PictureIc css={SvgIconS6.t(pictureIcS)}/>
                        <NoImagesTitle>{uiText.noPhotos}</NoImagesTitle>
                      </NoImagesBox>
                    </>
                  )
                  return (
                    <AnimatedState
                      animatedState={{
                        photo: animatedPhoto.map(ap => ap(viewI).photo),
                      }}
                    >
                      {({ photo }) => {
                        const { isReady, dataUrl, ...loading } = getMediaUiState(photo)
                        if (isReady) return <Photo src={dataUrl}/>
                        return <MediaUiState {...loading}/>
                      }}
                    </AnimatedState>
                  )
                })()}
                <PhotoFade/>
              </AnimatedPhotoBox>
            )
          })}
          
          <PreviewInfoOverlay
            actionButtonsDisabled={hideButtons}
            photosCnt={photosCnt}
            openInfo={openInfo}
            animatedInfo={animatedInfo}
            name={name}
            birthDate={birthDate}
            aboutMe={aboutMe}
            onAccept={onAccept}
            onReject={onReject}
            onBack={onBack}
          />
        
        </PhotosStack>
      </PhotosStackBox>
      
      
      
      
      <PreviewFullInfo
        isOpen={isInfoOpen}
        close={closeInfo}
        animatedOpacity={animatedStackProps?.map(p => p.fullInfoOpacity)}
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



const pv = 32
const ph = 16



const ShowcaseFrame = styled(AnimatedDiv)`
  position: relative;
  ${full};
  padding: ${pv}px ${ph}px;
  --photo-r: 16px;
  --photo-w: var(--photos-w);
  --photo-h: calc( var(--photos-h) * (100 - ${displayedPhotosCnt}) / 100 );
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
  will-change: transform, scale, opacity;
  & > * { pointer-events: auto; }
`

const AnimatedPhotoBox = styled(AnimatedDiv)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: var(--photo-r);
  ${gridStackC};
  overflow: hidden;
  background-color: ${p => p.theme.photos.bg};
  
  user-select: none;
  pointer-events: auto;
  
  transform-origin: 50% 0;
  will-change: z-index, transform, scale, opacity, box-shadow;
`
const Photo = styled.img`
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
const pictureIcS: AppWidgetStyle = t => [ImageParts.placeholderIcS, {
  icon: {
    area: 'p', sz: '112%', color: t.boxSemitrans.ct,
  },
}]
const NoImagesTitle = styled.div`
  grid-area: t;
  ${gridC};
  ${Txt.s24Wide};
`

