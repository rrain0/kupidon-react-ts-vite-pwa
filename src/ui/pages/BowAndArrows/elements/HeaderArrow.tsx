import { css } from '@emotion/react'
import { AppTheme } from '@util/theme/AppTheme.ts'
import React from 'react'
import { Hs } from 'src/ui/elements/basic-elements/Hs.tsx'
import Button from 'src/ui/elements/buttons/Button/Button.tsx'
import { ButtonStyle } from 'src/ui/elements/buttons/Button/ButtonStyle.ts'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons/SvgIcons.tsx'
import { SvgIconsStyle } from 'src/ui/elements/icons/SvgIcons/SvgIconsStyle.ts'
import { EmotionCommon } from 'src/ui-props/styles/EmotionCommon.ts'
import row = EmotionCommon.row
import ArrowAngledRoundedIc = SvgIcons.ArrowAngledRoundedIc



const btnStyle = (t: AppTheme.Theme)=>css`
  ${ButtonStyle.textRectNormalNormal(t)};
  ${row};
  justify-content: space-between;
  align-items: center;
`
const arrowStyle = (t: AppTheme.Theme)=>css`
  ${SvgIconsStyle.El.icon.props.color.name}: ${t.page.content1[0]};
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