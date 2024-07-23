import { css } from '@emotion/react'
import React, { useEffect, useMemo, useState } from 'react'
import { Gender } from 'src/api/model/Gender.ts'
import { Option } from 'src/ui-data/models/Option.ts'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal'
import SelectItem from 'src/ui/elements/inputs/SelectItem/SelectItem'
import { SelectItemS } from 'src/ui/elements/inputs/SelectItem/SelectItemS'
import UseBottomSheetState from 'src/ui/widgets/BottomSheet/UseBottomSheetState'
import BottomSheetDialogBasic from 'src/ui/widgets/BottomSheetBasic/BottomSheetDialogBasic'
import ModalInput from 'src/ui/widgets/modals/ModalInput/ModalInput'
import ModalRadio from 'src/ui/widgets/modals/ModalRadio/ModalRadio.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import OptionItem from 'src/ui/widgets/OptionItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from 'src/mini-libs/form-validation/components/ValidationWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import GenderGradIc = SvgGradIcons.GenderGradIc
import col = EmotionCommon.col



const overlayName = 'dateGenre'
const overlayEditCustomName = 'editCustom'



const DateGenreOption =
React.memo(
() => {
  const optionText = useUiValues(OptionUiText)
  const titleText = useUiValues(TitleUiText)
  
  const text = useMemo(() => ({
    notSelected: optionText.notSelected,
  }), [titleText, optionText])
  
  
  const [selected, setSelected] = useState('')
  
  
  const [finalCustomText, setFinalCustomText] = useState('')
  
  const options = useMemo(
    () => [
      {
        value: '1',
        text: 'Романтическое свидание: Вечер в заведении, прогулка под луной, ужин при свечах и тд.',
      }, {
        value: '2',
        text: 'Приключенческое свидание: Активные виды досуга, такие как '
          + 'велосипедные прогулки, восхождение на гору, путешествия и экскурсии.',
      }, {
        value: '3',
        text: 'Культурное свидание: Посещение музеев, галерей и выставок искусства, театров, кинофильмов.',
      }, {
        value: '4',
        text: 'Спортивное свидание: Совместные занятия спортом, '
          + 'например, игра в теннис, боулинг или даже просто фитнес-занятия вместе.',
      }, {
        value: '5',
        text: 'Кулинарное свидание: Готовка или посещение кулинарных мастер-классов, '
          + 'дегустации вин или рестораны с необычной кухней.',
      }, {
        value: '6',
        text: 'Интеллектуальный жанр: «Рекомендация игр-головоломок и квестов. '
          + 'Подсказки по участию в интеллектуальных соревнованиях и викторинах».',
      }, {
        value: '7',
        text: 'Музыкальный жанр: «Рекомендация концертов и выступлений местных музыкантов. '
          + 'Подсказки по посещению ночных клубов или баров с живой музыкой».',
      }, {
        value: '8',
        text: 'Фотографический жанр: «Рекомендация красивых мест для фотосессий. '
          + 'Советы по организации фотосафари или фотовыставок».',
      }, {
        value: 'custom',
        text: finalCustomText,
      }, {
        value: '',
        text: text.notSelected,
      },
    ],
    [text, finalCustomText]
  )
  
  
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  const value = options.find(opt => opt.value === selected)?.text ?? ''
  
  
  const { isOpen: isEditOpen, open: openEdit, close: closeEdit } = useOverlayUrl(overlayEditCustomName)
  const [customText, setCustomText] = useState(finalCustomText)
  const onEditClose = () => {
    closeEdit()
    setFinalCustomText(customText)
    if (customText) setSelected('custom')
    if (selected === 'custom' && !customText) setSelected('')
  }
  
  return (
    <>
      <OptionItem
        //icon={<GenderGradIc />}
        title={'Жанр свидания'}
        value={value}
        onClick={open}
      />
      
      
      <UseBottomSheetState
        isOpen={!!isOpen}
        close={close}
      >{ sheetProps => (
        <ModalPortal>
          <BottomSheetDialogBasic
            {...sheetProps.sheetProps}
            header={'Жанр свидания'}
          >
            <div css={selectItemsContainer}>
              {options.map(opt => (
                <SelectItem
                  css={SelectItemS.normal}
                  key={opt.value}
                  onClick={() => {
                    if (opt.value !== 'custom') setSelected(opt.value)
                    if (opt.value === 'custom' && opt.text) setSelected(opt.value)
                    if (opt.value === 'custom' && !opt.text) openEdit()
                  }}
                  onClickEdit={openEdit}
                  isSelected={opt.value === selected}
                  isAdd={opt.value === 'custom' && !opt.text}
                  isEdit={opt.value === 'custom'}
                  indicatorsSelection={opt.value === selected ? [true] : [false]}
                >
                  {opt.text}
                </SelectItem>
              ))}
            </div>
          
          </BottomSheetDialogBasic>
        </ModalPortal>
      )}</UseBottomSheetState>
      
      
      <ModalInput
        isOpen={isEditOpen}
        onClose={onEditClose}
        onClear={() => setCustomText('')}
        value={customText}
        onChange={ev => setCustomText(ev.currentTarget.value)}
        title={'Свой жанр свидания'}
      />
      
      
    </>
  )
})
export default DateGenreOption



const selectItemsContainer = css`
  ${col};
  padding-bottom: 20px;
  gap: 10px;
`
