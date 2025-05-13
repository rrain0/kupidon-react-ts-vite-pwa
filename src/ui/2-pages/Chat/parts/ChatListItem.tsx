import { animatedMapMulti } from '@animated/AnimatedMultiComputed.ts'
import { AnimatedProperty } from '@animated/AnimatedProperty.ts'
import AnimatedDiv from '@animated/elements/AnimatedDiv.tsx'
import styled from '@emotion/styled'
import { TypeU } from '@util/common/TypeU.ts'
import { useAsCallback } from '@util/react-state/useAsCallback.ts'
import { withDefaults } from '@util/react/withDefaults.tsx'
import { useElemRefGetSet } from '@util/view/useElemRefGetSet.ts'
import React, { useEffect } from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import { UiItemData } from 'src/ui/2-pages/Chat/parts/ChatList.tsx'
import ChatListItemWidget from 'src/ui/2-pages/Chat/parts/ChatListItemWidget.tsx'
import ChatListItemButton from 'src/ui/2-pages/Chat/parts/ChatListItemButton.tsx'
import Pu = TypeU.Pu
import SetterOrUpdater = TypeU.SetterOrUpdater
import Callback1 = TypeU.Callback1
import toEmptyAttr = TypeU.toEmptyAttr
import gridStackC = EmotionCommon.gridStackC


const g = 14
const r = 20
const mv = -6
const mh = -8
const h = 72
const hItem = h + mv


// const addTime = 300 //ms
// const removeTime = 300 //ms
// const replaceTime = 300 //ms
const addTime = 2000 //ms
const removeTime = 2000 //ms
const replaceTime = 2000 //ms




export type ChatListItemProps = UiItemData & Pu<{
  first: boolean
  isSelected: boolean
  isAnySelected: boolean
  toggleSelection: Callback1<string>
  setLastPointerDownItemId: (id: string) => void
  
  setUiItems: SetterOrUpdater<UiItemData[]>
  animatedMxMy: AnimatedProperty<{ mx: number, my: number }>
  animatedOffset: AnimatedProperty<number>
}>
const ChatListItem = React.memo(({
  first, isSelected, isAnySelected, toggleSelection, setLastPointerDownItemId,
  setUiItems, animatedMxMy, animatedOffset,
  ...uiItem
}: ChatListItemProps) => {
  const { item, state: s } = uiItem
  const { id } = item
  
  const canSelect = s !== 'removing'
  
  const onClick = useAsCallback(() => {
    if (isAnySelected && canSelect) toggleSelection?.(id)
  })
  const onLongPress = useAsCallback(() => {
    if (canSelect) toggleSelection?.(id)
  })
  const onPointerDown = useAsCallback(() => setLastPointerDownItemId?.(id))
  
  const [getGapSlot, setGapSlot] = useElemRefGetSet()
  
  useEffect(() => {
    const el = getGapSlot()
    let stale = false
    if (el) {
      if (s === 'adding') {
        const t = addTime
        el.style.transition =
          `height ${t}ms linear` +
          `, margin-top ${t}ms linear` +
          `, opacity ${t * 0.75}ms ${t * 0.25}ms ${StyleVals.easeInQuad}`
        el.style.height = `${hItem}px`
        el.style.marginTop = `${g}px`
        el.style.opacity = '1'
        el.ontransitionend = ev => requestAnimationFrame(() => {
          if (stale || ev.propertyName !== 'height') return
          el.ontransitionend = null
          setUiItems?.(items => items.map(it => {
            if (it.item.id === id && it.state === 'adding') return { ...it, state: 'showing' }
            return it
          }))
        })
      }
      else if (s === 'removing') {
        const t = removeTime
        el.style.transition =
          `height ${t}ms linear` +
          `, margin-top ${t}ms linear` +
          `, opacity ${t / 2}ms ${StyleVals.easeInQuad}`
        el.style.height = '0'
        el.style.marginTop = '0'
        el.style.opacity = '0'
        el.ontransitionend = ev => requestAnimationFrame(() => {
          if (stale || ev.propertyName !== 'height') return
          el.ontransitionend = null
          setUiItems?.(items => items.filter(it => {
            if (it.item.id === id && it.state === 'removing') return false
            return true
          }))
        })
      }
    }
    return () => { stale = true }
  }, [s])
  
  
  
  return (
    <ChatListItemGapSlot alignSelf='stretch' h={hItem} mt={g}
      ref={setGapSlot}
      style={{
        ...s === 'adding' && { height: 0, opacity: 0, marginTop: 0 },
        ...first && { marginTop: 0 },
      }}
    >
      <ChatListItemSlot alignSelf='stretch' h={h} hMin={h} hMax={h} mv={mv} mh={mh}>
        
        {isSelected && <ChatListItemPlaceholder full/>}
        
        <ChatListItemAnimated pos='rel' full col alignSelf='stretch'
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
          <ChatListItemBox alignSelf='stretch' h={h}>
            <ChatListItemButton
              disabled={!canSelect}
              data-selected={toEmptyAttr(isSelected)}
              item={item}
              onPointerDown={onPointerDown}
              onClick={onClick}
              onLongPress={onLongPress}
            />
          </ChatListItemBox>
        </ChatListItemAnimated>
      
      </ChatListItemSlot>
    </ChatListItemGapSlot>
  )
})
export default ChatListItem




const ChatListItemGapSlot = withDefaults({

}, styled(Flex)())
const ChatListItemSlot = withDefaults({
  r,
}, styled(Flex)([gridStackC]))

const ChatListItemAnimated = withDefaults({
  r,
}, styled(AnimatedDiv)({
  overflow: 'hidden',
}))
const ChatListItemBox = withDefaults({
  r,
}, styled(Flex)([gridStackC, {
  // TODO Theme
  backgroundColor: 'white',
}]))


const ChatListItemPlaceholder = withDefaults({
  r,
}, styled(Flex)(({ theme: t }) => ({
  backgroundColor: t.boxNormalCt.bgf,
})))





