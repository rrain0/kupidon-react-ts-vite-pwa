import { Velocity } from 'src/utils/gestures/pointer/Veloctiy.ts'


export type OnPointerEvent = {
  first?: boolean | undefined
  firstMove?: boolean | undefined
  t: number
  vpx0: number, vpy0: number
  vpx: number, vpy: number
  mx: number, my: number
  velx: number, vely: number // px/ms
}



export const onPointer = (onPointer?: (ev: OnPointerEvent) => void) => {
  let wasFirstMove = false
  let vpx0 = 0, vpy0 = 0
  let mx = 0, my = 0
  const vel = new Velocity()
  
  const onPointerDown = (ev: PointerEvent) => {
    const {
      timeStamp: t,
      clientX: vpx, clientY: vpy,
      movementX: dx, movementY: dy,
    } = ev
    
    vpx0 = vpx; vpy0 = vpy
    mx = 0; my = 0
    vel.clear(); vel.add({ t, x: vpx, y: vpy })
    
    onPointer?.({
      first: true,
      t,
      vpx0, vpy0,
      vpx, vpy,
      mx, my,
      velx: 0, vely: 0,
    })
    wasFirstMove = false
  }
  
  const onPointerMove = (ev: PointerEvent) => {
    const {
      timeStamp: t,
      clientX: vpx, clientY: vpy,
      movementX: dx, movementY: dy,
    } = ev
    
    mx += dx; my += dy
    vel.add({ t, x: vpx, y: vpy })
    const { velx, vely } = vel.get()
    
    onPointer?.({
      firstMove: !wasFirstMove,
      t,
      vpx0, vpy0,
      vpx, vpy,
      mx, my,
      velx, vely,
    })
    wasFirstMove = true
  }
  
  return { onPointerDown, onPointerMove }
}
