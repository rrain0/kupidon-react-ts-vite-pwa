import { css } from '@emotion/react'
import { CommonStyle } from 'src/views/CommonStyle'
import { ScrollbarStyle } from 'src/views/Scrollbar/ScrollbarStyle'
import Elem = CommonStyle.Elem




export namespace ScrollbarOverlayStyle {
  
  
  
  export const El = function(){
    const overlay = new Elem('rrainuiScrollbarOverlay',{})
    
    const scrollbarTrack = overlay.upFor('>',ScrollbarStyle.El.track)
    const scrollbarThumbBox = scrollbarTrack.upFor('>',ScrollbarStyle.El.thumbBox)
    const scrollbarThumb = scrollbarThumbBox.upFor('>',ScrollbarStyle.El.thumb)
    
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