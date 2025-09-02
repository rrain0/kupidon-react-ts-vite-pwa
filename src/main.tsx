import { applyPointerFixes } from '@utils/pointer/applyPointerFixes.ts'
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'src/ui-data/style/setup/reset.css'
import 'src/ui-data/style/setup/fonts.css'
import 'src/ui-data/style/setup/app.css'
import 'react-toastify/dist/ReactToastify.css'
import 'animate.css'
import App from 'src/ui/App/App'


applyPointerFixes()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
)



