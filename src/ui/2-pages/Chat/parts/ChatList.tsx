import styled from '@emotion/styled'
import { useArray } from '@util/react-state/useArray.ts'
import { useAsCallback } from '@util/react-state/useAsCallback.ts'
import React from 'react'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import ChatListItem, { ChatListItemData } from 'src/ui/2-pages/Chat/parts/ChatListItem.tsx'
import { offsetToPageContentPaddings } from 'src/ui/components/Pages/offsetToPageContentPaddings.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import Pu = TypeU.Pu
import toEmptyAttr = TypeU.toEmptyAttr
import Callback1 = TypeU.Callback1





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
  
  
  return (
    <ChatListView g={20} col grow
      data-display-name='ChatList'
      {...restProps}
    >
      {showItems && chatItems.map(({
        id, ava, online, name, lastMsg, lastMsgDate, isLastMsgMy, unreadCnt,
        mute, order, lastMsgStatus, isWriting,
      }) => {
        
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
  )
})
ChatList.displayName = 'ChatList'
export default ChatList




const ChatListView = styled(Flex)`
  ${offsetToPageContentPaddings({ h: true, b: true })}
  padding-top: 20px;
  border-radius: 15px 15px 0 0;
  // TODO Theme
  background-color: white;
  box-shadow: ${StyleVals.shadowLightSz} ${p => p.theme.shadow.bg2};
`

const NoItems = styled(Flex)`
  
`



type ChatListItemWrapProps = ChatListItemData & Pu<{
  selected: boolean
  anySelected: boolean
  toggleSelection: Callback1<string>
}>
const ChatListItemWrap = ({
  selected, anySelected, toggleSelection, ...restProps
}: ChatListItemWrapProps) => {
  const { id } = restProps
  
  const onClick = useAsCallback(() => {
    if (anySelected) toggleSelection?.(id)
  })
  const onLongPress = useAsCallback(() => {
    toggleSelection?.(id)
  })
  
  return (
    <ChatListItem
      {...restProps}
      data-selected={toEmptyAttr(selected)}
      onClick={onClick}
      onLongPress={onLongPress}
    />
  )
}

