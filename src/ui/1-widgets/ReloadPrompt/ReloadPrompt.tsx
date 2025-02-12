import React from 'react'
import './ReloadPrompt.css'
import Modal from 'src/ui/components/modal/Modal/Modal.tsx'
import { ModalStyle } from 'src/ui/components/modal/Modal/ModalStyle.ts'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'

import { useRegisterSW } from 'virtual:pwa-register/react'
import { pwaInfo } from 'virtual:pwa-info'

// Vite PWA React:
// https://vite-pwa-org.netlify.app/examples/react
// Vite PWA React example:
// https://github.com/vite-pwa/vite-plugin-pwa/blob/main/examples/react-router/src/ReloadPrompt.tsx

console.log('pwaInfo', pwaInfo)

const ReloadPrompt = React.memo(() => {
  const buildDate = import.meta.env.BUILD_DATE
  const autoCheckUpdates = true

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    // Вызывается при каждом монтировании компоненты, даже когда SW уже был зареган ранее
    onRegisteredSW(swUrl, swRegistration) {
      console.log(`SW at: ${swUrl}`)
      
      if (autoCheckUpdates && swRegistration) {
        // Check updates immediately when component was mounted
        void swRegistration.update()
        
        // Then check updates by interval
        const checkUpdateInterval = 60 * 60 * 1000 // 1h
        setInterval(() => {
          console.log('Checking for SW update...')
          // Manually request service worker update
          // SW will be updated if a fetched SW script is different
          void swRegistration.update()
        }, checkUpdateInterval)
      }
      else {
        console.log('SW registered: ' + swRegistration)
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
  
  
  const uiTextOrig = {
    appReadyToWorkOffline: 'App ready to work offline',
    updateDownloaded: 'New content available, click on reload button to update',
    reload: 'Reload',
    later: 'Later',
    ok: 'OK',
  }
  const uiText = {
    appReadyToWorkOffline: 'Ресурсы приложения загружены и оно готово работать оффлайн',
    updateDownloaded: 'Обновление загружено. Чтобы оно вступило в силу, нужно обновить страницу',
    reload: 'Обновить',
    later: 'Позже',
    ok: 'ОК',
  }
  
  return (
    <>
      <div className="ReloadPrompt-buildDate">{buildDate}</div>
      {(offlineReady || needRefresh) && (
        <ModalPortal>
          <Modal css={ModalStyle.modalFrameBottom} enableUpNodesScroll>
            <div className="ReloadPrompt-container">
              <div className="ReloadPrompt-toast">
                
                <div className="ReloadPrompt-message">
                  {offlineReady
                    ? <span>{uiText.appReadyToWorkOffline}</span>
                    : <span>{uiText.updateDownloaded}</span>
                  }
                </div>
                
                {/* <strong>Reload</strong> will refresh the app. You may lose the
                 progress, if any. */}
                {needRefresh && (
                  <>
                    <button
                      className="ReloadPrompt-toast-button"
                      // Reloads the current window to allow the service worker take the control.
                      onClick={() => updateServiceWorker(true)}
                    >
                      {uiText.reload}
                    </button>
                    {/* <strong>Cancel</strong> will install the update next time you visit
                     the app. */}
                    <button
                      className="ReloadPrompt-toast-button"
                      onClick={() => close()}
                    >
                      {uiText.later}
                    </button>
                  </>
                )}
                
                {!needRefresh && (
                  <button
                    className="ReloadPrompt-toast-button"
                    onClick={() => close()}
                  >
                    {uiText.ok}
                  </button>
                )}
              
              </div>
            </div>
          </Modal>
        </ModalPortal>
      )}
    </>
  )
})

export default ReloadPrompt
