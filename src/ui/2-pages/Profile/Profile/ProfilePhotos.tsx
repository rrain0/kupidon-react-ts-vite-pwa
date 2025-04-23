import { css, keyframes } from '@emotion/react'
import { config, useSprings, animated, UseSpringProps } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { ReactDOMAttributes } from '@use-gesture/react/dist/declarations/src/types'
import { useNoTouchAction } from '@util/pointer/useNoTouchAction.ts'
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import Dropzone from 'react-dropzone'
import {
  getMediaUiState,
  MediaInArrayDUC,
  MediaOperation, newDefaultLocalMediaInArray,
  newDefaultMediaOperation,
} from 'src/ui-data/models/media/Media.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import {
  ImageParts,
} from 'src/ui/0-elements/ImageParts.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import ProfilePhotosPhotoOptions, {
  ProfilePhotosPhotoOptionsOverlayName,
} from 'src/ui/2-pages/Profile/options/ProfilePhotosPhotoOptions.tsx'
import { useLockAppGestures } from 'src/util/app/useLockAppGestures.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { ArrayU } from 'src/util/common/ArrayU.ts'
import { AsyncU } from 'src/util/common/AsyncU.ts'
import { RangeU } from 'src/util/common/RangeU'
import { FileU } from 'src/util/file/FileU.ts'
import { getDataUrlProps } from '@util/file/DataUrl.ts'
import { ImageU } from 'src/util/file/ImageU.ts'
import { StageProgress } from '@util/progress/StageProgress.ts'
import { useAsRefGet } from 'src/util/react-state/useAsRefGet'
import { useNoSelect } from '@util/pointer/useNoSelect.ts'
import { useTimeout } from 'src/util/react/useTimeout.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import flexC = EmotionCommon.flexC
import { TypeU } from 'src/util/common/TypeU.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import PieProgress from 'src/ui/0-elements/PieProgress/PieProgress.tsx'
import SparkingLoadingLine from 'src/ui/0-elements/SparkingLoadingLine/SparkingLoadingLine.tsx'
import { useAppZustand } from 'src/zustand/app/AppZustand.ts'
import bgBorderMask = EmotionCommon.bgInBorder
import PlusIc = SvgIconsPack.PlusIc
import contents = EmotionCommon.contents
import * as uuid from 'uuid'
import blobToDataUrl = FileU.blobToDataUrl
import SetterOrUpdater = TypeU.SetterOrUpdater
import trimExtension = FileU.trimExtension
import Theme = AppTheme.Theme
import replaceFirstToIfFoundBy = ArrayU.replaceFirstToIfFoundBy
import mapFirstToIfFoundBy = ArrayU.mapFirstToIfFoundBy
import throttle = AsyncU.withThrottle
import Callback = TypeU.Callback
import findBy = ArrayU.findBy
import NumRange = RangeU.NumRange
import arr = ArrayU.arr




const progressAnimDuration = 400 // ms



const springStyle = (
  dragIdx?: number | undefined, active = false, dx = 0, dy = 0
) => (
  index: number/* , ctrl: Controller */
) => {
  if (dragIdx === index && active) return {
    x: dx,
    y: dy,
    opacity: 0.4,
    //scale: index === 0 ? 0.5 : 1,
    zIndex: 1,
    immediate: p => ['zIndex'].includes(p),
    config: p => ['x', 'y'].includes(p) ? config.stiff : config.default,
  } satisfies UseSpringProps
  
  return {
    x: 0,
    y: 0,
    opacity: 1,
    //scale: 1,
    zIndex: 0,
    immediate: true,
  } satisfies UseSpringProps
}



