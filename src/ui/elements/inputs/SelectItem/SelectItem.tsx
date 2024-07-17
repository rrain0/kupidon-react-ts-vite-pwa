import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useImperativeHandle, useRef } from 'react'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon'
import UserActionsConsumer from 'src/ui/components/UserActionsConsumer/UserActionsConsumer'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons/SvgIcons'
import { SvgIconsStyle } from 'src/ui/elements/icons/SvgIcons/SvgIconsStyle'
import Ripple from 'src/ui/elements/Ripple0/Ripple'
import { ArrayU } from 'src/util/common/ArrayU'
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



type IsSelected = Puro<{ isSelected: boolean }>



type SelectItemProps =
  React.ComponentPropsWithoutRef<'article'>
  & IsSelected
  & Puro<{
    isAdd: boolean
    isEdit: boolean
    isError: boolean
    onClickAdd: Callback
    onClickEdit: Callback
    selectedIndicators: boolean[]
    children: React.ReactNode
  }>

const SelectItem = React.memo(
  React.forwardRef<HTMLDivElement, SelectItemProps>(
    (props, forwardedRef) => {
      
      const {
        isSelected,
        isAdd,
        isEdit,
        isError,
        
        onClickAdd,
        onClickEdit,
        
        selectedIndicators,
        
        children,
        className,
        style,
        ...restProps
      } = props
      
      const indicators = selectedIndicators ?? arraify(isSelected)
      
      const elemRef = useRef<HTMLDivElement>(null)
      useImperativeHandle(forwardedRef, () => elemRef.current!, [])
      useElemWHAsCssProps(elemRef)
      
      
      
      
      return <RadioItemFrame
        ref={elemRef}
        className={className}
        style={style}
        {...restProps}
      >
        
        { isAdd && <AddIconBox onClick={onClickAdd}>
            <PlusIc/>
          </AddIconBox>
        }
        
        { !isAdd && <>
          
          <Border isSelected={isSelected}>
            {/* TODO fix ripple & maybe useSpring */}
            <Ripple
              targetElement={elemRef}
              mode='cursor'
            />
          </Border>
          
          <IndicatorFrame>
            <IndicatorBox>
              { indicators.map(it => it ? <IndicatorSelected /> : <Indicator />) }
            </IndicatorBox>
          </IndicatorFrame>
          
          <TextBox>
            <Text>{children}</Text>
          </TextBox>
          
          { isEdit && <UserActionsConsumer>
            <PencilIconBox onClick={onClickEdit}>
              <PencilWrite2Ic/>
            </PencilIconBox>
          </UserActionsConsumer> }
          
        </> }
        
      </RadioItemFrame>
    }
  )
)
export default SelectItem




const RadioItemFrame = styled.article`
  cursor: pointer;
  width: 300px;
  min-height: 80px;
  height: fit-content;
  border-radius: 20px;
  
  background: #eeeeee;
  
  position: relative;
  padding: 20px 26px;
  display: grid;
  grid-auto-flow: column;
  place-items: stretch center;
  gap: 10px;
`


const Border = styled.div<IsSelected>`
  pointer-events: none;
  ${abs};
  border-radius: inherit;
  border: none;
  ${p => p.isSelected && css`
    border-width: 2px;
    border-style: solid;
    border-color: #444444;
  `}
`




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
  border-radius: inherit;
  ${center};
  padding: 11px;
  
  ${SvgIconsStyle.El.icon.props.color.set('#444444')}
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




