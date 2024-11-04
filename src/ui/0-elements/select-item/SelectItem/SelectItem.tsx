import clsx from 'clsx'
import React, { useImperativeHandle } from 'react'
import SelectItemIndicator
  from 'src/ui/0-elements/select-item/SelectItemIndicator/SelectItemIndicator'
import UserActionsConsumer from 'src/ui/components/UserActionsConsumer/UserActionsConsumer'
import { SvgIcons } from 'src/ui/0-elements/icons/SvgIcons/SvgIcons.tsx'
import { SelectItemS } from 'src/ui/0-elements/select-item/SelectItem/SelectItemS'
import { RippleS } from 'src/ui/0-elements/Ripple/RippleS'
import UseRipple from 'src/ui/0-elements/Ripple/UseRipple'
import Ripple from 'src/ui/0-elements/Ripple/Ripple'
import { ReactU } from 'src/util/common/ReactU'
import { TypeU } from 'src/util/common/TypeU'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet'
import { useCssWhRef } from 'src/util/view/useCssWhRef'
import Puro = TypeU.Puro
import Callback = TypeU.Callback
import PlusIc = SvgIcons.PlusIc
import PencilWrite2Ic = SvgIcons.PencilWrite2Ic
import combineEvHandlersRecords = ReactU.combineEvHandlersRecords
import trueOrUndef = TypeU.trueOrUndef



type IsSelected = Puro<{ isSelected: boolean }>

export type IndicatorSelection = 0 | false | 1 | 2 | true

type SelectItemProps =
  React.ComponentPropsWithoutRef<'article'>
  & IsSelected
  & Puro<{
    isAdd: boolean
    isEdit: boolean
    //isError: boolean
    //onClickAdd: Callback
    onClickEdit: Callback
    indicatorsSelection: IndicatorSelection[]
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
      
      //const indicators = indicatorsSelection ?? arraify(isSelected)
      
      const setElemForWh = useCssWhRef()
      const [getElem, setElem, elemRef] = useRefGetSet<HTMLDivElement | null>(null, setElemForWh)
      useImperativeHandle(forwardedRef, () => elemRef.current!, [])
      
      
      
      
      
      return (
        <UseRipple>
          { rippleProps => (
            <article
              //displayName={'RadioItemFrame'}
              ref={elemRef}
              className={clsx(SelectItemS.W.e.frame.e.name, className)}
              style={style}
              {...{
                [SelectItemS.W.s.selected.s.name]: trueOrUndef(isSelected),
              }}
              {...restProps}
              {...combineEvHandlersRecords(rippleProps.target, restProps)}
            >
              
              <div
                //displayName={'Border'}
                className={SelectItemS.W.e.border.e.name}
              >
                <Ripple {...rippleProps.ripple} />
              </div>
              
              { isAdd && (
                <div
                  //displayName={'AddIconBox'}
                  className={SelectItemS.W.e.addIconBox.e.name}
                >
                  <PlusIc />
                </div>
              ) }
              
              {!isAdd && (
                <>
                
                  {indicatorsSelection && (
                    <div
                      //displayName={'IndicatorFrame'}
                      className={SelectItemS.W.e.indicatorFrame.e.name}
                      style={style}
                    >
                      <SelectItemIndicator indicators={indicatorsSelection} />
                    </div>
                  )}
                  
                  <div
                    //displayName={'Content'}
                    className={SelectItemS.W.e.content.e.name}
                  >
                    {children}
                  </div>
                  
                  {isEdit && (
                    <UserActionsConsumer>
                      <UseRipple>
                        {rippleProps => (
                          <div
                            //displayName={'EditBtn'}
                            className={SelectItemS.W.e.editBtn.e.name}
                            onClick={onClickEdit}
                            {...rippleProps.target}
                          >
                            <Ripple {...rippleProps.ripple} css={RippleS.icon} />
                            <PencilWrite2Ic />
                          </div>
                        )}
                      </UseRipple>
                    </UserActionsConsumer>
                  )}
                
                </>
              )}
            </article>
          )}
        </UseRipple>
      )
    }
  )
)
export default SelectItem





