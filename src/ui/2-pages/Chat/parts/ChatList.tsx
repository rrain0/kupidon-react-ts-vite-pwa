import { AnimationFun } from '@animated/AnimationConfig.ts'
import { createSpring, createSpringAnimation } from '@animated/SpringAnimation.tsx'
import { useAnimatedValue } from '@animated/useAnimatedValue.ts'
import styled from '@emotion/styled'
import { Spring2DAnimationData, useItemDrag } from '@util/animated/item-drag/useItemDrag.ts'
import { ArrayU } from '@util/common/ArrayU.ts'
import { useNoTouchAction } from '@util/pointer/useNoTouchAction.ts'
import { useArray } from '@util/react-state/useArray.ts'
import { useRefGetSet } from '@util/react-state/useRefGetSet.ts'
import { getViewProps } from '@util/view/ViewProps.ts'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import Contents from 'src/ui/0-elements/basic-elements/Contents.tsx'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import ModalContextMenu from 'src/ui/1-widgets/modals/ModalContextMenu/ModalContextMenu.tsx'
import ChatListItem from 'src/ui/2-pages/Chat/parts/ChatListItem.tsx'
import { ChatListItemWidgetData } from 'src/ui/2-pages/Chat/parts/ChatListItemWidget.tsx'
import { offsetToPageContentPaddings } from 'src/ui/components/Pages/offsetToPageContentPaddings.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import Pu = TypeU.Pu
import emptyArr = TypeU.emptyArr
import isundef = TypeU.isundef




type Adding = { state: 'adding', toI: number }
type Showing = { state: 'showing', toI: number }
type Replacing = { state: 'replacing', fromI: number, toI: number }
type Removing = { state: 'removing', fromI: number }


export type UiItemData = {
  item: ChatListItemWidgetData
} & (Adding | Showing | Removing | Replacing)

const stateToPriority: Record<UiItemData['state'], number> = {
  'adding': 2,
  'showing': 1,
  'replacing': 0,
  'removing': 3,
}





export type ChatListExtraProps = Pu<{
  chatItems: ChatListItemWidgetData[]
}>

export type ChatListProps =
  & Omit<React.ComponentPropsWithRef<'div'>, 'children'>
  & ChatListExtraProps



