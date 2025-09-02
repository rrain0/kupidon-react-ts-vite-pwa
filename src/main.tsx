import { applyPointerFixes } from '@utils/pointer/applyPointerFixes.ts'
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'src/styles/app/reset.css'
import 'src/styles/app/fonts.css'
import 'src/styles/app/app.css'
import 'src/styles/common/common.scss'
import 'react-toastify/dist/ReactToastify.css'
import 'animate.css'
import App from 'src/ui/App/App'


applyPointerFixes()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
)



