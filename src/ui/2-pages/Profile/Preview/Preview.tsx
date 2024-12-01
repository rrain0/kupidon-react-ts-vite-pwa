import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { animated, to, useSpringValue } from '@react-spring/web'
import React, { useCallback, useMemo, useRef, useState } from 'react'
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
import { useNoTouchAction } from 'src/util/view/useNoTouchAction'
import { useResizeRef } from 'src/util/view/useResizeRef'
import { getViewProps } from 'src/util/view/ViewProps'
import { ViewU } from 'src/util/view/ViewU'
import FormValues = ProfilePageValidation.FormValues
import col = EmotionCommon.col
import Txt = EmotionCommon.Txt
import centerAll = EmotionCommon.centerAll
import center = EmotionCommon.center
import fill = EmotionCommon.fill
import minRatioPort = StyleConstants.minRatioPort
import maxRatioPort = StyleConstants.maxRatioPort
import effectLog = ReactU.effectLog
import mod = MathU.mod



/*
TODO
  Состояния фото: загрузка / обработка... взять из profile summary
  Snap points & инерция
  
 */



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
    
    
    
    
    const availablePhotos = useMemo(() => {
      return photos.filter(it => !it.isEmpty)
    }, [photos])
    const cnt = availablePhotos.length
    const maxCnt = 6
    const bottomI = cnt
    
    
    
    
    
    
    
    const [isDragging, startDragging, endDragging] = useBool(false)
    
    useNoSelect(isDragging)
    useNoTouchAction(isDragging)
    const canUseGestures = useLockAppGestures(isDragging)
    
    
    const photosBoxRef = useRef<HTMLDivElement>(null)
    
    // start progress y in (..0..100..) * availablePhotos.length
    const [getStartProgressY, setStartProgressY] = useRefGetSet(0)
    // delta progress y in (..0..100..) * availablePhotos.length
    const [getDProgressY, setDProgressY] = useRefGetSet(0)
    
    const pSpring = useSpringValue(0)
    const updatePSpring = () => pSpring.set(getStartProgressY() + getDProgressY())
    
    /* const [currI, setCurrI] = useState(0)
    to([spySpring, dpySpring], (spy, dpy) => {
      setCurrI(Math.floor((spy + dpy) / 100))
    }) */
    
    
    // todo use new value nimMax when snap to new index
    
    // TODO send startProgress & dProgress
    
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
        setDProgressY(dpy)
        updatePSpring()
      },
      onDragStart: () => {
        startDragging()
      },
      onDragging: () => { },
      onDragEnd: () => {
        setStartProgressY(RangeU.loop(
          getStartProgressY() + getDProgressY(),
          [0, cnt * 100]
        ))
        setDProgressY(0)
        updatePSpring()
        endDragging()
      },
    })
    
    
    const frame2Ref = useResizeRef<HTMLElement>(useCallback((elem) => {
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
          <PreviewFrame2 ref={frame2Ref}>
            <PhotosBox ref={photosBoxRef} {...onTrackDrag()}>
              {[...availablePhotos, 'bottom' as const].map((p, i) => {
                return (
                  <PhotoBox
                    key={(() => {
                      if (p === 'bottom') return p
                      return `photo ${p.id}`
                    })()}
                    style={{
                      // @ts-expect-error
                      order: to(
                        [pSpring],
                        (p) => {
                          const displayedI = (() => {
                            if (i === bottomI) return bottomI
                            return RangeU.loop(i - Math.floor(p / 100), [0, cnt])
                          })()
                          const o = cnt - 1 - displayedI
                          //console.log('i o', i, o)
                          return o
                        },
                      ),
                      width: '100%',
                      height: `${100 - (maxCnt - 1)}%`,
                      transformOrigin: '50% 0',
                      scale: to(
                        [pSpring],
                        (p) => {
                          const displayedI = (() => {
                            if (i === bottomI) return bottomI
                            return RangeU.loop(i - Math.floor(p / 100), [0, cnt])
                          })()
                          const cp = mod(p, 100)
                          const s = 100 - (maxCnt - 1) * (() => {
                            if (displayedI === 0) return 0
                            return displayedI - RangeU.map(cp, [0, 80, 100], [0, 0, 1])
                          })()
                          //console.log('i o', i, o)
                          return s / 100
                        },
                      ),
                      transform: to(
                        [pSpring],
                        (p) => {
                          const displayedI = (() => {
                            if (i === bottomI) return bottomI
                            return RangeU.loop(i - Math.floor(p / 100), [0, cnt])
                          })()
                          const cp = mod(p, 100)
                          let y = -displayedI + 1 + RangeU.map(cp, [0, 80, 100], [0, 0, 1])
                          if (displayedI === 0) y = -displayedI + 1 + cp
                          //console.log('i y', i, y)
                          return `translateY(${y}%)`
                        },
                      ),
                      opacity: to(
                        [pSpring],
                        (p) => {
                          const displayedI = (() => {
                            if (i === bottomI) return bottomI
                            return RangeU.loop(i - Math.floor(p / 100), [0, cnt])
                          })()
                          const cp = mod(p, 100)
                          let o = 100
                          if (displayedI === 0) o = 100 - RangeU.map(
                            cp,
                            [0, 30, 100],
                            [0, 0, 100]
                          )
                          if (displayedI === bottomI) o = RangeU.map(
                            cp,
                            [0, 80, 100],
                            [0, 0, 100]
                          )
                          //console.log('i o', i, o)
                          return o / 100
                        },
                      ),
                    }}
                  >
                    {p !== 'bottom' && <Photo src={p.dataUrl} />}
                    {p === 'bottom' && (
                      <animated.div css={bottomPhotoS}
                        style={{
                          // @ts-expect-error
                          backgroundImage: to(
                            [pSpring],
                            (p) => {
                              const i = Math.floor(p / 100)
                              return `url(${availablePhotos[i].dataUrl})`
                            },
                          ),
                        }}
                      />
                    )}
                  </PhotoBox>
                )
              })}
            </PhotosBox>
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
`
const PreviewFrame2 = styled.div`
  width: 100%;
  height: 100%;
  ${center};
`
const PhotosBox = styled.div`
  width: var(--w);
  height: var(--h);
  position: relative;
  ${centerAll};
  align-items: end;
  //background-color: #7FFFD455;
  border-radius: 16px;
  
  // allow intercept only single finger up/down swipe gestures
  touch-action: pan-y;
  pointer-events: none;
`
const PhotoBox = styled(animated.div)`
  border-radius: 16px;
  overflow: hidden;
  
  pointer-events: auto;
`
const Photo = styled.img`
  ${fill};
  object-position: center;
  object-fit: cover;
  
  pointer-events: none; // or attr draggable="false"
`
const bottomPhotoS = css`
  ${fill};
  background-position: center;
  background-size: cover;
  
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