export type ProfilePhotosProps = {
  images: MediaInArrayDUC[]
  setImages: SetterOrUpdater<MediaInArrayDUC[]>
}
const ProfilePhotos = React.memo((props: ProfilePhotosProps) => {
  const { images, setImages } = props
  const theme = useAppZustand(s => s.theme)
  const isDraggingFiles = useAppZustand(s => s.isDraggingFiles)
  
  
  const progressAnim = useMemo(() => radialGradKfs(theme), [theme])
  
  const [canShowFetchProgress, setCanShowFetchProgress] = useState(false)
  useTimeout(3000, () => setCanShowFetchProgress(true), [])
  
  const [lastIdx, setLastIdx] = useState(0)
  
  const [dragState, setDragState] = useState(
    undefined as undefined | 'initialDelay' | 'progressAnim' | 'dragging'
  )
  const [getDragRefValue] = useAsRefGet(dragState)
  //useEffect(() => console.log('dragState', dragState), [dragState])
  const [progressAnimLockGestures, setProgressAnimLockGestures] = useState(false)
  const [swap, setSwap] = useState(undefined as undefined | NumRange)
  
  const [canClick, setCanClick] = useState(true)
  const photoOptions = useOverlayUrl(ProfilePhotosPhotoOptionsOverlayName)
  
  
  // forbid content selection while dragging
  useNoSelect(!!dragState)
  // forbid gesture interception by browser
  const isLockGestures = dragState === 'dragging' || progressAnimLockGestures
  useNoTouchAction(isLockGestures)
  const canUseGestures = useLockAppGestures(isLockGestures)
  useLayoutEffect(() => {
    if (!canUseGestures) {
      setDragState(undefined)
      setCanClick(false)
    }
  }, [canUseGestures, dragState, canClick])
  
  
  // swap photos
  const [getSwapPhotosEffectEvent] = useAsRefGet((swap: NumRange) => {
    const newImages = [...images]
    newImages[swap[0]] = images[swap[1]]
    newImages[swap[1]] = images[swap[0]]
    setImages(newImages)
  })
  useLayoutEffect(() => {
    if (!dragState && swap) {
      getSwapPhotosEffectEvent()(swap)
      setSwap(undefined)
    }
  }, [dragState, swap])
  
  
  // starts selection animation after timeout
  useLayoutEffect(() => {
    if (dragState === 'initialDelay') {
      const timerId = setTimeout(() => setDragState('progressAnim'), 150)
      return () => clearTimeout(timerId)
    }
  }, [dragState])
  
  useLayoutEffect(() => {
    if (dragState === 'progressAnim') {
      const timerId = setTimeout(
        () => setProgressAnimLockGestures(true),
        progressAnimDuration - 300
      )
      return () => clearTimeout(timerId)
    }
    else setProgressAnimLockGestures(false)
  }, [dragState])
  
  
  const photosGrid = useRef<HTMLDivElement>(null)
  const photoFrameRefs = useRef<(Element | null)[]>(arr(6).map(i => null))
  
  
  
  
  //const setLogData = useSetRecoilState(LogLayerRecoil)
  
  const [springs, springApi] = useSprings(images.length, springStyle(), [images])
  const applyDragRef = useRef<Callback>(undefined)
  // noinspection JSVoidFunctionReturnValueUsed
  const drag = useDrag(gesture => {
    const {
      first, active, last,
      movement: [mx, my],
      xy: [vpx, vpy], // viewport x, viewport y
    } = gesture
    const [i] = gesture.args as [i: number]
    /* console.log(
      'mx:', mx,
      'my:', my,
    ) */
    /* if (first){
      setLogData([JSON.stringify({
        vpx: MathUtils.rf(vpx, 3),
        vpy: MathUtils.rf(vpy, 3),
      })])
    } */
    
    const applyDrag = () => {
      //console.log('getDragRefValue():', getDragRefValue(), 'active:', active)
      const isDragging = getDragRefValue() === 'dragging' && active
      //console.log('i:', i, 'isDragging:', isDragging, 'mx:', mx, 'my:', my)
      springApi.start(springStyle(i, isDragging, mx, my))
      if (isDragging) {
        const hoveredElements = document.elementsFromPoint(vpx, vpy)
        if (!hoveredElements.includes(photosGrid.current as any)) {
          setSwap(undefined)
        }
        else {
          const found = findBy(photoFrameRefs.current,
            elem => hoveredElements.includes(elem as any)
          )
          if (!found.isFound) { /* nothing to do, remain previous swap */ }
          else if (i !== found.index) setSwap([i, found.index])
          else setSwap(undefined)
        }
      }
    }
    applyDrag()
    applyDragRef.current = applyDrag
    if (last) {
      setDragState(undefined)
      applyDragRef.current = undefined
    }
  }) as (...args: any[]) => ReactDOMAttributes
  useEffect(() => {
    if (dragState === 'dragging') applyDragRef.current?.()
  }, [dragState])
  
  
  
  const onFilesSelected = useCallback(
    onFilesSelectedBuilder(images, lastIdx, setImages, photoOptions.close),
    [images, lastIdx, setImages]
  )
  
  /* {
    const index = 1
    useEffect(
      ()=>{
        console.log(`images[${index}]`,images[index])
      },
      [images[index]]
    )
  } */
  
  //useEffect(() => console.log(`images`, [...images]), [images])
  
  //console.log('canClick',canClick)
  
  
  return (
    <>
      
      <div css={photosGridStyle}
        ref={photosGrid}
      >
        {springs.map((springStyle, i) => {
          const im = images[i]
          return (
            <div css={contents} key={im.id}>
              <div
                css={css`
                  grid-area: im${i+1};
                  position: relative;
                  ${flexC};
                `}
                ref={value => { photoFrameRefs.current[i] = value }}
              >
                
                
                <div css={contents}
                  {...(() => {
                    const onPointerDown = (ev: React.PointerEvent) => {
                      if (ev.buttons === 1) {
                        ev.currentTarget.releasePointerCapture(ev.pointerId)
                        setLastIdx(i)
                        setDragState('initialDelay')
                        setCanClick(true)
                      }
                    }
                    const onPointerRemove = () => {
                      if (dragState !== 'dragging') {
                        setDragState(undefined)
                      }
                    }
                    return {
                      onPointerDown,
                      onPointerCancel: onPointerRemove,
                      onPointerUp: onPointerRemove,
                      onPointerOut: onPointerRemove,
                    }
                  })()}
                  onClick={ev => {
                    if (canClick && !im.isEmpty) photoOptions.open()
                  }}
                >
                  
                  <Dropzone
                    onDrop={(files, rejectedFiles, ev) => onFilesSelected(files)}
                    onDragOver={() => setLastIdx(i)}
                    noClick={!im.isEmpty || !canClick}
                    useFsAccessApi={false}
                  >
                    {({ getRootProps, getInputProps, isDragAccept }) => {
                      //console.log('getInputProps()',getInputProps())
                      //console.log('isDragAccept',isDragAccept)
                      return (
                        <div css={contents} {...getRootProps()}>
                          <input {...getInputProps()} />
                          {/* @ts-expect-error */}
                          <animated.label
                            css={photoDraggableBox}
                            style={springStyle}
                            {...drag(i)}
                            //ref={ref2 as any}
                          >
                            
                            {(() => {
                              const { showConversionProgress, conversionProgress = 0 } = getMediaUiState(im)
                              
                              if (showConversionProgress) {
                                return (
                                  <div css={ImageParts.placeholderBoxS}>
                                    <PieProgress css={ImageParts.pieProgressS}
                                      progress={
                                        RangeU.map(conversionProgress, [0, 100], [5, 95])
                                      }
                                    />
                                  </div>
                                )
                              }
                              
                              if (!canShowFetchProgress && (
                                !im.isInited
                                || (
                                  im.type === 'remote'
                                  && !im.isReady
                                  && !im.isEmpty
                                )
                              ))
                                return (
                                  <div css={ImageParts.placeholderBoxS}>
                                    <SparkingLoadingLine />
                                  </div>
                                )
                              
                              if (im.download?.showProgress)
                                return (
                                  <div css={ImageParts.placeholderBoxS}>
                                    <PieProgress css={ImageParts.pieProgressS}
                                      progress={
                                        RangeU.map(im.download.progress, [0, 100], [5, 95])
                                      }
                                    />
                                  </div>
                                )
                              
                              if (im.isEmpty)
                                return (
                                  <div css={ImageParts.placeholderBoxS}>
                                    <PlusIc css={SvgIconS6.t(ImageParts.placeholderIcS)} />
                                  </div>
                                )
                              if (im.isReady)
                                return (
                                  <img css={photoImgStyle}
                                    src={im.dataUrl}
                                    alt={im.name}
                                  />
                                )
                              
                            })()}
                            
                            {im.type === 'local' && im.upload?.showProgress && (
                              <div css={photoDimmed}>
                                <PieProgress css={ImageParts.pieProgressAccentS}
                                  progress={
                                    RangeU.map(im.upload.progress, [0, 100], [5, 95])
                                  }
                                />
                              </div>
                            )}
                            {isDraggingFiles && (
                              <>
                                {isDragAccept && <div css={photoDimmed} />}
                                <div css={photoOnExternalDraggingBorder} />
                              </>
                            )}
                          
                          </animated.label>
                        </div>
                      )
                    }}
                  </Dropzone>
                  
                </div>
                
                
                
                <div
                  css={t => css`
                    ${photoProgressFrameStyle(t)};
                    
                    ${lastIdx === i && dragState === 'progressAnim' && css`
                      animation: ${progressAnim} ${progressAnimDuration}ms linear forwards;
                    `}
                    ${lastIdx === i && !swap && dragState === 'dragging' && css`
                      background-image: none;
                      background-color: ${t.photos.highlightFrameAccentBg[0]};
                    `}
                    ${swap?.[1] === i && css`
                      background-image: none;
                      background-color: ${t.photos.highlightFrameAccentBg[0]};
                    `}
                  `}
                  onAnimationEnd={ev => {
                    if (ev.animationName === progressAnim.name) {
                      setDragState('dragging')
                      setCanClick(false)
                    }
                  }}
                />
                
                
              </div>
            </div>
          )
        })}
      </div>
      
      
      
      
      <ProfilePhotosPhotoOptions
        isOpen={photoOptions.isOpen}
        close={photoOptions.close}
        images={images}
        setImages={setImages}
        lastIdx={lastIdx}
        onFilesSelected={onFilesSelected}
      />
      
      
    </>
  )
})
export default ProfilePhotos




