import React from 'react'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import Button from 'src/components/elems/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/components/elems/buttons/Button/ButtonS6.ts'
import ChatListItemWidget, {
  ChatListItemWidgetData,
} from 'src/components/pages/Chats/parts/ChatListItemWidget.tsx'






export type ChatListItemButtonProps =
  & { item: ChatListItemWidgetData }
  & React.ComponentProps<typeof Button>

export const ChatListItemButton = React.memo((props: ChatListItemButtonProps) => {
  const { item, ...restProps } = props
  
  
  return (
    <Button alignedStretch row g={8}
      css={ButtonS6.t(chatItemButtonS)}
      data-display-name='ChatListItemButton'
      {...restProps}
    >
      
      <ChatListItemWidget item={item}/>
      
    </Button>
  )
})
ChatListItemButton.displayName = 'ChatListItemButton'
export default ChatListItemButton



const chatItemButtonS: AppWidgetStyle = t => [
  ButtonS6.S.text.rect.lg.normal, {
    button: {
      w: undefined, h: 72, r: 20, ph: 8, pv: 6,
      textAlign: 'start',
    },
    // TODO Theme
    buttonSelected: { bg: '#e07bff44' },
    buttonDisabled: { bg: 'none' },
  },
]






