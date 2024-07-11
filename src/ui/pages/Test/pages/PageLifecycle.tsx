import { useLayoutEffect } from 'react'


const PageLifecycle = () => {
  
  useLayoutEffect(
    () => {
      const onLoad = (ev: Event) => {
        console.log('page was loaded', ev)
        // @ts-expect-error document.wasDiscarded
        console.log('document.wasDiscarded', document.wasDiscarded)
      }
      const onFreeze = (ev: any) => {
        console.log('page was frozen', ev)
      }
      const onResume = (ev: any) => {
        console.log('page was resumed', ev)
      }
      const onVisibility = (ev: Event) => {
        switch (document.visibilityState) {
          case 'visible':
            console.log('page is visible', ev)
            break
          case 'hidden':
            console.log('page was hidden', ev)
            /* fetch('https://dev.kupidon.rrain.ydns.eu:50040/ktor/hello',{
             method: 'GET', mode: 'cors', cache: 'no-cache', credentials: 'same-origin',
             })
             .then(resp=>resp.text())
             .then(text=>console.log('response',text)) */
            break
        }
      }
      
      document.addEventListener('load', onLoad)
      document.addEventListener('visibilitychange', onVisibility)
      document.addEventListener('freeze', onFreeze)
      document.addEventListener('resume', onResume)
      
      return () => {
        document.removeEventListener('load', onLoad)
        document.removeEventListener('visibilitychange', onVisibility)
        document.removeEventListener('freeze', onFreeze)
        document.removeEventListener('resume', onResume)
      }
    },
    []
  )
  
  
  return <div>
    <div>PAGE LIFECYCLE TEST</div>
    <div>Go to console to see callbacks</div>
  </div>
}
export default PageLifecycle


