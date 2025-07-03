import React, { useRef } from 'react'
import BottomFloatingBar from 'src/ui/components/screen-bars/BottomFloatingBar.tsx'
import PageContentLayout from 'src/ui/components/page/PageContentLayout'
import PageLayout from 'src/ui/components/page/PageLayout'



const ShadowDOMTestPage = React.memo(() => {
  
  
  const shadowDivRef = useRef<HTMLDivElement>(null)
  
  
  return (
    <>
      <PageLayout col css={{ '*': { userSelect: 'text' } }}>
        <PageContentLayout col>
          
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
        
        </PageContentLayout>
      </PageLayout>
      
      <BottomFloatingBar settingsButton/>
    </>
  )
})
ShadowDOMTestPage.displayName = 'ShadowDOMTestPage'
export default ShadowDOMTestPage


