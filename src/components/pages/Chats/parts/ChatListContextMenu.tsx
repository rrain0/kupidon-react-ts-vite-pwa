
import { virtualOffset } from '@utils/css/virtualOffset.ts'
import React, { useEffect } from 'react'
import { AppWidgetStyle } from '@libs/widget-style-6/WidgetStyle.ts'
import Flex from '@libs/short-propsed/components/Flex.tsx'
import Gap from '@libs/short-propsed/components/Gap.tsx'
import Grid from '@libs/short-propsed/components/Grid.tsx'
import TextAlignCenter from 'src/components/elems/basic-elements/TextAlignCenter.tsx'
import Button from 'src/components/elems/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/components/elems/buttons/Button/ButtonS6.ts'
import BlacklistIc from 'src/components/elems/icons/SvgIcons/pack/special/BlacklistIc.tsx'
import ArchiveBoxOutlinedIc from 'src/components/elems/icons/SvgIcons/pack/ui/ArchiveBoxOutlinedIc.tsx'
import CrossInCircleIc from 'src/components/elems/icons/SvgIcons/pack/ui/CrossInCircleIc.tsx'
import Pin2Ic from 'src/components/elems/icons/SvgIcons/pack/ui/Pin2Ic.tsx'
import RestrictIc from 'src/components/elems/icons/SvgIcons/pack/ui/RestrictIc.tsx'
import SoundOffIc from 'src/components/elems/icons/SvgIcons/pack/ui/SoundOffIc.tsx'
import SoundOnIc from 'src/components/elems/icons/SvgIcons/pack/ui/SoundOnIc.tsx'
import Unpin2Ic from 'src/components/elems/icons/SvgIcons/pack/ui/Unpin2Ic.tsx'
import { SvgIconS6 } from 'src/components/elems/icons/SvgIcons/SvgIconS6.ts'
import ModalContextMenu from 'src/components/widgets/modals/ModalContextMenu/ModalContextMenu.tsx'
import ModalDialog from 'src/components/widgets/modals/ModalDialog/ModalDialog.tsx'
import ModalTileSelect from 'src/components/widgets/modals/ModalTileSelect/ModalTileSelect.tsx'
import { useOverlayUrl } from 'src/components/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { Pu } from '@utils/base/TypeUtils.ts'
import { Callback } from '@utils/base/TypeUtils.ts'
import CrossIc from 'src/components/elems/icons/SvgIcons/pack/ui/CrossIc.tsx'





const chatItemsContextMenuOverlayName = 'chatItemsContextMenu'
const removeChatItemsDialogOverlayName = 'removeChatItemsDialog'
const muteChatItemsDialogOverlayName = 'muteChatItemsDialog'




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
  onPin: Callback,
  onUnpin: Callback
  onUnmute: Callback,
  onMute: Callback
  onArchive: Callback
  onBlacklist: Callback
  onRemove: (params?: Pu<{ removeForAll: boolean }>) => void
  onClear: Callback
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
  
  
  
  const { isOpen, open, close } = useOverlayUrl(chatItemsContextMenuOverlayName)
  
  useEffect(() => {
    if (selected && !isOpen) open()
    if (!selected && isOpen) close()
  }, [!!selected])
  useEffect(() => {
    if (isOpen && !selected) close()
    if (!isOpen && selected) onUnselect?.()
  }, [isOpen])
  
  
  
  
  const {
    isOpen: isConfirmRemoveOpen, open: openConfirmRemove, close: closeConfirmRemove,
  } = useOverlayUrl(removeChatItemsDialogOverlayName)
  
  const {
    isOpen: isMuteOpen, open: openMute, close: closeMute,
  } = useOverlayUrl(muteChatItemsDialogOverlayName)
  
  
  return (
    <ModalContextMenu isOpen={isOpen}>
      <>
        
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
                  key='mute' onClick={() => openMute()} css={ButtonS6.t(actionButtonS)}
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
                  key='remove' onClick={openConfirmRemove} css={ButtonS6.t(actionButtonS)}
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
        
        {/* TODO Translate */}
        <ModalDialog
          isOpen={isConfirmRemoveOpen}
          type='danger'
          title={'Удалить выбранные чаты?'}
          checkboxes={[{
            name: 'removeForAll', title: 'Удалить для всех', initialChecked: false,
          }]}
          onModal={closeConfirmRemove}
          onBack={closeConfirmRemove}
          onYes={({ checks: { removeForAll } }) => {
            closeConfirmRemove()
            onRemove?.({ removeForAll })
          }}
        />
        
        <ModalTileSelect
          isOpen={isMuteOpen} onClose={closeMute}
          title={'Выкл. звук'}
          options={[
            { id: '30m', text: '30м' },
            { id: '1h', text: '1ч' },
            { id: '2h', text: '2ч' },
            { id: '4h', text: '4ч' },
            { id: '8h', text: '8ч' },
            { id: '10h', text: '10ч' },
            { id: '2d', text: '2д' },
            { id: '5d', text: '5д' },
            { id: '1w', text: '1н' },
            { id: '∞', text: '∞' },
          ]}
          setSelected={() => { closeMute(); onMute?.() }}
        />
      
      </>
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


