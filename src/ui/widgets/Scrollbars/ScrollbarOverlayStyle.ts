import { css } from '@emotion/react'
import { WidgetStyle } from 'src/mini-libs/widget-style/WidgetStyle0.ts'
import { ScrollbarStyle } from 'src/ui/widgets/Scrollbar/ScrollbarStyle.ts'
import Elem = WidgetStyle.Elem0




export namespace ScrollbarOverlayStyle {
  
  
  
  export const El = function(){
    const overlay = new Elem('rrainuiScrollbarOverlay',{}, {})
    
    const scrollbarTrack = overlay.toElem('>',ScrollbarStyle.El.track)
    const scrollbarThumbBox = scrollbarTrack.toElem('>',ScrollbarStyle.El.thumbBox)
    const scrollbarThumb = scrollbarThumbBox.toElem('>',ScrollbarStyle.El.thumb)
    
    return { root: overlay, overlay, scrollbarTrack, scrollbarThumbBox, scrollbarThumb } as const
  }()
  
  //console.log('ScrollbarOverlayStyle.El',El)
  
  
  export const page = css`
    ${El.overlay.thiz()}{
      padding: 1px;
    }
    ${El.scrollbarTrack.thiz(El.scrollbarTrack.s('vertical'))}{
      width: 7px;
    }
    ${El.scrollbarTrack.thiz(El.scrollbarTrack.s('horizontal'))}{
      height: 7px;
    }
  `
  
  
  
}