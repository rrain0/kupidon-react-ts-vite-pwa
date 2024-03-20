/** @jsxImportSource @emotion/react */
import React, { useRef, useState } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { atom, useRecoilState, useRecoilValue } from 'recoil'
import { Pages } from 'src/components/Page/Pages'
import SimplePage = Pages.SimplePage
import SimpleContent = Pages.SimpleContent





/*
!!!!!
React will render only InputComponent & ViewComponent BUT theirs parent
because of state provided via Recoil.
*/



type StateTestPageRecoilType = string
const StateTestPageRecoil = atom<StateTestPageRecoilType>({
  key: 'StateTestPage',
  default: '',
})



const InputComponent =
React.memo(()=>{
  const [state, setState] = useRecoilState(StateTestPageRecoil)
  return <input css={css`
    color: black;
  `}
    value={state}
    onChange={ev=>setState(ev.target.value)}
  />
})

const ViewComponent =
React.memo(()=>{
  const state = useRecoilValue(StateTestPageRecoil)
  return <div>{state}</div>
})




const StateTestPage =
React.memo(
()=>{
  
  
  
  return <SimplePage>
    <SimpleContent> {/* not renders */}
      
      <div>State Test</div>
        
      <InputComponent/> {/* renders */}
      <ViewComponent/> {/* renders */}
      
    </SimpleContent>
  </SimplePage>
})
export default StateTestPage






