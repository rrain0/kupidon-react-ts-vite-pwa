import React from 'react'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import QuickSettings, { QuickSettingsOverlayName } from 'src/ui/1-widgets/QuickSettings/QuickSettings.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import GearIc = SvgIconsPack.GearIc




const QuickSettingsButton = React.memo(() => {
  
  const { isOpen, open, closeWithAction } = useOverlayUrl(QuickSettingsOverlayName)
  
  return (
    <>
      <Button
        css={IconButtonS6.t(IconButtonS6.S.trans.round.lg.secondary)}
        onClick={open}
        data-display-name='QuickSettingsButton'
      >
        <GearIc/>
      </Button>
      
      <QuickSettings isOpen={isOpen} close={closeWithAction}/>
    </>
  )
})
QuickSettingsButton.displayName = 'QuickSettingsButton'
export default QuickSettingsButton