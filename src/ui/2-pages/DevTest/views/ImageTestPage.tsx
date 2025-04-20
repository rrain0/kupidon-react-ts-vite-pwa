import { css } from '@emotion/react'
import React, { useState } from 'react'
import { ApiRoutes } from 'src/api/ApiRoutes.ts'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import ImgSpark from 'src/ui/0-elements/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/ui/0-elements/ImgSpark/ImgSparkS6.ts'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar.tsx'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import rowWrap = EmotionCommon.rowWrap
import col = EmotionCommon.col




const ImageTestPage = React.memo(() => {
  
  const [enableSrc, setEnableSrc] = useState(true)
  
  return (
    <>
      
      <Pages.Page>
        <Pages.Content>
          
          <div>Views: Image</div>
          
          <div css={{ height: 24 }} />
          
          <button onClick={() => setEnableSrc(e => !e)}>Toggle src</button>
          
          <div css={{ height: 24 }} />
          
          
          <div css={css`${rowWrap}; gap: 6px;`}>
            <div css={css`${col}; gap: 6px;`}>
              <div>{'<ImgSpark />'}</div>
              <ImgSpark
                css={ImgSparkS6.t(pictureS)}
                src={enableSrc ? `${ApiRoutes.backend}/test/image/ban.jpg` : ''}
              />
            </div>
            
            <div css={css`${col}; gap: 6px;`}>
              <div>{'<img />'}</div>
              <img
                css={imgS}
                src={enableSrc ? `${ApiRoutes.backend}/test/image/ban.jpg` : ''}
              />
            </div>
          </div>
          
          <div css={{ height: 24 }} />
          
          <div css={css`${rowWrap}; gap: 6px;`}>
            <div css={css`${col}; gap: 6px;`}>
              <div>{'<ImgSpark />'} delayed</div>
              <ImgSpark
                css={ImgSparkS6.t(pictureS)}
                src={enableSrc ? `${ApiRoutes.backend}/test/image/delay/ban.jpg` : ''}
              />
            </div>
            
            <div css={css`${col}; gap: 6px;`}>
              <div>{'<img />'} delayed</div>
              <img
                css={imgS}
                src={enableSrc ? `${ApiRoutes.backend}/test/image/delay/ban.jpg` : ''}
              />
            </div>
          </div>
          
          <div css={{ height: 24 }} />
          
          <div css={css`${rowWrap}; gap: 6px;`}>
            <div css={css`${col}; gap: 6px;`}>
              <div>{'<ImgSpark />'} delayed 404 error</div>
              <ImgSpark
                css={ImgSparkS6.t(pictureS)}
                src={enableSrc ? `${ApiRoutes.backend}/test/image/delay-error-404/ban.jpg` : ''}
              />
            </div>
            
            <div css={css`${col}; gap: 6px;`}>
              <div>{'<img />'} delayed 404 error</div>
              <img
                css={imgS}
                src={enableSrc ? `${ApiRoutes.backend}/test/image/delay-error-404/ban.jpg` : ''}
              />
            </div>
          </div>
          
          <div css={{ height: 24 }} />
          
          <div css={css`${rowWrap}; gap: 6px;`}>
            <div css={css`${col}; gap: 6px;`}>
              <div>{'<ImgSpark />'} delayed 500 error</div>
              <ImgSpark
                css={ImgSparkS6.t(pictureS)}
                src={enableSrc ? `${ApiRoutes.backend}/test/image/delay-error-500/ban.jpg` : ''}
              />
            </div>
            
            <div css={css`${col}; gap: 6px;`}>
              <div>{'<img />'} delayed 500 error</div>
              <img
                css={imgS}
                src={enableSrc ? `${ApiRoutes.backend}/test/image/delay-error-500/ban.jpg` : ''}
              />
            </div>
          </div>
        
        </Pages.Content>
      </Pages.Page>
      
      
      <BottomButtonBar settingsBtn />
    
    </>
  )
})
export default ImageTestPage


const pictureS: AppWidgetStyle = t => [ImgSparkS6.S.img.img.auto.normal, {
  imgFrame: { w: 250, h: 'auto', ratio: 1, r: 15 },
}]

const imgS = css`
  width: 250px;
  aspect-ratio: 1;
  border-radius: 15px;
`

