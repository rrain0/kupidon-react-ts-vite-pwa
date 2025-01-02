import { TypeU } from '@util/common/TypeU.ts'
import Callback = TypeU.Callback
import Callback1 = TypeU.Callback1



export const animations: Callback1<number>[] = []

const runAnimations = (time: number) => {
  animations.forEach(it => it(time))
  requestAnimationFrame(runAnimations)
}
requestAnimationFrame(runAnimations)
