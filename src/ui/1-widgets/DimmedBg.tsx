import styled from '@emotion/styled'
import { flexStyle } from '@utils/react/short-props/style/flexStyle.ts'
import { StyleVals } from 'src/styles/StyleVals.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import { MountControllerRenderProps } from 'src/ui/components/animations/MountController.tsx'
import UseEnterExitTransition from 'src/ui/components/animations/UseEnterExitTransition.tsx'
import React from 'react'





export type DimmedBgProps =
  & MountControllerRenderProps
  & React.ComponentProps<typeof Flex>

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



const DimmedBgView = styled(Flex)(flexStyle({
  full: true, noPointer: true,
}))


