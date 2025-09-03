import { AnimatedProperty } from '@animated/AnimatedProperty.ts'
import AnimatedDiv from '@animated/elems/AnimatedDiv.tsx'
import styled from '@emotion/styled'
import { getAge, nameCommaAge } from '@utils/ui/nameCommaAge.ts'
import React, { useMemo } from 'react'
import { useUiValues } from '@libs/ui-text/useUiText.ts'
import { AppWidgetStyle } from '@libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { OptionUiText } from 'src/locales/translations/OptionUiText.ts'
import { TitleUiText } from 'src/locales/translations/TitleUiText.ts'
import DumbbellIc from 'src/components/elems/icons/SvgIcons/pack/special/DumbbellIc.tsx'
import GenderIc from 'src/components/elems/icons/SvgIcons/pack/special/GenderIc.tsx'
import ProfileCardIc from 'src/components/elems/icons/SvgIcons/pack/special/ProfileCardIc.tsx'
import RulerCornerIc from 'src/components/elems/icons/SvgIcons/pack/special/RulerCornerIc.tsx'
import CalendarIc from 'src/components/elems/icons/SvgIcons/pack/ui/CalendarIc.tsx'
import SearchIc from 'src/components/elems/icons/SvgIcons/pack/ui/SearchIc.tsx'
import { SvgIconS6 } from 'src/components/elems/icons/SvgIcons/SvgIconS6.ts'
import UseBottomSheetState from 'src/components/widgets/BottomSheet/UseBottomSheetState.tsx'
import BottomSheetBasic from 'src/components/widgets/BottomSheetBasic/BottomSheetBasic.tsx'
import { BottomSheetBasicS6 } from 'src/components/widgets/BottomSheetBasic/BottomSheetBasicS6.ts'
import { GenderOptionValues } from 'src/components/pages/Profile/options/ProfileGenderOption.tsx'
import { ReactU } from '@utils/react/ReactU.ts'
import { TypeU } from '@utils/base/TypeU.ts'
import Children = ReactU.Children
import Pu = TypeU.Pu
import ClassStyle = ReactU.ClassStyle
import Callback = TypeU.Callback
import Txt = EmotionCommon.Txt
import rowWrap = EmotionCommon.rowWrap
import rowC = EmotionCommon.rowC
import round = EmotionCommon.round




export type ProfileCardsFullInfoProps = ClassStyle & Children & Pu<{
  isOpen: boolean
  close: Callback
  animatedOpacity: AnimatedProperty<number>
  name: string
  birthDate: string
  gender: GenderOptionValues
  aboutMe: string
}>
export const ProfileCardsFullInfo = React.memo((props: ProfileCardsFullInfoProps) => {
  const {
    isOpen = false,
    close,
    animatedOpacity,
    name,
    birthDate,
    gender,
    aboutMe,
  } = props
  
  const match = 'XX'
  const tests = 'XX'
  const height = '175'
  const weight = 'Не выбрано'
  const imLookingFor = 'Не выбрано'
  const age = getAge(birthDate)
  
  const titleText = useUiValues(TitleUiText)
  const optionText = useUiValues(OptionUiText)
  
  const uiText = useMemo(() => ({
    match: 'Совпадение',
    tests: 'Тесты',
    desiredPartner: 'Желаемый партнёр',
    interests: 'Интересы',
    
    information: 'Информация',
    
    name: titleText.name,
    weight: 'Вес',
    height: titleText.height,
    imLookingFor: titleText.imLookingFor,
    age: titleText.age,
    gender: titleText.gender,
    genderValue: (() => {
      if (gender === 'MALE') return optionText.male
      if (gender === 'FEMALE') return optionText.female
      return ''
    })(),
    
    aboutMe: titleText.aboutMe,
  }), [name, birthDate, gender, aboutMe, titleText, optionText])
  
  const nameAge = nameCommaAge(name, birthDate)
  
  const infos = useMemo(() => {
    return [
      {
        title: uiText.name, value: name,
        ic: <ProfileCardIc css={SvgIconS6.t(infoIcS)}/>,
      },
      {
        title: uiText.weight, value: weight,
        ic: <DumbbellIc css={SvgIconS6.t(infoIcS)}/>,
      },
      {
        title: uiText.height, value: height,
        ic: <RulerCornerIc css={SvgIconS6.t(infoIcS)}/>,
      },
      {
        title: uiText.imLookingFor, value: imLookingFor,
        ic: <SearchIc css={SvgIconS6.t(infoIcS)}/>,
      },
      {
        title: uiText.age, value: age,
        ic: <CalendarIc css={SvgIconS6.t(infoIcS)}/>,
      },
      {
        title: uiText.gender, value: uiText.genderValue,
        ic: <GenderIc css={SvgIconS6.t(infoIcS)}/>,
      },
    ]
  }, [name, birthDate, gender, aboutMe, uiText])
  
  
  return (
    <UseBottomSheetState
      isOpen={isOpen}
      onClose={close}
      snapPoints={['55%', '100%']}
      defaultOpenIdx={0}
    >
      {props => (
        <BottomSheetFrame
          data-display-name='ProfileCardsFullInfo'
          animatedStyle={{ opacity: animatedOpacity }}
        >
          <BottomSheetBasic
            css={BottomSheetBasicS6.t(bottomSheetS)}
            bgDim={false}
            headerTitle={false}
            {...props.sheetProps}
          >
            <Content>
              
              <NameAge>{nameAge}</NameAge>
              
              <div/>
              
              <MatchBox>
                <MatchBubble main>{uiText.match} - {match}%</MatchBubble>
                <MatchBubble main>{uiText.tests} - {tests}%</MatchBubble>
                <MatchBubble>{uiText.desiredPartner}</MatchBubble>
                <MatchBubble>{uiText.interests}</MatchBubble>
              </MatchBox>
              
              <div/>
              
              <SectionTitle>{uiText.information}</SectionTitle>
              
              <div/>
              
              <InfoBox>
                {infos.map(info => (
                  <InfoBubble key={info.title}>
                    {info.ic}
                    <div>{info.title}: {info.value}</div>
                  </InfoBubble>
                ))}
              </InfoBox>
              
              <div/>
              
              <Divider/>
              
              <div/>
              
              <SectionTitle>{uiText.aboutMe}</SectionTitle>
              
              <div/>
              
              <SectionText>{aboutMe}</SectionText>
              
              <div/>
              
              <Divider/>
              
              <div/>
              
              <SectionTitle>Интересы</SectionTitle>
              
              <div/>
              
              <SectionText>
                Активный отдых в пригороде
              </SectionText>
            
            </Content>
          </BottomSheetBasic>
        </BottomSheetFrame>
      )}
    </UseBottomSheetState>
  )
})
ProfileCardsFullInfo.displayName = 'ProfileCardsFullInfo'
export default ProfileCardsFullInfo



