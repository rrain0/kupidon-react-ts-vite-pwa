
import { useAsCallback } from 'src/utils/state/react/base/useAsCallback.ts'
import { useInterval2 } from 'src/utils/react/useInterval2.ts'
import { Cb } from 'src/utils/base/typeUtils.ts'



export const useAutoRetry = (
  needRetry = false,
  { interval = 4000 } = { },
  retry: Cb, // supports not stable
) => {
  const retryCbStable = useAsCallback(retry)
  useInterval2({ offset: interval, interval, disabled: !needRetry }, retryCbStable)
}