const radialGradKfs = (t:Theme) => keyframes`
  0% {
    --rotation: 0turn;
    --grad-color: ${t.photos.highlightFrameBg[0]};
  }
  100% {
    --rotation: 1.001turn;
    --grad-color: ${t.photos.highlightFrameBg[0]};
  }
`



const photosGridStyle = css`
  display: grid;
  width: 100%;
  height: auto;
  grid:
    'im1 im1 im2' auto
    'im1 im1 im3' auto
    'im4 im5 im6' auto
   / 1fr 1fr 1fr
  ;
  place-items: stretch;
  gap: 12px;
  position: relative;
  
  //pointer-events: none;
  //user-select: none;
  //touch-action: none;
`


const photoDraggableBox = css`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  
  // allow intercept only single finger up/down swipe gestures
  touch-action: pan-y;
`



const photoImgStyle = css`
  width: 100%;
  aspect-ratio: 1;
  object-position: center;
  object-fit: cover;

  pointer-events: none;
  //user-select: none;
  //touch-action: none;
`



const photoDimmed = (t: AppTheme.Theme) => css`
  ${ImageParts.placeholderBoxS(t)};
  background: #00000099;
`
const photoOnExternalDraggingBorder = (t: AppTheme.Theme) => css`
  position: absolute;
  inset: -4px;
  border-radius: calc(14px + 4px);
  border: 10px dashed;
  border-color: ${t.photos.borderDrag[0]};
`
const photoProgressFrameStyle = (t: AppTheme.Theme) => css`
  pointer-events: none;

  position: absolute;
  inset: -7px;
  border: 3px solid transparent;
  border-radius: 20px;
  @property --rotation {
    syntax: '<angle>';
    initial-value: 0turn;
    inherits: false;
  }
  @property --grad-color {
    syntax: '<color>';
    initial-value: ${t.photos.highlightFrameBg[0]};
    inherits: false;
  }

  ${bgBorderMask};
  background-image: conic-gradient(
    var(--grad-color) 0turn var(--rotation),
    transparent var(--rotation) 1turn
  );
`



