import { css } from '@emotion/react'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { AppTheme } from '@util/theme/AppTheme.ts'
import { WidgetStyle } from 'src/mini-libs/widget-style/WidgetStyle0.ts'
import hoverable = EmotionCommon.hoverable
import DataAttr = WidgetStyle.DataAttr
import combineStates = WidgetStyle.combineStates
import Elem = WidgetStyle.Elem0




export namespace ScrollbarStyle {
  
  
  
  export const Attr = {
    direction: new DataAttr('direction',['vertical','horizontal']),
    active: new DataAttr('active',[]),
  }
  
  export const El = function(){
    const track = new Elem('rrainuiScrollbarTrack', {
      vertical: Attr.direction.s.vertical,
      horizontal: Attr.direction.s.horizontal,
      active: combineStates(WidgetStyle.Pseudo0.active, Attr.active),
      hover: WidgetStyle.Pseudo0.hover,
    },{})
    const thumbBox = track.toElem('>', new Elem('rrainuiScrollbarThumbBox', {}, {}))
    const thumb = thumbBox.toElem('>', new Elem('rrainuiScrollbarThumb', {}, {}))
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