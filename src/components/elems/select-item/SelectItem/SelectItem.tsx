import clsx from 'clsx'
import React from 'react'
import Button from 'src/components/elems/buttons/Button/Button.tsx'
import PencilWrite2Ic from 'src/components/elems/icons/SvgIcons/pack/ui/PencilWrite2Ic.tsx'
import PlusIc from 'src/components/elems/icons/SvgIcons/pack/ui/PlusIc.tsx'
import { SelectItemS6 } from 'src/components/elems/select-item/SelectItem/SelectItemS6.ts'
import SelectMeter from 'src/components/elems/select-item/SelectMeter/SelectMeter'

import { useCssWhRef } from 'src/utils/view/useCssWhRef'
import { Pu } from '@utils/base/tsUtils.ts'
import { Cb } from '@utils/base/tsUtils.ts'
import { toEmptyAttr } from '@utils/base/tsUtils.ts'



type IsSelected = Pu<{ isSelected: boolean }>

export type IndicatorSelection = 0 | false | 1 | 2 | true

type SelectItemProps =
  React.ComponentProps<'button'>
  & IsSelected
  & Pu<{
    isAdd: boolean
    isEdit: boolean
    //isError: boolean
    //onClickAdd: Callback
    onClickEdit: Cb
    metersValues: IndicatorSelection[]
    children: React.ReactNode
  }>

const SelectItem = React.memo((props: SelectItemProps) => {
  const {
    ref, children, className, style,
    isSelected,
    isAdd,
    isEdit,
    //isError,
    
    //onClickAdd,
    onClickEdit,
    
    metersValues,
    
    ...restProps
  } = props
  
  //const metersValues = metersValues ?? arraify(isSelected)
  
  const setSelectItemFrame = useCssWhRef()
  
  const dataSelected = SelectItemS6.W.els.selectItem.ss!.selected.n
  
  return (
    <article
      data-display-name='SelectItem - Frame'
      ref={setSelectItemFrame}
      className={clsx(SelectItemS6.W.els.selectItem.n, className)}
      {...{ [dataSelected]: toEmptyAttr(isSelected) }}
      style={style}
    >
      
      <Button {...restProps} ref={ref}>
        {isAdd && (
          <div
            data-display-name='SelectItem - Add Icon Box'
            className={SelectItemS6.W.els.addBox.n}
          >
            <PlusIc/>
          </div>
        )}
        {!isAdd && children}
        {/* TODO Style - add next action button */}
      </Button>
      
      {!isAdd && (
        <>
          {metersValues && (
            <div
              data-display-name='SelectItem - Meter Box'
              className={SelectItemS6.W.els.meterBox.n}
            >
              <SelectMeter metersValues={metersValues}/>
            </div>
          )}
          {isEdit && (
            <div
              data-display-name='SelectItem - Edit Button Box'
              className={SelectItemS6.W.els.editBox.n}
            >
              <Button onClick={onClickEdit}>
                <PencilWrite2Ic/>
              </Button>
            </div>
          )}
        </>
      )}
      
    </article>
  )
})
SelectItem.displayName = 'SelectItem'
export default SelectItem





