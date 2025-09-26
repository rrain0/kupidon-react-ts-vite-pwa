import { css } from '@emotion/react'
import styled from '@emotion/styled'

import React from 'react'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import CheckmarkCircleToastifyIc
  from 'src/components/elems/icons/SvgIcons/pack/ui/CheckmarkCircleToastifyIc.tsx'
import DangerRoundToastifyIc
  from 'src/components/elems/icons/SvgIcons/pack/ui/DangerRoundToastifyIc.tsx'
import InfoToastifyIc from 'src/components/elems/icons/SvgIcons/pack/ui/InfoToastifyIc.tsx'
import SpinnerCircleQuarterIc
  from 'src/components/elems/icons/SvgIcons/pack/ui/SpinnerCircleQuarterIc.tsx'
import WarnTriangleToastifyIc
  from 'src/components/elems/icons/SvgIcons/pack/ui/WarnTriangleToastifyIc.tsx'
import { SvgIconS } from 'src/components/elems/icons/SvgIcons/SvgIconS.ts'
import CrossIc from 'src/components/elems/icons/SvgIcons/pack/ui/CrossIc.tsx'
import row = EmotionCommon.row
import resetButton = EmotionCommon.resetButton
import flexC = EmotionCommon.flexC
import Txt = EmotionCommon.Txt
import hoverable = EmotionCommon.hoverable
import { Cb } from '@utils/base/tsUtils.ts'
import { Pu } from '@utils/base/tsUtils.ts'



export type ToastType = 'normal' | 'loading' | 'info' | 'ok' | 'warn' | 'danger'
export type ToastBodyProps = Pu<{
  closeToast: Cb
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
            ${SvgIconS.El.icon.props.color.name}: ${t.toast.accentLoadingBg};
            ${SvgIconS.El.icon.props.colorAccent.name}: ${t.toast.accentLoadingCt};
          `}
        />
      )}
      
      {type === 'info' && (
        <InfoToastifyIc
          css={t => css`
            width: 20px;
            height: 20px;
            --color: ${t.toast.accentInfo};
          `}
        />
      )}
      
      {type === 'ok' && (
        <CheckmarkCircleToastifyIc
          css={t => css`
            width: 20px;
            height: 20px;
            ${SvgIconS.El.icon.props.color.name}: ${t.toast.accentOk};
          `}
        />
      )}
      
      {type === 'warn' && (
        <WarnTriangleToastifyIc
          css={t => css`
            width: 20px;
            height: 20px;
            ${SvgIconS.El.icon.props.color.name}: ${t.toast.accentWarn};
          `}
        />
      )}
      
      {type === 'danger' && (
        <DangerRoundToastifyIc
          css={t => css`
            width: 20px;
            height: 20px;
            ${SvgIconS.El.icon.props.color.name}: ${t.toast.accentDanger};
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
    ${SvgIconS.El.icon.props.color.name}: ${p => p.theme.toast.ct2};
  }
  
  ${hoverable}{
    :hover>${SvgIconS.El.icon.sel()} {
      ${SvgIconS.El.icon.props.color.name}: ${p => p.theme.toast.ct3};
    }
  }
`
