import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useDrag } from '@use-gesture/react'
import { getDragDirection } from '@util/drag/getDragDirection.ts'
import { useDragProgress } from '@util/drag/useDragProgress.ts'
import { useAsRefGet } from '@util/react-state/useAsRefGet.ts'
import { useStateAndRef } from '@util/react-state/useStateAndRef.ts'
import React, { useCallback, useMemo, useRef } from 'react'
import AnimatedDiv from '@animated/elements/AnimatedDiv.tsx'
import AnimatedImg from '@animated/elements/AnimatedImg.tsx'
import { useAnimatedValue } from '@animated/useAnimatedValue.ts'
import { useUiValue } from 'src/mini-libs/ui-text/useUiText'
import { Images } from 'src/ui-data/Images'
import { StyleVals } from 'src/ui-data/style/StyleVals'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText'
import { SvgIconS } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import { imPlaceholderIcS } from 'src/ui/0-elements/im/im'
import PreviewInfoOverlay from 'src/ui/2-pages/Profile/Preview/parts/PreviewInfoOverlay.tsx'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import { ProfilePageValidation } from 'src/ui/2-pages/Profile/validation.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { useLockAppGestures } from 'src/util/app/useLockAppGestures'
import { ArrayU } from 'src/util/common/ArrayU'
import { MathU } from 'src/util/common/MathU'
import { RangeU } from 'src/util/common/RangeU'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet'
import { useNoSelect } from 'src/util/view/useNoSelect'
import { useResizeRef } from 'src/util/view/useResizeRef'
import { getViewProps } from 'src/util/view/ViewProps'
import { ViewU } from 'src/util/view/ViewU'
import FormValues = ProfilePageValidation.FormValues
import Txt = EmotionCommon.Txt
import center = EmotionCommon.center
import fill = EmotionCommon.fill
import minRatioPort = StyleVals.minRatioPort
import maxRatioPort = StyleVals.maxRatioPort
import mod = MathU.mod
import { useNoTouchAction } from 'util/view/useNoTouchAction'
import arrOfIndices = ArrayU.arrOfIndices
import centerAll = EmotionCommon.centerAll
import PictureIc = SvgIconsPack.PictureIc
import centerGrid = EmotionCommon.centerGrid
import abs = EmotionCommon.abs


// Текущий прогресс отражает именно отображаемые вьюхи (range 0..3)
//  Если вьюха отобразилась, то она всегда отображает одну картинку,
//  покуда картинка источника по данному индексу не изменится,
//  то есть пока вьюха не переедет из низа колоды наверх или наоборот.
// Дальше этот range 0..3 мапается в range источника картинок,
//  чтобы вычислить правильный индекс картинки
// Key отображаемых элементов всегда одинаковый - индекс в spring array

/*
TODO
  Состояния фото: загрузка / обработка... взять из profile summary
  Snap points & инерция
  
 */

// Максимальное кол-во отображаемых фоток.
// Во время анимации пролистывания их 4, в дефолтном состоянии их видно 3, потому что 4ая прозрачная.
const maxVisiblePhotosCnt = 4




export type PreviewProps = {
  formValues: FormValues
}



