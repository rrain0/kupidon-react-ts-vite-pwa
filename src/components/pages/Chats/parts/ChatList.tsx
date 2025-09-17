import { AnimationFun } from '@animated/AnimationConfig.ts'
import { createSpring, createSpringAnimation } from '@animated/SpringAnimation.tsx'
import { useAnimatedValue } from '@animated/useAnimatedValue.ts'
import styled from '@emotion/styled'
import { Spring2DAnimationData, useItemDrag } from '@utils/app/gestures/useItemDrag.ts'
import { diff } from '@utils/base/array/arrayDiffUtils.ts'
import { useNoTouchAction } from '@utils/move/pointer/useNoTouchAction.ts'
import { useArray } from '@utils/state/react/useArray.ts'
import { useAsCallback } from '@utils/state/react/base/useAsCallback.ts'
import { useRefGetSet } from '@utils/state/react/base/useRefGetSet.ts'
import { getViewProps } from '@utils/view/ViewProps.ts'
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { StyleVals } from 'src/styles/StyleVals.ts'
import Contents from '@libs/short-propsed/components/Contents.tsx'
import Flex from '@libs/short-propsed/components/Flex.tsx'
import ChatListContextMenu, {
  ChatListContextMenuProps,
} from 'src/components/pages/Chats/parts/ChatListContextMenu.tsx'
import ChatListToItem from 'src/components/pages/Chats/parts/ChatListToItem.tsx'
import { ChatListItemWidgetData } from 'src/components/pages/Chats/parts/ChatListItemWidget.tsx'
import { offsetToPageContentPaddings }
  from 'src/components/components/page/offsetToPageContentPaddings.ts'
import { Pu } from '@utils/base/typeUtils.ts'
import { isundef } from '@utils/base/typeUtils.ts'
import { isdef } from '@utils/base/typeUtils.ts'




// TODO make separate states for components: loading, error


type Adding = { state: 'adding', toI: number }
type Showing = { state: 'showing', toI: number }
type Replacing = { state: 'replacing', fromI: number, toI: number }
type Removing = { state: 'removing', fromI: number }


export type UiItemData = {
  item: ChatListItemWidgetData
} & (
  Adding | Showing | Removing | Replacing
)





export type ChatListExtraProps = Pu<{
  chatItems: ChatListItemWidgetData[]
  
  pin: (ids: string[]) => void
  unpin: (ids: string[]) => void
  mute: (ids: string[]) => void
  unmute: (ids: string[]) => void
  remove: (ids: string[], params?: Pu<{ removeForAll: boolean }>) => void
}>

export type ChatListProps =
  & Omit<React.ComponentProps<'div'>, 'children'>
  & ChatListExtraProps



const ChatList = React.memo((props: ChatListProps) => {
  const {
    chatItems: newItems,
    pin: _pin, unpin: _unpin, mute: _mute, unmute: _unmute, remove: _remove,
    ...restProps
  } = props
  
  
  
  
  const {
    arr: selected, isNotEmpty: isAnySelected,
    has: isSelected,
    toggle: toggleSelection, filter: filterSelected,
    clear: unselectAll,
  } = useArray<string>()
  
  const pin = useAsCallback(() => _pin?.(selected))
  const unpin = useAsCallback(() => _unpin?.(selected))
  const mute = useAsCallback(() => _mute?.(selected))
  const unmute = useAsCallback(() => _unmute?.(selected))
  const remove = useAsCallback(({ removeForAll = false }) => _remove?.(selected, { removeForAll }))
  
  
  
  const [items, setItems] = useState<ChatListItemWidgetData[] | undefined>(newItems)
  const [uiItems, setUiItems] = useState<UiItemData[] | undefined>(undefined)
  
  useEffect(() => {
    // Мгновенно ереходим в состояние ожидание элементов
    if (!newItems) {
      setItems(undefined)
      setUiItems(undefined)
    }
    // Мгновенно показываем все элементы после состояния ожидания
    else if (!items) {
      setItems(newItems)
      setUiItems(newItems.map((it, i) => ({ state: 'showing', toI: i, item: it })))
    }
    // Анимируем изменения элементов
    else {
      const [fwd, back] = diff(items, newItems, (a, b) => a.id === b.id)
      
      const fLen = fwd.length
      const bLen = back.length
      const removedIds: string[] = []
      const uiItems: UiItemData[] = []
      
      for (let prevFi = -1, prevBi = -1, bi = 0, ri = 0; ri < fLen || bi < bLen;) {
        if (ri < fLen && ri > prevFi) {
          const fromI = ri
          const toI = fwd[fromI]
          if (isundef(toI)) {
            const item = items[fromI]
            removedIds.push(item.id)
            uiItems.push({ state: 'removing', fromI, item })
            bi--
          }
          prevFi = ri
        }
        if (bi < bLen && bi > prevBi) {
          const toI = bi
          const fromI = back[toI]
          if (isundef(fromI)) {
            uiItems.push({ state: 'adding', toI: toI, item: newItems[toI] })
          }
          else if (fromI !== toI) {
            uiItems.push({
              //state: 'replacing',
              //fromI,
              state: 'showing',
              toI: toI,
              item: newItems[toI],
            })
            ri++
          }
          else {
            uiItems.push({ state: 'showing', toI, item: newItems[toI] })
            ri++
          }
          prevBi = bi
        }
        else {
          ri++
        }
        bi++
      }
      
      filterSelected(it => !removedIds.includes(it))
      setItems(newItems)
      setUiItems(uiItems)
    }
  }, [newItems])
  
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
  
  
  
  
  
  const loading = !uiItems
  const noItems = uiItems?.length === 0
  
  
  const contextMenuProps = useMemo(() => {
    return selected
      .map(id => (uiItems ?? []).find(it => it.item.id === id)!.item)
      .reduce((acc, curr) => {
        acc.selected++
        acc.hasUnpinned ||= isundef(curr.pinned)
        acc.hasPinned ||= isdef(curr.pinned)
        acc.hasMuted ||= !!curr.mute
        acc.hasUnmuted ||= !curr.mute
        acc.hasUnarchived ||= true
        acc.hasUnblacklisted ||= true
        acc.hasRemovable ||= true
        acc.hasClearable ||= true
        return acc
      }, {
        selected: 0,
        hasUnpinned: false as boolean,
        hasPinned: false as boolean,
        hasMuted: false as boolean,
        hasUnmuted: false as boolean,
        hasUnarchived: false as boolean,
        hasUnblacklisted: false as boolean,
        hasRemovable: false as boolean,
        hasClearable: false as boolean,
      } satisfies Partial<ChatListContextMenuProps>)
  }, [selected, uiItems])
  
  
  return (
    <>
      <ChatListContainer col grow
        data-display-name='ChatList'
        {...restProps}
      >
        {(() => {
          if (loading) return (
            <Flex alignedStretch grow center>
              {/* TODO Translation */}
              <div>Загрузка...</div>
            </Flex>
          )
          if (noItems) return (
            <Flex alignedStretch grow center>
              {/* TODO Translation */}
              <div>Нет чатов</div>
            </Flex>
          )
          return (
            uiItems.map((uiItem, i) => {
              const id = uiItem.item.id
              const isSel = isSelected(id)
              return (
                <Contents key={id} {...onTrackDrag()}>
                  <ChatListToItem
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
                </Contents>
              )
            })
          )
        })()}
      </ChatListContainer>
      
      <ChatListContextMenu
        {...contextMenuProps}
        onUnselect={unselectAll}
        onPin={pin}
        onUnpin={unpin}
        onMute={mute}
        onUnmute={unmute}
        onRemove={remove}
      />
      
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