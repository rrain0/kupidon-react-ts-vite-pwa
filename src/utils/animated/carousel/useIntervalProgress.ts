import { rangeMap } from 'src/utils/base/math/rangeUtils.ts'
import { useAsCallback } from 'src/utils/react/state/useAsCallback.ts'
import { useRefGetSet } from 'src/utils/react/state/useRefGetSet.ts'
import { Getter } from 'src/utils/base/math/typeUtils.ts'
import { Pu } from 'src/utils/base/math/typeUtils.ts'
import { isdef } from 'src/utils/base/math/typeUtils.ts'



/*
  Хук, который занимается преобразованием абсолютного значения в прогресс.
  
  При изменении начального положения интервала / ширины интервала прогресс остаётся неизменным.
  Но при новом dValue значения будут считаться так,
  что текущее абсолютное значение осталось неизменным,
  но относительно него пропорционально изменяются
  начальное значение и количество progress/value
  Это происходит автоматически,
  т.к. хранится начальный прогресс (startProgress) и текущий прогресс (deltaProgress),
  которые не привязаны к value.
*/


export type IntervalProps = { start: number, len: number }

export type UseDragProgressProps = {
  getIntervalProps: Getter<IntervalProps>
}

export const useIntervalProgress = ({
  getIntervalProps, // supports not stable
}: UseDragProgressProps) => {
  
  const [getIntervalStartProgress, setIntervalStartProgress] =
    useRefGetSet(0) // ..0..100..
  const [getIntervalDeltaProgress, setIntervalDeltaProgress] =
    useRefGetSet(0) // ..0..100..
  
  
  const updateIntervalProgress = useAsCallback(({
    value, dValue, valueProgress, dValueProgress,
  }: UpdateDragProgressProps) => {
    
    const { start, len } = getIntervalProps()
    
    if (isdef(value) || isdef(valueProgress)) {
      setIntervalStartProgress(0)
      setIntervalDeltaProgress(0)
      
      const startValue = (value ?? 0) - start
      const intervalStartProgress = dValueToDProgress(startValue, len) + (valueProgress ?? 0)
      setIntervalStartProgress(intervalStartProgress)
    }
    
    const intervalDProgress = dValueToDProgress((dValue ?? 0), len)
    const intervalDeltaProgress =
      getIntervalDeltaProgress() + intervalDProgress + (dValueProgress ?? 0)
    setIntervalDeltaProgress(intervalDeltaProgress)
  })
  
  return {
    updateIntervalProgress, // stable
    getIntervalStartProgress, // stable
    getIntervalDeltaProgress, // stable
  } as const
}





// dValue -> dProgress
const dValueToDProgress = (dValue: number, len: number) => rangeMap(
  dValue, [0, len], [0, 100]
)



export type UpdateDragProgressProps = Pu<{
  value: number
  dValue: number
  valueProgress: number
  dValueProgress: number
}>

