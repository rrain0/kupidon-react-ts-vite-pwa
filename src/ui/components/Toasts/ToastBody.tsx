import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { TypeU } from '@util/common/TypeU.ts'
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
import flexC = EmotionCommon.flexC
import Txt = EmotionCommon.Txt
import hoverable = EmotionCommon.hoverable
import Callback = TypeU.Callback
import Pu = TypeU.Pu



export type ToastType = 'normal' | 'loading' | 'info' | 'ok' | 'warn' | 'danger'
export type ToastBodyProps = Pu<{
  closeToast: Callback
  showCloseButton: boolean
  type: ToastType
  children?: React.ReactNode
}>


export const ToastBody = React.memo(({ 
  showCloseButton: showClose = true,
  type = 'normal',
  children,
  closeToast,
}: ToastBodyProps) => {
  
  return (
    <Body
      css={css`
        ${showClose && css`padding-right: 30px;`}
      `}
    >
      
      
      {type === 'loading' && (
        <SpinnerCircleQuarterIc
          css={t => css`
            width: 20px;
            height: 20px;
            ${SvgIconS.El.icon.props.color.name}: ${t.toast.accentLoadingBg[0]};
            ${SvgIconS.El.icon.props.colorAccent.name}: ${t.toast.accentLoadingCt[0]};
          `}
        />
      )}
      
      {type === 'info' && (
        <InfoToastifyIc
          css={t => css`
            width: 20px;
            height: 20px;
            --color: ${t.toast.accentInfo[0]};
          `}
        />
      )}
      
      {type === 'ok' && (
        <CheckmarkCircleToastifyIc
          css={t => css`
            width: 20px;
            height: 20px;
            ${SvgIconS.El.icon.props.color.name}: ${t.toast.accentOk[0]};
          `}
        />
      )}
      
      {type === 'warn' && (
        <WarnTriangleToastifyIc
          css={t => css`
            width: 20px;
            height: 20px;
            ${SvgIconS.El.icon.props.color.name}: ${t.toast.accentWarn[0]};
          `}
        />
      )}
      
      {type === 'danger' && (
        <DangerRoundToastifyIc
          css={t => css`
            width: 20px;
            height: 20px;
            ${SvgIconS.El.icon.props.color.name}: ${t.toast.accentDanger[0]};
          `}
        />
      )}
      
      
      
      <Content>{children}</Content>
      
      
      {showClose && (
        <CloseButton
          onClick={closeToast}
        >
          <CrossIc/>
        </CloseButton>
      )}
    
    
    </Body>
  )
})

const Body = styled.div`
  padding: 8px 14px;
  position: relative;
  ${row};
  gap: 10px;
  align-items: center;
  background: ${p => p.theme.toast.bg};
`

const Content = styled.div`
  ${row};
  flex: 1;
  color: ${p => p.theme.toast.ct};
  white-space: break-spaces;
  ${Txt.s14Thin};
`

const CloseButton = styled.button`
  ${resetButton};
  position: absolute;
  top: 3px; right: 3px;
  width: 28px;
  height: 28px;
  padding: 7px;
  ${flexC};
  cursor: pointer;

  &>${SvgIconS.El.icon.sel()} {
    width: 100%;
    height: 100%;
    ${SvgIconS.El.icon.props.color.name}: ${p => p.theme.toast.ct2[0]};
  }
  
  ${hoverable}{
    :hover>${SvgIconS.El.icon.sel()} {
      ${SvgIconS.El.icon.props.color.name}: ${p => p.theme.toast.ct3};
    }
  }
`
