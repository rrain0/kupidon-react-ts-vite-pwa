import React from 'react'
import ReactDOM from 'react-dom/client'
import 'src/ui/styles/reset.css'
import 'src/ui/styles/fonts.css'
import 'src/ui/styles/app-styles.css'
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
