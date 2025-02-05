import clsx from 'clsx'
import React from 'react'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { SelectItemS6 } from 'src/ui/0-elements/select-item/SelectItem/SelectItemS6.ts'
import SelectMeter from 'src/ui/0-elements/select-item/SelectMeter/SelectMeter'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import { TypeU } from 'src/util/common/TypeU'
import { useCssWhRef } from 'src/util/view/useCssWhRef'
import Puro = TypeU.Puro
import Callback = TypeU.Callback
import PlusIc = SvgIconsPack.PlusIc
import PencilWrite2Ic = SvgIconsPack.PencilWrite2Ic
import trueOrUndef = TypeU.trueOrUndef



type IsSelected = Puro<{ isSelected: boolean }>

export type IndicatorSelection = 0 | false | 1 | 2 | true

type SelectItemProps =
  React.ComponentPropsWithoutRef<'button'>
  & IsSelected
  & Puro<{
    isAdd: boolean
    isEdit: boolean
    //isError: boolean
    //onClickAdd: Callback
    onClickEdit: Callback
    metersValues: IndicatorSelection[]
    children: React.ReactNode
  }>

const SelectItem = React.memo(React.forwardRef<HTMLButtonElement, SelectItemProps>(
  (props, forwardedRef) => {
    const {
      isSelected,
      isAdd,
      isEdit,
      //isError,
      
      //onClickAdd,
      onClickEdit,
      
      metersValues,
      
      children,
      className,
      style,
      ...restProps
    } = props
    
    //const metersValues = metersValues ?? arraify(isSelected)
    
    const setSelectItemFrame = useCssWhRef()
    
    const dataSelected = SelectItemS6.W.els.selectItem.ss!.selected.n
    
    return (
      <article
        data-display-name="SelectItem - Frame"
        ref={setSelectItemFrame}
        className={clsx(SelectItemS6.W.els.selectItem.n, className)}
        {...{ [dataSelected]: trueOrUndef(isSelected) }}
        style={style}
      >
        
        <Button {...restProps} ref={forwardedRef}>
          {isAdd && (
            <div
              data-display-name="SelectItem - Add Icon Box"
              className={SelectItemS6.W.els.addBox.n}
            >
              <PlusIc />
            </div>
          )}
          {!isAdd && children}
          {/* TODO Style - add next action button */}
        </Button>
        
        {!isAdd && (
          <>
            {metersValues && (
              <div
                data-display-name="SelectItem - Meter Box"
                className={SelectItemS6.W.els.meterBox.n}
              >
                <SelectMeter metersValues={metersValues} />
              </div>
            )}
            {isEdit && (
              <div
                data-display-name="SelectItem - Edit Button Box"
                className={SelectItemS6.W.els.editBox.n}
              >
                <Button onClick={onClickEdit}>
                  <PencilWrite2Ic />
                </Button>
              </div>
            )}
          </>
        )}
        
      </article>
    )
  }
))
export default SelectItem





