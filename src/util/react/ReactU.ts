import clsx from 'clsx'
import React, { CSSProperties, useEffect } from 'react'
import { TypeU } from 'src/util/common/TypeU.ts'
import Pu = TypeU.Pu
import falsy = TypeU.falsy




export namespace ReactU {
  
  export type Children = Pu<{ children: React.ReactNode }>
  export type ClassStyle = Pu<{
    className: string
    style: CSSProperties
  }>
  export type OnClick<E = Element> = React.MouseEventHandler<E>
  export type First = Pu<{ first: boolean }>
  export type Last = Pu<{ last: boolean }>
  
  
  
  export const effectLog = (...args: any[]) => useEffect(() => console.log(...args), args)
  
  let prevLog
  export const noRepeatLog = (...args: any[]) => {
    if (JSON.stringify(prevLog) !== JSON.stringify(args)) {
      prevLog = args
      console.log(...args)
    }
  }
  
  
  
  
  
  
  
  // use (<T>() => React.memo(  (props: { prop: T }) => <></>  ))() instead of this hack
  // todo hack fix for TS
  // React.memo wrapper if component's generics are not consumed properly by TS
  /* export const memo = <C>(Component: C): C => {
    return React.memo(Component as any) as C
  } */
  
  
  
  
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
          else if (prop === 'style') {
            combinedProps[prop] = { ...combinedProps[prop], ...value }
          }
          else if (prop === 'className') {
            combinedProps[prop] = clsx(combinedProps[prop], value)
          }
          
        }
        else combinedProps[prop] = value
      }
    }
    return combinedProps
  }
  
  
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


