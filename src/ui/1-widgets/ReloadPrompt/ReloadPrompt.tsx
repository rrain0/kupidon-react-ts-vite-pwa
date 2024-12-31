import React from 'react'
import './ReloadPrompt.css'

import { useRegisterSW } from 'virtual:pwa-register/react'
import { pwaInfo } from 'virtual:pwa-info'

// TODO explore

console.log(pwaInfo)

const ReloadPrompt = React.memo(() => {
  const buildDate = import.meta.env.BUILD_DATE
  const isProd = import.meta.env.PROD

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, swRegistration) {
      console.log(`SW at: ${swUrl}`)
      
      console.log('SW registered: ' + swRegistration)
      
      if (isProd) {
        //const checkUpdateInterval = 60 * 60 * 1000 // 1h
        const checkUpdateInterval = 20 * 1000 // 20s
        swRegistration && setInterval(() => {
          console.log('Checking for SW update...')
          // Manually request service worker update
          // SW will be updated if a fetched SW script is different
          void swRegistration.update()
        }, checkUpdateInterval)
      }
    },
    onRegisterError(error) {
      console.log('SW registration error', error)
    },
  })

  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }
  
  return (
    <div className="ReloadPrompt-container">
      {(offlineReady || needRefresh) && (
        <div className="ReloadPrompt-toast">
          
          <div className="ReloadPrompt-message">
            {offlineReady
              ? <span>App ready to work offline</span>
              : <span>New content available, click on reload button to update.</span>
            }
          </div>
          
          {/* <strong>Reload</strong> will refresh the app. You may lose the
           progress, if any. */}
          {needRefresh && (
            <button
              className="ReloadPrompt-toast-button"
              // Reloads the current window to allow the service worker take the control.
              onClick={() => updateServiceWorker(true)}
            >
              Reload
            </button>
          )}
          
          {/* <strong>Cancel</strong> will install the update next time you visit
           the app. */}
          <button
            className="ReloadPrompt-toast-button"
            onClick={() => close()}
          >
            Close
          </button>
          
        </div>
      )}
      <div className="ReloadPrompt-date">{buildDate}</div>
    </div>
  )
})

export default ReloadPrompt
