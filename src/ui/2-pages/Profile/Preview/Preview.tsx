import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { animated, to, useSprings, useSpringValue } from '@react-spring/web'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { StyleConstants } from 'src/ui-data/style/StyleConstants'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import { ProfilePageValidation } from 'src/ui/2-pages/Profile/validation.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import ScrollbarVertical from 'src/ui/1-widgets/Scrollbar/ScrollbarVertical.tsx'
import { ScrollbarVerticalStyle } from 'src/ui/1-widgets/Scrollbar/ScrollbarVerticalStyle.ts'
import { useLockAppGestures } from 'src/util/app/useLockAppGestures'
import { ArrayU } from 'src/util/common/ArrayU'
import { MathU } from 'src/util/common/MathU'
import { RangeU } from 'src/util/common/RangeU'
import { useDragProgress } from 'src/util/drag/useDragProgress'
import { useBool } from 'src/util/react-state/useBool'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet'
import { useRefAndState } from 'src/util/react-state/useRefAndState'
import { ReactU } from 'src/util/react/ReactU'
import { useNoSelect } from 'src/util/view/useNoSelect'
import { useResizeRef } from 'src/util/view/useResizeRef'
import { getViewProps } from 'src/util/view/ViewProps'
import { ViewU } from 'src/util/view/ViewU'
import FormValues = ProfilePageValidation.FormValues
import col = EmotionCommon.col
import Txt = EmotionCommon.Txt
import center = EmotionCommon.center
import fill = EmotionCommon.fill
import minRatioPort = StyleConstants.minRatioPort
import maxRatioPort = StyleConstants.maxRatioPort
import effectLog = ReactU.effectLog
import mod = MathU.mod
import { useNoTouchAction } from 'util/view/useNoTouchAction'



/*
TODO
  Состояния фото: загрузка / обработка... взять из profile summary
  Snap points & инерция
  
 */

// максимальное кол-во отображаемых фоток (во время анимации пролистывания их 4)
const visiblePhotosCnt = 4




export type PreviewProps = {
  formValues: FormValues
}



