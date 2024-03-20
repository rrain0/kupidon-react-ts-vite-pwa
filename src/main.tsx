import React from 'react'
import ReactDOM from 'react-dom/client'
import 'src/styles/reset.css'
import 'src/styles/fonts.css'
import 'src/styles/app-styles.css'
import 'react-toastify/dist/ReactToastify.css'
import 'animate.css'
import App from './pages/App/App'
import { RecoilRoot } from 'recoil'
// access recoil state from not react component
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
