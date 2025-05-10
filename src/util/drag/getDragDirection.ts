


export type GetDragDirectionProps = {
  mx: number // px
  my: number // px
  dragThreshold?: number | undefined // px
}
export const getDragDirection = (props: GetDragDirectionProps) => {
  const { mx, my, dragThreshold = 5 } = props
  
  const isRadiusEnough = Math.hypot(mx, my) >= dragThreshold
  
  const horizontal = !!(mx || my) && Math.abs(mx) > Math.abs(my)
  const vertical = !!(mx || my) && Math.abs(mx) <= Math.abs(my)
  
  return {
    horizontal,
    vertical,
    drag: isRadiusEnough,
  } as const
}


