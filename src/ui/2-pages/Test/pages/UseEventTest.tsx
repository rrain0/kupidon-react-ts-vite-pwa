import React, { useEffect } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { useEvent } from 'src/util/react/useEvent'
import center = EmotionCommon.center





const UseEventTest = () => {
  
  
  
  return (
    <Pages.SimplePage>
      <Pages.ContentFill>
        
        <UseEventTest1 />
        
        <UseEventTest2 />
      
      </Pages.ContentFill>
    </Pages.SimplePage>
  )
}
export default UseEventTest



const UseEventTest1 = () => {
  const [counter, setCounter] = useState(0)
  
  useEvent(() => {
    console.log('counter', counter)
    return () => console.log('counter cleanup', counter)
  }, [counter], true)
  
  return (
    <>
      <button
        onClick={() => setCounter(counter + 1)}
      >
        counter++
      </button>
      
      <div>counter: {counter}</div>
    </>
  )
}

const UseEventTest2 = () => {
  const [bool, setBool] = useState(false)
  
  useEffect(() => {
    console.log('useEffect setBool(true)')
    setBool(true)
  }, [])
  
  useEvent(() => {
    if (bool) {
      console.log('useEvent setBool(false)')
      setBool(false)
    }
  }, [bool], true)
  
  return (
    <>
      <button
        onClick={() => setBool(!bool)}
      >
        Invert bool
      </button>
      
      <div>bool: {`${bool}`}</div>
    </>
  )
}

