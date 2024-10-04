import { css } from '@emotion/react'
import React, { useEffect, useMemo, useState } from 'react'
import { Gender } from 'src/api/model/Gender.ts'
import { Option } from 'src/ui-data/models/Option.ts'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon'
import {
  useSingleSelectOneEditableOption
} from 'src/ui/1-widgets/modals/ModalSingleSelectList/useSingleSelectOneEditableOption'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal'
import SelectItem from 'src/ui/0-elements/select-item/SelectItem/SelectItem'
import { SelectItemS } from 'src/ui/0-elements/select-item/SelectItem/SelectItemS'
import UseBottomSheetState from 'src/ui/1-widgets/BottomSheet/UseBottomSheetState'
import BottomSheetDialogBasic from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetDialogBasic'
import ModalInput from 'src/ui/1-widgets/modals/ModalInput/ModalInput'
import ModalRadio from 'src/ui/1-widgets/modals/ModalRadio/ModalRadio.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import ModalSingleSelectList
  from 'src/ui/1-widgets/modals/ModalSingleSelectList/ModalSingleSelectList'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from 'src/mini-libs/form-validation/components/ValidationWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import GenderGradIc = SvgGradIcons.GenderGradIc
import col = EmotionCommon.col



const overlayName = 'dateGenre'


const DateGenreOption = React.memo(
  () => {
    const optionText = useUiValues(OptionUiText)
    const titleText = useUiValues(TitleUiText)
    
    const text = useMemo(() => ({
      notSelected: optionText.notSelected,
    }), [titleText, optionText])
    
    const [selected, setSelected] = useState('')
    
    const options0 = useMemo(() => {
      return [
        {
          id: '1',
          text: 'Романтическое свидание: Вечер в заведении, прогулка под луной, ужин при свечах и тд.',
        },
        {
          id: '2',
          text: 'Приключенческое свидание: Активные виды досуга, такие как '
            + 'велосипедные прогулки, восхождение на гору, путешествия и экскурсии.',
        },
        {
          id: '3',
          text: 'Культурное свидание: Посещение музеев, галерей и выставок искусства, театров, кинофильмов.',
        },
        {
          id: '4',
          text: 'Спортивное свидание: Совместные занятия спортом, '
            + 'например, игра в теннис, боулинг или даже просто фитнес-занятия вместе.',
        },
        {
          id: '5',
          text: 'Кулинарное свидание: Готовка или посещение кулинарных мастер-классов, '
            + 'дегустации вин или рестораны с необычной кухней.',
        },
        {
          id: '6',
          text: 'Интеллектуальный жанр: «Рекомендация игр-головоломок и квестов. '
            + 'Подсказки по участию в интеллектуальных соревнованиях и викторинах».',
        },
        {
          id: '7',
          text: 'Музыкальный жанр: «Рекомендация концертов и выступлений местных музыкантов. '
            + 'Подсказки по посещению ночных клубов или баров с живой музыкой».',
        },
        {
          id: '8',
          text: 'Фотографический жанр: «Рекомендация красивых мест для фотосессий. '
            + 'Советы по организации фотосафари или фотовыставок».',
        },
        {
          id: 'CUSTOM',
          text: '',
        },
        {
          id: '',
          text: '',
        },
      ] satisfies Option<string>[]
    }, [text])
    
    const { options, add, edit, setOptionText } = useSingleSelectOneEditableOption(
      'CUSTOM', options0, selected, setSelected, '',
    )
    
    const { isOpen, open, close } = useOverlayUrl(overlayName)
    
    const valueText = options.find(opt => opt.id === selected)?.text || text.notSelected
    
    
    return (
      <>
        <OptionItem
          //icon={<GenderGradIc />}
          title={'Жанр свидания'}
          value={valueText}
          onClick={open}
        />
        
        
        <ModalSingleSelectList
          isOpen={isOpen}
          close={close}
          title={'Жанр свидания'}
          options={options}
          selected={selected}
          setSelected={setSelected}
          notSelectedValue={''}
          add={add}
          edit={edit}
          setOptionText={setOptionText}
        />
        
      </>
    )
  }
)
export default DateGenreOption


