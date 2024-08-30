import { animated, useSpring } from '@react-spring/web'
import React, { useState } from 'react'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import { getElemProps } from 'src/util/element/ElemProps'
import { useResize } from 'src/util/element/useResize'
import { useBool } from 'src/util/react-state/useBool'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet'


/*
TODO - Combine 3 hooks in one.
       If you need another ref, then use ref={combineRefs(setElem, elemRef)}
 */

const ElemRefTestPage = () => {
  
  const [cnt, setCnt] = useState(0)
  
  const [isSourceDivReady, , , toggleSourceDivReady] = useBool(false)
  
  const [isConnectedDivReady, setConnectedDivReady, setConnectedDivNotReady] = useBool(isSourceDivReady)
  
  const [spring, springApi] = useSpring(() => ({ w: 0, h: 0 }))
  const updateElem = useResize(elem => {
    if (!elem) {
      setConnectedDivNotReady()
      springApi.set({ w: 0, h: 0 })
    }
    else {
      setConnectedDivReady()
      springApi.set(getElemProps(elem).wh)
    }
  })
  const [getElem, setElem, refElem] = useRefGetSet<HTMLElement | null>(null, elem => {
    console.log('onSetElem', elem)
    updateElem(elem)
  })
  
  console.log('rerender !!!')
  
  return (
    <Pages.SimplePage>
      <Pages.ContentFill>
        
        <div>Element Ref Test</div>
        
        <div>count: {cnt}</div>
        <button onClick={() => setCnt(cnt + 1)}>count ++</button>
        
        <button onClick={toggleSourceDivReady}>Toggle Source Div</button>
        
        {!isSourceDivReady && 'Source Div is not ready'}
        {isSourceDivReady && <div
          style={{ width: '50%', height: '200px', background: 'aquamarine' }}
          ref={setElem}
        >
          Source div.<br/>
          Resize window to change element's dimensions.<br/>
          And it will trigger resizing of Connected div WITHOUT RERENDER.
        </div>}
        
        {isConnectedDivReady && <animated.div
          style={{
            // @ts-expect-error
            width: spring.w,
            height: spring.h,
            background: 'aqua',
          }}
        >
          Connected div
        </animated.div>}
      
      </Pages.ContentFill>
    </Pages.SimplePage>
  )
}
export default ElemRefTestPage




