import React from 'react'
import { MockData } from 'src/_mock-data/MockData.ts'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import ImgSparkingLoader from 'src/ui/0-elements/ImgSparkingLoader/ImgSparkingLoader.tsx'
import { ImgSparkingLoaderS6 } from 'src/ui/0-elements/ImgSparkingLoader/ImgSparkingLoaderS6.ts'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar.tsx'
import { Pages } from 'src/ui/components/Pages/Pages.ts'




const ImageTestPage = React.memo(() => {
  
  return (
    <>
      
      <Pages.PageSimpleColors>
        <Pages.Content>
          
          <div>Views: Image</div>
          
          <div css={{ height: 24 }} />
          
          <ImgSparkingLoader
            css={ImgSparkingLoaderS6.t(pictureS)}
            src="/backend/test/image/greek-man.png"
          />
          
          <ImgSparkingLoader
            css={ImgSparkingLoaderS6.t(pictureS)}
            src={MockData.images.allRecord.greekMan}
          />
          
          <div css={{ height: 600 }} />
          
          <img
            style={{ width: 200, height: 200 }}
            src="/backend/test/image/ban.jpg"
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


const pictureS: AppWidgetStyle = t => [ImgSparkingLoaderS6.S.img.img.auto.normal, {
  imgFrame: { w: 400, h: 'auto', ratio: 0.8, r: 15 },
}]

