
import clsx from 'clsx'
import { HeaderArrowS } from 'src/components/elems/HeaderArrow/HeaderArrowS'
import React from 'react'
import Button from 'src/components/elems/buttons/Button/Button.tsx'
import ArrowAngledRoundedIc from 'src/components/elems/icons/SvgIcons/pack/ui/ArrowAngledRoundedIc.tsx'
import { Pu } from '@utils/base/tsUtils.ts'




export type HeaderArrowProps = React.ComponentProps<typeof Button> & Pu<{
  noArrow: boolean
}>

const HeaderArrow = React.memo((props: HeaderArrowProps) => {
  const {
    className,
    noArrow,
    children,
    ...restProps
  } = props
  
  return (
    <Button
      {...restProps}
      className={clsx(HeaderArrowS.W.e.button.e.name, className)}
    >
      <h4 className={HeaderArrowS.W.e.header.e.name}>
        {children}
      </h4>
      {!noArrow && (
        <ArrowAngledRoundedIc
          className={HeaderArrowS.W.e.arrow.e.name}
        />
      )}
    </Button>
  )
})
export default HeaderArrow
