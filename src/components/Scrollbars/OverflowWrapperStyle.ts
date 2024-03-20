import { css } from '@emotion/react'
import { ScrollbarOverlayStyle } from 'src/components/Scrollbars/ScrollbarOverlayStyle'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { CommonStyle } from 'src/views/CommonStyle'
import { ScrollbarStyle } from 'src/views/Scrollbar/ScrollbarStyle'
import Elem = CommonStyle.Elem
import col = EmotionCommon.col




export namespace OverflowWrapperStyle {
  
  
  
  
  export const El = function(){
    const wrapper = new Elem('rrainuiOverflowWrapper',{})
    const container = wrapper.upFor('>', new Elem('rrainuiScrollContainer',{}))
    const content = container.upFor('>', new Elem('rrainuiScrollContentWrap',{}))
    
    
    const scrollbarOverlay = wrapper.upFor('>',ScrollbarOverlayStyle.El.overlay)
    
    const scrollbarTrack = scrollbarOverlay.upFor('>',ScrollbarStyle.El.track)
    const scrollbarThumbBox = scrollbarTrack.upFor('>',ScrollbarStyle.El.thumbBox)
    const scrollbarThumb = scrollbarThumbBox.upFor('>',ScrollbarStyle.El.thumb)
    
    return { root: wrapper, wrapper, container, content,
      scrollbarOverlay, scrollbarTrack, scrollbarThumbBox, scrollbarThumb,
    } as const
  }()
  
  
  
  
  
  export const bigSizeScrollbars = css`
    ${El.scrollbarOverlay.thiz()}{
      padding: 3px;
    }
    ${El.scrollbarTrack.thiz(El.scrollbarTrack.s('vertical'))}{
      width: 10px;
    }
    ${El.scrollbarTrack.thiz(El.scrollbarTrack.s('horizontal'))}{
      height: 10px;
    }
  `
  
  
  
  
  export const page = css`
    ${bigSizeScrollbars};
    ${El.content.thiz()}{
      min-width: fit-content;
      width: 100%;

      min-height: fit-content;
      height: fit-content;
      flex: 1;
    }
  `
  
  
  
  export const middleSizeScrollbars = css`
    ${El.scrollbarOverlay.thiz()}{
      //padding: 3px;
    }
    ${El.scrollbarTrack.thiz(El.scrollbarTrack.s('vertical'))}{
      width: 6px;
    }
    ${El.scrollbarTrack.thiz(El.scrollbarTrack.s('horizontal'))}{
      height: 6px;
    }
  `
  
  
  
  
  export const defolt = css`
    ${middleSizeScrollbars};
    ${El.content.thiz()}{
      ${col};
      // overflow must be set to visible to make container fit-content.
      // overflow doesn't work if min-width / min-height are set.
      width: auto; height: auto;
      overflow: visible;
    }
  `
  
  
}