import React from 'react'
import { IconButtonS6 } from 'src/components/elems/buttons/IconButton/IconButtonS6.ts'
import Button from 'src/components/elems/buttons/Button/Button.tsx'
import GearIc from 'src/components/elems/icons/SvgIcons/pack/ui/GearIc.tsx'
import QuickSettings, { QuickSettingsOverlayName } from 'src/components/widgets/QuickSettings/QuickSettings.tsx'
import { useOverlayUrl } from 'src/components/components/UseOverlayUrl/hook/useOverlayUrl.ts'




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