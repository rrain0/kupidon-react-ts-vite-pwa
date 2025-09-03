import clsx from 'clsx'
import React from 'react'

import { StyleVals } from 'src/styles/StyleVals.ts'
import Flex from '@libs/short-propsed/components/Flex.tsx'
import {
  RadioInputGroupStyle,
} from 'src/components/elems/inputs/RadioInputGroup/RadioInputGroupStyle.ts'
import { Pu } from '@utils/base/TypeUtils.ts'
import { toEmptyAttr } from '@utils/base/TypeUtils.ts'




export type RadioInputGroupExtraProps = Pu<{
  hasError: boolean
  children: React.ReactNode
}>
export type RadioInputGroupProps =
  & React.ComponentProps<'div'>
  & RadioInputGroupExtraProps



const RadioInputGroup = React.memo((props: RadioInputGroupProps) => {
  const {
    className, children,
    hasError, 
    ...restProps
  } = props
  
  
  return (
    /* RadioInputGroup */
    <Flex as='article' relative col g={StyleVals.listGPx}
      data-display-name='RadioInputGroup'
      data-error={toEmptyAttr(hasError)}
      // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/radiogroup_role
      role='radiogroup'
      tabIndex={0}
      {...restProps}
      className={clsx(className, RadioInputGroupStyle.El.radioGroupClassName)}
    >
      
      { children }
      
      {/* Border */}
      <Flex absTlwh noPointer
        css={{ borderRadius: 'inherit' }}
        className={RadioInputGroupStyle.El.borderClassName}
      />
    </Flex>
  )
})
RadioInputGroup.displayName = 'RadioInputGroup'
export default RadioInputGroup

