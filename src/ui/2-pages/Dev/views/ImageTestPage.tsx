import React from 'react'
import { ApiRoutes } from 'src/api/ApiRoutes.ts'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import ImgSpark from 'src/ui/0-elements/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/ui/0-elements/ImgSpark/ImgSparkS6.ts'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar.tsx'
import { Pages } from 'src/ui/components/Pages/Pages.ts'




const ImageTestPage = React.memo(() => {
  
  return (
    <>
      
      <Pages.PageSimpleColors>
        <Pages.Content>
          
          <div>Views: Image</div>
          
          <div css={{ height: 24 }} />
          
          
          
          <div>ImgSpark delayed</div>
          <ImgSpark
            css={ImgSparkS6.t(pictureS)}
            src={`${ApiRoutes.backend}/test/image/delay/ban.jpg`}
          />
          
          <div css={{ height: 24 }} />
          
          <div>ImgSpark delayed 404 error</div>
          <ImgSpark
            css={ImgSparkS6.t(pictureS)}
            src={`${ApiRoutes.backend}/test/image/delay-error-404/ban.jpg`}
          />
          
          <div css={{ height: 24 }} />
          
          <div>ImgSpark delayed 500 error</div>
          <ImgSpark
            css={ImgSparkS6.t(pictureS)}
            src={`${ApiRoutes.backend}/test/image/delay-error-500/ban.jpg`}
          />
          
          
          
          <div css={{ height: 600 }} />
          
          
          
          <div>img</div>
          
          <img
            style={{ width: 200, height: 200 }}
            src={`${ApiRoutes.backend}/test/image/ban.jpg`}
            onLoad={() => {
              console.log('IMG: onLoad')
            }}
            onError={(ev) => {
              console.log('IMG: onError')
              const img = ev.currentTarget
              setTimeout(() => {
                console.log('IMG: re-set src')
                console.log(`IMG: ${img}`)
                img.src = img.src
              }, 5000)
            }}
          />
        
        </Pages.Content>
      </Pages.PageSimpleColors>
      
      
      <BottomButtonBar settingsBtn />
    
    </>
  )
})
export default ImageTestPage



const pictureS: AppWidgetStyle = t => [ImgSparkS6.S.img.img.auto.normal, {
  imgFrame: { w: 250, h: 'auto', ratio: 1, r: 15 },
}]

