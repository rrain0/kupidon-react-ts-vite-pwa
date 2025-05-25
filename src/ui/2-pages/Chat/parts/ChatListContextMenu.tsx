import { TypeU } from '@util/common/TypeU.ts'
import { virtualOffset } from '@util/css/virtualOffset.ts'
import React from 'react'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import Gap from 'src/ui/0-elements/basic-elements/Gap.tsx'
import Grid from 'src/ui/0-elements/basic-elements/Grid.tsx'
import TextAlignCenter from 'src/ui/0-elements/basic-elements/TextAlignCenter.tsx'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import ModalContextMenu from 'src/ui/1-widgets/modals/ModalContextMenu/ModalContextMenu.tsx'
import Pin2Ic = SvgIconsPack.Pin2Ic
import Unpin2Ic = SvgIconsPack.Unpin2Ic
import SoundOnIc = SvgIconsPack.SoundOnIc
import CrossInCircleIc = SvgIconsPack.CrossInCircleIc
import RestrictIc = SvgIconsPack.RestrictIc
import ArchiveBoxOutlinedIc = SvgIconsPack.ArchiveBoxOutlinedIc
import BlacklistIc = SvgIconsPack.BlacklistIc
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import Pu = TypeU.Pu
import Callback = TypeU.Callback
import CrossIc = SvgIconsPack.CrossIc
import SoundOffIc = SvgIconsPack.SoundOffIc








export type ChatListContextMenuProps = Pu<{
  selected: number
  hasUnpinned: boolean
  hasPinned: boolean
  hasUnmuted: boolean
  hasMuted: boolean
  hasUnarchived: boolean
  hasUnblacklisted: boolean
  hasRemovable: boolean
  hasClearable: boolean
  
  onUnselect: Callback
  onPin: Callback, onUnpin: Callback
  onUnmute: Callback, onMute: Callback
  onArchive: Callback
  onBlacklist: Callback
  onRemove: Callback, onClear: Callback
}>

