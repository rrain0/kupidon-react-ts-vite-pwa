import React, { useRef } from 'react'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar.tsx'
import { Pages } from 'src/ui/components/Pages/Pages.ts'



const ShadowDOMTestPage = React.memo(() => {
  
  
  const shadowDivRef = useRef<HTMLDivElement>(null)
  
  
  return (
    <>
      <Pages.SimplePage>
        <Pages.ContentFill>
          
          <div>Shadow DOM Test</div>
          
          <div
            style={{ width: 200, height: 200, background: 'aquamarine' }}
            
            onPointerDown={ev => {
              console.log('div onPointerDown #', ev.pointerId)
            }}
            
            onPointerEnter={ev => {
              //console.log('div onPointerEnter #', ev.pointerId)
            }}
            onPointerLeave={ev => {
              //console.log('div onPointerLeave #', ev.pointerId)
            }}
            onPointerOut={ev => {
              //console.log('div onPointerOut #', ev.pointerId)
            }}
            onPointerOver={ev => {
              //console.log('div onPointerOver #', ev.pointerId)
            }}
            onPointerMove={ev => {
              //console.log('div onPointerMove #', ev.pointerId)
            }}
            
            onPointerCancel={ev => {
              console.log('div onPointerCancel #', ev.pointerId)
            }}
            onPointerUp={ev => {
              console.log('div onPointerUp #', ev.pointerId)
            }}
            
            onClick={ev => {
              console.log('div onClick')
            }}
          >
            
            <template>
              <div
                style={{ display: 'none' }}
                ref={shadowDivRef}
                
                onPointerDown={ev => {
                  console.log('shadow div onPointerDown #', ev.pointerId)
                }}
                onPointerCancel={ev => {
                  console.log('shadow div onPointerCancel #', ev.pointerId)
                }}
                onPointerUp={ev => {
                  console.log('shadow div onPointerUp #', ev.pointerId)
                }}
                onClick={ev => {
                  console.log('shadow div onClick')
                }}
              />
            </template>
            
            <button
              style={{ width: '50%', height: '50%' }}
              
              onPointerDown={ev => {
                console.log('button onPointerDown #', ev.pointerId)
                const shadowDiv = shadowDivRef.current
                if (shadowDiv) {
                  shadowDiv.setPointerCapture(ev.pointerId)
                }
              }}
            >
              Test
            </button>
          
          </div>
        
        </Pages.ContentFill>
      </Pages.SimplePage>
      
      <BottomButtonBar settingsBtn />
    </>
  )
})
export default ShadowDOMTestPage


