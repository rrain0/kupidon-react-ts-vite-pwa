import React from 'react'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import HeartFilledIc = SvgIconsPack.HeartFilledIc







export type LikeButtonProps = Omit<React.ComponentProps<typeof Button>, 'children'>

const LikeButton = React.memo((props: LikeButtonProps) => {
  
  
  return (
    <Button // Frame
      data-display-name='LikeButton'
      css={IconButtonS6.t(likeButtonS)}
      {...props}
    >
      <HeartFilledIc/>
    </Button>
  )
})
LikeButton.displayName = 'LikeButton'
export default LikeButton




const icProfileShowcaseMain: AppWidgetStyle = t => [
  IconButtonS6.Parts.Type.filled.Shape.round.Size.lg2,
  IconButtonS6.Parts.Type.filled.baseColor,
  {
    buttonBg: {
      color: t.previewButtonMain.bg,
      im: `linear-gradient(
        to bottom,
        ${t.previewButtonMain.bgGrad[0]} 25%,
        ${t.previewButtonMain.bgGrad[1]} 50% 100%
      )`,
      pos: '0 0',
      sz: '100% 200%',
    },
    buttonColor: t.previewButtonMain.ct,
    rippleColor: t.previewButtonMain.ctRipple,
    iconColor: t.previewButtonMain.ct,
    inFocus: {
      buttonTransition: 'background-position 0.3s',
      buttonBgPos: '0 30%',
    },
  },
  {
    button: {
      sz: 60, p: 0,
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15)',
    },
    disabled: {
      buttonTransition: 'opacity 0.2s',
      buttonOpacity: 0.3,
    },
    
    // TODO Style - remove and apply :where to resetButton
    buttonHover: {
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15)',
    },
    buttonActive: {
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15)',
    },
    buttonFocus: {
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15)',
    },
    buttonFocusVisible: {
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 15px rgba(0, 0, 0, 0.15)',
    },
  },
]



const likeButtonS: AppWidgetStyle = t => [icProfileShowcaseMain, {
  iconSz: '51.05%',
}]