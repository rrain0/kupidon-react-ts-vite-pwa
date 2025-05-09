import { AnimatedProperty } from '@animated/AnimatedProperty.ts'
import AnimatedDiv from '@animated/elements/AnimatedDiv.tsx'
import styled from '@emotion/styled'
import { useItemDrag } from '@util/animated/item-drag/useItemDrag.ts'
import { useArray } from '@util/react-state/useArray.ts'
import { useAsCallback } from '@util/react-state/useAsCallback.ts'
import { ReactU } from '@util/react/ReactU.ts'
import React from 'react'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
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
    arr: selections, isNotEmpty: anySelected,
    has: selected, toggle: toggleSelection,
  } = useArray<string>()
  
  
  const {
    isDragging,
    getIsDragging, // stable
    getWasDragged, // stable
    onTrackDrag, // not stable
    
    getMxMy, // stable
    animatedMxMy, // stable
  } = useItemDrag({ noDrag: false })
  
  
  
  return (
    <>
      
      <ChatListView g={20} col grow
        data-display-name='ChatList'
        {...combineProps(onTrackDrag(), restProps)}
      >
        {showItems && chatItems.map(({
          id, ava, online, name, lastMsg, lastMsgDate, isLastMsgMy, unreadCnt,
          mute, order, lastMsgStatus, isWriting,
        }, i) => {
          
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
              
              selected={selected(id)}
              anySelected={anySelected}
              toggleSelection={toggleSelection}
              animatedMxMy={i === 0 ? animatedMxMy : undefined}
            />
          )
        })}
        {!showItems && (
          <Flex alignSelf='stretch' grow center>
            {/* TODO Translation */}
            <NoItems>Нет чатов</NoItems>
          </Flex>
        )}
      </ChatListView>
      
      <ModalContextMenu isOpen={anySelected}>
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
  selected: boolean
  anySelected: boolean
  toggleSelection: Callback1<string>
  animatedMxMy: AnimatedProperty<{ mx: number, my: number }>
}>
const ChatListItemWrap = ({
  selected, anySelected, toggleSelection, animatedMxMy, ...restProps
}: ChatListItemWrapProps) => {
  const { id } = restProps
  
  const onClick = useAsCallback(() => {
    if (anySelected) toggleSelection?.(id)
  })
  const onLongPress = useAsCallback(() => {
    toggleSelection?.(id)
  })
  
  const a = animatedMxMy?.map(({ mx, my }) => {
    return (mx || my) ? 1 : 'auto'
  })
  
  return (
    <AnimatedDiv pos='rel' col alignSelf='stretch'
      animatedStyle={{
        transform: animatedMxMy?.map(({ mx, my }) => {
          return `translate3d(${mx}px, ${my}px, 0)`
        }),
        zIndex: animatedMxMy?.map(({ mx, my }) => {
          return ((mx || my) ? 1 : 'auto') as number | string
        }),
      }}
    >
      <ChatListItem
        {...restProps}
        data-selected={toEmptyAttr(selected)}
        onClick={onClick}
        onLongPress={onLongPress}
      />
    </AnimatedDiv>
  )
}





