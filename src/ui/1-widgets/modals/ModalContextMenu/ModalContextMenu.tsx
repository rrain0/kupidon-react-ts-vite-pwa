import { css, Global } from '@emotion/react'
import { ReactU } from '@util/react/ReactU.ts'
import { useElemRefGetSet } from '@util/view/useElemRefGetSet.ts'
import Card from 'src/ui/0-elements/Card/Card.tsx'
import MountController, { MountControllerRenderProps } from 'src/ui/0-elements/MountController.tsx'
import PageContentLayout from 'src/ui/components/Pages/PageContentLayout.tsx'
import { TypeU } from 'src/util/common/TypeU.ts'
import React, { useEffect, useState } from 'react'
import { ModalElements } from 'src/ui/components/modal/ModalElements.tsx'
import Modal from 'src/ui/components/modal/Modal.tsx'
import Callback = TypeU.Callback
import Pu = TypeU.Pu
import Children = ReactU.Children
import modalBottomCardBoxS = ModalElements.modalBottomCardBoxS




const time = 150
const b = 60



type ModalContextMenuProps = Pu<{
  isOpen: boolean
  onClose: Callback
}> & Children



const ModalContextMenu = React.memo((props: ModalContextMenuProps) => {
  const {
    children,
    isOpen, onClose,
  } = props
  
  
  return (
    <>
      <Global styles={{ ':root': { '--bottom-button-bar-height': `${b + 100}px` } }}/>
      
      <MountController isOpen={isOpen}>
        {mountProps => (
          <Modal onlyFrame>
            <PageContentLayout modalSm cssInner={modalBottomCardBoxS}>
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






type ContextMenuProps = MountControllerRenderProps & Children
const ContextMenu = React.memo((props: ContextMenuProps) => {
  const {
    children,
    isOpen, allowUnmount,
  } = props
  
  type State = undefined | 'appearing' | 'appeared' | 'disappearing' | 'disappeared'
  const [state, setState] = useState<State>(undefined)
  
  const [getElem, setElem] = useElemRefGetSet()
  
  // useEffect сработает уже после монтирования элемента и получения рефа
  useEffect(() => {
    if (isOpen) setState('appearing')
    else setState('disappearing')
  }, [isOpen])
  
  useEffect(() => {
    const el = getElem()
    let stale = false
    if (el) {
      if (state === 'appearing') {
        el.style.transition = `transform ${time}ms linear, bottom ${time}ms linear`
        el.style.bottom = `${b}px`
        el.style.transform = 'translateY(0%)'
        el.ontransitionend = ev => requestAnimationFrame(() => {
          if (stale) return
          el.ontransitionend = null
          setState('appeared')
        })
      }
      else if (state === 'appeared') {
        el.style.transition = 'none'
        el.style.bottom = `${b}px`
        el.style.transform = 'translateY(0%)'
        el.ontransitionend = null
      }
      else if (state === 'disappearing') {
        el.style.transition = `transform ${time}ms linear, bottom ${time}ms linear`
        el.style.bottom = '0px'
        el.style.transform = 'translateY(110%)'
        el.ontransitionend = ev => requestAnimationFrame(() => {
          if (stale) return
          el.ontransitionend = null
          setState('disappeared')
        })
      }
      else if (state === 'disappeared') {
        el.style.transition = 'none'
        el.style.bottom = '0px'
        el.style.transform = 'translateY(110%)'
        el.ontransitionend = null
        allowUnmount()
      }
    }
    return () => { stale = true }
  }, [state])
  
  return (
    <Card
      css={[ModalElements.cardBoxInModalS, cardS]}
      data-display-name='ContextMenu'
      ref={setElem}
    >
      {children}
    </Card>
  )
})
ContextMenu.displayName = 'ContextMenu'



const cardS = css({
  position: 'relative',
  transform: 'translateY(110%)',
  bottom: 0,
})