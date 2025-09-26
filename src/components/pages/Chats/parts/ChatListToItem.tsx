import { animatedMapMulti } from '@animated/AnimatedMultiComputed.ts'
import { AnimatedProperty } from '@animated/AnimatedProperty.ts'
import AnimatedDiv from '@animated/elems/AnimatedDiv.tsx'
import styled from '@emotion/styled'

import { useWasGesture } from '@utils/app/gestures/useWasGesture.ts'
import { useAsCallback } from '@utils/state/react/base/useAsCallback.ts'
import { flexStyle } from '@libs/short-propsed/style/flexStyle.ts'
import { useElemRefGetSet } from '@utils/elem/react/useElemRefGetSet.ts'
import React, { useEffect } from 'react'
import { AppRoutes } from 'src/configs/AppRoutes.ts'
import { RouteBuilder } from '@libs/route-builder/RouteBuilder.tsx'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { StyleVals } from 'src/styles/StyleVals.ts'
import Flex from '@libs/short-propsed/components/Flex.tsx'
import { UiItemData } from 'src/components/pages/Chats/parts/ChatList.tsx'
import ChatListItemButton from 'src/components/pages/Chats/parts/ChatListItemButton.tsx'
import AppLink from 'src/components/components/app-router/AppLink.tsx'
import { Pu } from '@utils/base/tsUtils.ts'
import { SetterOrUpdater } from '@utils/base/tsUtils.ts'
import { Cb1 } from '@utils/base/tsUtils.ts'
import { toEmptyAttr } from '@utils/base/tsUtils.ts'
import gridStackC = EmotionCommon.gridStackC
import RootRoute = AppRoutes.RootRoute
import use = RouteBuilder.use



const g = 14
const rad = 20
const mv = -6
const mh = -8
const h = 72
const hItem = h + mv


// const addTime = 300 //ms
// const removeTime = 300 //ms
// const replaceTime = 300 //ms
const addTime = 250 //ms
const removeTime = 250 //ms
const replaceTime = 2000 //ms




export type ChatListToItemProps = UiItemData & Pu<{
  first: boolean
  isSelected: boolean
  isAnySelected: boolean
  toggleSelection: Cb1<string>
  setLastPointerDownItemId: (id: string) => void
  
  setUiItems: SetterOrUpdater<UiItemData[] | undefined>
  animatedMxMy: AnimatedProperty<{ mx: number, my: number }>
  animatedOffset: AnimatedProperty<number>
}>
const ChatListToItem = React.memo(({
  first, isSelected, isAnySelected, toggleSelection, setLastPointerDownItemId,
  setUiItems, animatedMxMy, animatedOffset,
  ...uiItem
}: ChatListToItemProps) => {
  const { item, state: s } = uiItem
  const { id } = item
  
  const { getWasGesture } = useWasGesture()
  
  const canSelect = s !== 'removing'
  
  const onClick = useAsCallback(() => {
    if (isAnySelected && canSelect) toggleSelection?.(id)
  })
  const onLongPress = useAsCallback(() => {
    if (canSelect) toggleSelection?.(id)
  })
  const onPointerDown = useAsCallback(() => setLastPointerDownItemId?.(id))
  
  const [getGapSlotElem, setGapSlotElem] = useElemRefGetSet()
  
  useEffect(() => {
    const el = getGapSlotElem()
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
          setUiItems?.(items => items?.map(it => {
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
          setUiItems?.(items => items?.filter(it => {
            if (it.item.id === id && it.state === 'removing') return false
            return true
          }))
        })
      }
    }
    return () => { stale = true }
  }, [s])
  
  
  
  return (
    <ListSlot alignedStretch h={hItem} mt={g}
      data-display-name='ChatListToItem'
      ref={setGapSlotElem}
      style={{
        ...s === 'adding' && { height: 0, opacity: 0, marginTop: 0 },
        ...first && { marginTop: 0 },
      }}
    >
      <ItemSlot alignedStretch h={h} hMin={h} hMax={h} mv={mv} mh={mh}>
        
        {isSelected && <ItemPlaceholder full/>}
        
        <ItemAnimated alignedStretch pos='rel' full col
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
          <ItemBox alignedStretch h={h}>
            <AppLink toFull={RootRoute.chat.id.id[use](id)}
              onClick={ev => {
                if (getWasGesture() || isAnySelected) ev.preventDefault(); ev.stopPropagation()
              }}
            >
              <ChatListItemButton
                disabled={!canSelect}
                data-selected={toEmptyAttr(isSelected)}
                item={item}
                onPointerDown={onPointerDown}
                onClick={onClick}
                onLongPress={onLongPress}
              />
            </AppLink>
          </ItemBox>
        </ItemAnimated>
      
      </ItemSlot>
    </ListSlot>
  )
})
ChatListToItem.displayName = 'ChatListToItem'
export default ChatListToItem




const ListSlot = styled(Flex)()
const ItemSlot = styled(Flex)(gridStackC)

const ItemAnimated = styled(AnimatedDiv)(flexStyle({
  rad, noOverflow: true,
}))
const ItemBox = styled(Flex)([gridStackC, flexStyle({
  // TODO Theme
  rad, bgColor: 'white',
})])

const ItemPlaceholder = styled(Flex)(({ theme: t }) => ({
  rad, bgColor: t.boxNormalCt.bgf,
}))





