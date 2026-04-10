import { AppTheme } from 'src/styles/themes/AppTheme.ts'
import { useAsCallback } from 'src/utils/react/state/base/useAsCallback.ts'
import { useAppZustand } from 'src/zustand/app/appZustand.ts'



export const useSetAppTheme = () => (
  useAsCallback((theme: AppTheme.Theme) => useAppZustand.setState({ theme }))
)


