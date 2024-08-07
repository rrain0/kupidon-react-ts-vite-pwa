import styled from '@emotion/styled'
import clsx from 'clsx'
import React, { useImperativeHandle, useRef } from 'react'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon'
import UserActionsConsumer from 'src/ui/components/UserActionsConsumer/UserActionsConsumer'
import { SvgIcons } from 'src/ui/0-elements/icons/SvgIcons/SvgIcons'
import { SvgIconsStyle } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsStyle'
import { SelectItemS } from 'src/ui/0-elements/selectable-items/SelectItem/SelectItem/SelectItemS'
import { RippleS } from 'src/ui/0-elements/Ripple/RippleS'
import UseRipple from 'src/ui/0-elements/Ripple/UseRipple'
import Ripple from 'src/ui/0-elements/Ripple/Ripple'
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
    indicatorsSelection: (0 | false | 1 | 2 | true)[]
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
              <Ripple {...rippleProps.ripple} />
            </div>
            
            { isAdd && <div
              //displayName={'AddIconBox'}
              className={SelectItemS.W.e.addIconBox.e.name}
            >
              <PlusIc/>
            </div> }
            
            {!isAdd && <>
              
              <div
                //displayName={'IndicatorFrame'}
                className={SelectItemS.W.e.indicatorFrame.e.name}
              >
                <div
                  //displayName={'IndicatorBox'}
                  className={SelectItemS.W.e.indicatorBox.e.name}
                >
                  {indicators.map((it, i) => (
                    <React.Fragment key={`${i} ${it}`}>
                      {(() => {
                        if (it === 0 || it === false) return (
                          <div
                            //displayName={'Indicator0'}
                            className={SelectItemS.W.e.indicator0.e.name}
                          />
                        )
                        if (it === 1) return (
                          <div
                            //displayName={'Indicator1'}
                            className={SelectItemS.W.e.indicator1.e.name}
                          />
                        )
                        if (it === 2 || it === true) return (
                          <div
                            //displayName={'Indicator2'}
                            className={SelectItemS.W.e.indicator2.e.name}
                          />
                        )
                      })()}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              
              <div
                //displayName={'Content'}
                className={SelectItemS.W.e.content.e.name}
              >
                {children}
              </div>
              
              {isEdit && <UserActionsConsumer>
                <UseRipple>{rippleProps => (
                  <div
                    //displayName={'EditBtn'}
                    className={SelectItemS.W.e.editBtn.e.name}
                    onClick={onClickEdit}
                    {...rippleProps.target}
                  >
                    <Ripple {...rippleProps.ripple} css={RippleS.icon}/>
                    <PencilWrite2Ic />
                  </div>
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









