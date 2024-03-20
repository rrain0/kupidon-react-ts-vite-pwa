/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useMemo, useState } from 'react'
import { Pages } from 'src/components/Page/Pages'
import { ProfilePageValidation } from 'src/pages/Profile/validation'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { MathUtils } from 'src/utils/common/NumberUtils'
import { AppTheme } from 'src/utils/theme/AppTheme'
import ScrollbarVertical from 'src/views/Scrollbar/ScrollbarVertical'
import { ScrollbarVerticalStyle } from 'src/views/Scrollbar/ScrollbarVerticalStyle'
import FormValues = ProfilePageValidation.FormValues
import PageContentSafe = Pages.PageContentSafe
import abs = EmotionCommon.abs
import col = EmotionCommon.col
import Txt = EmotionCommon.Txt
import loopRange = MathUtils.loopRange





export type PreviewProps = {
  formValues: FormValues
}



const Preview =
React.memo(
(props: PreviewProps)=>{
  
  const photos = props.formValues.photos
  const firstImage = useMemo(
    ()=>photos.filter(it=>it.isReady)[0],
    [photos]
  )
  
  const [scroll,setScroll] = useState(0)
  
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
  
  
  
  return <PageContentSafe>
    
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
    
  </PageContentSafe>
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