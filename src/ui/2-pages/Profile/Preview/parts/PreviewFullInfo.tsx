import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { DateU } from '@util/date/DateU.ts'
import React, { useMemo, useRef } from 'react'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import { BottomSheetS6 } from 'src/ui/1-widgets/BottomSheet/BottomSheetS6.ts'
import UseBottomSheetState from 'src/ui/1-widgets/BottomSheet/UseBottomSheetState.tsx'
import { BottomSheetBasicParts } from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetBasicParts.ts'
import BottomSheet from 'src/ui/1-widgets/BottomSheet/BottomSheet.tsx'
import { ProfilePageValidation } from 'src/ui/2-pages/Profile/validation.ts'
import { ReactU } from 'src/util/react/ReactU'
import { TypeU } from 'src/util/common/TypeU'
import Children = ReactU.Children
import Puro = TypeU.Puro
import ClassStyle = ReactU.ClassStyle
import col = EmotionCommon.col
import Callback = TypeU.Callback
import Txt = EmotionCommon.Txt
import rowWrap = EmotionCommon.rowWrap
import rowC = EmotionCommon.rowC
import round = EmotionCommon.round
import noScrollbars = EmotionCommon.noScrollbars
import ProfileCardIc = SvgIconsPack.ProfileCardIc
import Search2Ic = SvgIconsPack.Search2Ic
import GenderIc = SvgIconsPack.GenderIc
import CalendarIc = SvgIconsPack.CalendarIc
import DumbbellIc = SvgIconsPack.DumbbellIc
import RulerCornerIc = SvgIconsPack.RulerCornerIc
import FormValues = ProfilePageValidation.FormValues




