import { css } from '@emotion/react'
import { animated, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { ReactDOMAttributes } from '@use-gesture/react/src/types.ts'
import { MathUtils } from '@util/common/MathUtils.ts'
import { getElemProps } from '@util/element/ElemProps.ts'
import { useAwaitMounting } from '@util/react/useAwaitMounting.ts'
import { useNoSelect } from '@util/react/useNoSelect.ts'
import { useRef2 } from '@util/react/useRef2.ts'
import clsx from 'clsx'
import React, { useImperativeHandle, useRef, useState } from 'react'
import { TypeUtils } from 'src/util/common/TypeUtils'
import { AppTheme } from '@util/theme/AppTheme.ts'
import PartialUndef = TypeUtils.PartialUndef
import fitRange = MathUtils.fitRange
import mapRange = MathUtils.mapRange
import Mapper = TypeUtils.Mapper
import SetterOrUpdater = TypeUtils.SetterOrUpdater
import NumRange = TypeUtils.NumRange
import mapFitRange = MathUtils.mapFitRange
import zeroBasedRange = MathUtils.zeroBasedRange





/*
Фичи:
  1) Невозможно установить неправильный range из UI
  2) отображение неправильного рэнджа как правильного (left в приоритете)
 
тодо:
  1) Ступенчатый Range Picker
     Добавить тень, которая будет двигаться вместе с пальцем
     Обычный бар будет двигаться дискретно
     Сделать пропсы как на обычный бар, так и на тень
  2) Выделение концов по нажатию (событие active)
*/




const tipWidth = 27



export type RangePickerCustomProps = {
  minMax: NumRange
  range: NumRange
  setRange: SetterOrUpdater<NumRange>
} & PartialUndef<{
  toDisplayedRange: Mapper<NumRange> // можно сделать ступенчатый прогресс
}>
export type RangePickerForwardRefProps = Omit<React.JSX.IntrinsicElements['div'], 'children'>
export type RangePickerRefElement = HTMLDivElement
export type RangePickerProps = RangePickerCustomProps & RangePickerForwardRefProps



const RangePicker =
React.memo(
React.forwardRef<RangePickerRefElement, RangePickerProps>(
(props, forwardedRef) => {
  const {
    minMax,
    range,
    setRange,
    toDisplayedRange,
    className,
    ...restProps
  } = props
  
  const trackRef = useRef<RangePickerRefElement>(null)
  useImperativeHandle(forwardedRef, ()=>trackRef.current!,[])
  
  const getTrackDimens = () => {
    const trackProps = {
      vpx: 0,
      width: 0,
    }
    const track = trackRef.current
    if (track) {
      const d = getElemProps(track)
      trackProps.vpx = d.vpXFloat
      trackProps.width = d.widthFloat
    }
    return trackProps
  }
  
  
  const [isDragging, setIsDragging] = useState(false)
  const [getActiveTip, setActiveTip] = useRef2(null as 'left' | 'right' | null)
  
  
  // % of bar handle values width
  const [getStartProgress, setStartProgress] = useRef2(0)
  const [getCurrProgress, setCurrProgress] = useRef2(0)
  // todo add px distance between start & curr progress
  
  // noinspection JSVoidFunctionReturnValueUsed
  const onTrackDrag = useDrag(
    gesture=>{
      const {
        first, active, last,
        xy: [vpx, vpy],
        movement: [mx, my],
        delta: [dx, dy],
      } = gesture
      
      const trackDimens = getTrackDimens()
      
      const dPxToDProgress = (dPx: number) => mapRange(
        dPx,
        [0, (trackDimens.width - 2*tipWidth)],
        [0, 100]
      )
      const dProgressToDValue = (dProgress: number) => mapRange(
        dProgress,
        [0, 100],
        zeroBasedRange(minMax)
      )
      const progressToValue = (progress: number) => fitRange(
        minMax[0] + dProgressToDValue(progress),
        minMax
      )
      
      if (first) {
        setActiveTip(null)
        setStartProgress(0)
        setCurrProgress(0)
        setIsDragging(true)
        
        const leftInnerPxBound = trackDimens.vpx + tipWidth
        const rightInnerPxBound = trackDimens.vpx + trackDimens.width - tipWidth
        
        const leftInnerPx = mapFitRange(
          range[0],
          minMax,
          [leftInnerPxBound, rightInnerPxBound]
        )
        const rightInnerPx = mapFitRange(
          range[1],
          minMax,
          [leftInnerPxBound, rightInnerPxBound]
        )
        
        const innerPxAvg = (leftInnerPx + rightInnerPx)/2
        setActiveTip(vpx < innerPxAvg ? 'left' : 'right')
        
        const leftStartProgress = dPxToDProgress(vpx - (trackDimens.vpx + 1/2*tipWidth))
        const rightStartProgress = dPxToDProgress(vpx - (trackDimens.vpx + 3/2*tipWidth))
        
        if (getActiveTip() === 'left') {
          setStartProgress(leftStartProgress)
        }
        if (getActiveTip() === 'right') {
          setStartProgress(rightStartProgress)
        }
      }
      if (active) {
        /*
         todo
          1) произошёл сдвиг виджета на экране - пофиг, работаем так, как будто его не двигали
          2) произошло расширение / сужение виджета - учитываем это
          3) снаружи изменили рэндж - учитываем это
        */
        
        const dProgress = dPxToDProgress(dx)
        /* console.log({
          startProgress: getStartProgress(),
          currProgress: getCurrProgress(),
          newCurrProgress: getCurrProgress() + dProgress,
        }) */
        setCurrProgress(getCurrProgress() + dProgress)
        
        //const dValue = dProgressToDValue(dProgress)
        if (getActiveTip() === 'left') {
          setRange(s => {
            const v = fitRange(
              progressToValue(getStartProgress() + getCurrProgress()),
              [minMax[0], s[1]]
            )
            return [v, s[1]]
          })
        }
        if (getActiveTip() === 'right') {
          setRange(s=>{
            const v = fitRange(
              progressToValue(getStartProgress() + getCurrProgress()),
              [s[0], minMax[1]]
            )
            return [s[0], v]
          })
        }
      }
      if (last) {
        setIsDragging(false)
      }
    }
  ) as ()=>ReactDOMAttributes
  
  
  
  
  // forbid draw to screen before data from element ref are available
  useAwaitMounting()
  
  // forbid content selection for all elements while dragging scrollbar
  useNoSelect(isDragging)
  
  
  
  const trackProps = {
    className: clsx(className, /* ScrollbarVerticalStyle.El.track.name */),
    /* [ScrollbarVerticalStyle.Attr.active.name]: trueOrUndef(isDragging), */
    ...restProps,
    ref: trackRef,
  }
  
  const trackW = getTrackDimens().width
  const progressLeft = mapFitRange(range[0], minMax, [0, 100])
  const progressRight = mapFitRange(range[1], minMax, [0, 100], [progressLeft, 100])
  const percentLeft = mapRange(
    progressLeft,
    [0, 100],
    [0, 100 * (trackW - 2*tipWidth) / trackW ]
  )
  const percentRight = 100 - mapRange(
    progressRight,
    [0, 100],
    [100 * 2*tipWidth / trackW, 100]
  )
  
  /* console.log({
    percentLeft,
    percentRight,
    rangeLeft: range[0],
    rangeRight: range[1],
  }) */
  
  /* const [barSpring, barSpringApi] = useSpring(()=>({
    left: `${percentLeft}%`,
    right: `${percentRight}%`,
  }))
  barSpringApi.set({
    left: `${percentLeft}%`,
    right: `${percentRight}%`,
  }) */
  const barProps = {
    style: {
      left: `${percentLeft}%`,
      right: `${percentRight}%`,
    }
  }
  
  
  return <div css={trackStyle}
    {...trackProps}
    {...onTrackDrag()}
    ref={trackRef}
  >
    <div css={bar}
      {...barProps}
      //style={{...barSpring}}
    >
      <div css={leftHandle}/>
      <div css={rightHandle}/>
    </div>
  </div>
}))
export default RangePicker



const trackStyle = (t: AppTheme.Theme) => css`
  touch-action: none; // prevents browser gesture handling on mobile devices
  width: 100%;
  height: 42px;
  position: relative;
  border-radius: 999999px;
  border: none;
  background: ${t.rangePicker.trackBgc[0]};
`

const bar = (t: AppTheme.Theme) => css`
  position: absolute;
  height: 100%;
  background: ${t.rangePicker.barBgc[0]};
  border-radius: inherit;
  
  left: 0%;
  right: 0%;
  
  display: grid;
  grid: 'lHandle . rHandle' 100% / auto 1fr auto;
  padding: 5px;
`
const leftHandle = (t: AppTheme.Theme) => css`
  grid-area: lHandle;
  height: 32px;
  width: 19px;
  border-radius: 16px 3px 3px 16px;
  background: ${t.rangePicker.handleBgc[0]};
`
const rightHandle = (t: AppTheme.Theme) => css`
  grid-area: rHandle;
  height: 32px;
  width: 19px;
  border-radius: 3px 16px 16px 3px;
  background: ${t.rangePicker.handleBgc[0]};
`