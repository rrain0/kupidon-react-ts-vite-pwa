import { useCallback, useEffect } from 'react'
import { ArrayU } from 'src/util/common/ArrayU'
import { RangeU } from 'src/util/common/RangeU'
import { TypeU } from 'src/util/common/TypeU'
import { useAsRefGet } from 'src/util/react-state/useAsRefGet'
import { useMemoCompare } from 'src/util/react-state/useMemoCompare'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet'
import NumRangeRo = RangeU.NumRangeRo
import Setter = TypeU.Setter
import zeroBasedRange = RangeU.zeroBased
import Puro = TypeU.Puro


// dProgress -> dValue
const dProgressToDValue = (dProgress: number, minMax: NumRangeRo) => RangeU.map(
  dProgress,
  [0, 100],
  zeroBasedRange(minMax)
)

// progress -> value
const progressToValue = (progress: number, minMax: NumRangeRo) =>
  minMax[0] + dProgressToDValue(progress, minMax)


const defaultMinMax: NumRangeRo = [0, 1]



export type UseProgressToValueProps = {
  setValue: Setter<number>
} & Puro<{
  minMax: NumRangeRo
}>

export const useProgressToValue = (props: UseProgressToValueProps, deps: any[] = []) => {
  const {
    minMax: rawMinMax = defaultMinMax,
    setValue,
  } = props
  
  const minMax = useMemoCompare(rawMinMax, ArrayU.eq)
  const [getMinMax] = useAsRefGet(minMax)
  
  const [getProgress, setProgress] = useRefGetSet(0)
  
  const updateProgress = useCallback((progress: number) => {
    setProgress(progress)
    setValue(progressToValue(progress, getMinMax()))
  }, [])
  
  useEffect(() => {
    setValue(progressToValue(getProgress(), minMax))
  }, [minMax, ...deps])
  
  return updateProgress
}



