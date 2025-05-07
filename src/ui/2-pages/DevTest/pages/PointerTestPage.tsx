import React, { useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import { useState } from 'react'
import { Pages } from 'src/ui/components/Pages/Pages.ts'




const PointerTestPage = React.memo(() => {
  
  const square1Ref = useRef<HTMLDivElement>(null)
  const square2Ref = useRef<HTMLDivElement>(null)
  const [pressed1, setPressed1] = useState(false)
  const [pressed2, setPressed2] = useState(false)
  
  const textDivRef = useRef<HTMLDivElement>(null)
  
  
  /* useEffect(
    () => {
      const square = square1Ref.current
      if (square){
        
        const onPointerDown = (ev:PointerEvent) => {
          setPressed1(true)
          if (textDivRef.current) textDivRef.current.innerHTML += 'ref pointer down<br/>'
        }
        square.addEventListener('pointerdown',onPointerDown)
        return () => {
          square.removeEventListener('pointerdown',onPointerDown)
        }
      }
    },
    [square1Ref.current]
  ) */
  
  
  
  
  useEffect(() => {
    const square = square1Ref.current
    if (square) {
      
      const onPointerDown = (ev:PointerEvent) => {
        setPressed1(true)
        if (textDivRef.current) textDivRef.current.innerHTML += 'ref pointer down<br/>'
      }
      const onPointerCancel = (ev:PointerEvent) => {
        setPressed1(false)
        if (textDivRef.current) textDivRef.current.innerHTML += 'ref pointer cancel<br/>'
      }
      const onPointerOut = (ev:PointerEvent) => {
        setPressed1(false)
        if (textDivRef.current) textDivRef.current.innerHTML += 'ref pointer out<br/>'
      }
      const onPointerLeave = (ev:PointerEvent) => {
        setPressed1(false)
        if (textDivRef.current) textDivRef.current.innerHTML += 'ref pointer leave<br/>'
      }
      const onPointerUp = (ev:PointerEvent) => {
        setPressed1(false)
        if (textDivRef.current) textDivRef.current.innerHTML += 'ref pointer up<br/>'
      }
      
      // touchstart / touchmove (NOT pointerstart / pointermove)
      // with { passive: false }
      // with ev.preventDefault()
      // works like css touch-action: none; but when event was already fired.
      // If you want ev.preventDefault(), you must prevent it instantly, not in promise
      const onTouchMove = (ev:TouchEvent) => {
        ev.preventDefault()
      }
      
      square.addEventListener('pointerdown', onPointerDown)
      square.addEventListener('pointercancel', onPointerCancel)
      square.addEventListener('pointerout', onPointerOut)
      square.addEventListener('pointerleave', onPointerLeave)
      square.addEventListener('pointerup', onPointerUp)
      
      square.addEventListener('touchmove', onTouchMove, { passive: false })
      return () => {
        square.removeEventListener('pointerdown', onPointerDown)
        square.removeEventListener('pointercancel', onPointerCancel)
        square.removeEventListener('pointerout', onPointerOut)
        square.removeEventListener('pointerleave', onPointerLeave)
        square.removeEventListener('pointerup', onPointerUp)
        
        square.removeEventListener('touchmove', onTouchMove)
      }
    }
  }, [square1Ref.current])
  
  
  
  useEffect(() => {
    const square = square1Ref.current
    if (square) {
      const onPointerDown = () => { }
      square.addEventListener('pointerdown', onPointerDown)
      return () => {
        square.removeEventListener('pointerdown', onPointerDown)
      }
    }
  }, [square1Ref.current])
  
  
  
  return (
    <Pages.Page>
      <Pages.Content>
        
        <button
          css={css`
            width: 250px;
            height: 100px;
          `}
          
          onPointerDown={ev => {
            console.log('onPointerDown #', ev.pointerId)
          }}
          
          onPointerEnter={ev => {
            console.log('onPointerEnter #', ev.pointerId)
          }}
          onPointerLeave={ev => {
            console.log('onPointerLeave #', ev.pointerId)
          }}
          onPointerOut={ev => {
            console.log('onPointerOut #', ev.pointerId)
          }}
          onPointerOver={ev => {
            console.log('onPointerOver #', ev.pointerId)
          }}
          onPointerMove={ev => {
            console.log('onPointerMove #', ev.pointerId)
          }}
          
          onPointerCancel={ev => {
            console.log('onPointerCancel #', ev.pointerId)
          }}
          onPointerUp={ev => {
            console.log('onPointerUp #', ev.pointerId)
          }}
          
          onClick={ev => {
            console.log('onClick')
          }}
        >
          See pointer events in console
        </button>
        
        <div
          css={css`
            background: skyblue;
            width: 200px;
            height: 200px;
            ${pressed1 && css`background: lightgreen;`} //touch-action: none;
          `}
          ref={square1Ref}
          onClick={ev => {
            if (textDivRef.current) textDivRef.current.innerHTML += 'click<br/>'
          }}
          onPointerDown={ev => {
            setPressed1(true)
            if (textDivRef.current) textDivRef.current.innerHTML += 'pointer down<br/>'
          }}
          onPointerCancel={ev => {
            setPressed1(false)
            if (textDivRef.current) textDivRef.current.innerHTML += 'pointer cancel<br/>'
          }}
          onPointerOut={ev => {
            setPressed1(false)
            if (textDivRef.current) textDivRef.current.innerHTML += 'pointer out<br/>'
          }}
          onPointerLeave={ev => {
            setPressed1(false)
            if (textDivRef.current) textDivRef.current.innerHTML += 'pointer leave<br/>'
          }}
          onPointerUp={ev => {
            setPressed1(false)
            if (textDivRef.current) textDivRef.current.innerHTML += 'pointer up<br/>'
          }}
        />
        
        <div
          css={css`
            background: skyblue;
            width: 200px;
            height: 200px;
            ${pressed2 && css`background: lightgreen;`}
            touch-action: none; // !!!!!!!!!!!!!!!!
          `}
          ref={square2Ref}
          onClick={ev => {
            if (textDivRef.current) textDivRef.current.innerHTML += 'click<br/>'
          }}
          onPointerDown={ev => {
            setPressed2(true)
            if (textDivRef.current) textDivRef.current.innerHTML += 'pointer down<br/>'
          }}
          onPointerCancel={ev => {
            setPressed2(false)
            if (textDivRef.current) textDivRef.current.innerHTML += 'pointer cancel<br/>'
          }}
          onPointerOut={ev => {
            setPressed2(false)
            if (textDivRef.current) textDivRef.current.innerHTML += 'pointer out<br/>'
          }}
          onPointerLeave={ev => {
            setPressed2(false)
            if (textDivRef.current) textDivRef.current.innerHTML += 'pointer leave<br/>'
          }}
          onPointerUp={ev => {
            setPressed2(false)
            if (textDivRef.current) textDivRef.current.innerHTML += 'pointer up<br/>'
          }}
        />
        
        <div
          css={t => css`
            color: ${t.page.ct2};
          `}
          ref={textDivRef}
        />
      
      </Pages.Content>
    </Pages.Page>
  )
})
export default PointerTestPage

