import { RangeU } from 'src/util/common/RangeU.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import { useAsCallback } from 'src/util/react-state/useAsCallback.ts'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet.ts'
import Getter = TypeU.Getter
import Pu = TypeU.Pu



/*
  Хук, который занимается преобразованием абсолбтного значения в прогресс.
  
  При изменении начального положения интервала / ширины интервала прогресс остаётся неизменным.
  Но при новом dValue значения будут считаться так,
  что текущее абсолютное значение осталось неизменным, но относительно него пропорционально изменяются
  начальное значение и количество progress/value
  Это происходит автоматически,
  т.к. хранится начальный прогресс (startProgress) и текущий прогресс (deltaProgress),
  которые не привязаны к value.
*/



// dValue -> dProgress
const dValueToDProgress = (dValue: number, len: number) => RangeU.map(
  dValue, [0, len], [0, 100]
)



export type IntervalProps = { start: number, len: number }

export type UseDragProgressProps = {
  getIntervalProps: Getter<IntervalProps>
}

export type UpdateDragProgressProps = Pu<{
  reset: boolean
  value: number
  dValue: number
}>

export const useIntervalProgress = ({
  getIntervalProps,
}: UseDragProgressProps) => {
  
  const [getIntervalStartProgress, setIntervalStartProgress] = useRefGetSet(0) // ..0..100..
  const [getIntervalDeltaProgress, setIntervalDeltaProgress] = useRefGetSet(0) // ..0..100..
  
  
  const updateIntervalProgress = useAsCallback((props: UpdateDragProgressProps) => {
    const { reset = false, value = 0, dValue = 0 } = props
    
    const { start, len } = getIntervalProps()
    
    if (reset) {
      setIntervalStartProgress(0)
      setIntervalDeltaProgress(0)
      
      const startValue = value - start
      const intervalStartProgress = dValueToDProgress(startValue, len)
      setIntervalStartProgress(intervalStartProgress)
    }
    
    const intervalDProgress = dValueToDProgress(dValue, len)
    const intervalDeltaProgress = getIntervalDeltaProgress() + intervalDProgress
    setIntervalDeltaProgress(intervalDeltaProgress)
  })
  
  return {
    updateIntervalProgress,
    getIntervalStartProgress,
    getIntervalDeltaProgress,
  } as const
}


