
import { useAsCallback } from 'src/utils/react/state/useAsCallback.ts'
import { useInterval2 } from 'src/utils/react/useInterval2.ts'
import { Callback } from 'src/utils/base/TypeUtils.ts'



export const useAutoRetry = (
  needRetry = false,
  { interval = 4000 } = { },
  retry: Callback, // supports not stable
) => {
  const retryCbStable = useAsCallback(retry)
  useInterval2({ offset: interval, interval, disabled: !needRetry }, retryCbStable)
}

