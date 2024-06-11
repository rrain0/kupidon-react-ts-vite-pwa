import React from 'react'
import ReactDOM from 'react-dom/client'
import 'src/ui-props/styles-setup/reset.css'
import 'src/ui-props/styles-setup/fonts.css'
import 'src/ui-props/styles-setup/app-styles.css'
import 'react-toastify/dist/ReactToastify.css'
import 'animate.css'
import App from 'src/ui/pages/App/App'
import { RecoilRoot } from 'recoil'
// access recoil state from a not React component
import RecoilNexus from 'recoil-nexus'



ReactDOM.createRoot(document.getElementById('root')!)
.render(
  <React.StrictMode>
    <RecoilRoot>
      <RecoilNexus />
      <App/>
    </RecoilRoot>
  </React.StrictMode>
)
