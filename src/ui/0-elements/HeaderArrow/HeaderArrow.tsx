import clsx from 'clsx'
import { HeaderArrowS } from 'src/ui/0-elements/HeaderArrow/HeaderArrowS'
import React from 'react'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import ArrowAngledRoundedIc = SvgIconsPack.ArrowAngledRoundedIc




export type HeaderArrowProps = React.ComponentPropsWithoutRef<typeof Button>

const HeaderArrow = React.memo(
  React.forwardRef<HTMLButtonElement, HeaderArrowProps>(
    (props, forwardedRef) => {
      return (
        <Button
          {...props}
          ref={forwardedRef}
          className={clsx(HeaderArrowS.W.e.button.e.name, props.className)}
        >
          <h4 className={HeaderArrowS.W.e.header.e.name}>
            {props.children}
          </h4>
          <ArrowAngledRoundedIc
            className={HeaderArrowS.W.e.arrow.e.name}
          />
        </Button>
      )
    }
  )
)
export default HeaderArrow
