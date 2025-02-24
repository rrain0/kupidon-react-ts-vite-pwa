import React, { useMemo } from 'react'
import { UiValues } from 'src/mini-libs/ui-text/UiText.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'


const uiVals = {
  green: {
    'ru-RU': 'Зелёный',
  },
} satisfies UiValues


const MyComponent = React.memo(() => {
  
  const dynamicUiVals = {
    title: {
      'ru-RU': 'Название',
    },
  } satisfies UiValues
  
  const uiValues = useMemo(() => ({
    green: uiVals.green,
    title: dynamicUiVals.title,
  }), [dynamicUiVals])
  
  const uiText = useUiValues(uiValues)
    
  return (
    <div
      data-display-name="MyComponent"
    >
    
    </div>
  )
})
MyComponent.displayName = 'MyComponent'
// export default MyComponent

