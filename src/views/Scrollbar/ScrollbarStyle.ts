import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { AppTheme } from 'src/utils/theme/AppTheme'
import { CommonStyle } from 'src/views/CommonStyle'
import hoverable = EmotionCommon.hoverable
import DataAttr = CommonStyle.DataAttr
import combineStates = CommonStyle.combineStates
import Elem = CommonStyle.Elem




export namespace ScrollbarStyle {
  
  
  
  export const Attr = {
    direction: new DataAttr('direction',['vertical','horizontal']),
    active: new DataAttr('active',[]),
  }
  
  export const El = function(){
    const track = new Elem('rrainuiScrollbarTrack', {
      vertical: Attr.direction.s.vertical,
      horizontal: Attr.direction.s.horizontal,
      active: combineStates(CommonStyle.Pseudo.active, Attr.active),
      hover: CommonStyle.Pseudo.hover,
    })
    const thumbBox = track.upFor('>', new Elem('rrainuiScrollbarThumbBox', {}))
    const thumb = thumbBox.upFor('>', new Elem('rrainuiScrollbarThumb', {}))
    return { root: track, track, thumbBox, thumb } as const
  }()
  
  
  
  
  export const scrollbar = (t: AppTheme.Theme) => css`
    ${El.track.thiz()}{
      border-radius: 999999px;
      background: ${t.scrollbar.track};
    }
    ${El.track.thiz('vertical')}{
      width: 16px; height: 100%;
    }
    ${El.track.thiz('horizontal')}{
      width: 100%; height: 16px;
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