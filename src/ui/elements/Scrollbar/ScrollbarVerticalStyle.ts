import { css } from '@emotion/react'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import { AppTheme } from '@util/theme/AppTheme.ts'
import { ElementStyle } from 'src/ui/elements/ElementStyle.ts'
import hoverable = EmotionCommon.hoverable
import DataAttr = ElementStyle.DataAttr
import combineStates = ElementStyle.combineStates
import Elem = ElementStyle.Elem




export namespace ScrollbarVerticalStyle {
  
  
  
  export const Attr = {
    active: new DataAttr('active',[]),
  }
  
  export const El = function(){
    const track = new Elem('rrainuiScrollbarVerticalTrack', {
      active: combineStates(ElementStyle.Pseudo.active, Attr.active),
      hover: ElementStyle.Pseudo.hover,
    })
    const thumbBox = track.toElem('>', new Elem('rrainuiScrollbarVerticalThumbBox', {}))
    const thumb = thumbBox.toElem('>', new Elem('rrainuiScrollbarVerticalThumb', {}))
    return { root: track, track, thumbBox, thumb } as const
  }()
  
  
  
  
  export const scrollbar = (t: AppTheme.Theme) => css`
    ${El.track.thiz()}{
      border-radius: 999999px;
      background: ${t.scrollbar.track};
    }
    ${El.track.thiz()}{
      width: 16px; height: 100%;
    }
    ${El.thumbBox.thiz()}{
      //padding: 1px 2px;
    }
    ${El.thumb.thiz()}{
      border-radius: 999999px;
      background: ${t.scrollbar.thumb};
    }
    
    // hover
    ${hoverable} { ${El.thumb.thiz('hover')}{
      background: ${t.scrollbar.thumbActive};
    }}

    // active
    ${El.thumb.thiz('active')}{
      background: ${t.scrollbar.thumbActive};
    }
  `
  
  
  
  
  
}