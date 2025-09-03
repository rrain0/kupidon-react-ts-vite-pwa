import React, { useMemo } from 'react'
import { UiValues } from '@libs/ui-text/UiText.ts'
import { useUiValues } from '@libs/ui-text/useUiText.ts'


const staticUiValues = {
  green: {
    'ru-RU': 'Зелёный',
    'en-US': 'Green',
  },
} satisfies UiValues


const MyComponent = React.memo(() => {
  
  const dynamicUiVals = {
    title: {
      'ru-RU': 'Название',
    },
  } satisfies UiValues
  
  const uiValues = useMemo(() => ({
    green: staticUiValues.green,
    title: dynamicUiVals.title,
  }), [dynamicUiVals])
  const uiText = useUiValues(uiValues)
    
  return (
    <div
      data-display-name='MyComponent'
    >
    
    </div>
  )
})
MyComponent.displayName = 'MyComponent'
// export default MyComponent

