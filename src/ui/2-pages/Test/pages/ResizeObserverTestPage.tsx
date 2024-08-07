import React, { useLayoutEffect, useRef, useState } from 'react'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import col = EmotionCommon.col
import { css } from '@emotion/react'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonStyle } from 'src/ui/0-elements/buttons/Button/ButtonStyle.ts'





const ResizeObserverTestPage = ()=>{
  
  const [resizeCnt1, setResizeCnt1] = useState(0)
  const [items1, setItems1] = useState([...Array(6).keys()])
  const container1Ref = useRef<HTMLDivElement>(null)
  
  
  useLayoutEffect(()=>{
    const container = container1Ref.current
    if (container){
      const resizeObserver = new ResizeObserver(()=>{
        // works when observer was created & when scrollbar appears
        console.log('element 1 was resized')
        setResizeCnt1(s=>s+1)
      })
      resizeObserver.observe(container)
      return ()=>resizeObserver.disconnect()
    }
  },[container1Ref.current])
  
  const addItem1 = ()=>{
    setItems1([...items1, items1.length])
  }
  
  
  
  
  
  const [resizeCnt2, setResizeCnt2] = useState(0)
  const [items2, setItems2] = useState([...Array(6).keys()])
  const container2Ref = useRef<HTMLDivElement>(null)
  
  useLayoutEffect(()=>{
    const container = container2Ref.current
    if (container){
      const resizeObserver = new ResizeObserver(()=>{
        // works when observer was created & after adding something
        console.log('element 2 was resized')
        setResizeCnt2(s=>s+1)
      })
      resizeObserver.observe(container)
      return ()=>resizeObserver.disconnect()
    }
  },[container2Ref.current])
  
  const addItem2 = ()=>{
    setItems2([...items2, items2.length])
  }
  
  
  return <Pages.SimplePage>
    <Pages.ContentFill>
      
      <div>Resize Observer Test Page</div>
      
      <Button css={ButtonStyle.filledRectBigMain}
        onClick={() => addItem1()}
      >
        +1
      </Button>
      
      <div>Count of container resizes: {resizeCnt1}</div>
      
      <div
        css={t => css`
          width: 400px;
          //height: fit-content;
          height: 400px;
          ${col};
          gap: 20px;
          padding: 20px;
          ${(()=>{
            const bgLight = ['#ffb6c1','#f5f5f5','#d8701a']
            const bgDark =  ['#992c46','#282c34','#994500']
            const bg = t.type==='dark' ? bgDark : bgLight
            return css`
                background: linear-gradient(
                        to bottom right,
                        ${bg[0]} 0%,
                        ${bg[1]} 50%,
                        ${bg[2]} 100%
                );
              `
          })()};
          overflow: auto;
        `}
        ref={container1Ref}
      >
        {items1.map(it => <div
          css={css``}
          key={it}
        >
          Item {it}
        </div>)}
      </div>
      
      
      <Button css={ButtonStyle.filledRectBigMain}
        onClick={() => addItem2()}
      >
        +1
      </Button>
      
      <div>Count of container resizes: {resizeCnt2}</div>
      
      <div
        css={t => css`
          width: 400px;
          height: fit-content;
          ${col};
          gap: 20px;
          padding: 20px;
          ${(()=>{
            const bgLight = ['#ffb6c1','#f5f5f5','#d8701a']
            const bgDark =  ['#992c46','#282c34','#994500']
            const bg = t.type==='dark' ? bgDark : bgLight
            return css`
                background: linear-gradient(
                        to bottom right,
                        ${bg[0]} 0%,
                        ${bg[1]} 50%,
                        ${bg[2]} 100%
                );
              `
          })()};
        `}
        ref={container2Ref}
      >
        {items2.map(it => <div
          css={css``}
          key={it}
        >
          Item {it}
        </div>)}
      </div>
      
    </Pages.ContentFill>
  </Pages.SimplePage>
}
export default ResizeObserverTestPage


