import { AnimationFunction } from 'src/mini-libs/animated/animationFunciton.ts'


// current document time in ms
export const getTime = () => (document.timeline.currentTime as number | null) ?? 0
