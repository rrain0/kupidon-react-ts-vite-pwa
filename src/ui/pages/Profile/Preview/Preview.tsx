import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useMemo, useState } from 'react'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import { ProfilePageValidation } from 'src/ui/pages/Profile/validation.ts'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { AppTheme } from '@util/theme/AppTheme.ts'
import ScrollbarVertical from 'src/ui/widgets/Scrollbar/ScrollbarVertical.tsx'
import { ScrollbarVerticalStyle } from 'src/ui/widgets/Scrollbar/ScrollbarVerticalStyle.ts'
import FormValues = ProfilePageValidation.FormValues
import col = EmotionCommon.col
import Txt = EmotionCommon.Txt




export type PreviewProps = {
  formValues: FormValues
}



const Preview =
React.memo(
(props: PreviewProps) => {
  
  const photos = props.formValues.photos
  const firstImage = useMemo(
    () => photos.filter(it => it.isReady)[0],
    [photos]
  )
  
  const [scroll, setScroll] = useState(0)
  
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
  
  
  
  return <Pages.SafeInsets>
    
    { firstImage && <div css={photoContainer}>
      
      <img css={photoImgStyle}
        src={firstImage.dataUrl}
        alt={firstImage.name}
      />
      
      <ScrollbarVertical css={scrollbarVerticalStyle}
        visiblePartPercent={20}
        scroll={scroll} setScroll={setScroll}
      />
      
      <FadeButtonBar>
       <Name>{props.formValues.name}, 26</Name>
       <AboutMe>{props.formValues.aboutMe}</AboutMe>
      </FadeButtonBar>
      
    </div> }
    
  </Pages.SafeInsets>
})
export default Preview



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

const scrollbarVerticalStyle = (t: AppTheme.Theme)=>css`
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
  color: ${p=>p.theme.page.content2[0]}
`