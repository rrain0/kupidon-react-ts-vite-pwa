import { css, keyframes } from '@emotion/react'
import { config, useSprings, animated, UseSpringProps } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { ReactDOMAttributes } from '@use-gesture/react/src/types'
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import Dropzone from 'react-dropzone'
import { useRecoilValue } from 'recoil'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/useOverlayUrl.ts'
import ProfilePhotosPhotoOptions, {
  ProfilePhotosPhotoOptionsOverlayName,
} from 'src/ui/pages/Profile/Profile/ProfilePhotosPhotoOptions.tsx'
import {
  DefaultOperation,
  DefaultProfilePhoto,
  ProfilePhoto,
} from 'src/ui/pages/Profile/ProfilePhotoModels.ts'
import { AppRecoil } from 'src/recoil/state/AppRecoil.ts'
import { ThemeRecoil } from 'src/recoil/state/ThemeRecoil.ts'
import { useLockAppGestures } from 'src/util/app/useLockAppGestures.ts'
import { EmotionCommon } from 'src/ui-props/styles/EmotionCommon.ts'
import { ArrayU } from '@util/common/ArrayU.ts'
import { AsyncU } from 'src/util/common/AsyncU.ts'
import { RangeU } from 'src/util/common/RangeU'
import { FileU } from 'src/util/file/FileU.ts'
import { MathU } from '@util/common/MathU.ts'
import { DataUrl } from '@util/DataUrl.ts'
import { ImageU } from 'src/util/file/ImageU.ts'
import { Progress } from '@util/Progress.ts'
import { useEffectEvent } from '@util/react/useEffectEvent.ts'
import { useNoSelect } from 'src/util/element/useNoSelect.ts'
import { useNoTouchAction } from 'src/util/element/useNoTouchAction.ts'
import { useStateAndRef } from 'src/util/react-ref/useStateAndRef.ts'
import { useTimeout } from 'src/util/react/useTimeout.ts'
import { AppTheme } from '@util/theme/AppTheme.ts'
import center = EmotionCommon.center
import { TypeU } from '@util/common/TypeU.ts'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons/SvgIcons.tsx'
import { SvgIconsStyle } from 'src/ui/elements/icons/SvgIcons/SvgIconsStyle.ts'
import PieProgress from 'src/ui/elements/PieProgress/PieProgress.tsx'
import { PieProgressStyle } from 'src/ui/elements/PieProgress/PieProgressStyle.ts'
import SparkingLoadingLine from 'src/ui/elements/SparkingLoadingLine/SparkingLoadingLine.tsx'
import abs = EmotionCommon.abs
import bgcBorderMask = EmotionCommon.bgcInBorder
import arrIndices = ArrayU.arrOfIndices
import PlusIc = SvgIcons.PlusIc
import contents = EmotionCommon.contents
import * as uuid from 'uuid'
import blobToDataUrl = FileU.blobToDataUrl
import SetterOrUpdater = TypeU.SetterOrUpdater
import trimExtension = FileU.trimExtension
import Theme = AppTheme.Theme
import ifFoundByThenReplaceTo = ArrayU.replaceFirstToIfFoundBy
import findByAndMapTo = ArrayU.mapFirstToIfFoundBy
import throttle = AsyncU.throttle
import Callback = TypeU.Callback
import findBy = ArrayU.findBy




const progressAnimDuration = 400 // ms