const Preview = React.memo(
  (props: PreviewProps) => {
    const {
      photos,
      name,
      aboutMe,
    } = props.formValues
    
    effectLog('photos', photos)
    
    /* useEffect(() => {
      photos.forEach((p, i) => {
        console.log('photo index dataUrl')
      })
    }, [photos]) */
    
    
    
    
    const availablePhotos = useMemo(() => {
      return photos.filter(it => !it.isEmpty)
    }, [photos])
    const photosCnt = availablePhotos.length
    
    const [mapI, setMapI] = useState(() => availablePhotos.map((_, i) => i))
    
    
    
    const getSpringStyle = (p = 0) => (i = 0) => {
      const vi = RangeU.loop(i - Math.floor(p / 100), [0, visiblePhotosCnt]) // !!displayed!! view index
      const pc = mod(p, 100) // progress current
      
      // index of photo
      /* const iPhoto = RangeU.loop(Math.floor(p / 100) + i, [0, photosCnt])
      setMapI(prev => {
        const next = prev.toSpliced(i, 1, iPhoto)
        if (ArrayU.eq(prev, next)) return prev
        return next
      }) */
      
      // z-index
      const z = -vi + visiblePhotosCnt - 1
      
      // translate y
      const y = (() => {
        if (vi === 0) return pc
        return -(vi - RangeU.map(pc, [0, 80, 100], [0, 0, 1]))
      })()
      
      // scale
      const s = (() => {
        if (vi === 0) return 100
        return 100 - 5 * (vi - RangeU.map(pc, [0, 80, 100], [0, 0, 1]))
      })()
      
      // opacity
      const o = (() => {
        if (vi === 0) return 100 - RangeU.map(
          pc,
          [0, 30, 100],
          [0, 0, 100],
        )
        if (vi === visiblePhotosCnt - 1) return RangeU.map(
          pc,
          [0, 80, 100],
          [0, 0, 100],
        )
        return 100
      })()
      
      return {
        zIndex: z,
        transform: `translateY(${y}%)`,
        scale: s / 100,
        opacity: o / 100,
      }
    }
    
    
    
    
    const [springs, springsApi] = useSprings(
      visiblePhotosCnt, getSpringStyle(), [availablePhotos]
    )
    
    
    const [lockTouchAction, unlockTouchAction] = useNoTouchAction()
    const [isDragging, startDragging, endDragging] = useBool(false)
    useNoSelect(isDragging)
    const canUseGestures = useLockAppGestures(isDragging)
    
    
    const photosBoxRef = useRef<HTMLDivElement>(null)
    
    // TODO Сделать чтобы текущий прогресс отражал именно отображаемые вьюхи (range 0..3)
    //  Если вьюха отобразилась, то чтобы всегда отображала одну картинку,
    //  покуда картинка источника по данному индексу не изменится
    // TODO Дальше этот range 0..3 мапать в range источника картинок,
    //  чтобы вычислить правильный индекс картинки
    // TODO key отображаемых элементов всегда будет одинаковый - индекс в spring array
    
    // start progress y in (..0..100..) * availablePhotos.length
    const [getStartProgressY, setStartProgressY] = useRefGetSet(0)
    // delta progress y in (..0..100..) * availablePhotos.length
    const [getDProgressY, setDProgressY] = useRefGetSet(0)
    // index of a photo displayed at the top
    const [getPhotoI, photoI, setPhotoI] = useRefAndState(0)
    
    const updatePhotos = () => {
      const p = getStartProgressY() + getDProgressY()
      springsApi.set(getSpringStyle(p))
      //const pi = RangeU.loop(Math.floor(p / 100), [0, photosCnt])
      //setPhotoI(pi)
    }
    const finishUpdatePhotos = () => {
      setStartProgressY(RangeU.loop(
        getStartProgressY() + getDProgressY(),
        [0, visiblePhotosCnt * 100]
      ))
      setDProgressY(0)
      updatePhotos()
    }
    
    
    const {
      onTrackDrag,
    } = useDragProgress({
      getTrackProps: () => {
        const pb = photosBoxRef.current
        if (pb) {
          const p = getViewProps(photosBoxRef.current)
          return { x: p.x, w: p.w, y: p.y, h: p.h }
        }
        return { x: 0, w: 0, y: 0, h: 0 }
      },
      onDrag: ({ dpy }) => {
        if (isDragging) {
          setDProgressY(dpy)
          updatePhotos()
        }
      },
      onDragStart: () => { },
      onDragging: ({ tryDragVertically, allowDragVertically }) => {
        if (canUseGestures && tryDragVertically) lockTouchAction()
        if (canUseGestures && allowDragVertically) startDragging()
      },
      onDragEnd: () => {
        finishUpdatePhotos()
        endDragging()
        unlockTouchAction()
      },
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
    
    
    return (
      <Pages.SafeInsets>
        <PreviewFrame>
          <PreviewFrame2 ref={frame2RefFun}>
            <PhotosContainer>
              <PhotosContainer2 ref={photosBoxRef} {...onTrackDrag()}>
                {springs.map((springStyle, i) => {
                  const color = ['#2b87db', 'indianred', 'coral', '#5ee7df'][i]
                  return (
                    <PhotoBox
                      key={i}
                      number={i}
                      color={color}
                      style={{
                        ...springStyle,
                        // @ts-expect-error
                        backgroundColor: color,
                      }}
                    >
                      {/* <Photo key={images[mapI[i]]} src={images[mapI[i]]} /> */}
                    </PhotoBox>
                  )
                })}
              </PhotosContainer2>
            </PhotosContainer>
          </PreviewFrame2>
        </PreviewFrame>
      </Pages.SafeInsets>
    )
    
    
    /* return (
      <Pages.SafeInsets>
      
        {im && (
          <div css={photoContainer}>
            
            <img css={photoImgStyle}
              src={im.dataUrl}
              alt={im.name}
            />
            
            <ScrollbarVertical css={scrollbarVerticalStyle}
              visiblePartPercent={20}
              scroll={scroll} setScroll={setScroll}
            />
            
            <FadeButtonBar>
              <Name>{name}, 26</Name>
              <AboutMe>{aboutMe}</AboutMe>
            </FadeButtonBar>
            
          </div>
        )}
      
      </Pages.SafeInsets>
    ) */
  }
)
export default Preview


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
  height: ${100 - (visiblePhotosCnt - 1)}%;
  position: relative;
  
  // allow intercept only single finger left / right swipe gestures
  touch-action: pan-y;
  pointer-events: none;
  * { pointer-events: auto; }
`

const PhotoBox = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  background-color: indianred;
  
  user-select: none;
  pointer-events: auto;
  
  transform-origin: 50% 0;
  will-change: transform/*, z-index, scale, opacity*/;
`
const Photo = styled.img`
  ${fill};
  object-position: center;
  object-fit: cover;
  
  pointer-events: none; // or attr draggable="false"
`





// OLD

const photoContainer = css`
  width: 100%;
  height: calc(100dvh - var(--bottom-bars-inset));
  position: relative;
`

const photoImgStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  object-position: center;
  object-fit: cover;
`

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

const Name = styled.div`
  ${Txt.large4};
`
const AboutMe = styled.div`
  ${Txt.large2};
  color: ${p => p.theme.page.content2[0]}
`
