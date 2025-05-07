import { css } from '@emotion/react'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import { ToastAnimations } from 'src/ui/components/Toasts/ToastAnimations.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import mobileWidth = EmotionCommon.mobileWidth
import flexC = EmotionCommon.flexC
import gridStretch = EmotionCommon.gridStretch




const ToastifySetup = React.memo(() => {
  return (
    <div
      css={css`
        display: contents;
        
        .Toastify {
          display: contents;
          
          .Toastify__toast-container {
            display: block;
    
            .Toastify__toast {
              ${gridStretch};
              border-radius: 15px;
              ${mobileWidth(css`
                margin: 6px;
                border-radius: 15px;
              `)}
              padding: 0;
              background: none;
              overflow: hidden;
    
              .Toastify__toast-body {
                margin: 0;
                padding: 0;
                
                & > div:first-of-type {
                  display: contents;
                }
                
                .Toastify__close-button {
                  flex-shrink: 0;
                  ${flexC};
                }
              }
            }
          }
        }
      `}
    >
      <ToastContainer
        position='top-center'
        autoClose={false}
        closeButton={false}
        closeOnClick={false}
        draggable
        draggablePercent={30}
        hideProgressBar={true}
        newestOnTop={true}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme='light'
        transition={ToastAnimations.slideInDownThenFadeOut}
      />
    </div>
  )
})
export default ToastifySetup