const ChatListContextMenu = React.memo(({
  selected,
  hasUnpinned, hasPinned,
  hasUnmuted, hasMuted,
  hasUnarchived,
  hasUnblacklisted,
  hasRemovable, hasClearable,
  
  onUnselect,
  onPin, onUnpin,
  onUnmute, onMute,
  onArchive,
  onBlacklist,
  onRemove, onClear,
}: ChatListContextMenuProps) => {
  
  
  return (
    <ModalContextMenu isOpen={!!selected}>
      <Flex col alignStretch g={16} textAlign>
        
        
        {(() => {
          const elems = [(
            <Button row alignedStretch w='auto' center g={16}
              key='unselect' onClick={() => onUnselect?.()} css={ButtonS6.t(actionButtonS)}
            >
              <Flex center noShrink>
                <CrossIc css={SvgIconS6.t(actionCrossS)}/>
              </Flex>
              <TextAlignCenter fontSz={24} lineH={1}>{selected}</TextAlignCenter>
            </Button>
          )]
          if (!elems.length) return undefined
          if (elems.length === 1) return elems[0]
          if (elems.length === 2) return (
            <Grid cols='1fr auto 1fr' align g={8}>
              {elems[0]}
              {/* TODO Theme */}
              <Gap w={1} h={26} css={{ background: '#aaaaaa' }}/>
              {elems[1]}
            </Grid>
          )
          return undefined
        })()}
        
        
        {(() => {
          const elems = [
            ...hasUnpinned ? [(
              <Button row alignedStretch w='auto' center g={4}
                key='pin' onClick={() => onPin?.()} css={ButtonS6.t(actionButtonS)}
              >
                <Flex center noShrink>
                  <Pin2Ic css={SvgIconS6.t(pinIcS)}/>
                </Flex>
                <TextAlignCenter>Закрепить</TextAlignCenter>
              </Button>
            )] : [],
            ...hasPinned ? [(
              <Button row alignedStretch w='auto' center g={4}
                key='unpin' onClick={() => onUnpin?.()} css={ButtonS6.t(actionButtonS)}
              >
                <Flex center noShrink>
                  <Unpin2Ic css={SvgIconS6.t(pinIcS)}/>
                </Flex>
                <TextAlignCenter>Открепить</TextAlignCenter>
              </Button>
            )] : [],
          ]
          if (!elems.length) return undefined
          if (elems.length === 1) return elems[0]
          if (elems.length === 2) return (
            <Grid cols='1fr auto 1fr' align g={8}>
              {elems[0]}
              {/* TODO Theme */}
              <Gap w={1} h={26} css={{ background: '#aaaaaa' }}/>
              {elems[1]}
            </Grid>
          )
          return undefined
        })()}
        
        
        {(() => {
          const elems = [
            ...hasMuted ? [(
              <Button row alignedStretch w='auto' center g={4}
                key='unmute' onClick={() => onUnmute?.()} css={ButtonS6.t(actionButtonS)}
              >
                <Flex center noShrink>
                  <SoundOnIc css={SvgIconS6.t(soundOnIcS)}/>
                </Flex>
                <TextAlignCenter>Вкл. звук</TextAlignCenter>
              </Button>
            )] : [],
            ...hasUnmuted ? [(
              <Button row alignedStretch w='auto' center g={4}
                key='mute' onClick={() => onMute?.()} css={ButtonS6.t(actionButtonS)}
              >
                <Flex center noShrink>
                  <SoundOffIc css={SvgIconS6.t(soundOnIcS)}/>
                </Flex>
                <TextAlignCenter>Выкл. звук</TextAlignCenter>
              </Button>
            )] : [],
          ]
          if (!elems.length) return undefined
          if (elems.length === 1) return elems[0]
          if (elems.length === 2) return (
            <Grid cols='1fr auto 1fr' align g={8}>
              {elems[0]}
              {/* TODO Theme */}
              <Gap w={1} h={26} css={{ background: '#aaaaaa' }}/>
              {elems[1]}
            </Grid>
          )
          return undefined
        })()}
        
        
        {(() => {
          const elems = [
            ...hasUnarchived ? [(
              <Button row alignedStretch w='auto' center g={4}
                key='archive' onClick={() => onArchive?.()} css={ButtonS6.t(actionButtonS)}
              >
                <Flex center noShrink>
                  <ArchiveBoxOutlinedIc css={SvgIconS6.t(archiveIcS)}/>
                </Flex>
                <TextAlignCenter>В архив</TextAlignCenter>
              </Button>
            )] : [],
            ...hasUnblacklisted ? [(
              <Button row alignedStretch w='auto' center g={4}
                key='blacklist' onClick={() => onBlacklist?.()} css={ButtonS6.t(actionButtonS)}
              >
                <Flex center noShrink>
                  <BlacklistIc css={SvgIconS6.t(blacklistIcS)}/>
                </Flex>
                <TextAlignCenter>В чёрный список</TextAlignCenter>
              </Button>
            )] : [],
          ]
          if (!elems.length) return undefined
          if (elems.length === 1) return elems[0]
          if (elems.length === 2) return (
            <Grid cols='1fr auto 1fr' align g={8}>
              {elems[0]}
              {/* TODO Theme */}
              <Gap w={1} h={26} css={{ background: '#aaaaaa' }}/>
              {elems[1]}
            </Grid>
          )
          return undefined
        })()}
        
        
        {(() => {
          const elems = [
            ...hasRemovable ? [(
              <Button row alignedStretch w='auto' center g={4}
                key='remove' onClick={() => onRemove?.()} css={ButtonS6.t(actionButtonS)}
              >
                <Flex center noShrink>
                  <CrossInCircleIc css={SvgIconS6.t(removeIcS)}/>
                </Flex>
                <TextAlignCenter>Удалить</TextAlignCenter>
              </Button>
            )] : [],
            ...hasClearable ? [(
              <Button row alignedStretch w='auto' center g={4}
                key='clear' onClick={() => onClear?.()} css={ButtonS6.t(actionButtonS)}
              >
                <Flex center noShrink>
                  <RestrictIc css={SvgIconS6.t(deleteIcS)}/>
                </Flex>
                <TextAlignCenter>Очистить</TextAlignCenter>
              </Button>
            )] : [],
          ]
          if (!elems.length) return undefined
          if (elems.length === 1) return elems[0]
          if (elems.length === 2) return (
            <Grid cols='1fr auto 1fr' align g={8}>
              {elems[0]}
              {/* TODO Theme */}
              <Gap w={1} h={26} css={{ background: '#aaaaaa' }}/>
              {elems[1]}
            </Grid>
          )
          return undefined
        })()}
        
        
      </Flex>
    </ModalContextMenu>
  )
})
ChatListContextMenu.displayName = 'ChatListContextMenu'
export default ChatListContextMenu



const actionButtonS: AppWidgetStyle = t => [
  ButtonS6.S.text.rounded.sm.normal, {
    button: { ...virtualOffset({ v: 8 }), ph: 6, hMin: '' },
  },
]


const actionCrossS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  icon: {
    // TODO theme
    sz: 22, color: '#1F1F1F',
  },
}]


const pinIcS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  // TODO Theme
  icon: { sz: 26, color: '#80558c' },
}]

const soundOnIcS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  // TODO Theme
  icon: { sz: 26, color: '#c69477' },
}]

const archiveIcS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  // TODO Theme
  icon: { sz: 26, color: '#263238' },
}]
const blacklistIcS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  // TODO Theme
  icon: { sz: 26, color: '#263238', colorAcc: '#e53935' },
}]

const removeIcS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  // TODO Theme
  icon: { sz: 30, m: -2, color: '#e74c3c' },
}]
const deleteIcS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  // TODO Theme
  icon: { sz: 26, color: '#e74c3c' },
}]


