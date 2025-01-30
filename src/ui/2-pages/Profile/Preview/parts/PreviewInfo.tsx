import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useMemo, useRef } from 'react'
import { AppStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import BottomSheet from 'src/ui/1-widgets/BottomSheet/BottomSheet.tsx'
import UseBottomSheetState from 'src/ui/1-widgets/BottomSheet/UseBottomSheetState.tsx'
import { BottomSheetBasicParts } from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetBasicParts.ts'
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




export type PreviewInfoProps = ClassStyle & Children & Puro<{
  isOpen: boolean
  close: Callback
}>
export const PreviewInfo = React.memo((props: PreviewInfoProps) => {
  const {
    isOpen = false,
    close,
  } = props
  
  
  const bottomSheetFrameRef = useRef<HTMLDivElement>(null)
  const bottomSheetRef = useRef<HTMLDivElement>(null)
  const bottomSheetHeaderRef = useRef<HTMLDivElement>(null)
  const bottomSheetContentRef = useRef<HTMLDivElement>(null)
  
  
  const infos = useMemo(() => {
    return [
      { ic: <ProfileCardIc css={infoIcS} />, title: 'Имя', value: 'Yura' },
      { ic: <DumbbellIc css={infoIcS} />, title: 'Вес', value: 'Не выбрано' },
      { ic: <RulerCornerIc css={infoIcS} />, title: 'Рост', value: '175' },
      { ic: <Search2Ic css={infoIcS} />, title: 'Я ищу', value: 'Не выбрано' },
      { ic: <CalendarIc css={infoIcS} />, title: 'Возраст', value: '24' },
      { ic: <GenderIc css={infoIcS} />, title: 'Пол', value: 'Мужской' },
    ]
  }, [])
  
  
  return (
    <UseBottomSheetState
      isOpen={isOpen}
      onClose={close}
      snapPoints={['30%', '40%', 'free', '100%']}
      defaultOpenIdx={1}
    >
      {props => (
        <BottomSheetFrame data-display-name="PreviewInfo">
          <BottomSheet
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
                    ${props.sheetProps.sheetState === 'dragging' && css`cursor: grabbing;`}
                    height: 18px;
                  `}
                  ref={bottomSheetHeaderRef}
                  {...sheetDrag()}
                />
              
                {/* Bottom Sheet - Body - without margins & paddings */}
                <div css={BottomSheetBasicParts.bodyStyle}>
                  <ContentOverflowWrapper>
                    {/* Bottom Sheet - Scrollable Content - without margins */}
                    <Content ref={bottomSheetContentRef}>
                      
                      <NameAge>Yura, 26</NameAge>
                      
                      <div />
                      
                      <MatchBox>
                        <MatchBubble main>Совпадение - 85%</MatchBubble>
                        <MatchBubble>Желаемый партнёр</MatchBubble>
                        <MatchBubble>Интересы</MatchBubble>
                      </MatchBox>
                      
                      <div />
                      
                      <SectionTitle>Информация</SectionTitle>
                      
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
                      
                      <SectionTitle>Описание</SectionTitle>
                      
                      <div />
                      
                      <SectionText>
                        Ищу девушку для длительных отношений.
                        Активный, люблю долгие поездки и крепкий кофе.
                        Могу рассказать много интересных историй,
                        так что со мной не соскучишься)
                      </SectionText>
                      
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
PreviewInfo.displayName = 'PreviewInfo'
export default PreviewInfo



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
  // todo theme
  color: #232020;
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
  // todo theme
  background-color: #F5F5F5;
  color: #232020;
  // todo theme
  ${p => p.main && `
    background-image: linear-gradient(
      to bottom,
      #BB2649,
      #F75F82
    );
    color: #ffffff;
  `}
  ${Txt.md16}
`


const SectionTitle = styled.div`
  ${Txt.lg20bold};
  // todo theme
  color: #232020;
`


const InfoBox = styled.div`
  ${rowWrap};
  gap: 5px 2px;
`
const InfoBubble = styled.div`
  height: 30px;
  width: fit-content;
  padding: 4px 9px;
  ${round};
  ${rowC};
  gap: 6px;
  // todo theme
  background-color: #F5F5F5;
  color: #232020;
  ${Txt.md16};
`
const infoIcS: AppStyle = t => SvgIconS6.W.t(t, [
  SvgIconS6.SWidget.Normal.normal, {
    iconSz: 17,
    iconColor: '#6A6A6A',
  },
])


const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #B0B0B0;
`


const SectionText = styled.div`
  ${Txt.lg17};
  color: #232020;
`