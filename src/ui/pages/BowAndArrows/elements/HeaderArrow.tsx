import { css } from '@emotion/react'
import { AppTheme } from '@util/theme/AppTheme.ts'
import React from 'react'
import { Hs } from 'src/ui/elements/basic-elements/Hs.tsx'
import Button from 'src/ui/elements/buttons/Button.tsx'
import { ButtonStyle } from 'src/ui/elements/buttons/ButtonStyle.ts'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons.tsx'
import { SvgIcStyle } from 'src/ui/elements/icons/SvgIcStyle.ts'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import row = EmotionCommon.row
import ArrowAngledRoundedIc = SvgIcons.ArrowAngledRoundedIc



const btnStyle = (t: AppTheme.Theme)=>css`
  ${ButtonStyle.smallRectTransparent(t)};
  ${row};
  justify-content: space-between;
  align-items: center;
`
const arrowStyle = (t: AppTheme.Theme)=>css`
  ${SvgIcStyle.Prop.prop.color}: ${t.page.content1[0]};
  height: 26px;
`



export type HeaderArrowProps = {
  children: string
}
const HeaderArrow =
React.memo(
(props: HeaderArrowProps)=>{
  return <Button css={btnStyle}>
    <h4 css={Hs.page}>{props.children}</h4>
    <ArrowAngledRoundedIc css={arrowStyle}/>
  </Button>
})
export default HeaderArrow