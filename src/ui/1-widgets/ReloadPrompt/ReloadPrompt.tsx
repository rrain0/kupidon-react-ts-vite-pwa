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
        const checkUpdateInterval = 60 * 60 * 1000 // 1h
        swRegistration && setInterval(() => {
          console.log('Checking for SW update...')
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
      { (offlineReady || needRefresh)
      && (
        <div className="ReloadPrompt-toast">
          <div className="ReloadPrompt-message">
            { offlineReady
              ? <span>App ready to work offline</span>
              : <span>New content available, click on reload button to update.</span>}
          </div>
          { needRefresh && (
            <button
              className="ReloadPrompt-toast-button"
              onClick={() => updateServiceWorker(true)}
            >
              Reload
            </button>
          ) }
          <button className="ReloadPrompt-toast-button" onClick={() => close()}>Close</button>
        </div>
      )}
      <div className="ReloadPrompt-date">{buildDate}</div>
    </div>
  )
})

export default ReloadPrompt