export type PreviewFullInfoProps = ClassStyle & Children & Puro<{
  isOpen: boolean
  close: Callback
  profile: FormValues
}>
export const PreviewFullInfo = React.memo((props: PreviewFullInfoProps) => {
  const {
    isOpen = false,
    close,
    profile,
  } = props
  const {
    name,
    birthDate,
    gender,
    aboutMe,
  } = profile ?? { }
  const match = 'XX'
  const tests = 'XX'
  const height = '175'
  const weight = 'Не выбрано'
  const imLookingFor = 'Не выбрано'
  const age = (birthDate && DateU.age(birthDate)) ?? ''
  
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
  }), [profile, titleText, optionText])
  
  
  const bottomSheetFrameRef = useRef<HTMLDivElement>(null)
  const bottomSheetRef = useRef<HTMLDivElement>(null)
  const bottomSheetHeaderRef = useRef<HTMLDivElement>(null)
  const bottomSheetContentRef = useRef<HTMLDivElement>(null)
  
  const nameAge = [name, age].filter(it => it).join(', ')
  
  const infos = useMemo(() => {
    return [
      {
        title: uiText.name, value: name,
        ic: <ProfileCardIc css={SvgIconS6.t(infoIcS)} />,
      },
      {
        title: uiText.weight, value: weight,
        ic: <DumbbellIc css={SvgIconS6.t(infoIcS)} />,
      },
      {
        title: uiText.height, value: height,
        ic: <RulerCornerIc css={SvgIconS6.t(infoIcS)} />,
      },
      {
        title: uiText.imLookingFor, value: imLookingFor,
        ic: <Search2Ic css={SvgIconS6.t(infoIcS)} />,
      },
      {
        title: uiText.age, value: age,
        ic: <CalendarIc css={SvgIconS6.t(infoIcS)} />,
      },
      {
        title: uiText.gender, value: uiText.genderValue,
        ic: <GenderIc css={SvgIconS6.t(infoIcS)} />,
      },
    ]
  }, [profile, uiText])
  
  
  return (
    <UseBottomSheetState
      isOpen={isOpen}
      onClose={close}
      snapPoints={['55%', '100%']}
      defaultOpenIdx={0}
    >
      {props => (
        <BottomSheetFrame data-display-name="PreviewFullInfo">
          <BottomSheet
            css={BottomSheetS6.t(BottomSheetS6.S.Normal.normal)}
            bgDim={false}
            {...props.sheetProps}
            bottomSheetFrameRef={bottomSheetFrameRef}
            bottomSheetRef={bottomSheetRef}
            bottomSheetHeaderRef={bottomSheetHeaderRef}
            bottomSheetContentRef={bottomSheetContentRef}
          >
            {({ sheetDrag }) => (
              <>
                
                {/* Bottom Sheet - Header - without margins */}
                <div
                  css={t => css`
                    ${BottomSheetBasicParts.headerStyle(t)};
                    ${bottomSheetS(t)};
                    ${props.sheetProps.sheetState === 'dragging' && css`cursor: grabbing;`}
                    height: 18px;
                  `}
                  ref={bottomSheetHeaderRef}
                  {...sheetDrag()}
                />
              
                {/* Bottom Sheet - Body - without margins & paddings */}
                <div css={[BottomSheetBasicParts.bodyStyle, bottomSheetS]}>
                  <ContentOverflowWrapper>
                    {/* Bottom Sheet - Scrollable Content - without margins */}
                    <Content ref={bottomSheetContentRef}>
                      
                      <NameAge>{nameAge}</NameAge>
                      
                      <div />
                      
                      <MatchBox>
                        <MatchBubble main>{uiText.match} - {match}%</MatchBubble>
                        <MatchBubble main>{uiText.tests} - {tests}%</MatchBubble>
                        <MatchBubble>{uiText.desiredPartner}</MatchBubble>
                        <MatchBubble>{uiText.interests}</MatchBubble>
                      </MatchBox>
                      
                      <div />
                      
                      <SectionTitle>{uiText.information}</SectionTitle>
                      
                      <div />
                      
                      <InfoBox>
                        {infos.map(info => (
                          <InfoBubble key={info.title}>
                            {info.ic}
                            <div>{info.title}: {info.value}</div>
                          </InfoBubble>
                        ))}
                      </InfoBox>
                      
                      <div />
                      
                      <Divider />
                      
                      <div />
                      
                      <SectionTitle>{uiText.aboutMe}</SectionTitle>
                      
                      <div />
                      
                      <SectionText>{aboutMe}</SectionText>
                      
                      <div />
                      
                      <Divider />
                      
                      <div />
                      
                      <SectionTitle>Интересы</SectionTitle>
                      
                      <div />
                      
                      <SectionText>
                        Активный отдых в пригороде
                      </SectionText>
                    
                    </Content>
                  </ContentOverflowWrapper>
                </div>
              
              </>
            )}
          </BottomSheet>
        </BottomSheetFrame>
      )}
    </UseBottomSheetState>
  )
})
PreviewFullInfo.displayName = 'PreviewFullInfo'
export default PreviewFullInfo



const BottomSheetFrame = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  translate: -50%;
  width: var(--photo-w);
  height: calc(
    var(--h)
    - (var(--h) - var(--photos-h)) / 2
    - (var(--photos-h) - var(--photo-h))
  );
  z-index: 20;
  pointer-events: none;
`

const bottomSheetS = (t: AppTheme.Theme) => css`
  background-color: ${t.previewFullInfoBox.bg};
  color: ${t.previewFullInfoBox.ct};
`

const ContentOverflowWrapper = styled.div`
  width: 100%;
  height: 100%;
  ${col};
  overflow: auto;
  ${noScrollbars};
`
const Content = styled.div`
  padding: 0 18px 20px;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto 12px auto 23px;
  grid-auto-rows: auto 18px;
`


const NameAge = styled.div`
  ${Txt.lg24bold};
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
  ${Txt.md16}
`


const SectionTitle = styled.div`
  ${Txt.lg20bold};
`


const InfoBox = styled.div`
  ${rowWrap};
  gap: 5px 2px;
`
const InfoBubble = styled(MatchBubble)`
  height: 30px;
  padding: 4px 9px;
  gap: 6px;
  ${Txt.md16};
`
const infoIcS: AppWidgetStyle = t => [SvgIconS6.S.Normal.normal, {
  iconSz: 17,
  iconColor: t.previewFullInfoBubble.ct2,
}]


const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${p => p.theme.previewFullInfoBox.ct2};
`


const SectionText = styled.div`
  ${Txt.lg17};
`