const springStyle =
(dragIdx: number|undefined = undefined, active = false, dx = 0, dy = 0) =>
(index: number/* , ctrl: Controller */) => {
  if (dragIdx===index && active) return {
    x: dx,
    y: dy,
    opacity: 0.4,
    //scale: index===0 ? 0.5 : 1,
    zIndex: 1,
    immediate: (key: string)=>['zIndex'].includes(key),
    config: (key: string)=>['x','y'].includes(key) ? config.stiff : config.default
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
  images: ProfilePhoto[]
  setImages: SetterOrUpdater<ProfilePhoto[]>
}
const ProfilePhotos =
React.memo(
(props: ProfilePhotosProps)=>{
  const { images, setImages } = props
  const { theme } = useRecoilValue(ThemeRecoil)
  const { isDraggingFiles } = useRecoilValue(AppRecoil)
  
  
  const progressAnim = useMemo(
    ()=>radialGradKfs(theme),
    [theme]
  )
  
  const [canShowFetchProgress, setCanShowFetchProgress] = useState(false)
  useTimeout(
    3000,
    ()=>setCanShowFetchProgress(true),
    []
  )
  
  const [lastIdx, setLastIdx] = useState(0)
  
  const [dragState, setDragState, dragStateRef] = useStateAndRef(
    undefined as undefined|'initialDelay'|'progressAnim'|'dragging'
  )
  const [progressAnimLockGestures, setProgressAnimLockGestures] = useState(false)
  const [swap, setSwap] = useState(undefined as undefined|[number,number])
  
  const [canClick, setCanClick] = useState(true)
  const photoOptions = useOverlayUrl(ProfilePhotosPhotoOptionsOverlayName)
  
  
  // forbid content selection while dragging
  useNoSelect(!!dragState)
  // forbid gesture interception by browser
  const isLockGestures = dragState==='dragging' || progressAnimLockGestures
  useNoTouchAction(isLockGestures)
  const isGesturesBusy = useLockAppGestures(isLockGestures)
  useLayoutEffect(
    ()=>{
      if (isGesturesBusy) {
        setDragState(undefined)
        setCanClick(false)
      }
    },
    [isGesturesBusy, dragState, canClick]
  )
  
  
  // swaps photos
  const swapPhotosEffectEvent = useEffectEvent(
    (swap: [number,number])=>{
      const newImages = [...images]
      newImages[swap[0]] = images[swap[1]]
      newImages[swap[1]] = images[swap[0]]
      setImages(newImages)
    }
  )
  useLayoutEffect(
    ()=>{
      if (!dragState && swap){
        swapPhotosEffectEvent(swap)
        setSwap(undefined)
      }
    },
    [dragState, swap]
  )
  
  
  // starts selection animation after timeout
  useLayoutEffect(
    ()=>{
      if (dragState==='initialDelay'){
        const timerId = setTimeout(
          ()=>setDragState('progressAnim'),
          150
        )
        return ()=>clearTimeout(timerId)
      }
    },
    [dragState]
  )
  
  useLayoutEffect(
    ()=>{
      if (dragState==='progressAnim') {
        const timerId = setTimeout(
          ()=>setProgressAnimLockGestures(true),
          progressAnimDuration - 300
        )
        return ()=>clearTimeout(timerId)
      }
      else setProgressAnimLockGestures(false)
    },
    [dragState]
  )
  
  
  const photosGrid = useRef<HTMLDivElement>(null)
  const photoFrameRefs = useRef<Array<Element|null>>(arrIndices(6).map(i=>null))
  
  
  
  
  //const setLogData = useSetRecoilState(LogLayerRecoil)
  
  const [springs, springApi] = useSprings(images.length, springStyle(), [images])
  const applyDragRef = useRef<Callback>()
  // noinspection JSVoidFunctionReturnValueUsed
  const drag = useDrag(
    gesture=>{
      const [i] = gesture.args as [number]
      const {
        first, active, last,
        movement: [mx,my],
        xy: [vpx,vpy], // viewport x, viewport y
      } = gesture
      /* console.log(
        'mx:', mx,
        'my:', my,
      ) */
      /* if (first){
        setLogData([JSON.stringify({
          vpx: MathUtils.round(vpx, 3),
          vpy: MathUtils.round(vpy, 3),
        })])
      } */
      
      const applyDrag = ()=>{
        const isDragging = dragStateRef.current==='dragging' && active
        springApi.start(springStyle(i, isDragging, mx, my))
        if (isDragging){
          const hoveredElements = document.elementsFromPoint(vpx,vpy)
          if (!hoveredElements.includes(photosGrid.current as any)) {
            setSwap(undefined)
          } else {
            const found = findBy(photoFrameRefs.current,
                elem=>hoveredElements.includes(elem as any)
            )
            if (!found.isFound) {} // nothing to do, remain previous swap
            else if (i!==found.index) setSwap([i,found.index])
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
    }
  ) as (...args: any[]) => ReactDOMAttributes
  useEffect(
    ()=>{ if (dragState==='dragging') applyDragRef.current?.() },
    [dragState]
  )
  
  
  
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
  //useEffect(()=>console.log(`images`,images), [images])
  
  //console.log('canClick',canClick)
  
  
  return <>
    
    <div css={photosGridStyle}
      ref={photosGrid}
    >
      {springs.map((springStyle,i) => {
        const im = images[i]
        return <div css={contents} key={im.id}>
        <div css={css`
          grid-area: im${i+1};
          position: relative;
          ${center};
        `}
          ref={(value)=>photoFrameRefs.current[i]=value}
        >
          
          
          <div css={contents}
            //ref={ref as any}
            {...function(){
              const onPointerDown = (ev: React.PointerEvent)=>{
                if (ev.buttons===1){
                  ev.currentTarget.releasePointerCapture(ev.pointerId)
                  setLastIdx(i)
                  setDragState('initialDelay')
                  setCanClick(true)
                }
              }
              const onPointerRemove = ()=>{
                if (dragState!=='dragging'){
                  setDragState(undefined)
                }
              }
              return {
                onPointerDown,
                onPointerCancel: onPointerRemove,
                onPointerUp: onPointerRemove,
                onPointerOut: onPointerRemove,
              }
            }()}
            onClick={ev=>{
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
                  return <div css={contents} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <animated.label css={photoDraggableBox}
                      style={springStyle}
                      {...drag(i)}
                      //ref={ref2 as any}
                    >
                      
                      {function(){
                        if (im.compression?.showProgress)
                          return <div css={photoPlaceholderStyle}>
                            <PieProgress css={profilePhotoPieProgress}
                              progress={
                                RangeU.map(im.compression.progress, [0, 100], [5, 95])
                              }
                            />
                          </div>
                        
                        else if (!canShowFetchProgress && im.type === 'remote' && !im.isReady)
                          return <div css={photoPlaceholderStyle}>
                            <SparkingLoadingLine/>
                          </div>
                        else if (im.download?.showProgress)
                          return <div css={photoPlaceholderStyle}>
                            <PieProgress css={profilePhotoPieProgress}
                              progress={
                                RangeU.map(im.download.progress, [0, 100], [5, 95])
                              }
                            />
                          </div>
                        
                        else if (im.isEmpty)
                          return <div css={photoPlaceholderStyle}>
                            <PlusIc css={photoPlaceholderIconStyle}/>
                          </div>
                        else if (im.isReady)
                          return <img css={photoImgStyle}
                            src={im.dataUrl}
                            alt={im.name}
                          />
                        
                      }()}
                      
                      {im.type === 'local' && im.upload?.showProgress &&
                        <div css={photoDimmed}>
                          <PieProgress css={profilePhotoPieProgressAccent}
                            progress={
                              RangeU.map(im.upload.progress, [0, 100], [5, 95])
                            }
                          />
                        </div>
                      }
                      {isDraggingFiles && <>
                        {isDragAccept && <div css={photoDimmed}/>}
                        <div css={photoOnDragBorder}/>
                      </>}
                    
                    </animated.label>
                  </div>
                }}
              </Dropzone>
            
          </div>
          
          
          
          <div css={t=>css`
            ${photoProgressFrameStyle(t)};
            
            ${lastIdx===i && dragState==='progressAnim' && css`
              animation: ${progressAnim} ${progressAnimDuration}ms linear forwards;
            `}
            ${lastIdx===i && !swap && dragState==='dragging' && css`
              background-image: none;
              background-color: ${t.photos.highlightFrameAccentBgc[0]};
            `}
            ${swap?.[1]===i && css`
              background-image: none;
              background-color: ${t.photos.highlightFrameAccentBgc[0]};
            `}
          `}
            onAnimationEnd={ev=>{
              if (ev.animationName===progressAnim.name) {
                setDragState('dragging')
                setCanClick(false)
              }
            }}
          />
          
          
        </div>
        </div>
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
})
export default ProfilePhotos




const radialGradKfs = (t:Theme)=>keyframes`
  0% {
    --rotation: 0turn;
    --grad-color: ${t.photos.highlightFrameBgc[0]};
  }
  100% {
    --rotation: 1.001turn;
    --grad-color: ${t.photos.highlightFrameBgc[0]};
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
  pointer-events: none;
  //user-select: none;
  //touch-action: none;

  width: 100%;
  aspect-ratio: 1;
  object-position: center;
  object-fit: cover;
`



const photoPlaceholderStyle = (t:AppTheme.Theme)=>css`
  ${abs};
  pointer-events: none;
  border-radius: inherit;
  overflow: hidden;
  background: ${t.photos.bgc[0]};
  ${center};
`
const photoDimmed = (t:AppTheme.Theme)=>css`
  ${photoPlaceholderStyle(t)};
  background: #00000099;
`
const photoOnDragBorder = (t:AppTheme.Theme)=>css`
  ${abs};
  inset: -4px;
  border-radius: calc(14px + 4px);
  border: 10px dashed;
  border-color: ${t.photos.borderDrag[0]};
`
const photoPlaceholderIconStyle = (t:AppTheme.Theme)=>css`
  ${SvgIconsStyle.El.icon.thiz()}{
    ${SvgIconsStyle.El.icon.props.color.set(t.photos.content[0])}
    ${SvgIconsStyle.El.icon.props.size.set('30%')}
  }
`
const profilePhotoPieProgress = (t:AppTheme.Theme)=>css`
  ${PieProgressStyle.El.thiz.pieProgress}{
    ${PieProgressStyle.Prop.prop.progressColor}: transparent;
    ${PieProgressStyle.Prop.prop.restColor}:     ${t.photos.content[0]};
    height: 30%;
    aspect-ratio: 1;
  }
`
const profilePhotoPieProgressAccent = (t:AppTheme.Theme)=>css`
  ${profilePhotoPieProgress(t)};
  ${PieProgressStyle.El.thiz.pieProgress}{
    ${PieProgressStyle.Prop.prop.restColor}:     ${t.photos.bgc[0]};
  }
`
const photoProgressFrameStyle = (t:AppTheme.Theme)=>css`
  pointer-events: none;

  ${abs};
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
    initial-value: ${t.photos.highlightFrameBgc[0]};
    inherits: false;
  }

  ${bgcBorderMask};
  background-image: conic-gradient(
    var(--grad-color) 0turn var(--rotation),
    transparent var(--rotation) 1turn
  );
`


















const onFilesSelectedBuilder =
(
  images: ProfilePhoto[],
  lastIdx: number,
  setImages: SetterOrUpdater<ProfilePhoto[]>,
  closeMenu: Callback,
)=>
(files: File[])=>{
  const imgFiles = files.filter(it=>it.type.startsWith('image/'))
  if (imgFiles.length){
    const emptyCnt = images
      .filter((im,i)=>i===lastIdx || (i>=lastIdx && im.isEmpty)).length
    let filesI = 0
    const newImages = images.map((photo,i)=>{
      if (filesI < imgFiles.length &&
        (i===lastIdx ||
          (i>=lastIdx &&
            (imgFiles.length<=emptyCnt ? photo.isEmpty : true)
          )
        )
      ){
        const imgFile = imgFiles[filesI++]
        
        photo.download?.abort()
        photo.compression?.abort()
        
        const abortCtrl = new AbortController()
        const compressionStart = {
          isReady: false,
          compression: { ...DefaultOperation,
            id: uuid.v4(),
            abort: ()=>{
              //console.log('compression was aborted')
              abortCtrl.abort('compression was aborted')
            },
          },
        } satisfies Partial<ProfilePhoto>
        
        const processingPhoto = { ...photo, ...compressionStart }
        
        const updatePhotoNow = (p: Partial<ProfilePhoto>) => {
          setImages(s => findByAndMapTo(s,
            elem => ({ ...elem, ...p }),
            elem => elem.compression?.id===compressionStart.compression.id
          ))
        }
        const updatePhoto = throttle(
          RangeU.map(Math.random(), [0, 1], [1500, 2000]),
          updatePhotoNow
        )
        
        ;(async() => {
          try {
            const progress = new Progress(2, [95, 5])
            const onProgress = (p: number | null) => {
              progress.progress = p??0
              //console.log('progress',progress.value)
              updatePhoto({ compression: {
                  ...compressionStart.compression,
                  progress: progress.value,
                } })
            }
            
            //await wait(10000)
            //throw 'test error'
            
            const compressedFile = await ImageU.compress(imgFile,
              { onProgress, abortCtrl }
            )
            abortCtrl.signal.throwIfAborted()
            
            //console.log('imgFile',imgFile)
            progress.stage++
            progress.progress = 0
            const imgDataUrl = await blobToDataUrl(compressedFile,
              { onProgress, abortCtrl }
            )
            abortCtrl.signal.throwIfAborted()
            
            //console.log('imgDataUrl',imgDataUrl.length)
            //console.log('imgDataUrl',imgDataUrl.substring(0, 1000))
            const mimeType = new DataUrl(imgDataUrl).mimeType
            const newPhoto = {
              ...DefaultProfilePhoto,
              type: 'local',
              id: uuid.v4(),
              remoteIndex: photo.remoteIndex,
              name: trimExtension(imgFile.name),
              mimeType: mimeType,
              dataUrl: imgDataUrl,
              isReady: true,
            } satisfies ProfilePhoto
            setImages(s=>ifFoundByThenReplaceTo(s,
              newPhoto,
              elem=>elem.compression?.id===compressionStart.compression.id
            ))
          }
          catch (ex) {
            // TODO notify about error
            //console.log('compression error', ex)
            //console.log('photo', photo)
            updatePhoto({ compression: undefined })
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

