// TODO ???maybe use state 'files' and effect on files
const onFilesSelectedBuilder = (
  images: MediaInArrayDUC[],
  lastIdx: number,
  setImages: SetterOrUpdater<MediaInArrayDUC[]>,
  closeMenu: Callback,
) => (files: File[]) => {
  const imgFiles = files.filter(it => it.type.startsWith('image/'))
  if (imgFiles.length) {
    const emptyCnt = images
      .filter((im, i) => i === lastIdx || (i >= lastIdx && im.isEmpty)).length
    let filesI = 0
    const newImages = images.map((photo, i) => {
      if (filesI < imgFiles.length
        && (i === lastIdx
          || (i >= lastIdx
            && (imgFiles.length<=emptyCnt ? photo.isEmpty : true)
          )
        )
      ) {
        const imgFile = imgFiles[filesI++]
        
        photo.download?.abort()
        photo.conversion?.abort()
        
        const compressAbortCtrl = new AbortController()
        const blobToDataUrlAbortCtrl = new AbortController()
        const abortCtrl = new AbortController()
        abortCtrl.signal.onabort = function() {
          compressAbortCtrl.abort(this.reason)
          blobToDataUrlAbortCtrl.abort(this.reason)
        }
        const compressionStart = {
          isReady: false,
          conversion: { ...newDefaultMediaOperation(),
            id: uuid.v4(),
            showProgress: true,
            abort: reason => abortCtrl.abort(reason),
          },
        } satisfies Partial<MediaInArrayDUC>
        
        const processingPhoto = { ...photo, ...compressionStart }
        
        const updatePhoto = (
          photoUpdate?: Partial<MediaInArrayDUC>,
          compressionUpdate?: Partial<MediaOperation>,
        ) => {
          setImages(images => mapFirstToIfFoundBy(images,
            image => ({ ...image,
              ...photoUpdate,
              ...compressionUpdate && image.conversion && {
                conversion: { ...image.conversion, ...compressionUpdate },
              },
            }),
            image => image.conversion?.id === compressionStart.conversion.id
          ))
        }
        const updatePhotoThrottled = throttle(
          RangeU.random(1500, 2300), updatePhoto
        )
        
        ;(async() => {
          try {
            const progress = new StageProgress(2, [95, 5])
            const onProgress = (p = 0) => {
              progress.progress = p
              //console.log('progress',progress.value)
              updatePhotoThrottled(undefined, { progress: progress.value })
            }
            
            //await wait(10000)
            //throw 'test error'
            
            const compressedFile = await ImageU.compress(imgFile, {
              onProgress, abortCtrl: compressAbortCtrl,
            })
            abortCtrl.signal.throwIfAborted()
            
            //console.log('imgFile',imgFile)
            progress.stage++
            progress.progress = 0
            const imgDataUrl = await blobToDataUrl(compressedFile, {
              onProgress, abortCtrl: blobToDataUrlAbortCtrl,
            })
            abortCtrl.signal.throwIfAborted()
            
            //console.log('imgDataUrl',imgDataUrl.length)
            //console.log('imgDataUrl',imgDataUrl.substring(0, 1000))
            const mimeType = getDataUrlProps(imgDataUrl)!.mimeType
            const newPhoto = {
              ...newDefaultLocalMediaInArray(photo.remoteI),
              id: uuid.v4(),
              name: trimExtension(imgFile.name),
              mimeType: mimeType,
              dataUrl: imgDataUrl,
              isReady: true,
            }
            setImages(images => replaceFirstToIfFoundBy(images,
              newPhoto,
              elem => elem.conversion?.id === compressionStart.conversion.id
            ))
          }
          catch (ex) {
            if (abortCtrl.signal.aborted) {
              console.log('conversion aborted:', abortCtrl.signal.reason)
              return
            }
            // TODO notify about error
            console.log('conversion error', ex)
            //console.log('photo', photo)
            updatePhoto({ conversion: undefined, conversionError: ex })
          }
        })()
        
        return processingPhoto
      }
      
      return photo
    })
    setImages(newImages)
    closeMenu()
  }
}




