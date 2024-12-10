import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { animated, to, useSprings, useSpringValue } from '@react-spring/web'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { StyleConstants } from 'src/ui-data/style/StyleConstants'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import { ProfilePageValidation } from 'src/ui/2-pages/Profile/validation.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import ScrollbarVertical from 'src/ui/1-widgets/Scrollbar/ScrollbarVertical.tsx'
import { ScrollbarVerticalStyle } from 'src/ui/1-widgets/Scrollbar/ScrollbarVerticalStyle.ts'
import { useLockAppGestures } from 'src/util/app/useLockAppGestures'
import { MathU } from 'src/util/common/MathU'
import { RangeU } from 'src/util/common/RangeU'
import { useDragProgress } from 'src/util/drag/useDragProgress'
import { useBool } from 'src/util/react-state/useBool'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet'
import { ReactU } from 'src/util/react/ReactU'
import { useNoSelect } from 'src/util/view/useNoSelect'
import { useNoTouchAction0 } from 'src/util/view/useNoTouchAction0'
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

// максимальное кол-во отображаемых фоток (если в процессе транзишена, то будет на 1 больше)
const maxDisplayedPhotosCnt = 3


const getSpringStyle = (photosCnt: number, p = 0) => (i: number) => {
  const pc = mod(p, 100) // progress current
  
  // index of photo
  const iPhoto = RangeU.loop(Math.floor(p / 100) + i, [0, photosCnt])
  
  // z-index
  //const z = maxDisplayedPhotosCnt - i
  
  // translate y
  const y = (() => {
    if (i === 0) return pc
    return -(i - RangeU.map(pc, [0, 80, 100], [0, 0, 1]))
  })()
  
  // scale
  const s = (() => {
    if (i === 0) return 100
    return 100 - 5 * (i - RangeU.map(pc, [0, 80, 100], [0, 0, 1]))
  })()
  
  // opacity
  const o = (() => {
    if (i === 0) return 100 - RangeU.map(
      pc,
      [0, 30, 100],
      [0, 0, 100],
    )
    if (i === maxDisplayedPhotosCnt) return RangeU.map(
      pc,
      [0, 80, 100],
      [0, 0, 100],
    )
    return 100
  })()
  
  return {
    iPhoto,
    transform: `translateY(${y}%)`,
    scale: s / 100,
    opacity: o / 100,
    //immediate: prop => ['iPhoto'].includes(prop),
  }
}





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
    const cnt = availablePhotos.length
    
    const [springs, springsApi] = useSprings(
      maxDisplayedPhotosCnt + 1, getSpringStyle(cnt), [availablePhotos]
    )
    
    
    const [lockTouchAction, unlockTouchAction] = useNoTouchAction()
    //const [lockTouchAction, unlockTouchAction] = [() => {}, () => {}]
    const [isDragging, startDragging, endDragging] = useBool(false)
    useNoSelect(isDragging)
    const canUseGestures = useLockAppGestures(isDragging)
    
    
    const photosBoxRef = useRef<HTMLDivElement>(null)
    
    // start progress y in (..0..100..) * availablePhotos.length
    const [getStartProgressY, setStartProgressY] = useRefGetSet(0)
    // delta progress y in (..0..100..) * availablePhotos.length
    const [getDProgressY, setDProgressY] = useRefGetSet(0)
    
    const updatePSpring = () => {
      const p = getStartProgressY() + getDProgressY()
      springsApi.set(getSpringStyle(cnt, p))
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
          updatePSpring()
        }
      },
      onDragStart: () => { },
      onDragging: ({ tryDragVertically, allowDragVertically }) => {
        if (cnt && canUseGestures && tryDragVertically) lockTouchAction()
        if (cnt && canUseGestures && allowDragVertically) startDragging()
      },
      onDragEnd: () => {
        setStartProgressY(RangeU.loop(
          getStartProgressY() + getDProgressY(),
          [0, cnt * 100]
        ))
        setDProgressY(0)
        updatePSpring()
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
                  return (
                    <PhotoBox
                      key={i}
                      style={{
                        // @ts-expect-error
                        zIndex: maxDisplayedPhotosCnt - i,
                        transform: springStyle.transform,
                        scale: springStyle.scale,
                        opacity: springStyle.opacity,
                      }}
                    >
                      {/* <Photo
                        src={to([springStyle.iPhoto], (iPhoto => {
                          const url = availablePhotos[iPhoto]?.dataUrl
                          if (url?.startsWith('data:image/webp;base64,UklGRh4XAQ')) {
                            console.log('?? starts with', url.startsWith('data:image/webp;base64,UklGRh4XAQBXRUJQVlA4WAoAAAAgAAAA3gIAxQMASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggMBUBAJC6A50BKt8CxgM+MRiKQ6IhoRII5TggAwSzt39rcpbrtIOdPmb+5Z'))
                          }
                          return availablePhotos[iPhoto]?.dataUrl/* .replace(/\+/g, '%2B')
                        }))}
                      /> */}
                      {/* {p === 'bottom' && (
                        <animated.div css={bottomPhotoS}
                          style={{
                            // @ts-expect-error
                            backgroundImage: to(
                              [springStyle.bottomImI],
                              (bottomImI) => {
                                return `url(${photosToRender[bottomImI].dataUrl})`
                              },
                            ),
                          }}
                        />
                      )} */}
                      {/* {p === 'bottom' && (
                        <animated.img css={bottomPhotoS}
                          src={to(
                            [springStyle.bottomImI],
                            (bottomImI) => {
                              console.log('bottomImI', bottomImI)
                              return photosToRender[bottomImI].dataUrl
                            },
                          )}
                        />
                      )} */}
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
  height: ${100 - (maxDisplayedPhotosCnt - 1)}%;
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
const Photo = styled(animated.img)`
  ${fill};
  object-position: center;
  object-fit: cover;
  
  pointer-events: none; // or attr draggable="false"
`
const bottomPhotoS = css`
  ${fill};
  background-position: center;
  background-size: cover;
  object-position: center;
  object-fit: cover;
  
  pointer-events: none;
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
