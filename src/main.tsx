import React from 'react'
import ReactDOM from 'react-dom/client'
import 'src/ui-data/style/setup/reset.css'
import 'src/ui-data/style/setup/fonts.css'
import 'src/ui-data/style/setup/app.css'
import 'react-toastify/dist/ReactToastify.css'
import 'animate.css'
import App from 'src/ui/App/App'


// TODO костыль // TODO Pointer // todo hack fix
//  На ios шторка настроек почему-то не может драгаться сразу, поэтому это здесь
window.addEventListener('pointerdown', () => {})


// Для тестов
/* window.addEventListener('pointerdown', function(ev) {
  (ev.target as HTMLElement).style.background = '#ff000055'
}, { capture: true })
window.addEventListener('pointerup', function(ev) {
  (ev.target as HTMLElement).style.background = ''
}, { capture: true }) */


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)



