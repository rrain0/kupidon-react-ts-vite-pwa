import React from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { useEvent } from 'src/util/react/useEvent'
import center = EmotionCommon.center





const UseEventTest = () => {
  
  const [counter, setCounter] = useState(0)
  
  useEvent(() => {
    console.log('counter', counter)
    return () => console.log('counter cleanup', counter)
  }, [counter], true)
  
  
  return (
    <Pages.SimplePage>
      <Pages.ContentFill>
        
        
        <button
          onClick={() => setCounter(counter + 1)}
        >
          Trigger rerender
        </button>
        
        <div>counter: {counter}</div>
        
      
      </Pages.ContentFill>
    </Pages.SimplePage>
  )
}
export default UseEventTest