const Preview = React.memo((props: PreviewProps) => {
  const {
    photos,
    name,
    birthDate,
    aboutMe,
  } = props.formValues
  
  //effectLog('photos', photos)
  
  const textNoPhotos = useUiValue(TitleUiText.noPhotos)
  
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
  
  
  // start progress y in (..0..100..) * visiblePhotosCnt
  const [getStartProgressY, setStartProgressY] = useRefGetSet(0)
  // start progress for photos in (..0..100..) * availablePhotos.length
  const [getStartPhotoProgress, setStartPhotoProgress] = useRefGetSet(0)
  // curr progress y in (..0..100..) from start progress y
  const [getCurrProgressY, setCurrProgressY] = useRefGetSet(0)
  const animatedCurrProgressY = useAnimatedValue(0)
  
  
  
  const [lockTouchAction, unlockTouchAction] = useNoTouchAction()
  const [isDragging, getIsDragging, setIsDragging] = useStateAndRef(false)
  useNoSelect(isDragging)
  const canUseGestures = useLockAppGestures(isDragging)
  
  
  
  const photosBoxRef = useRef<HTMLDivElement>(null)
  const getTrackProps = () => {
    const pb = photosBoxRef.current
    if (pb) {
      const p = getViewProps(photosBoxRef.current)
      return { x: p.x, y: p.y, w: p.w, h: p.h }
    }
    return { x: 0, y: 0, w: 0, h: 0 }
  }
  
  
  
  
  const updateViews = () => {
    animatedCurrProgressY.set(getCurrProgressY())
  }
  
  const finishUpdateViews = (vely = 0) => {
    updateViews()
    
    // px/ms => %height/s
    const velyPercent = vely * 1000 / getTrackProps().h * 100
    const vThreshold = 70 // %height/s
    
    const sp = getStartProgressY()
    const cp = getCurrProgressY()
    const p = sp + cp
    
    const pICurr = p % 100
    const pI = p - pICurr
    
    const [nextPICurr, vel] = (() => {
      if (Math.abs(velyPercent) >= vThreshold) {
        if (pICurr > 0) {
          if (velyPercent >= 0) return [100, velyPercent]
          return [0, velyPercent]
        }
        if (pICurr < 0) {
          if (velyPercent >= 0) return [0, velyPercent]
          return [-100, velyPercent]
        }
      }
      else {
        if (pICurr <= -50) {
          return [-100, -vThreshold]
        }
        if (pICurr < 0) {
          return [0, vThreshold]
        }
        if (pICurr >= 50) {
          return [100, vThreshold]
        }
        if (pICurr > 0) {
          return [0, -vThreshold]
        }
      }
      return [0, 0]
    })()
    
    const pNext = pI + nextPICurr
    //console.log('pNext', pNext)
    if (p !== pNext) {
      const nextCp = pNext - sp
      // Начальная скорость
      const v0 = vel
      const t1 = 0.2 // s
      // Начальное ускорение
      const a0 = 2 * (pNext - p - v0 * t1) / t1**2
      
      //console.log('s0', cp, 't1', t1, 'a0', a0, 'v0', v0)
      
      // TODO
      //  1) Если чуть-чуть отодвинуть фото и отпустить, то оно отпружинивает за порог
      //  2) Надо чтобы анимация поднятия колоды в конце анимации перелистывания была медленней
      void animatedCurrProgressY.start({
        startValue: cp,
        animationFunction: (startValue, t) => {
          // Начальный путь
          const s0 = startValue
          t /= 1000 // ms => s
          
          const finished = t >= t1
          if (finished) t = t1
          let s = a0 * t**2 / 2 + v0 * t + s0
          s = MathU.round3(s)
          setCurrProgressY(s)
          return [s, finished]
        },
      })
    }
  }
  
  
  // works as immediate effect
  useMemo(() => finishUpdateViews(), [availablePhotos])
  
  const {
    updateDragProgress,
    getDragCurrProgressY,
  } = useDragProgress({ getTrackProps })
  
  const mergeProgress = () => {
    const p = getStartProgressY() + getCurrProgressY()
    const viewMaxP = (visiblePhotosCnt < 3 ? 0 : visiblePhotosCnt) * 100
    setStartProgressY(MathU.round3(RangeU.loop(p, [0, viewMaxP])))
    const photoP = getStartPhotoProgress() + getCurrProgressY()
    const photoMaxP = (photosCnt < 2 ? 0 : photosCnt) * 100
    setStartPhotoProgress(MathU.round3(RangeU.loop(photoP, [0, photoMaxP])))
    setCurrProgressY(0)
  }
  
  const [getNeedMerge, setNeedMerge] = useRefGetSet(true)
  const [getCanStartDrag, setCanStartDrag] = useRefGetSet(true)
  const [getWasDragged, setWasDragged] = useRefGetSet(false)
  
  const onAnyDrag = (cpy: number, vertical: boolean, drag: boolean) => {
    if (isPhotosDraggable && vertical) {
      lockTouchAction()
      if (!getIsDragging() && getCanStartDrag() && canUseGestures && drag) {
        setIsDragging(true)
        setCanStartDrag(false)
        setWasDragged(true)
      }
      if (!getIsDragging() && !getCanStartDrag()) {
        unlockTouchAction()
      }
    }
    if (isDragging) {
      if (getNeedMerge()) {
        mergeProgress()
        setNeedMerge(false)
      }
      setCurrProgressY(cpy)
      updateViews()
    }
  }
  const [getOnAnyDrag] = useAsRefGet(onAnyDrag)
  
  const onDragStart = () => {
    setWasDragged(false)
  }
  const [getOnDragStart] = useAsRefGet(onDragStart)
  
  const onDragEnd = (vely: number) => {
    if (isDragging) finishUpdateViews(vely)
    setNeedMerge(true)
    setCanStartDrag(true)
    unlockTouchAction()
    setIsDragging(false)
  }
  const [getOnDragEnd] = useAsRefGet(onDragEnd)
  
  
  
  // noinspection JSVoidFunctionReturnValueUsed
  const onTrackDrag = useDrag(gesture => {
    const {
      first, active, last,
      xy: [vpx, vpy], // viewport x / y coordinates
      movement: [mx, my],
      delta: [dx, dy],
      velocity: [_velx, _vely], // px/ms (nonnegative)
      direction: [dirx, diry], // -1, 0, 1, positive diry is from top to bottom
      currentTarget,
    } = gesture
    const [velx, vely] = [dirx * _velx, diry * _vely]
    
    const { vertical, drag } = getDragDirection({ mx, my })
    
    updateDragProgress({ first, vpx, vpy, dx, dy })
    
    // onAnyDrag
    getOnAnyDrag()(getDragCurrProgressY(), vertical, drag)
    // onDragStart
    if (first) { getOnDragStart()() }
    // onDragging
    if (!first && !last) { }
    // onDragEnd
    if (last) { getOnDragEnd()(vely) }
  })
  
  
  const frame2RefFun = useResizeRef<HTMLElement>(useCallback((elem) => {
    if (elem) {
      const p = getViewProps(elem)
      const { w, h } = ViewU.clampRatio({
        minRatio: minRatioPort,
        maxRatio: maxRatioPort,
        w: p.w,
        h: p.h,
      })
      p.setWhCssProps({ w, h })
    }
  }, []))
  
  
  
  
  
  
  
  //const im = photos[0]
  //const [scroll, setScroll] = useState(0)
  
  /* useEffect(
    ()=>{
      const id = setInterval(
        ()=>setScroll(s=>loopRange(s+3,[0,100])),
        1000
      )
      return ()=>clearInterval(id)
    },
    []
  ) */
  
  
  
  const animatedPhotoProgress = animatedCurrProgressY.map(cp => getStartPhotoProgress() + cp)
  
  const animatedProps = animatedCurrProgressY.map(cp => (i: number) => {
    const p = getStartProgressY() + cp
    const photoP = getStartPhotoProgress() + cp
    //console.log('p', p, 'photoP', photoP)
    // displayedIndex from top to bottom
    const displayedI = RangeU.loop(i - Math.floor(p / 100), [0, visiblePhotosCnt])
    // progressCurrent - nonnegative
    const pCurr = mod(p, 100)
    return { p, photoP, displayedI, pCurr }
  })
  
  
  //console.log('rerender')
  
  return (
    <Pages.SafeInsets>
      <PreviewFrame>
        <PreviewFrame2 ref={frame2RefFun}>
          <PhotosContainer>
            <PhotosContainer2 ref={photosBoxRef} {...onTrackDrag()}>
              {arrOfIndices(visiblePhotosCnt).map(i => {
                return (
                  <AnimatedPhotoBox
                    key={i}
                    animated={{
                      zIndex: animatedProps.map(ap => {
                        const { p, photoP, displayedI, pCurr } = ap(i)
                        const z = -displayedI + visiblePhotosCnt - 1
                        return z
                      }),
                      transform: animatedProps.map(ap => {
                        const { p, photoP, displayedI, pCurr } = ap(i)
                        const y = (() => {
                          if (displayedI === 0) return pCurr
                          return -(displayedI - RangeU.map(pCurr, [0, 80, 100], [0, 0, 1]))
                        })()
                        return `translateY(${y}%)`
                      }),
                      scale: animatedProps.map(ap => {
                        const { p, photoP, displayedI, pCurr } = ap(i)
                        const s = (() => {
                          if (displayedI === 0) return 100
                          return 100 - 5 * (displayedI - RangeU.map(pCurr, [0, 80, 100], [0, 0, 1]))
                        })()
                        return s / 100
                      }),
                      opacity: animatedProps.map(ap => {
                        const { p, photoP, displayedI, pCurr } = ap(i)
                        const o = (() => {
                          if (displayedI === 0) return 100 - RangeU.map(
                            pCurr,
                            [0, 30, 100],
                            [0, 0, 100],
                          )
                          if (displayedI === visiblePhotosCnt - 1) return RangeU.map(
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
                        animated={{
                          src: animatedProps.map(ap => {
                            const { p, photoP, displayedI, pCurr } = ap(i)
                            //console.log('displayedI', displayedI, 'photoP', photoP)
                            const photoI = RangeU.loop(
                              Math.floor(photoP / 100) + displayedI,
                              [0, photosCnt],
                            )
                            return availablePhotos[photoI]?.dataUrl ?? ''
                          }),
                        }}
                      />
                    )}
                    {!photosCnt && (
                      <>
                        <Photo src={placeholderIm} />
                        <Blur />
                        <NoImagesBox>
                          <PictureIc css={imSmallPlaceholderIcS} />
                          <NoImagesTitle>{textNoPhotos}</NoImagesTitle>
                        </NoImagesBox>
                      </>
                    )}
                    <PhotoBottomFade />
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
                getWasDragged={getWasDragged}
                photosCnt={photosCnt}
                photoProgress={animatedPhotoProgress}
                name={name}
                birthDate={birthDate}
                aboutMe={aboutMe}
              />
              
            </PhotosContainer2>
          </PhotosContainer>
        </PreviewFrame2>
      </PreviewFrame>
    </Pages.SafeInsets>
  )
})
export default Preview



const borderRadius = 16
const fade = '#000000aa'


const PreviewFrame = styled.div`
  width: 100%;
  height: 100%;
  padding: 32px 16px;
  overflow: hidden;
`
const PreviewFrame2 = styled.div`
  width: 100%;
  height: 100%;
  ${center};
`
const PhotosContainer = styled.div`
  width: var(--w);
  height: var(--h);
  display: grid;
  place-items: end center;
`
const PhotosContainer2 = styled.div`
  width: 100%;
  height: ${100 - (maxVisiblePhotosCnt - 1)}%;
  position: relative;
  
  // allow intercept only single finger left / right swipe gestures
  touch-action: pan-y;
  pointer-events: none;
  & > * { pointer-events: auto; }
`

const AnimatedPhotoBox = styled(AnimatedDiv)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: ${borderRadius}px;
  ${centerAll};
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
const PhotoBottomFade = styled.div`
  ${abs};
  // todo theme - fade color
  background-image: linear-gradient(
    to bottom,
    transparent 0% 60%,
    ${fade} 90%
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
  border-radius: ${borderRadius}px;
  background-color: ${p => p.theme.boxTransparent.bg};
  ${centerGrid};
  grid:
    '.' 1fr
    'p' 1.6fr
    't' 1fr
    / 100%;
  ;
  color: ${p => p.theme.boxTransparent.ct};
`
const imSmallPlaceholderIcS = (t: AppTheme.Theme) => css`
  ${imPlaceholderIcS(t)};
  ${SvgIconS.El.icon.thiz()} {
    grid-area: p;
    ${SvgIconS.El.icon.props.size.set('112%')}
    ${SvgIconS.El.icon.props.color.set(t.boxTransparent.ct)}
  }
`
const NoImagesTitle = styled.div`
  grid-area: t;
  ${centerGrid};
  ${Txt.large3};
`


