import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import { SvgIconS } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS.ts'
import SpinnerCircleQuarterIc = SvgIconsPack.SpinnerCircleQuarterIc
import InfoToastifyIc = SvgIconsPack.InfoToastifyIc
import CheckmarkCircleToastifyIc = SvgIconsPack.CheckmarkCircleToastifyIc
import WarnTriangleToastifyIc = SvgIconsPack.WarnTriangleToastifyIc
import DangerRoundToastifyIc = SvgIconsPack.DangerRoundToastifyIc
import CrossIc = SvgIconsPack.CrossIc
import row = EmotionCommon.row
import resetButton = EmotionCommon.resetButton
import center = EmotionCommon.center
import Txt = EmotionCommon.Txt
import hoverable = EmotionCommon.hoverable



export type ToastType = 'normal'|'loading'|'info'|'ok'|'warn'|'danger'
export type ToastBodyProps = {
  closeToast?: (()=>void) | undefined
  showCloseButton?: boolean|undefined
  type?: ToastType|undefined
  children?: React.ReactNode
}
export const ToastBody = React.memo((props: ToastBodyProps)=>{
  const showClose = props.showCloseButton ?? true
  const type = props.type ?? 'normal'
  
  return <Body
    css={css`
      ${props.showCloseButton && css`padding-right: 30px;`}
    `}
  >
    
    
    { type === 'loading' && <SpinnerCircleQuarterIc
      css={t=>css`
        width: 20px;
        height: 20px;
        ${SvgIconS.El.icon.props.color.name}: ${t.toast.accentLoadingBg[0]};
        ${SvgIconS.El.icon.props.accentColor.name}: ${t.toast.accentLoadingCt[0]};
      `}
    />}
    
    { type === 'info' && <InfoToastifyIc
      css={t=>css`
        width: 20px;
        height: 20px;
        --color: ${t.toast.accentInfo[0]};
      `}
    />}
    
    { type === 'ok' && <CheckmarkCircleToastifyIc
      css={t=>css`
        width: 20px;
        height: 20px;
        ${SvgIconS.El.icon.props.color.name}: ${t.toast.accentOk[0]};
      `}
    />}
    
    { type === 'warn' && <WarnTriangleToastifyIc
      css={t=>css`
        width: 20px;
        height: 20px;
        ${SvgIconS.El.icon.props.color.name}: ${t.toast.accentWarn[0]};
      `}
    />}
    
    { type === 'danger' && <DangerRoundToastifyIc
      css={t=>css`
        width: 20px;
        height: 20px;
        ${SvgIconS.El.icon.props.color.name}: ${t.toast.accentDanger[0]};
      `}
    />}
    
    
    
    <Content>
      {props.children}
    </Content>
    
    
    { showClose && <CloseButton
      onClick={props.closeToast}
    >
      <CrossIc/>
    </CloseButton>}
  
  
  </Body>
})

const Body = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px 14px;
  position: relative;
  ${row};
  gap: 10px;
  align-items: center;
  background: ${p=>p.theme.toast.bg[0]};
`

const Content = styled.div`
  ${row};
  flex: 1;
  color: ${p=>p.theme.toast.ct[0]};
  white-space: break-spaces;
  ${Txt.md14thin};
`

const CloseButton = styled.button`
  ${resetButton};
  position: absolute;
  top: 3px; right: 3px;
  width: 28px;
  height: 28px;
  padding: 7px;
  ${center};
  cursor: pointer;

  &>${SvgIconS.El.icon.sel()} {
    width: 100%;
    height: 100%;
    ${SvgIconS.El.icon.props.color.name}: ${p=>p.theme.toast.ct2[0]};
  }
  
  ${hoverable}{
    :hover>${SvgIconS.El.icon.sel()} {
      ${SvgIconS.El.icon.props.color.name}: ${p=>p.theme.toast.ct3[0]};
    }
  }
`