const BottomSheetFrame = styled(AnimatedDiv)`
  position: absolute;
  left: 50%;
  bottom: 0;
  translate: -50%;
  //width: var(--photo-w); // old
  width: 100%;
  height: calc(
    var(--h)
    - (var(--h) - var(--photos-h)) / 2
    - (var(--photos-h) - var(--photo-h))
  );
  z-index: 20;
  pointer-events: none;
`

const bottomSheetS: AppWidgetStyle = t => [
  BottomSheetBasicS6.S.bottom.sheet.full.normal,
  BottomSheetBasicS6.Addons.shadow,
  {
    sheet: {
      bgColor: t.previewFullInfoBox.bg,
      color: t.previewFullInfoBox.ct,
    },
    header: {
      pos: 'rel', z: 1,
      h: 50, mb: -30,
    },
    overflowCont: { p: 0 },
  },
]

const Content = styled.div`
  padding: 0 18px 20px;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto 12px auto 23px;
  grid-auto-rows: auto 18px;
`


const NameAge = styled.div`
  ${Txt.s24Bold};
`


const MatchBox = styled.div`
  ${rowWrap};
  gap: 6px;
`
const MatchBubble = styled.div<{ main?: boolean }>`
  height: 32px;
  width: fit-content;
  padding: 4px 7px;
  ${round};
  ${rowC};
  background-color: ${p => p.theme.previewFullInfoBubble.bg};
  color: ${p => p.theme.previewFullInfoBubble.ct};
  ${p => p.main && `
    background-image: linear-gradient(
      to bottom,
      ${p.theme.previewFullInfoBubble.bgMainGrad[0]},
      ${p.theme.previewFullInfoBubble.bgMainGrad[1]}
    );
    color:  ${p.theme.previewFullInfoBubble.ctMain};
  `}
  ${Txt.s16Thin}
`


const SectionTitle = styled.div`
  ${Txt.s20Bold};
`


const InfoBox = styled.div`
  ${rowWrap};
  gap: 5px 2px;
`
const InfoBubble = styled(MatchBubble)`
  height: 30px;
  padding: 4px 9px;
  gap: 6px;
  ${Txt.s16Thin};
`
const infoIcS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  iconSz: 17,
  iconColor: t.previewFullInfoBubble.ct2,
}]


const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${p => p.theme.previewFullInfoBox.ct2};
`


const SectionText = styled.div`
  ${Txt.s17};
`