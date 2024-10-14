import React, { useMemo, useState } from 'react'
import { Option } from 'src/ui-data/models/Option.ts'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import ModalSingleSelectList
  from 'src/ui/1-widgets/modals/ModalSingleSelectList/ModalSingleSelectList'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from 'src/mini-libs/form-validation/components/ValidationWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import SmokeCigaretteGradIc = SvgGradIcons.SmokeCigaretteGradIc







const overlayName = 'profileSmoke'





const ProfileSmokeOption = React.memo(
  () => {
    const optionText = useUiValues(OptionUiText)
    const titleText = useUiValues(TitleUiText)
    
    const text = useMemo(() => ({
      attitudeTowardsSmoke: 'Отношение к курению',
      notSelected: optionText.notSelected,
      itNegative: 'Отрицательное',
      itNeutral: 'Нейтральное',
      itPositive: 'Положительное',
    }), [titleText, optionText])
    
    
    const [selected, setSelected] = useState('')
    
    
    const options = useMemo(
      () => [
        {
          id: text.itPositive,
          text: text.itPositive,
        },
        {
          id: text.itNeutral,
          text: text.itNeutral,
        },
        {
          id: text.itNegative,
          text: text.itNegative,
        },
        {
          id: '',
          text: text.notSelected,
        },
      ] satisfies Option<string>[],
      [text]
    )
    
    
    
    const { isOpen, open, close } = useOverlayUrl(overlayName)
    const value = options.find(opt => opt.id === selected)?.text ?? ''
    
    
    return (
      <>
        <OptionItem
          icon={<SmokeCigaretteGradIc />}
          title={text.attitudeTowardsSmoke}
          value={value}
          onClick={open}
        />
        
        
        <ModalSingleSelectList
          isOpen={isOpen}
          close={close}
          title={text.attitudeTowardsSmoke}
          options={options}
          selected={selected}
          setSelected={setSelected}
          notSelectedValue={''}
        />
      </>
    )
  }
)
export default ProfileSmokeOption



