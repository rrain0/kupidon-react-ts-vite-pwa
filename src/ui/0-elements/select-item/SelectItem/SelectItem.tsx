import clsx from 'clsx'
import React, { useImperativeHandle } from 'react'
import { RippleS6 } from 'src/ui/0-elements/Ripple/RippleS6.ts'
import SelectItemIndicator
  from 'src/ui/0-elements/select-item/SelectItemIndicator/SelectItemIndicator'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import { SelectItemS } from 'src/ui/0-elements/select-item/SelectItem/SelectItemS'
import UseRipple from 'src/ui/0-elements/Ripple/UseRipple'
import Ripple from 'src/ui/0-elements/Ripple/Ripple'
import { ReactU } from 'src/util/react/ReactU'
import { TypeU } from 'src/util/common/TypeU'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet'
import { useCssWhRef } from 'src/util/view/useCssWhRef'
import Puro = TypeU.Puro
import Callback = TypeU.Callback
import PlusIc = SvgIconsPack.PlusIc
import PencilWrite2Ic = SvgIconsPack.PencilWrite2Ic
import trueOrUndef = TypeU.trueOrUndef
import combineProps = ReactU.combineProps
import stopPointerAndMouseEvents = ReactU.stopPointerAndMouseEvents



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
              {...combineProps(restProps, rippleProps.target)}
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
                    <UseRipple>
                      {rippleProps => (
                        <div
                          //displayName={'EditBtn'}
                          className={SelectItemS.W.e.editBtn.e.name}
                          {...combineProps(
                            { onClick: onClickEdit },
                            rippleProps.target,
                            stopPointerAndMouseEvents(),
                          )}
                        >
                          <Ripple {...rippleProps.ripple} css={RippleS6.t(RippleS6.S.forIcon)} />
                          <PencilWrite2Ic />
                        </div>
                      )}
                    </UseRipple>
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





