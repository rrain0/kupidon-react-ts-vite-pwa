import { TypeU } from 'src/util/common/TypeU.ts'
import { useAsCallback } from 'src/util/react-state/useAsCallback.ts'
import { useInterval2 } from 'src/util/react/useInterval2.ts'
import Callback = TypeU.Callback



export const useAutoRetry = (
  retryCallback: Callback, // supports not stable
  needRetry = false,
  { interval = 4000 } = { },
) => {
  const retryCbStable = useAsCallback(retryCallback)
  useInterval2({ offset: interval, interval, disabled: !needRetry }, retryCbStable)
}

