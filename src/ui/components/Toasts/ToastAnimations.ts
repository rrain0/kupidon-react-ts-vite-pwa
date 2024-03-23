import { cssTransition, ToastTransition } from 'react-toastify'




export namespace ToastAnimations {
  
  export const ShakeX: ToastTransition = cssTransition({
    enter: 'animate__animated animate__shakeX',
    exit: 'animate__animated animate__shakeX',
    collapse: false,
  })
  
  export const Bounce = cssTransition({
    enter: "animate__animated animate__bounceIn",
    exit: "animate__animated animate__bounceOut",
    collapse: false,
  })
  
  export const Scale: ToastTransition = cssTransition({
    enter: 'scale-up-center',
    exit: 'scale-down-center',
  })
  
  export const noAnimation: ToastTransition = cssTransition({
    enter: 'no-animation',
    exit: 'no-animation',
    collapse: false,
  })
  
  export const slideInDownThenFadeOut: ToastTransition = cssTransition({
    enter: 'animate__animated animate__faster animate__slideInDown',
    exit: 'animate__animated animate__faster animate__fadeOut',
    collapse: false,
  })
  
  export const noAnimationThenFadeOut: ToastTransition = cssTransition({
    enter: 'no-animation',
    exit: 'animate__animated animate__faster animate__fadeOut',
    collapse: false,
  })
}
