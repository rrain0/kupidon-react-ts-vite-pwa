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
export type OnDragWithEventType = (
  progressX: number, /* ..0..100.. */
  progressY: number, /* ..0..100.. */
  type: DragEventType,
) => void
export type OnDrag = (
  progressX: number, /* ..0..100.. */
  progressY: number, /* ..0..100.. */
) => void

export type TrackProps = { x: number, w: number, y: number, h: number }

export type GetTrackProps = () => TrackProps

export type UseSnappedDragP = {
  getTrackProps: GetTrackProps
} & Puro<{
  onDrag: OnDragWithEventType // onProgress
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
  const [getDragProgressX, setDragProgressX] = useRefGetSet(0) // ..0..100..
  
  const [getDragStartProgressY, setDragStartProgressY] = useRefGetSet(0) // ..0..100..
  const [getDragProgressY, setDragProgressY] = useRefGetSet(0) // ..0..100..
  
  
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
        setDragProgressX(0)
        
        setDragStartProgressY(0)
        setDragProgressY(0)
        
        const startPxX = vpx - trackStartX
        const dragStartProgressX = dPxToDProgress(startPxX, trackLenX)
        setDragStartProgressX(dragStartProgressX)
        
        const startPxY = vpy - trackStartY
        const dragStartProgressY = dPxToDProgress(startPxY, trackLenY)
        setDragStartProgressY(dragStartProgressY)
      }
      
      const dProgressX = dPxToDProgress(dx, trackLenX)
      const dragProgressX = getDragProgressX() + dProgressX
      setDragProgressX(dragProgressX)
      
      const dProgressY = dPxToDProgress(dy, trackLenY)
      const dragProgressY = getDragProgressY() + dProgressY
      setDragProgressY(dragProgressY)
      
      const valueProgressX = getDragStartProgressX() + getDragProgressX()
      
      const valueProgressY = getDragStartProgressY() + getDragProgressY()
      
      if (first) {
        getOnValueDrag()?.(valueProgressX, valueProgressY, 'start')
        getOnValueDragStart()?.(valueProgressX, valueProgressY)
      }
      if (!first && !last) {
        getOnValueDrag()?.(valueProgressX, valueProgressY, 'dragging')
        getOnValueDragging()?.(valueProgressX, valueProgressY)
      }
      if (last) {
        getOnValueDrag()?.(valueProgressX, valueProgressY, 'end')
        getOnValueDragEnd()?.(valueProgressX, valueProgressY)
      }
    }
  ) as () => ReactDOMAttributes
  
  
  return {
    // setTrackStart,
    // setTrackLen,
    onTrackDrag,
  } as const
}


