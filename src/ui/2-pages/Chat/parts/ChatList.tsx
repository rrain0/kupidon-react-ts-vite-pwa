import { animatedMapMulti } from '@animated/AnimatedMultiComputed.ts'
import { AnimatedProperty } from '@animated/AnimatedProperty.ts'
import { AnimationFun } from '@animated/AnimationConfig.ts'
import AnimatedDiv from '@animated/elements/AnimatedDiv.tsx'
import { createSpring, createSpringAnimation } from '@animated/SpringAnimation.tsx'
import { useAnimatedValue } from '@animated/useAnimatedValue.ts'
import styled from '@emotion/styled'
import { Spring2DAnimationData, useItemDrag } from '@util/animated/item-drag/useItemDrag.ts'
import { RangeU } from '@util/common/RangeU.ts'
import { virtualOffset } from '@util/css/virtualOffset.ts'
import { useNoTouchAction } from '@util/pointer/useNoTouchAction.ts'
import { useArray } from '@util/react-state/useArray.ts'
import { useAsCallback } from '@util/react-state/useAsCallback.ts'
import { useRefGetSet } from '@util/react-state/useRefGetSet.ts'
import { ReactU } from '@util/react/ReactU.ts'
import { withDefaults } from '@util/react/withDefaults.tsx'
import { getViewProps } from '@util/view/ViewProps.ts'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import Contents from 'src/ui/0-elements/basic-elements/Contents.tsx'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import ModalContextMenu from 'src/ui/1-widgets/modals/ModalContextMenu/ModalContextMenu.tsx'
import ChatListItem, { ChatListItemData } from 'src/ui/2-pages/Chat/parts/ChatListItem.tsx'
import { offsetToPageContentPaddings } from 'src/ui/components/Pages/offsetToPageContentPaddings.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import Pu = TypeU.Pu
import toEmptyAttr = TypeU.toEmptyAttr
import Callback1 = TypeU.Callback1
import combineProps = ReactU.combineProps
import gridStackC = EmotionCommon.gridStackC





export type ChatListExtraProps = Pu<{
  chatItems: ChatListItemData[]
}>

export type ChatListProps =
  & Omit<React.ComponentPropsWithRef<'div'>, 'children'>
  & ChatListExtraProps



const ChatList = React.memo((props: ChatListProps) => {
  const {
    chatItems,
    ...restProps
  } = props
  
  const showItems = !!chatItems?.length
  
  const {
    arr: selected, isNotEmpty: isAnySelected,
    has: isSelected, toggle: toggleSelection,
  } = useArray<string>()
  
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
      
      <ChatListView g={20} col grow
        data-display-name='ChatList'
        {...restProps}
      >
        <Contents {...onTrackDrag()}>
          {showItems && chatItems.map(({
            id, ava, online, name, lastMsg, lastMsgDate, isLastMsgMy, unreadCnt,
            mute, order, lastMsgStatus, isWriting,
          }, i) => {
            const isSel = isSelected(id)
            return (
              <ChatListItemWrap
                id={id}
                key={id}
                ava={ava}
                online={online}
                name={name}
                lastMsg={lastMsg}
                lastMsgDate={lastMsgDate}
                isLastMsgMy={isLastMsgMy}
                unreadCnt={unreadCnt}
                mute={mute}
                order={order}
                lastMsgStatus={lastMsgStatus}
                isWriting={isWriting}
                
                isSelected={isSel}
                isAnySelected={isAnySelected}
                toggleSelection={toggleSelection}
                animatedMxMy={animatedMxMy}
                animatedOffset={animatedScrollOffset}
                
                onPointerDown={() => setLastPointerDownItemId(id)}
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
      </ChatListView>
      
      <ModalContextMenu isOpen={isAnySelected}>
        Здесь будут опции контекстного меню
      </ModalContextMenu>
      
    </>
  )
})
ChatList.displayName = 'ChatList'
export default ChatList




const ChatListView = styled(Flex)(({ theme: t }) => [
  offsetToPageContentPaddings({ h: true, b: true }), {
    paddingTop: 20,
    borderRadius: '15px 15px 0 0',
    // TODO Theme
    backgroundColor: 'white',
    boxShadow: `${StyleVals.shadowLightSz} ${t.shadow.bg2}`,
  },
])

const NoItems = styled(Flex)()



type ChatListItemWrapProps = ChatListItemData & Pu<{
  isSelected: boolean
  isAnySelected: boolean
  toggleSelection: Callback1<string>
  animatedMxMy: AnimatedProperty<{ mx: number, my: number }>
  animatedOffset: AnimatedProperty<number>
  onPointerDown: React.PointerEventHandler
}>
const ChatListItemWrap = ({
  isSelected, isAnySelected, toggleSelection, animatedMxMy, animatedOffset, ...restProps
}: ChatListItemWrapProps) => {
  let { id, onPointerDown } = restProps
  
  const onClick = useAsCallback(() => {
    if (isAnySelected) toggleSelection?.(id)
  })
  const onLongPress = useAsCallback(() => {
    toggleSelection?.(id)
  })
  onPointerDown = useAsCallback(onPointerDown)
  
  return (
    <ChatListItemBox>
      
      {isSelected && <ChatListItemPlaceholder/>}
      
      <AnimatedDiv pos='rel' full col alignSelf='stretch'
        animatedStyle={{
          transform: animatedMapMulti([animatedMxMy, animatedOffset], (m, offset) => {
            if (!m) return 'none'
            offset ??= 0
            const { mx, my } = m
            if (isSelected) return `translate3d(${mx}px, ${my + offset}px, 0)`
            return 'none'
          }),
          zIndex: animatedMxMy?.map(({ mx, my }): number | string => {
            if (isSelected && (mx || my)) return 1
            return 'auto'
          }),
        }}
      >
        <ChatListItem
          data-selected={toEmptyAttr(isSelected)}
          {...restProps}
          onPointerDown={onPointerDown}
          onClick={onClick}
          onLongPress={onLongPress}
        />
      </AnimatedDiv>
      
    </ChatListItemBox>
  )
}


const ChatListItemBox = withDefaults({
  alignSelf: 'stretch', h: 72, mv: -6, mh: -8,
}, styled(Flex)(gridStackC))


const ChatListItemPlaceholder = withDefaults({
  full: true, r: 20,
}, styled(Flex)(({ theme: t }) => [
  {
    backgroundColor: t.boxNormalCt.bgf,
  },
]))





