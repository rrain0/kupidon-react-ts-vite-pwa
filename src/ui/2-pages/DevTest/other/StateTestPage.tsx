import React, { useEffect } from 'react'
import { css } from '@emotion/react'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import { create } from 'zustand'





/*
!!!!!
React will render only InputComponent & ViewComponent BUT theirs parent
because of state provided via Recoil.
*/



type StateTestPageZustand = string
const useStateTestPageZustand = create<StateTestPageZustand>(() => '')




const InputComponent = React.memo(() => {
  const state = useStateTestPageZustand()
  const setState = useStateTestPageZustand.setState
  return (
    <input
      css={css`color: black;`}
      value={state}
      onChange={ev => setState(ev.target.value)}
    />
  )
})

const ViewComponent = React.memo(() => {
  const state = useStateTestPageZustand()
  return <div>{state}</div>
})




const StateTestPage = React.memo(() => {
  
  return (
    <Pages.Page>
      <Pages.Content> {/* not renders */}
        
        <div>State Test</div>
        
        <InputComponent/> {/* renders */}
        <ViewComponent/> {/* renders */}
        
        {/* useEffect order test */}
        <UseEffectComponent/>
        
      </Pages.Content>
    </Pages.Page>
  )
})
export default StateTestPage





// useEffect order test
const UseEffectComponent = React.memo(() => {
  useEffect(() => {
    // № 2
    console.log('useEffect of UseEffectComponent')
    // № 4
    return () => console.log('useEffect cleanup of UseEffectComponent')
  }, [])
  return <UseEffectNestedComponent/>
})
const UseEffectNestedComponent = React.memo(() => {
  useEffect(() => {
    // № 1
    console.log('useEffect of UseEffectNestedComponent')
    // № 3
    return () => console.log('useEffect cleanup of UseEffectNestedComponent')
  }, [])
  return undefined
})



