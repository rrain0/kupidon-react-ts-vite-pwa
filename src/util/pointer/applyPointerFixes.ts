import { isMobile } from 'react-device-detect'



/* Pointer fixes */
export const applyPointerFixes = () => {
  
  // TODO костыль // TODO Pointer // todo hack fix
  //  На ios без этого шторка настроек почему-то не может драгаться сразу
  window.addEventListener('pointerdown', () => {})
  
  
  
  // Запретить контекстое меню
  // Это запрещает контекстное меню при зажатии ссылок и изображение в хроме на андроиде
  window.addEventListener('contextmenu', ev => {
    if (isMobile) ev.preventDefault()
  })
  
}



