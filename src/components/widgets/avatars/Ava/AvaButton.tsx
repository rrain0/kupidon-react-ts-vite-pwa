import React from 'react'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import Button from 'src/components/elems/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/components/elems/buttons/Button/ButtonS6.ts'
import AvaContent, { AvaContentProps } from 'src/components/widgets/avatars/Ava/AvaContent.tsx'








export type AvaButtonProps =
  & Omit<React.ComponentProps<typeof Button>, 'children'>
  & AvaContentProps



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

