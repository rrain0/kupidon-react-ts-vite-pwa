import React from 'react'
import { useAsCallback } from 'src/utils/state/react/base/useAsCallback.ts'
import { useRefGetSet } from 'src/utils/state/react/base/useRefGetSet.ts'




export type MoveData = {
  pointerId: number
  first: boolean
  last: boolean
  evType: 'down' | 'move' | 'up' | 'cancel' | 'lostCapture'
  // Координаты начала драга относительно вьюпорта
  vp0: [vpx0: number, vpy0: number]
  // Текущие координаты относительно вьюпорта
  vp: [vpx: number, vpy: number]
  // Расстояние от начальной точки до текущей
  move: [mx: number, my: number]
  // Расстояние между предыдущей точкой до текущей
  delta: [dx: number, dy: number]
}

export const useDragOne = (
  onDrag: (move: MoveData) => void
) => {
  
  const [getMove] = useRefGetSet<Record<string, MoveData | undefined>>({ })
  
  const onPointerDown = useAsCallback((ev: React.PointerEvent) => {
    const { pointerId, clientX: vpx, clientY: vpy } = ev
    const curr: MoveData = {
      pointerId,
      first: true,
      last: false,
      evType: 'down',
      vp0: [vpx, vpy],
      vp: [vpx, vpy],
      move: [0, 0],
      delta: [0, 0],
    }
    getMove()[pointerId] = curr
    onDrag(curr)
  })
  
  const onPointerMove = useAsCallback((ev: React.PointerEvent) => {
    const { pointerId, clientX: vpx, clientY: vpy } = ev
    const prev = getMove()[pointerId]
    const curr: MoveData = {
      pointerId,
      first: false,
      last: false,
      evType: 'move',
      vp0: prev?.vp0 ?? [vpx, vpy],
      vp: [vpx, vpy],
      move: [0, 0],
      delta: [0, 0],
    }
    if (!prev) curr.first = true
    curr.move = [curr.vp[0] - curr.vp0[0], curr.vp[1] - curr.vp0[1]]
    if (prev) curr.delta = [curr.vp[0] - prev.vp0[0], curr.vp[1] - prev.vp0[1]]
    getMove()[pointerId] = curr
    onDrag(curr)
  })
  
  const onPointerUp = useAsCallback((ev: React.PointerEvent) => {
    const { pointerId, clientX: vpx, clientY: vpy } = ev
    const prev = getMove()[pointerId]
    const curr: MoveData = {
      pointerId,
      first: false,
      last: true,
      evType: 'up',
      vp0: prev?.vp0 ?? [vpx, vpy],
      vp: [vpx, vpy],
      move: [0, 0],
      delta: [0, 0],
    }
    if (!prev) curr.first = true
    curr.move = [curr.vp[0] - curr.vp0[0], curr.vp[1] - curr.vp0[1]]
    if (prev) curr.delta = [curr.vp[0] - prev.vp0[0], curr.vp[1] - prev.vp0[1]]
    delete getMove()[pointerId]
    onDrag(curr)
  })
  
  const onPointerCancel = useAsCallback((ev: React.PointerEvent) => {
    const { pointerId, clientX: vpx, clientY: vpy } = ev
    const prev = getMove()[pointerId]
    const curr: MoveData = {
      pointerId,
      first: false,
      last: true,
      evType: 'cancel',
      vp0: prev?.vp0 ?? [vpx, vpy],
      vp: [vpx, vpy],
      move: [0, 0],
      delta: [0, 0],
    }
    if (!prev) curr.first = true
    curr.move = [curr.vp[0] - curr.vp0[0], curr.vp[1] - curr.vp0[1]]
    if (prev) curr.delta = [curr.vp[0] - prev.vp0[0], curr.vp[1] - prev.vp0[1]]
    delete getMove()[pointerId]
    onDrag(curr)
  })
  
  const onLostPointerCapture = useAsCallback((ev: React.PointerEvent) => {
    const { pointerId, clientX: vpx, clientY: vpy } = ev
    const prev = getMove()[pointerId]
    const curr: MoveData = {
      pointerId,
      first: false,
      last: true,
      evType: 'lostCapture',
      vp0: prev?.vp0 ?? [vpx, vpy],
      vp: [vpx, vpy],
      move: [0, 0],
      delta: [0, 0],
    }
    if (!prev) curr.first = true
    curr.move = [curr.vp[0] - curr.vp0[0], curr.vp[1] - curr.vp0[1]]
    if (prev) curr.delta = [curr.vp[0] - prev.vp0[0], curr.vp[1] - prev.vp0[1]]
    delete getMove()[pointerId]
    onDrag(curr)
  })
  
  return {
    onPointerDown, // stable
    onPointerMove, // stable
    onPointerUp, // stable
    onPointerCancel, // stable
    onLostPointerCapture, // stable
  }
}



