import { css } from '@emotion/react'
import React from 'react'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons.tsx'
import { SvgIcStyle } from 'src/ui/elements/icons/SvgIcStyle.ts'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import { TitleUiText } from 'src/ui/ui-values/TitleUiText.ts'
import BottomButtonBar from 'src/ui/widgets/BottomButtonBar/BottomButtonBar'
import { Hs } from 'src/ui/elements/basic-elements/Hs'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/widgets/Scrollbars/PageScrollbars'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import ArrowAngledRoundedIc = SvgIcons.ArrowAngledRoundedIc
import row = EmotionCommon.row





const BowAndArrowsPage =
React.memo(
()=>{
  const titleText = useUiValues(TitleUiText)
  
  
  return <>
    
    <Pages.Page>
      <Pages.SafeInsets>
        <Pages.Content>
          
          <PageHeader>{titleText.bowAndArrows}</PageHeader>
          
          <HeaderArrow>Афиша</HeaderArrow>
          
          <HeaderArrow>Все события</HeaderArrow>
        
        </Pages.Content>
      </Pages.SafeInsets>
      
      <PageScrollbars />
    </Pages.Page>
    
    <BottomButtonBar />
    
  </>
})
export default BowAndArrowsPage



const PageHeader = (props: { children: string }) => {
  return <Hs.Page css={{ paddingBottom: 40 }}>
    {props.children}
  </Hs.Page>
}

const HeaderArrow = (props: { children: string }) => {
  return <div css={css`
    ${row};
    justify-content: space-between;
    align-items: center;
  `}>
    <h4 css={Hs.page}>{props.children}</h4>
    <ArrowAngledRoundedIc css={t => css`
      ${SvgIcStyle.Prop.prop.color}: ${t.page.content1[0]};
      height: 26px;
    `}/>
  </div>
}