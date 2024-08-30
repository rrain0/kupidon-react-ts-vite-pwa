import { css } from '@emotion/react'
import { AppTheme } from 'src/util/theme/AppTheme.ts'
import React from 'react'
import { Hs } from 'src/ui/0-elements/basic-elements/Hs.tsx'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonS } from 'src/ui/0-elements/buttons/Button/ButtonS.ts'
import { SvgIcons } from 'src/ui/0-elements/icons/SvgIcons/SvgIcons.tsx'
import { SvgIconS } from 'src/ui/0-elements/icons/SvgIcons/style/SvgIconS.ts'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import row = EmotionCommon.row
import ArrowAngledRoundedIc = SvgIcons.ArrowAngledRoundedIc



const btnStyle = (t: AppTheme.Theme) => css`
  ${ButtonS.textRectNormalNormal(t)};
  ${row};
  justify-content: space-between;
  align-items: center;
`
const arrowStyle = (t: AppTheme.Theme) => css`
  ${SvgIconS.El.icon.props.color.name}: ${t.page.content1[0]};
  height: 26px;
`



export type HeaderArrowProps = {
  children: string
}
const HeaderArrow = React.memo(
  (props: HeaderArrowProps) => {
    return (
      <Button css={btnStyle}>
        <h4 css={Hs.page}>{props.children}</h4>
        <ArrowAngledRoundedIc css={arrowStyle}/>
      </Button>
    )
  }
)
export default HeaderArrow
