import { css, Global } from '@emotion/react'
import { ReactU } from '@util/react/ReactU.ts'
import { useElemRefGetSet } from '@util/view/useElemRefGetSet.ts'
import Card from 'src/ui/0-elements/Card/Card.tsx'
import MountController, { MountControllerRenderProps } from 'src/ui/components/MountController.tsx'
import PageContentLayout from 'src/ui/components/page/PageContentLayout.tsx'
import { TypeU } from 'src/util/common/TypeU.ts'
import React, { useEffect, useState } from 'react'
import { ModalElements } from 'src/ui/components/modal/ModalElements.tsx'
import Modal from 'src/ui/components/modal/Modal.tsx'
import Callback = TypeU.Callback
import Pu = TypeU.Pu
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
  onClose: Callback
}> & MountControllerRenderProps & Children
const ContextMenu = React.memo((props: ContextMenuProps) => {
  const {
    children,
    isOpen, allowUnmount,
  } = props
  
  
  const [getCardEl, setCardEl] = useElemRefGetSet()
  
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
    const el = getCardEl()
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
  
  return (
    <Card relative b={b} ph={8}
      style={initialStyle}
      css={ModalElements.cardBoxInModalS}
      data-display-name='ContextMenu'
      ref={setCardEl}
    >
      {children}
    </Card>
  )
})
ContextMenu.displayName = 'ContextMenu'

