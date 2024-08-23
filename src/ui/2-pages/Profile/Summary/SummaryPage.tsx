import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { formatDuration, intervalToDuration, parseISO } from 'date-fns'
import { ru, enUS } from 'date-fns/locale'
import React from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { LangRecoil } from 'src/recoil/state/LangRecoil'
import Card2 from 'src/ui/0-elements/cards/Card2'
import HeaderArrow from 'src/ui/2-pages/BowAndArrows/elements/HeaderArrow.tsx'
import PageHeader from 'src/ui/2-pages/BowAndArrows/elements/PageHeader.tsx'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/1-widgets/Scrollbars/PageScrollbars'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { DateU } from 'src/util/date/DateU'
import { ImagesMockData } from 'src/util/mock-data/ImagesMockData'
import full = RouteBuilder.full
import RootRoute = AppRoutes.RootRoute
import use = RouteBuilder.use



const profileData = {
  ava: ImagesMockData.all[7],
  name: 'Сатору',
  city: 'Токио',
  birthDate: '2000-08-23T14:33:55.609+07:00',
}


const SummaryPage = React.memo(
  () => {
    const lang = useRecoilValue(LangRecoil).langs[0]
    const titleText = useUiValues(TitleUiText)
    
    const auth = useRecoilValue(AuthRecoil)
    const authId = auth!.user.id
    
    const info = [profileData.city, DateU.age(profileData.birthDate, lang)].join(', ')
    
    console.log('age', DateU.age('2000-08-23T14:33:55.609+07:00', lang))
    console.log('ymd', DateU.yearsMonthsDaysFromBirthDate('2000-08-23T14:33:55.609+07:00', lang))
    
    return (
      <>
      
        <Pages.Page>
          <Pages.SafeInsets>
            <Pages.Content>
              
              <Link to={RootRoute.profile.id.userId[use](authId).profile[full]()}>
                <Card2 css={cardStyle}>
                  <Ava src={profileData.ava}/>
                  <Name>{profileData.name}</Name>
                  <Eye>Eye</Eye>
                  <Info>{info}</Info>
                  <Edit>Edit</Edit>
                </Card2>
              </Link>
            
            </Pages.Content>
          </Pages.SafeInsets>
          
          <PageScrollbars />
        </Pages.Page>
        
        <BottomButtonBar />
        
      </>
    )
  }
)
export default SummaryPage


const cardStyle = css`
  display: grid;
  grid:
    'ava  .    name .    eye ' auto
    'ava  .    .    .    .   ' 4px
    'ava  .    info info info' auto
    'ava  .    .    .    .   ' 10px
    'ava  .    edit edit edit' auto
   / auto 14px 1fr  8px  auto;
  gap: 0;
`

const Ava = styled.img`
  grid-area: ava;
  width: 82px;
  height: 82px;
  border-radius: 999999px;
  object-position: center;
  object-fit: cover;
`

const Name = styled.div`
  grid-area: name;
`
const Eye = styled.div`
  grid-area: eye;
`
const Info = styled.div`
  grid-area: info;
`
const Edit = styled.div`
  grid-area: edit;
`


