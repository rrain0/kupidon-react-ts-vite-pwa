import { css } from '@emotion/react'
import { RangeU } from '@util/common/RangeU.ts'
import React, { useCallback, useState } from 'react'
import { ApiRoutes } from 'src/api/ApiRoutes.ts'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import ImgSpark from 'src/ui/0-elements/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/ui/0-elements/ImgSpark/ImgSparkS6.ts'
import BottomFloatingBar from 'src/ui/components/screen-bars/BottomFloatingBar.tsx'
import rowWrap = EmotionCommon.rowWrap
import col = EmotionCommon.col
import PageContentLayout from 'ui/components/Pages/PageContentLayout'
import PageLayout from 'ui/components/Pages/PageLayout'



const banUrl = `${ApiRoutes.backend}/test/image/ban.jpg`
const zerotwoUrl = `${ApiRoutes.backend}/test/image/zerotwo.jpg`

const banDelayedUrl = `${ApiRoutes.backend}/test/image/delay/ban.jpg`
const banErr404DelayedUrl = `${ApiRoutes.backend}/test/image/delay-error-404/ban.jpg`
const banErr500DelayedUrl = `${ApiRoutes.backend}/test/image/delay-error-500/ban.jpg`



const ImageTestPage = React.memo(() => {
  
  const [enableImgTag, setEnableImgTag] = useState(true)
  const [enableSrc, setEnableSrc] = useState(true)
  
  const [enableImg, setEnableImg] = useState(true)
  const [enableImgDelayed, setEnableImgDelayed] = useState(false)
  const [enableImgErr404Delayed, setEnableImgErr404Delayed] = useState(false)
  const [enableImgErr500Delayed, setEnableImgErr500Delayed] = useState(false)
  
  const [srcI, setSrcI] = useState(0)
  const nextSrc = useCallback(() => setSrcI(i => RangeU.loop(i + 1, [0, 2])), [])
  
  const src = (() => {
    if (!enableSrc) return undefined
    return [banUrl, zerotwoUrl][srcI]
  })()
  const srcDelayed = !enableSrc ? undefined : banDelayedUrl
  const srcErr404Delayed = !enableSrc ? undefined : banErr404DelayedUrl
  const srcErr500Delayed = !enableSrc ? undefined : banErr500DelayedUrl
  
  
  return (
    <>
      
      <PageLayout col css={{ '*': { userSelect: 'text' } }}>
        <PageContentLayout col>
          
          <div>Views: Image</div>
          
          <div css={{ height: 24 }}/>
          
          <button onClick={() => setEnableSrc(v => !v)}>Toggle src enabled</button>
          <button onClick={() => setEnableImgTag(v => !v)}>Toggle {'<img/>'}</button>
          
          <div css={{ height: 24 }}/>
          
          <button onClick={() => setEnableImg(e => !e)}>Toggle img</button>
          <button onClick={() => nextSrc()}>Next src</button>
          
          <div css={{ height: 24 }}/>
          
          {enableImg && (
            <div css={[rowWrap, { gap: 6 }]}>
              <div css={[col, { gap: 6 }]}>
                <div>{'<ImgSpark/>'}</div>
                <ImgSpark
                  css={ImgSparkS6.t(pictureS)}
                  src={src}
                />
              </div>
              
              {enableImgTag && (
                <div css={[col, { gap: 6 }]}>
                  <div>{'<img/>'}</div>
                  <img
                    css={imgS}
                    src={src}
                  />
                </div>
              )}
            </div>
          )}
          
          
          
          <div css={{ height: 24 }}/>
          
          <button onClick={() => setEnableImgDelayed(e => !e)}>Toggle img delayed</button>
          
          <div css={{ height: 24 }}/>
          
          {enableImgDelayed && (
            <div css={[rowWrap, { gap: 6 }]}>
              <div css={[col, { gap: 6 }]}>
                <div>{'<ImgSpark/>'} delayed</div>
                <ImgSpark
                  css={ImgSparkS6.t(pictureS)}
                  src={srcDelayed}
                />
              </div>
              
              {enableImgTag && (
                <div css={[col, { gap: 6 }]}>
                  <div>{'<img/>'} delayed</div>
                  <img
                    css={imgS}
                    src={srcDelayed}
                  />
                </div>
              )}
            </div>
          )}
              
              
              
          <div css={{ height: 24 }}/>
          
          <button onClick={() => setEnableImgErr404Delayed(e => !e)}>Toggle img err 404 delayed</button>
          
          <div css={{ height: 24 }}/>
          
          {enableImgErr404Delayed && (
            <div css={[rowWrap, { gap: 6 }]}>
              <div css={[col, { gap: 6 }]}>
                <div>{'<ImgSpark/>'} delayed 404 error</div>
                <ImgSpark
                  css={ImgSparkS6.t(pictureS)}
                  src={srcErr404Delayed}
                />
              </div>
              
              {enableImgTag && (
                <div css={[col, { gap: 6 }]}>
                  <div>{'<img/>'} delayed 404 error</div>
                  <img
                    css={imgS}
                    src={srcErr404Delayed}
                  />
                </div>
              )}
            </div>
          )}
          
          
          
          <div css={{ height: 24 }}/>
          
          <button onClick={() => setEnableImgErr500Delayed(e => !e)}>Toggle img err 500 delayed</button>
          
          <div css={{ height: 24 }}/>
          
          {enableImgErr500Delayed && (
            <div css={[rowWrap, { gap: 6 }]}>
              <div css={[col, { gap: 6 }]}>
                <div>{'<ImgSpark/>'} delayed 500 error</div>
                <ImgSpark
                  css={ImgSparkS6.t(pictureS)}
                  src={srcErr500Delayed}
                />
              </div>
              
              {enableImgTag && (
                <div css={[col, { gap: 6 }]}>
                  <div>{'<img/>'} delayed 500 error</div>
                  <img
                    css={imgS}
                    src={srcErr500Delayed}
                  />
                </div>
              )}
            </div>
          )}
          
          
        </PageContentLayout>
      </PageLayout>
      
      
      <BottomFloatingBar settingsButton/>
    
    </>
  )
})
ImageTestPage.displayName = 'ImageTestPage'
export default ImageTestPage



const pictureS: AppWidgetStyle = t => [ImgSparkS6.S.img.img.auto.normal, {
  imgFrame: { w: 250, h: 'auto', ratio: 1, r: 15 },
}]

const imgS = css`
  width: 250px;
  aspect-ratio: 1;
  border-radius: 15px;
`

