import React from 'react'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import { GradSvgIconsPack } from 'src/ui/0-elements/icons/GradSvgIcons/GradSvgIconsPack.tsx'
import Cross2GradIc = GradSvgIconsPack.Cross2GradIc





export type DislikeButtonProps = Omit<React.ComponentProps<typeof Button>, 'children'>

const DislikeButton = React.memo((props: DislikeButtonProps) => {
  
  return (
    <Button
      data-display-name='DislikeButton'
      css={IconButtonS6.t(dislikeButtonS)}
      {...props}
    >
      <Cross2GradIc/>
    </Button>
  )
})
DislikeButton.displayName = 'DislikeButton'
export default DislikeButton



const icProfileCardsNormal: AppWidgetStyle = t => [
  IconButtonS6.Parts.Type.filled.Shape.round.Size.lg2,
  IconButtonS6.Parts.Type.filled.baseColor,
  {
    buttonBgColor: t.previewButtonNorm.bg,
    buttonColor: t.previewButtonNorm.ct,
    rippleColor: t.previewButtonNorm.ctRipple,
    gradIconColor0: t.previewButtonNorm.ctGrad[0],
    gradIconColor1: t.previewButtonNorm.ctGrad[2],
    inFocus: {
      buttonBgColor: t.previewButtonNorm.bgFc,
      buttonColor: t.previewButtonNorm.ctFc,
    },
  },
  {
    button: {
      p: 0,
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


const dislikeButtonS: AppWidgetStyle = t => [icProfileCardsNormal, {
  buttonSz: 58,
  gradIconSz: '35.5%',
}]