import React, { CSSProperties, useEffect } from 'react'
import { TypeU } from 'src/util/common/TypeU.ts'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet.ts'
import Puro = TypeU.Puro
import falsy = TypeU.falsy




export namespace ReactU {
  
  export type Children = Puro<{ children: React.ReactNode }>
  export type ClassStyle = Puro<{
    className: string
    style: CSSProperties
  }>
  export type First = Puro<{ first: boolean }>
  export type Last = Puro<{ last: boolean }>
  
  
  
  export const effectLog = (...args: any[]) => useEffect(() => console.log(...args), args)
  
  
  
  // Consume Pointer & Wheel events
  export const stopPointerAndMouseEvents = (stop = true) => {
    if (!stop) return undefined
    return {
      onClick: stopReactEventPropagation,
      
      onMouseDown: stopReactEventPropagation,
      onMouseMove: stopReactEventPropagation,
      onMouseUp: stopReactEventPropagation,
      onMouseOut: stopReactEventPropagation,
      
      onMouseEnter: stopReactEventPropagation,
      onMouseOver: stopReactEventPropagation,
      onMouseLeave: stopReactEventPropagation,
      
      onWheel: stopReactEventPropagation,
      
      onPointerDown: stopReactEventPropagation,
      onPointerMove: stopReactEventPropagation,
      onPointerUp: stopReactEventPropagation,
      onPointerOut: stopReactEventPropagation,
      onPointerCancel: stopReactEventPropagation,
      
      onPointerEnter: stopReactEventPropagation,
      onPointerOver: stopReactEventPropagation,
      onPointerLeave: stopReactEventPropagation,
      
      onTouchStart: stopReactEventPropagation,
      onTouchMove: stopReactEventPropagation,
      onTouchEnd: stopReactEventPropagation,
      onTouchCancel: stopReactEventPropagation,
    }
  }
  
  
  
  export const useOnThisClick = <T extends Element>() => {
    const [getCanCloseByClickEv, setCanCloseByClickEv] = useRefGetSet(0)
    
    return (onClick?: React.MouseEventHandler<T>) => ({
      onPointerDown: (ev: React.PointerEvent) => {
        if (ev.currentTarget === ev.target) setCanCloseByClickEv(1)
      },
      onPointerUp: (ev: React.PointerEvent) => {
        if (ev.currentTarget === ev.target && getCanCloseByClickEv() === 1) {
          setCanCloseByClickEv(2)
        }
      },
      onClick: (ev: React.MouseEvent<T>) => {
        if (getCanCloseByClickEv() === 2) onClick?.(ev)
        setCanCloseByClickEv(0)
      },
    })
  }
  
  
  
  // todo hack fix for click
  // TODO Pointer // TODO костыль для клика.
  //  Без костыля если при закрывании шторки на андроиде жать кнопку, то клик не работает, хотя всё ок.
  export const useClickFix = <E extends HTMLElement = HTMLElement>() => {
    const [getWasClicked, setWasClicked] = useRefGetSet(0)
    return {
      onPointerDown: (ev: React.PointerEvent) => {
        // Pointer & Mouse Left Button is 0
        if (ev.button === 0) setWasClicked(1)
      },
      onPointerUp: (ev: React.PointerEvent<E>) => {
        if (getWasClicked() === 1) {
          setWasClicked(2)
          const ct = ev.currentTarget
          setTimeout(() => {
            if (getWasClicked() === 2) ct.click()
          }, 50)
        }
      },
      onClick: (ev: React.MouseEvent) => {
        setWasClicked(3)
      },
    } as const
  }
  
  
  
  // todo hack fix for TS
  // React.memo wrapper if component's generics are not consumed properly by TS
  export const memo = <C>(Component: C): C => {
    return React.memo(Component as any) as C
  }
  
  
  
  
  export const combineProps = <T extends (object | falsy)[]>(
    ...propsList: T
  ): T[number] & object => {
    const combinedProps = { ...propsList?.[0] }
    for (let i = 1; i < propsList.length; i++) {
      const props = propsList[i]
      if (props) for (const [prop, value] of Object.entries(props)) {
        if (Object.hasOwn(combinedProps, prop)) {
          if (funProps.has(prop)) {
            const prevFun = combinedProps[prop]
            if (!prevFun) combinedProps[prop] = value
            else if (value) {
              combinedProps[prop] = (...args) => {
                prevFun(...args)
                value(...args)
              }
            }
          }
        }
        else combinedProps[prop] = value
      }
    }
    return combinedProps
  }
  
  
}





