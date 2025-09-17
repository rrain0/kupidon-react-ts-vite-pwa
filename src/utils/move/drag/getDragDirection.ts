import { tg45deg, tg80deg } from 'src/utils/base/math/mathUtils.ts'



export type GetDragDirectionProps = {
  mx: number // px
  my: number // px
  dragThreshold?: number | undefined // px
}


export const getDragDirection = ({
  mx, my, dragThreshold = 5,
}: GetDragDirectionProps) => {
  const isRadiusEnough = Math.hypot(mx, my) >= dragThreshold
  const anyMove = !!(mx || my)
  const tg = Math.abs(my) / Math.abs(mx)
  
  const horizontal = anyMove && tg < tg45deg
  const vertical = anyMove && tg >= tg45deg
  const toTop = vertical && my < 0
  const toBottom = vertical && my > 0
  const toLeft = horizontal && mx < 0
  const toRight = horizontal && mx > 0
  
  const horizontal80deg = anyMove && tg < tg80deg
  const toRight80deg = horizontal80deg && mx > 0
  
  
  return {
    horizontal, vertical, toTop, toBottom, toLeft, toRight,
    horizontal80deg, toRight80deg,
    drag: isRadiusEnough,
  } as const
}


