import { Global } from '@emotion/react'
import { ReactU } from '@utils/react/ReactU.ts'
import { useElemRefGetSet } from '@utils/elem/react/useElemRefGetSet.ts'
import Card from 'src/components/elems/Card/Card.tsx'
import MountController, { MountControllerRenderProps } from 'src/components/components/animations/MountController.tsx'
import PageContentLayout from 'src/components/components/page/PageContentLayout.tsx'

import React, { useEffect, useState } from 'react'
import { ModalElements } from 'src/components/components/modal/ModalElements.tsx'
import Modal from 'src/components/components/modal/Modal.tsx'
import { Cb } from '@utils/base/tsUtils.ts'
import { Pu } from '@utils/base/tsUtils.ts'
import Children = ReactU.Children
import modalContextMenuCardBoxS = ModalElements.modalContextMenuCardBoxS
import StyleProp = ReactU.StyleProp




const b = 60
const translateYHidden = `calc(${b}px + 110%)`


type ModalContextMenuProps = Pu<{
  isOpen: boolean
}> & Children



const ModalContextMenu = React.memo((props: ModalContextMenuProps) => {
  const {
    children,
    isOpen,
  } = props
  
  
  return (
    <>
      <Global styles={{ ':root': { '--bottom-floating-bar-h': `${b + 100}px` } }}/>
      
      <MountController isOpen={isOpen}>
        {mountProps => (
          <Modal onlyFrame>
            <PageContentLayout modalSm cssInner={modalContextMenuCardBoxS}>
              <ContextMenu {...mountProps}>
                {children}
              </ContextMenu>
            </PageContentLayout>
          </Modal>
        )}
      </MountController>
    </>
  )
})
ModalContextMenu.displayName = 'ModalContextMenu'
export default ModalContextMenu






type ContextMenuProps = Pu<{
  onClose: Cb
}> & MountControllerRenderProps & Children
const ContextMenu = React.memo((props: ContextMenuProps) => {
  const {
    children,
    isOpen, allowUnmount,
  } = props
  
  const { initialStyle, setEl } = useEnterExitAnimation(isOpen, allowUnmount)
  
  return (
    <Card relative b={b} ph={8}
      style={initialStyle}
      css={ModalElements.cardBoxInModalS}
      data-display-name='ContextMenu'
      ref={setEl}
    >
      {children}
    </Card>
  )
})
ContextMenu.displayName = 'ContextMenu'




const useEnterExitAnimation = (isOpen: boolean, allowUnmount: Cb) => {
  const [getEl, setEl] = useElemRefGetSet()
  
  type State = undefined | 'appearing' | 'appeared' | 'disappearing' | 'disappeared'
  const [state, setState] = useState<{ v: State }>({ v: undefined })
  
  // useEffect сработает уже после монтирования элемента и получения рефа
  useEffect(() => {
    if (isOpen) setState({ v: 'appearing' })
    else setState({ v: 'disappearing' })
  }, [isOpen])
  
  
  const initialStyle: StyleProp = {
    transform: `translateY(${translateYHidden})`,
  }
  useEffect(() => {
    const appearTime = 150
    const disappearTime = 150
    
    let stale = false
    const el = getEl()
    if (el) {
      if (state.v === 'appearing') {
        const time = appearTime
        el.style.transition = `transform ${time}ms linear`
        el.style.transform = 'translateY(0)'
        el.ontransitionend = ev => requestAnimationFrame(() => {
          if (stale) return
          el.ontransitionend = null
          setState(curr => curr === state ? { v: 'appeared' } : curr)
        })
      }
      else if (state.v === 'appeared') {
        el.style.transition = 'none'
        el.style.transform = 'translateY(0)'
        el.ontransitionend = null
      }
      else if (state.v === 'disappearing') {
        const time = disappearTime
        el.style.transition = `transform ${time}ms linear`
        el.style.transform = `translateY(${translateYHidden})`
        el.ontransitionend = ev => requestAnimationFrame(() => {
          if (stale) return
          el.ontransitionend = null
          setState(curr => curr === state ? { v: 'disappeared' } : curr)
        })
      }
      else if (state.v === 'disappeared') {
        el.style.transition = 'none'
        el.style.transform = `translateY(${translateYHidden})`
        el.ontransitionend = null
        allowUnmount()
      }
    }
    return () => { stale = true }
  }, [state])
  
  return { initialStyle, setEl }
}