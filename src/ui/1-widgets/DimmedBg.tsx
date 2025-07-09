import styled from '@emotion/styled'
import { useAsCallback } from '@util/react-state/useAsCallback.ts'
import { ReactU } from '@util/react/ReactU.ts'
import { flexStyle } from '@util/react/short-props/style/flexStyle.ts'
import { useElemRefGetSet } from '@util/view/useElemRefGetSet.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import { MountControllerRenderProps } from 'src/ui/components/animations/MountController.tsx'
import UseEnterExitTransition from 'src/ui/components/animations/UseEnterExitTransition.tsx'
import { TypeU } from 'src/util/common/TypeU.ts'
import React, { useEffect, useState } from 'react'
import Callback = TypeU.Callback
import StyleProp = ReactU.StyleProp
import ClassStyle = ReactU.ClassStyle
import Children = ReactU.Children
import combineProps = ReactU.combineProps





export type DimmedBgProps = MountControllerRenderProps & ClassStyle & Children

const DimmedBg = React.memo((props: DimmedBgProps) => {
  const {
    isOpen, allowUnmount,
    className, style, children,
  } = props
  
  return (
    <UseEnterExitTransition isOpen={isOpen} allowUnmount={allowUnmount}
      initialStyle={{ backgroundColor: 'transparent' }}
      enterStyle={{
        transition: `background-color ${StyleVals.fadeInTime}ms linear`,
        backgroundColor: '#0000009a',
      }}
      exitStyle={{
        transition: `background-color ${StyleVals.fadeOutTime}ms linear`,
        backgroundColor: 'transparent',
      }}
    >
      {transitionProps => (
        <DimmedBgView
          {...transitionProps}
          style={{ ...style, ...transitionProps.style }}
          className={className}
          data-display-name='DimmedBg'
        >
          {children}
        </DimmedBgView>
      )}
    </UseEnterExitTransition>
  )
})
DimmedBg.displayName = 'DimmedBg'
export default DimmedBg



const DimmedBgView = styled.div(flexStyle({
  full: true, noPointer: true,
}))


