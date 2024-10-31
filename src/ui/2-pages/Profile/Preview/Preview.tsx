import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useMemo, useState } from 'react'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import { ProfilePageValidation } from 'src/ui/2-pages/Profile/validation.ts'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import ScrollbarVertical from 'src/ui/1-widgets/Scrollbar/ScrollbarVertical.tsx'
import { ScrollbarVerticalStyle } from 'src/ui/1-widgets/Scrollbar/ScrollbarVerticalStyle.ts'
import FormValues = ProfilePageValidation.FormValues
import col = EmotionCommon.col
import Txt = EmotionCommon.Txt
import centerAll = EmotionCommon.centerAll




export type PreviewProps = {
  formValues: FormValues
}



const Preview = React.memo(
  (props: PreviewProps) => {
    
    const {
      photos,
      name,
      aboutMe,
    } = props.formValues
    
    
    
    const im = photos[0]
    
    console.log('photos', photos)
    
    const availablePhotos = useMemo(() => {
      return photos.filter(it => it.isReady)
    }, [photos])
    
    
    
    //const [scroll, setScroll] = useState(0)
    
    /* useEffect(
      ()=>{
        const id = setInterval(
          ()=>setScroll(s=>loopRange(s+3,[0,100])),
          1000
        )
        return ()=>clearInterval(id)
      },
      []
    ) */
    
    
    return (
      <Pages.SafeInsets>
        <PreviewFrame>
          <PhotosBox>
            {availablePhotos.map((p, i) => (
              <Photo key={p.id}
                src={p.dataUrl}
                i={i}
              />
            ))}
          </PhotosBox>
        </PreviewFrame>
      </Pages.SafeInsets>
    )
    
    
    /* return (
      <Pages.SafeInsets>
      
        {im && (
          <div css={photoContainer}>
            
            <img css={photoImgStyle}
              src={im.dataUrl}
              alt={im.name}
            />
            
            <ScrollbarVertical css={scrollbarVerticalStyle}
              visiblePartPercent={20}
              scroll={scroll} setScroll={setScroll}
            />
            
            <FadeButtonBar>
              <Name>{name}, 26</Name>
              <AboutMe>{aboutMe}</AboutMe>
            </FadeButtonBar>
            
          </div>
        )}
      
      </Pages.SafeInsets>
    ) */
  }
)
export default Preview


const PreviewFrame = styled.div`
  width: 100%;
  height: 100%;
  padding: 32px 16px;
`
const PhotosBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  ${centerAll};
  align-items: end;
  //background-color: #7FFFD455;
  border-radius: 16px;
`
const Photo = styled.img<{ i: number }>`
  width: ${p => 100 - 5 * p.i}%;
  height: 95%;
  translate: 0 ${p => -p.i}%;
  z-index: ${p => 6 - p.i};
  border-radius: 16px;
  object-position: center;
  object-fit: cover;
`

const photoContainer = css`
  width: 100%;
  height: calc(100dvh - var(--bottom-bars-inset));
  position: relative;
`

const photoImgStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  object-position: center;
  object-fit: cover;
`

const scrollbarVerticalStyle = (t: AppTheme.Theme) => css`
  ${ScrollbarVerticalStyle.scrollbar(t)};
  ${ScrollbarVerticalStyle.El.track.thiz()}{
    width: 4px;
    height: 150px;
    position: absolute;
    top: 16px;
    right: 16px;
  }
`

const FadeButtonBar = styled.div`
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 200px;
  background: linear-gradient(to top,
    #ffffffff 0%, #ffffff88 10%, #ffffff88 70%, #ffffff00 100%
  );
  
  ${col};
  gap: 4px;
  padding: 10px;
  padding-top: 30px;
`

const Name = styled.div`
  ${Txt.large4};
`
const AboutMe = styled.div`
  ${Txt.large2};
  color: ${p => p.theme.page.content2[0]}
`