const ChatList = React.memo((props: ChatListProps) => {
  const {
    chatItems: newItems = emptyArr,
    ...restProps
  } = props
  
  
  
  
  const {
    arr: selected, isNotEmpty: isAnySelected,
    has: isSelected,
    toggle: toggleSelection, filter: filterSelected,
  } = useArray<string>()
  
  
  
  const [items, setItems] = useState<ChatListItemWidgetData[]>(newItems)
  const [uiItems, setUiItems] = useState<UiItemData[]>([])
  
  useEffect(() => {
    const [fwd, back] = ArrayU.diff(items, newItems, (a, b) => a.id === b.id)
    
    const removed = (() => {
      let cnt = 0
      return fwd
        .map((toI, fromI): UiItemData | undefined => {
          if (isundef(toI)) {
            return {
              state: 'removing',
              fromI: fromI - cnt++,
              item: items[fromI],
            }
          }
        })
        .filter(it => !!it)
    })()
    
    const uiItems: UiItemData[] = [
      ...back.map((fromI, toI): UiItemData => {
        if (isundef(fromI)) {
          return {
            state: 'adding',
            toI: toI,
            item: newItems[toI],
          }
        }
        if (fromI !== toI) {
          return {
            //state: 'replacing',
            //fromI,
            state: 'showing',
            toI: toI,
            item: newItems[toI],
          }
        }
        return {
          state: 'showing',
          toI,
          item: newItems[toI],
        }
      }),
      ...removed,
    ]
    
    uiItems.sort((a, b) => {
      const ai = a.state !== 'removing' ? a.toI : a.fromI
      const bi = b.state !== 'removing' ? b.toI : b.fromI
      return ai - bi
        || -(stateToPriority[a.state] - stateToPriority[b.state])
        || 0
    })
    
    const removedIds = removed.map(it => it.item.id)
    
    /* const fLen = fwd.length
    const bLen = back.length
    const uiItems: UiItemData[] = Array(bLen)
    for (let toI = 0; toI < bLen; toI++) {
      uiItems[toI] = (() => {
        const fromI = back[toI]
        if (isundef(fromI)) {
          return {
            state: 'adding',
            toI: toI,
            item: newItems[toI],
          }
        }
        if (fromI !== toI) {
          return {
            //state: 'replacing',
            //fromI,
            state: 'showing',
            toI: toI,
            item: newItems[toI],
          }
        }
        return {
          state: 'showing',
          toI,
          item: newItems[toI],
        }
      })()
    }
    for (let fromI = fLen - 1; fromI >= 0; fromI--) {
      const toI = fwd[fromI]
      if (isundef(toI)) {
        ArrayU.add(uiItems, {
          state: 'removing',
          fromI,
          item: items[fromI],
        }, fromI)
      }
    } */
    
    
    
    filterSelected(it => !removedIds.includes(it))
    setItems(newItems)
    setUiItems(uiItems)
  }, [newItems])
  
  const showItems = !!uiItems.length
  
  useNoTouchAction(isAnySelected)
  
  const [getLastPointerDownItemId, setLastPointerDownItemId] = useRefGetSet('')
  const {
    isDragging,
    getIsDragging,
    getWasDragged,
    onTrackDrag,
    
    getMxMy,
    animatedMxMy,
    
    eventListeners,
  } = useItemDrag({
    noDragging: !isSelected(getLastPointerDownItemId()),
  })
  
  
  
  
  const mxMyAnimationFun: AnimationFun<
    { mx: number, my: number }, Spring2DAnimationData | undefined
  > = ({
    startValue, time,
    data: { x, y } = { },
  }) => {
    
    const springX = createSpring({
      mass: 1, tension: 120, friction: 7, from: startValue.mx, initVelocity: 0,
    })
    const currX = springX({ to: 0, time, prev: x })
    
    const springY = createSpring({
      mass: 1, tension: 120, friction: 7, from: startValue.my, initVelocity: 0,
    })
    const currY = springY({ to: 0, time, prev: y })
    
    return {
      value: { mx: currX.value, my: currY.value },
      finished: currX.finished && currY.finished,
      data: { x: currX, y: currY },
    }
  }
  
  const [getScrollStart, setScrollStart] = useRefGetSet(0)
  const animatedScrollOffset = useAnimatedValue(0)
  
  useLayoutEffect(() => {
    const onScroll = ev => {
      if (!getIsDragging()) {
        if (!animatedScrollOffset.get()) animatedScrollOffset.set(0)
      }
      else {
        animatedScrollOffset.set(getViewProps(window).scrollTop - getScrollStart())
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => { window.removeEventListener('scroll', onScroll) }
  }, [])
  
  
  eventListeners.onDragStart = () => {
    setScrollStart(getViewProps(window).scrollTop)
  }
  eventListeners.onDragEnd = () => {
    animatedScrollOffset.animate({
      animationFun: createSpringAnimation({
        mass: 1, tension: 120, friction: 7, endValue: 0,
      }),
    })
    animatedMxMy.animate({ animationFun: mxMyAnimationFun })
  }
  
  
  
  
  
  
  return (
    <>
      
      <ChatListContainer col grow
        data-display-name='ChatList'
        {...restProps}
      >
        <Contents {...onTrackDrag()}>
          {showItems && uiItems.map((uiItem, i) => {
            const id = uiItem.item.id
            const isSel = isSelected(id)
            return (
              <ChatListItem
                key={id}
                {...uiItem}
                
                first={i === 0}
                isSelected={isSel}
                isAnySelected={isAnySelected}
                toggleSelection={toggleSelection}
                setLastPointerDownItemId={setLastPointerDownItemId}
                
                setUiItems={setUiItems}
                animatedMxMy={animatedMxMy}
                animatedOffset={animatedScrollOffset}
              />
            )
          })}
          {!showItems && (
            <Flex alignSelf='stretch' grow center>
              {/* TODO Translation */}
              <NoItems>Нет чатов</NoItems>
            </Flex>
          )}
        </Contents>
      </ChatListContainer>
      
      <ModalContextMenu isOpen={isAnySelected}>
        Здесь будут опции контекстного меню
      </ModalContextMenu>
      
    </>
  )
})
ChatList.displayName = 'ChatList'
export default ChatList




const ChatListContainer = styled(Flex)(({ theme: t }) => [
  offsetToPageContentPaddings({ h: true, b: true }), {
    paddingTop: 20,
    borderRadius: '15px 15px 0 0',
    // TODO Theme
    backgroundColor: 'white',
    boxShadow: `${StyleVals.shadowLightSz} ${t.shadow.bg2}`,
  },
])

const NoItems = styled(Flex)()







