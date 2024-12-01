import { useDrag } from '@use-gesture/react'
import { ReactDOMAttributes } from '@use-gesture/react/dist/declarations/src/types'
import { RangeU } from 'src/util/common/RangeU'
import { TypeU } from 'src/util/common/TypeU'
import { useAsRefGet } from 'src/util/react-state/useAsRefGet'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet'
import Puro = TypeU.Puro


// One dimension drag progress
// Хук, который занимается преобразованием позиции пальца в значение и прогресс

/*
 При изменении начального положения трека / ширины трека
 прогресс драгания остаётся неизменным.
 Но при новом драге значения будут считаться так,
 что текущая точка под пальцем осталась неизменной, но относительно неё пропорционально изменяются
 начальное положение пальца и количество value/px
 (происходит автоматически,
 т.к. хранится начальный прогресс и dProgress, которые не привязаны к пикселям).

*/




// dPx -> dProgress -> dValue
const dPxToDProgress = (dPx: number, trackLen: number) => RangeU.map(
  dPx,
  [0, trackLen],
  [0, 100]
)


export type DragEventType = 'start' | 'dragging' | 'end'
export type OnDragProps = {
  spx: number, // start progress x ..0..100..
  spy: number, // start progress y ..0..100..
  dpx: number, // delta progress x ..0..100..
  dpy: number, // delta progress y ..0..100..
  px: number, // progress x ..0..100..
  py: number, // progress y ..0..100..
}
export type OnDragEventProps = OnDragProps & { type: DragEventType }
export type OnDragEvent = (props: OnDragEventProps) => void
export type OnDrag = (props: OnDragProps) => void

export type TrackProps = { x: number, w: number, y: number, h: number }

export type GetTrackProps = () => TrackProps

export type UseSnappedDragP = {
  getTrackProps: GetTrackProps
} & Puro<{
  onDrag: OnDragEvent // onProgress
  onDragStart: OnDrag // onProgressStart
  onDragging: OnDrag // onProgressing
  onDragEnd: OnDrag // onProgressEnd
}>

export const useDragProgress = (props: UseSnappedDragP) => {
  const {
    getTrackProps,
    onDrag: onValueDrag,
    onDragStart: onValueDragStart,
    onDragging: onValueDragging,
    onDragEnd: onValueDragEnd,
  } = props
  
  const [getGetTrackPropsRef] = useAsRefGet(getTrackProps)

  // track start viewport coordinate
  //const [getTrackStart, setTrackStart] = useRefGetSet(0)
  // track length
  //const [getTrackLen, setTrackLen] = useRefGetSet(0)
  
  const [getOnValueDrag] = useAsRefGet(onValueDrag)
  const [getOnValueDragStart] = useAsRefGet(onValueDragStart)
  const [getOnValueDragging] = useAsRefGet(onValueDragging)
  const [getOnValueDragEnd] = useAsRefGet(onValueDragEnd)
  
  
  const [getDragStartProgressX, setDragStartProgressX] = useRefGetSet(0) // ..0..100..
  const [getDragDProgressX, setDragDProgressX] = useRefGetSet(0) // ..0..100..
  
  const [getDragStartProgressY, setDragStartProgressY] = useRefGetSet(0) // ..0..100..
  const [getDragDProgressY, setDragDProgressY] = useRefGetSet(0) // ..0..100..
  
  
  // noinspection JSVoidFunctionReturnValueUsed
  const onTrackDrag = useDrag(
    gesture => {
      const {
        first, active, last,
        xy: [vpx, vpy],
        movement: [mx, my],
        delta: [dx, dy],
        currentTarget,
      } = gesture
      
      // const trackStart = getTrackStart()
      // const trackLen = getTrackLen()
      
      const {
        x: trackStartX,
        w: trackLenX,
        y: trackStartY,
        h: trackLenY,
      } = getGetTrackPropsRef()()
      
      if (first) {
        setDragStartProgressX(0)
        setDragDProgressX(0)
        
        setDragStartProgressY(0)
        setDragDProgressY(0)
        
        const startPxX = vpx - trackStartX
        const dragStartProgressX = dPxToDProgress(startPxX, trackLenX)
        setDragStartProgressX(dragStartProgressX)
        
        const startPxY = vpy - trackStartY
        const dragStartProgressY = dPxToDProgress(startPxY, trackLenY)
        setDragStartProgressY(dragStartProgressY)
      }
      
      const dragCurrDProgressX = dPxToDProgress(dx, trackLenX)
      const dragDProgressX = getDragDProgressX() + dragCurrDProgressX
      setDragDProgressX(dragDProgressX)
      
      const dragCurrDProgressY = dPxToDProgress(dy, trackLenY)
      const dragDProgressY = getDragDProgressY() + dragCurrDProgressY
      setDragDProgressY(dragDProgressY)
      
      const dragProgressX = getDragStartProgressX() + getDragDProgressX()
      
      const dragProgressY = getDragStartProgressY() + getDragDProgressY()
      
      const onDragProps: OnDragProps = {
        spx: getDragStartProgressX(),
        spy: getDragStartProgressY(),
        dpx: getDragDProgressX(),
        dpy: getDragDProgressY(),
        px: getDragStartProgressX() + getDragDProgressX(),
        py: getDragStartProgressY() + getDragDProgressY(),
      }
      if (first) {
        getOnValueDrag()?.({
          ...onDragProps,
          type: 'start',
        })
        getOnValueDragStart()?.({ ...onDragProps })
      }
      if (!first && !last) {
        getOnValueDrag()?.({
          ...onDragProps,
          type: 'dragging',
        })
        getOnValueDragging()?.({ ...onDragProps })
      }
      if (last) {
        getOnValueDrag()?.({
          ...onDragProps,
          type: 'end',
        })
        getOnValueDragEnd()?.({ ...onDragProps })
      }
    }
  ) as () => ReactDOMAttributes
  
  
  return {
    // setTrackStart,
    // setTrackLen,
    onTrackDrag,
  } as const
}


