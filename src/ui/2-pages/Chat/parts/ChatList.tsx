import { AnimatedProperty } from '@animated/AnimatedProperty.ts'
import { AnimationFun } from '@animated/AnimationConfig.ts'
import AnimatedDiv from '@animated/elements/AnimatedDiv.tsx'
import { createSpring } from '@animated/SpringAnimation.tsx'
import styled from '@emotion/styled'
import { Spring2DAnimationData, useItemDrag } from '@util/animated/item-drag/useItemDrag.ts'
import { useArray } from '@util/react-state/useArray.ts'
import { useAsCallback } from '@util/react-state/useAsCallback.ts'
import { useRefGetSet } from '@util/react-state/useRefGetSet.ts'
import { ReactU } from '@util/react/ReactU.ts'
import React, { useEffect, useState } from 'react'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import Contents from 'src/ui/0-elements/basic-elements/Contents.tsx'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import ModalContextMenu from 'src/ui/1-widgets/modals/ModalContextMenu/ModalContextMenu.tsx'
import ChatListItem, { ChatListItemData } from 'src/ui/2-pages/Chat/parts/ChatListItem.tsx'
import { offsetToPageContentPaddings } from 'src/ui/components/Pages/offsetToPageContentPaddings.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import Pu = TypeU.Pu
import toEmptyAttr = TypeU.toEmptyAttr
import Callback1 = TypeU.Callback1
import combineProps = ReactU.combineProps





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
  
  
  const [getLastPointerDownItemId, setLastPointerDownItemId] = useRefGetSet('')
  const {
    isDragging,
    getIsDragging, // stable
    getWasDragged, // stable
    onTrackDrag, // not stable
    
    getMxMy, // stable
    animatedMxMy, // stable
  } = useItemDrag({
    noDragging: !isSelected(getLastPointerDownItemId()),
  })
  
  
  
  
  const mxMyAnimationFun: AnimationFun<
    { mx: number, my: number }, Spring2DAnimationData | undefined
  > = ({
    startValue, time,
    data: { prevTimestamp, prevValue, prevVelocity, finished } = { },
  }) => {
    
    const springMx = createSpring({
      mass: 1, tension: 120, friction: 7, from: startValue.mx, initVelocity: 0,
    })
    const prevMx = {
      time: prevTimestamp, finished: finished?.mx,
      velocity: prevVelocity?.mx, value: prevValue?.mx,
    }
    const currMx = springMx({ to: 0, time, prev: prevMx })
    
    
    const springMy = createSpring({
      mass: 1, tension: 120, friction: 7, from: startValue.my, initVelocity: 0,
    })
    const prevMy = {
      time: prevTimestamp, finished: finished?.my,
      velocity: prevVelocity?.my, value: prevValue?.my,
    }
    const currMy = springMy({ to: 0, time, prev: prevMy })
    
    
    return {
      value: { mx: currMx.value, my: currMy.value },
      finished: currMx.finished && currMy.finished,
      data: {
        prevTimestamp: currMx.time,
        prevValue: { mx: currMx.value, my: currMy.value },
        prevVelocity: { mx: currMx.velocity, my: currMy.velocity },
        finished: { mx: currMx.finished, my: currMy.finished },
      },
    }
  }
  
  
  useEffect(() => {
    if (!isDragging) {
      animatedMxMy.animate({ animationFun: mxMyAnimationFun })
    }
  }, [isDragging])
  
  
  
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
  onPointerDown: React.PointerEventHandler
}>
const ChatListItemWrap = ({
  isSelected, isAnySelected, toggleSelection, animatedMxMy, ...restProps
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
    <AnimatedDiv pos='rel' col alignSelf='stretch'
      animatedStyle={{
        transform: animatedMxMy?.map(({ mx, my }) => {
          if (isSelected) return `translate3d(${mx}px, ${my}px, 0)`
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
  )
}





