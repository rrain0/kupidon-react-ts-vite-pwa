import { TypeU } from 'src/util/common/TypeU.ts'
import { useAsCallback } from 'src/util/react-state/useAsCallback.ts'
import { useInterval2 } from 'src/util/react/useInterval2.ts'
import Callback = TypeU.Callback



export const useAutoRetry = (
  needRetry = false,
  { interval = 4000 } = { },
  retryCallback: Callback, // supports not stable
) => {
  const retryCbStable = useAsCallback(retryCallback)
  useInterval2({ offset: interval, interval, disabled: !needRetry }, retryCbStable)
}

