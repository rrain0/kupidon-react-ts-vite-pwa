import { RangeU } from 'src/util/common/RangeU.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import { useAsCallback } from 'src/util/react-state/useAsCallback.ts'
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
  т.к. хранится начальный прогресс (startProgress) и текущий прогресс (deltaProgress),
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

// TODO extract x,y and rename to useTrackProgress
export const useDragProgress = ({
  getTrackProps,
}: UseDragProgressProps) => {
  
  const [getDragStartProgressX, setDragStartProgressX] = useRefGetSet(0) // ..0..100..
  const [getDragDeltaProgressX, setDragDeltaProgressX] = useRefGetSet(0) // ..0..100..
  
  const [getDragStartProgressY, setDragStartProgressY] = useRefGetSet(0) // ..0..100..
  const [getDragDeltaProgressY, setDragDeltaProgressY] = useRefGetSet(0) // ..0..100..
  
  
  const updateDragProgress = useAsCallback((props: UpdateDragProgressProps) => {
    const { first, vpx, vpy, dx, dy } = props
    
    const {
      x: trackStartX,
      y: trackStartY,
      w: trackLenX,
      h: trackLenY,
    } = getTrackProps()
    
    if (first) {
      setDragStartProgressX(0)
      setDragDeltaProgressX(0)
      
      setDragStartProgressY(0)
      setDragDeltaProgressY(0)
      
      const startPxX = vpx - trackStartX
      const dragStartProgressX = dPxToDProgress(startPxX, trackLenX)
      setDragStartProgressX(dragStartProgressX)
      
      const startPxY = vpy - trackStartY
      const dragStartProgressY = dPxToDProgress(startPxY, trackLenY)
      setDragStartProgressY(dragStartProgressY)
    }
    
    const dragDProgressX = dPxToDProgress(dx, trackLenX)
    const dragDeltaProgressX = getDragDeltaProgressX() + dragDProgressX
    setDragDeltaProgressX(dragDeltaProgressX)
    
    const dragDProgressY = dPxToDProgress(dy, trackLenY)
    const dragDeltaProgressY = getDragDeltaProgressY() + dragDProgressY
    setDragDeltaProgressY(dragDeltaProgressY)
  })
  
  return {
    updateDragProgress,
    getDragStartProgressX,
    getDragDeltaProgressX,
    getDragStartProgressY,
    getDragDeltaProgressY,
  } as const
}


