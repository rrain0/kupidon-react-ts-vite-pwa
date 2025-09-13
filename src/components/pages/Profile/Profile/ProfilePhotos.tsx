import { css, keyframes } from '@emotion/react'
import { config, useSprings, animated, UseSpringProps } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { useAppTheme } from '@utils/app/theme/useAppTheme.ts'
import { random } from '@utils/base/math/randomUtils.ts'
import { trimExt } from '@utils/bin/fileUtils.ts'
import { useNoTouchAction } from '@utils/gestures/pointer/useNoTouchAction.ts'
import { useWasGesture } from '@utils/app/gestures/useWasGesture.ts'
import { useAsCallback } from '@utils/state/react/base/useAsCallback.ts'
import { useRefGetSet } from '@utils/state/react/base/useRefGetSet.ts'
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
} from '@libs/media/Media.ts'
import Contents from '@libs/short-propsed/components/Contents.tsx'
import DashedBorder from 'src/components/elems/basic-elements/DashedBorder.tsx'
import { SvgIconS6 } from 'src/components/elems/icons/SvgIcons/SvgIconS6.ts'
import {
  ImageParts,
} from 'src/components/elems/ImageParts.tsx'
import { useOverlayUrl } from 'src/components/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import ProfilePhotosPhotoOptions, {
  ProfilePhotosPhotoOptionsOverlayName,
} from 'src/components/pages/Profile/options/ProfilePhotosPhotoOptions.tsx'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { ArrayU, arr } from '@utils/base/ArrayU.ts'
import { withThrottle } from '@utils/base/asyncUtils.ts'
import { rangeMap } from '@utils/base/math/rangeUtils.ts'
import { blobToDataUrl } from '@utils/bin/binDataUtils.ts'
import { getDataUrlProps } from '@utils/bin/dataUrl.ts'
import { compressImage } from '@utils/bin/imageUtils.ts'
import { StagedProgress } from '@utils/ui/StagedProgress.ts'
import { useAsRefGet } from '@utils/state/react/base/useAsRefGet.ts'
import { useNoSelect } from '@utils/gestures/pointer/useNoSelect.ts'
import { AppTheme } from 'src/styles/themes/AppTheme.ts'
import flexC = EmotionCommon.flexC
import PieProgress from 'src/components/elems/PieProgress/PieProgress.tsx'
import SparkingLoadingLine from 'src/components/elems/SparkingLoadingLine/SparkingLoadingLine.tsx'
import { useAppZustand } from 'src/zustand/app/appZustand.ts'
import bgBorderMask = EmotionCommon.bgInBorder
import PlusIc from 'src/components/elems/icons/SvgIcons/pack/ui/PlusIc.tsx'
import * as uuid from 'uuid'
import { Cb, SetterOrUpdater } from '@utils/base/typeUtils.ts'
import Theme = AppTheme.Theme
import replaceFirstToIfFoundBy = ArrayU.replaceFirstToIfFoundBy
import mapFirstToIfFoundBy = ArrayU.mapFirstToIfFoundBy
import findBy = ArrayU.findBy
import { NumRange } from '@utils/base/math/rangeUtils.ts'




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
  const tm = useAppTheme()
  const isDraggingFiles = useAppZustand(s => s.isDraggingFiles)
  
  
  const progressAnim = useMemo(() => radialGradKfs(tm), [tm])
  
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
  const { getWasDragged, applyWasDragged } = useWasGesture({
    onDragStarted: () => {
      if (!isLockGestures) {
        setDragState(undefined)
        setCanClick(false)
      }
    },
  })
  useLayoutEffect(() => {
    if (!getWasDragged()) applyWasDragged()
  }, [isLockGestures])
  
  
  // swap photos
  const swapPhotos = useAsCallback((swap: NumRange) => {
    const newImages = [...images]
    newImages[swap[0]] = images[swap[1]]
    newImages[swap[1]] = images[swap[0]]
    setImages(newImages)
  })
  useLayoutEffect(() => {
    if (!dragState && swap) {
      swapPhotos(swap)
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
  const [getApplyDrag, setApplyDrag] = useRefGetSet<Cb | undefined>(undefined)
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
    setApplyDrag(applyDrag)
    if (last) {
      setDragState(undefined)
      setApplyDrag(undefined)
    }
  }, { })
  useEffect(() => { if (dragState === 'dragging') getApplyDrag?.() }, [dragState])
  
  
  
  const onFilesSelected = useCallback(
    onFilesSelectedBuilder(images, lastIdx, setImages, photoOptions.close),
    [images, lastIdx, setImages]
  )
  
  /* {
    const index = 1
    useEffect(
      () => {
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
        data-display-name='ProfilePhotos'
      >
        {springs.map((springStyle, i) => {
          const im = images[i]
          return (
            <Contents key={im.id}>
              <div
                css={css`
                  grid-area: im${i + 1};
                  position: relative;
                  ${flexC};
                `}
                ref={value => { photoFrameRefs.current[i] = value }}
              >
                
                
                <Contents
                  {...(() => {
                    const onPointerDown = (ev: React.PointerEvent) => {
                      if (ev.buttons === 1) {
                        ev.currentTarget.releasePointerCapture(ev.pointerId)
                        setLastIdx(i)
                        if (!getWasDragged()) {
                          setDragState('initialDelay')
                          setCanClick(true)
                        }
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
                      
                      const {
                        showConversionProgress, conversionProgress = 0,
                        isLoadingNoProgress,
                        isDownloading, showDownloadProgress, downloadProgress = 0,
                        showUploadProgress, uploadProgress = 0,
                        isEmpty, isReady,
                      } = getMediaUiState(im)
                      
                      return (
                        <Contents {...getRootProps()}>
                          <input {...getInputProps()}/>
                          {/* @ts-expect-error */}
                          <animated.label
                            css={photoDraggableBox}
                            style={springStyle}
                            {...drag(i)}
                            //ref={ref2 as any}
                          >
                            
                            {(() => {
                              if (showConversionProgress) {
                                return (
                                  <div css={ImageParts.placeholderBoxS}>
                                    <PieProgress css={ImageParts.pieProgressS}
                                      progress={rangeMap(conversionProgress, [0, 100], [5, 95])}
                                    />
                                  </div>
                                )
                              }
                              
                              if (isDownloading && isLoadingNoProgress) {
                                return (
                                  <div css={ImageParts.placeholderBoxS}>
                                    <SparkingLoadingLine/>
                                  </div>
                                )
                              }
                              
                              if (showDownloadProgress) {
                                return (
                                  <div css={ImageParts.placeholderBoxS}>
                                    <PieProgress css={ImageParts.pieProgressS}
                                      progress={rangeMap(downloadProgress, [0, 100], [5, 95])}
                                    />
                                  </div>
                                )
                              }
                              
                              if (isEmpty) {
                                return (
                                  <div css={ImageParts.placeholderBoxS}>
                                    <PlusIc css={SvgIconS6.t(ImageParts.placeholderIcS)}/>
                                  </div>
                                )
                              }
                              if (isReady) {
                                return (
                                  <img css={photoImgStyle}
                                    src={im.dataUrl}
                                    alt={im.name}
                                  />
                                )
                              }
                            })()}
                            
                            {showUploadProgress && (
                              <div css={photoDimmed}>
                                <PieProgress css={ImageParts.pieProgressAccentS}
                                  progress={rangeMap(uploadProgress, [0, 100], [5, 95])}
                                />
                              </div>
                            )}
                            {isDraggingFiles && (
                              <>
                                {isDragAccept && <div css={photoDimmed}/>}
                                <DashedBorder
                                  props={t => ({
                                    rad: 14, w: 6, wAdd: 4, color: t.photos.borderDrag,
                                  })}
                                />
                              </>
                            )}
                          
                          </animated.label>
                        </Contents>
                      )
                    }}
                  </Dropzone>
                  
                </Contents>
                
                
                
                <div
                  css={t => css`
                    ${photoProgressFrameStyle(t)};
                    
                    ${lastIdx === i && dragState === 'progressAnim' && css`
                      animation: ${progressAnim} ${progressAnimDuration}ms linear forwards;
                    `}
                    ${lastIdx === i && !swap && dragState === 'dragging' && css`
                      background-image: none;
                      background-color: ${t.photos.highlightFrameAccentBg};
                    `}
                    ${swap?.[1] === i && css`
                      background-image: none;
                      background-color: ${t.photos.highlightFrameAccentBg};
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
            </Contents>
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
ProfilePhotos.displayName = 'ProfilePhotos'
export default ProfilePhotos




const radialGradKfs = (t:Theme) => keyframes`
  0% {
    --rotation: 0turn;
    --grad-color: ${t.photos.highlightFrameBg};
  }
  100% {
    --rotation: 1.001turn;
    --grad-color: ${t.photos.highlightFrameBg};
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

const photoProgressFrameStyle = (t: AppTheme.Theme) => css`
  pointer-events: none;

  position: absolute;
  top: -7px; right: -7px; bottom: -7px; left: -7px;
  border: 3px solid transparent;
  border-radius: 20px;
  @property --rotation {
    syntax: '<angle>';
    initial-value: 0turn;
    inherits: false;
  }
  @property --grad-color {
    syntax: '<color>';
    initial-value: ${t.photos.highlightFrameBg};
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
  closeMenu: Cb,
) => (files: File[]) => {
  const imgFiles = files.filter(it => it.type.startsWith('image/'))
  if (imgFiles.length) {
    const emptyCnt = images
      .filter((im, i) => i === lastIdx || (i >= lastIdx && im.isEmpty)).length
    let filesI = 0
    const newImages = images.map((photo, i) => {
      if (filesI < imgFiles.length && (
        i === lastIdx || (
          i >= lastIdx && (
            imgFiles.length <= emptyCnt ? photo.isEmpty : true
          )
        )
      )) {
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
          isInited: true,
          isEmpty: false,
          isReady: false,
          showConversionProgress: true,
          conversion: { ...newDefaultMediaOperation(),
            id: uuid.v4(),
            abort: reason => abortCtrl.abort(reason),
          },
        } satisfies Partial<MediaInArrayDUC>
        
        const processingPhoto = { ...photo, ...compressionStart }
        
        const updatePhoto = (
          photoUpdate?: Partial<MediaInArrayDUC>,
          compressionUpdate?: Partial<MediaOperation>,
        ) => {
          setImages(images => mapFirstToIfFoundBy({
            arr: images,
            filter: image => image.conversion?.id === compressionStart.conversion.id,
            mapper: image => ({ ...image,
              ...photoUpdate,
              ...compressionUpdate && image.conversion && {
                conversion: { ...image.conversion, ...compressionUpdate },
              },
            }),
          }))
        }
        const updatePhotoThrottled = withThrottle(
          random(1500, 2300), updatePhoto
        )
        
        ;(async() => {
          try {
            const progress = new StagedProgress(2, [95, 5])
            const onProgress = (p = 0) => {
              progress.set(p)
              //console.log('progress',progress.value)
              updatePhotoThrottled(undefined, { progress: progress.value })
            }
            
            //await wait(10000)
            //throw 'test error'
            
            const compressedFile = await compressImage(imgFile, {
              onProgress, abortCtrl: compressAbortCtrl,
            })
            abortCtrl.signal.throwIfAborted()
            
            //console.log('imgFile',imgFile)
            progress.set(0, { next: true })
            const imgDataUrl = await blobToDataUrl(compressedFile, {
              onProgress, abortCtrl: blobToDataUrlAbortCtrl,
            })
            abortCtrl.signal.throwIfAborted()
            
            //console.log('imgDataUrl', imgDataUrl.length)
            //console.log('imgDataUrl', imgDataUrl.substring(0, 1000))
            const ext = getDataUrlProps(imgDataUrl)!.preferredExt
            const newPhoto = {
              ...newDefaultLocalMediaInArray(photo.remoteI),
              isInited: true,
              id: uuid.v4(),
              name: trimExt(imgFile.name),
              ext,
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




