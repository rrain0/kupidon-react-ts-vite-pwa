import styled from '@emotion/styled'
import { TypeU } from '@util/common/TypeU.ts'
import React from 'react'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import ImgSpark from 'src/ui/0-elements/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/ui/0-elements/ImgSpark/ImgSparkS6.ts'
import Ava, { AvaExtraProps } from 'src/ui/1-widgets/avatars/Ava/Ava.tsx'
import AvaContent from 'src/ui/1-widgets/avatars/Ava/AvaContent.tsx'
import EmptyAva from 'src/ui/1-widgets/avatars/Ava/EmptyAva.tsx'
import HeartsDoubleIc = SvgIconsPack.HeartsDoubleIc
import Pu = TypeU.Pu








export type AvaButtonProps =
  & Omit<React.ComponentProps<typeof Button>, 'children'>
  & AvaExtraProps



const AvaButton = React.memo((props: AvaButtonProps) => {
  const {
    id, ava, online, mutualSympathy, shadow,
    ...restProps
  } = props
  
  const avaProps = { id, ava, online, mutualSympathy, shadow }
  
  return (
    <Button {...restProps} css={ButtonS6.t(avaButtonS)}>
      <AvaContent {...avaProps}/>
    </Button>
  )
})
AvaButton.displayName = 'AvaButton'
export default AvaButton



const avaButtonS: AppWidgetStyle = t => [ButtonS6.S.text.rounded.md.normal, {
  button: {
    relative: true, wMin: 0, sz: 'auto', p: 0, ratio: 1,
    overflow: 'visible',
    transition: 'outline-color 300ms ease-in-out',
    outline: '2px solid transparent !important',
    outlineOffset: '3px !important',
  },
  buttonInFocus: {
    outlineColor: 'black !important',
  },
  // Чтобы риппл был наверху контента
  bord: { zIndex: 1 },
}]

