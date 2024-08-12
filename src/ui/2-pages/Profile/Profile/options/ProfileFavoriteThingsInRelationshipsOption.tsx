import React, { useMemo, useState } from 'react'
import ModalTextarea from 'src/ui/1-widgets/modals/ModalTextarea/ModalTextarea'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import Couple2GradIc = SvgGradIcons.Couple2GradIc







const overlayName = 'favoriteThingsInRelationships'





const ProfileFavoriteThingsInRelationshipsOption = React.memo(
  () => {
    const optionText = useUiValues(OptionUiText)
    const titleText = useUiValues(TitleUiText)
    
    const text = useMemo(() => ({
      notSpecified: optionText.notSpecified,
    }), [titleText, optionText])
    
    
    const [textValue, setTextValue] = useState('')
    
    const value = textValue || text.notSpecified
    
    const { isOpen, open, close } = useOverlayUrl(overlayName)
    
    
    return (
      <>
        <OptionItem
          icon={<Couple2GradIc />}
          title={'Что вам нравится в отношениях'}
          value={value}
          onClick={open}
        />
        
        <ModalTextarea
          title={'Что вам нравится в отношениях'}
          isOpen={isOpen}
          onClose={close}
          onClear={() => setTextValue('')}
          
          autoFocus
          value={textValue}
          onValue={setTextValue}
        />
        
      </>
    )
  }
)
export default ProfileFavoriteThingsInRelationshipsOption



