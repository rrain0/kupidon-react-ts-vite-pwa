import React from 'react'
import styled from '@emotion/styled'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import PageContentLayout from 'src/ui/components/Pages/PageContentLayout.tsx'
import PageLayout from 'src/ui/components/Pages/PageLayout.tsx'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import flexC = EmotionCommon.flexC





// React Portal Test
// But component that is moved is rerendering anyway :(
// https://react.dev/reference/react-dom/createPortal
const MoveElementToAnotherViewTestPage = () => {
  
  
  const [position, setPosition] = useState(0)
  
  const container1 = useRef<HTMLDivElement>(null)
  const container2 = useRef<HTMLDivElement>(null)
  
  
  return (
    <PageLayout col css={{ '*': { userSelect: 'text' } }}>
      <PageContentLayout col>
      
        <button
          onClick={() => setPosition(position === 0 ? 1 : 0)}
        >
          Move element to another view
        </button>
        
        <Container ref={container1}></Container>
        
        <Container ref={container2}></Container>
        
        {/* if container changes - then content recreated !!! */}
        { container1.current && container2.current && (
          <>
            {createPortal(
              <Rectange/>,
              position === 0 ? container1.current! : container2.current!
            )}
          </>
        )}
      
      </PageContentLayout>
    </PageLayout>
  )
}
MoveElementToAnotherViewTestPage.displayName = 'MoveElementToAnotherViewTestPage'
export default MoveElementToAnotherViewTestPage



const Container = styled.div`
  ${flexC};
  padding: 50px;
`

const Rectange = styled.div`
  @keyframes rotate {
    from { rotate: 0turn }
    to { rotate: 1turn }
  }
  width: 200px;
  height: 100px;
  background: #34aadc;
  animation: rotate 3s linear infinite;
`
