import styled from '@emotion/styled'
import clsx from 'clsx'
import React, { useImperativeHandle, useRef } from 'react'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon'
import UserActionsConsumer from 'src/ui/components/UserActionsConsumer/UserActionsConsumer'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons/SvgIcons'
import { SvgIconsStyle } from 'src/ui/elements/icons/SvgIcons/SvgIconsStyle'
import { SelectItemS } from 'src/ui/elements/inputs/SelectItem/SelectItemS'
import { RippleS } from 'src/ui/elements/Ripple/RippleS'
import UseRipple from 'src/ui/elements/Ripple/UseRipple'
import Ripple from 'src/ui/elements/Ripple/Ripple'
import { ArrayU } from 'src/util/common/ArrayU'
import { ReactU } from 'src/util/common/ReactU'
import { TypeU } from 'src/util/common/TypeU'
import { useElemWHAsCssProps } from 'src/util/element/useElemWHAsCssProps'
import Puro = TypeU.Puro
import abs = EmotionCommon.abs
import Callback = TypeU.Callback
import center = EmotionCommon.center
import colC = EmotionCommon.colC
import row = EmotionCommon.row
import PlusIc = SvgIcons.PlusIc
import PencilWrite2Ic = SvgIcons.PencilWrite2Ic
import arraify = ArrayU.arraify
import combineEvHandlerRecord = ReactU.combineEvHandlerRecord
import trueOrUndef = TypeU.trueOrUndef



type IsSelected = Puro<{ isSelected: boolean }>



type SelectItemProps =
  React.ComponentPropsWithoutRef<'article'>
  & IsSelected
  & Puro<{
    isAdd: boolean
    isEdit: boolean
    //isError: boolean
    //onClickAdd: Callback
    onClickEdit: Callback
    indicatorsSelection: boolean[]
    children: React.ReactNode
  }>

const SelectItem = React.memo(
  React.forwardRef<HTMLDivElement, SelectItemProps>(
    (props, forwardedRef) => {
      
      const {
        isSelected,
        isAdd,
        isEdit,
        //isError,
        
        //onClickAdd,
        onClickEdit,
        
        indicatorsSelection,
        
        children,
        className,
        style,
        ...restProps
      } = props
      
      const indicators = indicatorsSelection ?? arraify(isSelected)
      
      const elemRef = useRef<HTMLDivElement>(null)
      useImperativeHandle(forwardedRef, () => elemRef.current!, [])
      useElemWHAsCssProps(elemRef)
      
      
      
      
      
      return (
        <UseRipple>{ rippleProps => (
          <article
            //displayName={'RadioItemFrame'}
            ref={elemRef}
            className={clsx(SelectItemS.W.e.frame.e.name, className)}
            style={style}
            {...{
              [SelectItemS.W.s.selected.s.name]: trueOrUndef(isSelected),
            }}
            {...restProps}
            {...combineEvHandlerRecord(rippleProps.target, restProps)}
          >
            
            <div
              //displayName={'Border'}
              className={SelectItemS.W.e.border.e.name}
            >
              <Ripple {...rippleProps.ripple} css={RippleS.filled}/>
            </div>
            
            {isAdd && <AddIconBox>
              <PlusIc/>
            </AddIconBox>
            }
            
            {!isAdd && <>
              
              <IndicatorFrame>
                <IndicatorBox>
                  {indicators.map((it, i) => (
                    <React.Fragment key={`${i} ${it}`}>
                      {it ? <IndicatorSelected/> : <Indicator/>}
                    </React.Fragment>
                  ))}
                </IndicatorBox>
              </IndicatorFrame>
              
              <Content>
                <TextBox>
                  <Text>{children}</Text>
                </TextBox>
              </Content>
              
              {isEdit && <UserActionsConsumer>
                <UseRipple>{rippleProps => (
                  <PencilIconBox onClick={onClickEdit} {...rippleProps.target}>
                    <Ripple {...rippleProps.ripple} css={RippleS.icon}/>
                    <PencilWrite2Ic/>
                  </PencilIconBox>
                )}</UseRipple>
              </UserActionsConsumer>}
            
            </>}
          
          </article>
        )}</UseRipple>
      )
    }
  )
)
export default SelectItem



const AddIconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  
  place-self: center;
  //background: #ff000011;
  ${center};
  padding: 2px;
`



const IndicatorFrame = styled.div`
  pointer-events: none;
  ${abs};
  ${colC};
  padding: 6px;
`
const IndicatorBox = styled.div`
  width: 75%;
  align-self: center;
  height: 6px;
  ${row};
  gap: 6px;
`
const Indicator = styled.div`
  flex: 1;
  height: 100%;
  border-radius: 999999px;
  background: #cccccc;
`
const IndicatorSelected = styled.div`
  flex: 1;
  height: 100%;
  border-radius: 999999px;
  background: #444444;
`



const PencilIconBox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: var(--br);
  ${center};
  padding: 11px;
  overflow: hidden;
  
  ${SvgIconsStyle.El.icon.props.color.set('#444444')}
`




const Content = styled.div`
  width: 100%;
  min-height: 100%;
  padding: 20px 26px;
  ${center};
`
const TextBox = styled.div`
  width: 100%;
  min-height: 100%;
  ${center};
`
const Text = styled.div`
  align-self: center;
  //background: #ffff0022;
  overflow-wrap: anywhere;
`