const stopReactEventPropagation = (ev: React.BaseSyntheticEvent) => {
  ev.stopPropagation()
}


const funProps = new Set([
  'onClick', 'onCopy', 'onCopyCapture', 'onCut',
  'onCutCapture', 'onPaste', 'onPasteCapture',
  
  'onCompositionEnd', 'onCompositionEndCapture',
  'onCompositionStart', 'onCompositionStartCapture',
  'onCompositionUpdate', 'onCompositionUpdateCapture',
  
  'onFocus', 'onFocusCapture', 'onBlur', 'onBlurCapture',
  
  'onChange', 'onChangeCapture', 'onBeforeInput', 'onBeforeInputCapture',
  'onInput', 'onInputCapture', 'onReset', 'onResetCapture',
  'onSubmit', 'onSubmitCapture', 'onInvalid', 'onInvalidCapture',
  
  'onLoad', 'onLoadCapture', 'onError', 'onErrorCapture',
  
  'onKeyDown', 'onKeyDownCapture', 'onKeyPress', 'onKeyPressCapture',
  'onKeyUp', 'onKeyUpCapture',
  
  'onAbort', 'onAbortCapture', 'onCanPlay', 'onCanPlayCapture',
  'onCanPlayThrough', 'onCanPlayThroughCapture',
  'onDurationChange', 'onDurationChangeCapture',
  'onEmptied', 'onEmptiedCapture', 'onEncrypted', 'onEncryptedCapture',
  'onEnded', 'onEndedCapture', 'onLoadedData', 'onLoadedDataCapture',
  'onLoadedMetadata', 'onLoadedMetadataCapture', 'onLoadStart', 'onLoadStartCapture',
  'onPause', 'onPauseCapture', 'onPlay', 'onPlayCapture',
  'onPlaying', 'onPlayingCapture', 'onProgress', 'onProgressCapture',
  'onRateChange', 'onRateChangeCapture', 'onResize', 'onResizeCapture',
  'onSeeked', 'onSeekedCapture', 'onSeeking', 'onSeekingCapture',
  'onStalled', 'onStalledCapture', 'onSuspend', 'onSuspendCapture',
  'onTimeUpdate', 'onTimeUpdateCapture', 'onVolumeChange', 'onVolumeChangeCapture',
  'onWaiting', 'onWaitingCapture',
  
  'onAuxClick', 'onAuxClickCapture', 'onClick', 'onClickCapture',
  'onContextMenu', 'onContextMenuCapture', 'onDoubleClick', 'onDoubleClickCapture',
  'onDrag', 'onDragCapture', 'onDragEnd', 'onDragEndCapture',
  'onDragEnter', 'onDragEnterCapture', 'onDragExit', 'onDragExitCapture',
  'onDragLeave', 'onDragLeaveCapture', 'onDragOver', 'onDragOverCapture',
  'onDragStart', 'onDragStartCapture', 'onDrop', 'onDropCapture',
  'onMouseDown', 'onMouseDownCapture', 'onMouseEnter', 'onMouseLeave',
  'onMouseMove', 'onMouseMoveCapture', 'onMouseOut', 'onMouseOutCapture',
  'onMouseOver', 'onMouseOverCapture', 'onMouseUp', 'onMouseUpCapture',
  
  'onSelect', 'onSelectCapture',
  
  'onTouchCancel', 'onTouchCancelCapture', 'onTouchEnd', 'onTouchEndCapture',
  'onTouchMove', 'onTouchMoveCapture', 'onTouchStart', 'onTouchStartCapture',
  
  'onPointerDown', 'onPointerDownCapture', 'onPointerMove', 'onPointerMoveCapture',
  'onPointerUp', 'onPointerUpCapture', 'onPointerCancel', 'onPointerCancelCapture',
  'onPointerEnter', 'onPointerLeave', 'onPointerOver', 'onPointerOverCapture',
  'onPointerOut', 'onPointerOutCapture',
  'onGotPointerCapture', 'onGotPointerCaptureCapture',
  'onLostPointerCapture', 'onLostPointerCaptureCapture',
  
  'onScroll', 'onScrollCapture',
  
  'onWheel', 'onWheelCapture',
  
  
  'onAnimationStart', 'onAnimationStartCapture',
  'onAnimationEnd', 'onAnimationEndCapture',
  'onAnimationIteration', 'onAnimationIterationCapture',
  
  'onTransitionEnd', 'onTransitionEndCapture',
])


