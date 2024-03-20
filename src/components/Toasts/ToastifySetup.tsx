/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import { ToastAnimations } from 'src/components/Toasts/ToastAnimations'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import mobileWidth = EmotionCommon.mobileWidth
import center = EmotionCommon.center




const ToastifySetup =
React.memo(
()=>{
  
  return <div css={css`
    display: contents;
    
    .Toastify {
      display: contents;
      
      .Toastify__toast-container {
        display: block;
        * {
          display: flex;
          flex-flow: row nowrap;
        }

        .Toastify__toast {
          border-radius: 15px;
          ${mobileWidth(css`
            margin: 6px;
            border-radius: 15px;
          `)}
          padding: 0;
          background: none;

          .Toastify__toast-body {
            margin: 0;
            padding: 0;
            
            >div:first-of-type {
              display: contents;
            }
            
            .Toastify__close-button {
              flex-shrink: 0;
              ${center};
            }
          }
        }
      }
    }
  `}>
    <ToastContainer
      position="top-center"
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
})
export default ToastifySetup

