import React, { useEffect } from 'react'
import { useState } from 'react'
import { useEvent } from '@util/react/useEvent.ts'
import PageContentLayout from 'src/ui/components/page/PageContentLayout'
import PageLayout from 'src/ui/components/page/PageLayout'





const UseEventTestPage = () => {
  
  
  
  return (
    <PageLayout col css={{ '*': { userSelect: 'text' } }}>
      <PageContentLayout col>
        
        <UseEventTest1/>
        
        <UseEventTest2/>
      
      </PageContentLayout>
    </PageLayout>
  )
}
UseEventTestPage.displayName = 'UseEventTestPage'
export default UseEventTestPage



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

