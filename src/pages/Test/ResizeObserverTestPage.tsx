/** @jsxImportSource @emotion/react */
import React, { useLayoutEffect, useRef, useState } from 'react'
import { Pages } from 'src/components/Page/Pages'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import col = EmotionCommon.col
import { css } from '@emotion/react'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import SimplePage = Pages.SimplePage
import SimpleContent = Pages.SimpleContent





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
  
  
  return <SimplePage>
    <SimpleContent>
      
      <div>Resize Observer Test Page</div>
      
      <Button css={ButtonStyle.bigRectMain}
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
            const bgcLight = ['#ffb6c1','#f5f5f5','#d8701a']
            const bgcDark =  ['#992c46','#282c34','#994500']
            const bgc = t.type==='dark' ? bgcDark : bgcLight
            return css`
                background: linear-gradient(
                        to bottom right,
                        ${bgc[0]} 0%,
                        ${bgc[1]} 50%,
                        ${bgc[2]} 100%
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
      
      
      <Button css={ButtonStyle.bigRectMain}
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
            const bgcLight = ['#ffb6c1','#f5f5f5','#d8701a']
            const bgcDark =  ['#992c46','#282c34','#994500']
            const bgc = t.type==='dark' ? bgcDark : bgcLight
            return css`
                background: linear-gradient(
                        to bottom right,
                        ${bgc[0]} 0%,
                        ${bgc[1]} 50%,
                        ${bgc[2]} 100%
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
      
    </SimpleContent>
  </SimplePage>
}
export default ResizeObserverTestPage


