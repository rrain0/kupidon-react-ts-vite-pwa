import { flexStyle } from '@util/react/short-props/style/flexStyle.ts'
import { useElemRefGetSet } from '@util/view/useElemRefGetSet.ts'
import React, { useEffect, useState } from 'react'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import SearchIc = SvgIconsPack.SearchIc
import PlusIc = SvgIconsPack.PlusIc



const expandingTime = 300
const collapsingTime = 300
const sz = 42
const g = 8

const ChatListActionBar = React.memo(() => {
  
  type State = 'collapsed' | 'collapsing' | 'expanded' | 'expanding'
  const [state, setState] = useState<{ v: State }>({ v: 'collapsed' })
  
  const [getActionBarEl, setActionBarEl] = useElemRefGetSet()
  const [getPlusBoxEl, setPlusBoxEl] = useElemRefGetSet()
  const [getInputBoxEl, setInputBoxEl] = useElemRefGetSet()
  
  useEffect(() => {
    let stale = false
    const actionBar = getActionBarEl()
    const inputBox = getInputBoxEl()
    const plusBox = getPlusBoxEl()
    if (actionBar && inputBox && plusBox) {
      if (state.v === 'expanding') {
        const time = expandingTime
        //inputBox.style.display = 'flex'
        requestAnimationFrame(() => {
          actionBar.style.transition = `width ${time}ms linear`
          actionBar.style.width = '100%'
          // inputBox.style.display = 'flex'
          // inputBox.style.transition = `width ${time}ms linear, padding-right ${time}ms linear`
          // inputBox.style.width = '150px'
          // inputBox.style.paddingRight = `${g}px`
          plusBox.style.transition = `width ${time}ms linear, padding-left ${time}ms linear`
          plusBox.style.display = 'flex'
          plusBox.style.width = '0'
          plusBox.style.paddingLeft = '0'
        })
        plusBox.ontransitionend = ev => requestAnimationFrame(() => {
          if (stale) return
          plusBox.ontransitionend = null
          setState(curr => curr === state ? { v: 'expanded' } : curr)
        })
      }
      else if (state.v === 'expanded') {
        actionBar.style.transition = 'none'
        actionBar.style.width = '100%'
        // inputBox.style.display = 'flex'
        // inputBox.style.transition = 'none'
        // inputBox.style.width = '150px'
        // inputBox.style.paddingRight = `${g}px`
        plusBox.style.display = 'none'
        plusBox.style.transition = 'none'
        plusBox.style.width = '0'
        plusBox.style.paddingLeft = '0'
        plusBox.ontransitionend = null
      }
      else if (state.v === 'collapsing') {
        const time = collapsingTime
        plusBox.style.display = 'flex'
        requestAnimationFrame(() => {
          if (stale) return
          actionBar.style.transition = `width ${time}ms linear`
          actionBar.style.width = `${sz + g + sz}px`
          // inputBox.style.display = 'flex'
          // inputBox.style.transition = `width ${time}ms linear, padding-right ${time}ms linear`
          // inputBox.style.width = '0'
          // inputBox.style.paddingRight = '0'
          plusBox.style.display = 'flex'
          plusBox.style.transition = `width ${time}ms linear, padding-left ${time}ms linear`
          plusBox.style.width = `${sz}px`
          plusBox.style.paddingLeft = `${g}px`
          plusBox.ontransitionend = ev => requestAnimationFrame(() => {
            if (stale) return
            plusBox.ontransitionend = null
            setState(curr => curr === state ? { v: 'collapsed' } : curr)
          })
        })
      }
      else if (state.v === 'collapsed') {
        actionBar.style.transition = 'none'
        actionBar.style.width = `${sz + g + sz}px`
        // inputBox.style.display = 'none'
        // inputBox.style.transition = 'none'
        // inputBox.style.width = '0'
        // inputBox.style.paddingRight = '0'
        plusBox.style.display = 'flex'
        plusBox.style.transition = 'none'
        plusBox.style.width = `${sz}px`
        plusBox.style.paddingLeft = `${g}px`
        plusBox.ontransitionend = null
      }
    }
    return () => { stale = true }
  }, [state])
  
  const onSearchClick = () => {
    if (state.v === 'expanded' || state.v === 'expanding') setState({ v: 'collapsing' })
    if (state.v === 'collapsed' || state.v === 'collapsing') setState({ v: 'expanding' })
  }
  
  
  return (
    <Flex row h={50} m={10} p={4} stretchEnd
      data-display-name='ChatListActionBar'
    >
      <Flex row round contentBox m={-4} p={4} ref={setActionBarEl}
        css={{
          backgroundColor: '#00000011',
          backdropFilter: 'blur(20px)',
        }}
      >
        
        <Flex row grow h='full' wMin={0} round noOverflow ref={setInputBoxEl}>
          <Flex row grow relative h='full' pr={g}>
            <input
              css={flexStyle({
                sz: 'full', round: true, pl: 16, pr: 36, pv: 4,
                bg: '#ffffff', border: 'none',
              })}
              placeholder='Поиск'
            />
          </Flex>
        </Flex>
        
        <Button noShrink
          css={IconButtonS6.t(actionButtonS)}
          onClick={onSearchClick}
        >
          <SearchIc/>
        </Button>
        
        <Flex row contentBox w={sz} pl={g} noShrink ref={setPlusBoxEl}>
          <Button
            css={IconButtonS6.t(actionButtonS)}
          >
            <PlusIc/>
          </Button>
        </Flex>
      
      </Flex>
    </Flex>
  )
})
ChatListActionBar.displayName = 'ChatListActionBar'
export default ChatListActionBar



const actionButtonS: AppWidgetStyle = t => [
  IconButtonS6.S.trans.round.lg2.secondary, {
    button: { h: 'full', w: 'auto', ratio: 1, p: 8 },
    icon: { color: t.boxAccentCt4.ct },
  },
]