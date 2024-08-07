import { css } from '@emotion/react'
import { AppTheme } from '@util/theme/AppTheme.ts'
import React from 'react'
import styled from '@emotion/styled'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonStyle } from 'src/ui/0-elements/buttons/Button/ButtonStyle.ts'
import { SvgGradIconsStyle } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIconsStyle.ts'
import { SvgIcons } from 'src/ui/0-elements/icons/SvgIcons/SvgIcons.tsx'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { SvgIconsStyle } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsStyle.ts'
import PartialUndef = TypeU.PartialUndef
import ArrowAngledRoundedIc = SvgIcons.ArrowAngledRoundedIc
import Callback = TypeU.Callback
import Txt = EmotionCommon.Txt




export type OptionItemProps = PartialUndef<{
  icon: React.ReactNode
  title: React.ReactNode
  value: React.ReactNode
  onClick: Callback
}>


const OptionItem = React.memo(
  (props: OptionItemProps) => {
    const { icon, title, value, onClick } = props
    
    
    
    return (
      <Button
        css={buttonStyle}
        onClick={onClick}
      >
        
        <IconFrame>{icon}</IconFrame>
        <TitleFrame>{title}</TitleFrame>
        <ValueFrame>{value}</ValueFrame>
        <NextIconFrame>
          <ArrowAngledRoundedIc css={t => nextIconStyle(t)}/>
        </NextIconFrame>
        
      </Button>
    )
  }
)
export default OptionItem



const buttonStyle = (t: AppTheme.Theme) => css`
  ${ButtonStyle.textRectBigNormal(t)};
  
  ${ButtonStyle.W.use.s.normal().e.button().thisUse} {
    display: grid;
    grid: 'icon title next' auto
          'icon value next' auto
         / auto 1fr   auto;
    gap: 4px 0;
    
    width: 100%;
    min-height: 50px;
    height: fit-content;
    text-align: start;
    padding: 2px 0;
    ${Txt.large1b};
  }
`



const IconFrame = styled.div`
  grid-area: icon;
  place-self: start;
  width: 50px;
  height: 50px;
  display: grid;
  place-items: center;
  > { ${p => OptionAndValueItemGradIconStyle(p.theme)} }
  > { ${p => OptionAndValueItemIconStyle(p.theme)} }
`
const OptionAndValueItemGradIconStyle = (t: AppTheme.Theme) => css`
  ${SvgGradIconsStyle.normal(t)};
  ${SvgGradIconsStyle.El.icon.thiz()}{
    width: 60%;
  }
`
const OptionAndValueItemIconStyle = (t: AppTheme.Theme) => css`
  ${SvgIconsStyle.normal(t)};
  ${SvgIconsStyle.El.icon.thiz()}{
    ${SvgIconsStyle.El.icon.props.color.set(t.containerNormal.content3[0])}
    height: 50%;
  }
`
const TitleFrame = styled.div`
  grid-area: title;
  justify-self: start;
  display: grid;
  place-items: center start;
  
  color: ${p => p.theme.containerNormal.content[0]};
`
const ValueFrame = styled.div`
  grid-area: value;
  justify-self: start;
  display: grid;
  place-items: center start;
  
  color: ${p => p.theme.containerNormal.content3[0]};
`
const NextIconFrame = styled.div`
  grid-area: next;
  place-self: start stretch;
  width: 40px;
  height: 50px;
  display: grid;
  place-items: center;
`
const nextIconStyle = (t: AppTheme.Theme) => css`
  height: 24px;
  ${SvgIconsStyle.El.icon.props.color.name}: ${t.containerNormal.content3[0]};
`

