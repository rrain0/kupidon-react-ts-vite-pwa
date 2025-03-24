import { useCallback } from 'react'
import { RangeU } from 'src/util/common/RangeU.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import { useAsRefGet } from 'src/util/react-state/useAsRefGet.ts'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet.ts'
import Getter = TypeU.Getter


/*
  Хук, который занимается преобразованием позиции пальца в прогресс драгания.
  
  При изменении начального положения трека / ширины трека
  прогресс драгания остаётся неизменным.
  Но при новом драге значения будут считаться так,
  что текущая точка под пальцем осталась неизменной, но относительно неё пропорционально изменяются
  начальное положение пальца и количество value/px
  Это происходит автоматически,
  т.к. хранится начальный прогресс (startProgress) и текущий прогресс (currProgress),
  которые не привязаны к пикселям.
*/


// dPx -> dProgress -> dValue
const dPxToDProgress = (dPx: number, trackLen: number) => RangeU.map(
  dPx,
  [0, trackLen],
  [0, 100]
)



export type TrackProps = { x: number, y: number, w: number, h: number }
export type GetTrackProps = Getter<TrackProps>

export type UseDragProgressProps = {
  getTrackProps: GetTrackProps
}

export type UpdateDragProgressProps = {
  first: boolean
  vpx: number
  vpy: number
  dx: number
  dy: number
}

export const useDragProgress = (props: UseDragProgressProps) => {
  const { getTrackProps } = props
  
  const [getGetTrackPropsRef] = useAsRefGet(getTrackProps)
  
  const [getDragStartProgressX, setDragStartProgressX] = useRefGetSet(0) // ..0..100..
  const [getDragCurrProgressX, setDragCurrProgressX] = useRefGetSet(0) // ..0..100..
  
  const [getDragStartProgressY, setDragStartProgressY] = useRefGetSet(0) // ..0..100..
  const [getDragCurrProgressY, setDragCurrProgressY] = useRefGetSet(0) // ..0..100..
  
  
  const updateDragProgress = useCallback((props: UpdateDragProgressProps) => {
    const { first, vpx, vpy, dx, dy } = props
    
    const {
      x: trackStartX,
      y: trackStartY,
      w: trackLenX,
      h: trackLenY,
    } = getGetTrackPropsRef()()
    
    if (first) {
      setDragStartProgressX(0)
      setDragCurrProgressX(0)
      
      setDragStartProgressY(0)
      setDragCurrProgressY(0)
      
      const startPxX = vpx - trackStartX
      const dragStartProgressX = dPxToDProgress(startPxX, trackLenX)
      setDragStartProgressX(dragStartProgressX)
      
      const startPxY = vpy - trackStartY
      const dragStartProgressY = dPxToDProgress(startPxY, trackLenY)
      setDragStartProgressY(dragStartProgressY)
    }
    
    const dragCurrDProgressX = dPxToDProgress(dx, trackLenX)
    const dragDProgressX = getDragCurrProgressX() + dragCurrDProgressX
    setDragCurrProgressX(dragDProgressX)
    
    const dragCurrDProgressY = dPxToDProgress(dy, trackLenY)
    const dragDProgressY = getDragCurrProgressY() + dragCurrDProgressY
    setDragCurrProgressY(dragDProgressY)
    
  }, [])
  
  return {
    updateDragProgress,
    getDragStartProgressX,
    getDragCurrProgressX,
    getDragStartProgressY,
    getDragCurrProgressY,
  } as const
}


