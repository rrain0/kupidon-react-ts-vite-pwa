import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import Card2 from 'src/ui/0-elements/cards/Card2'
import HeaderArrow from 'src/ui/2-pages/BowAndArrows/elements/HeaderArrow.tsx'
import PageHeader from 'src/ui/2-pages/BowAndArrows/elements/PageHeader.tsx'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/1-widgets/Scrollbars/PageScrollbars'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { ImagesMockData } from 'src/util/mock-data/ImagesMockData'
import full = RouteBuilder.full
import RootRoute = AppRoutes.RootRoute
import use = RouteBuilder.use





const SummaryPage = React.memo(
  () => {
    const titleText = useUiValues(TitleUiText)
    
    const auth = useRecoilValue(AuthRecoil)
    const authId = auth!.user.id
    
    return (
      <>
      
        <Pages.Page>
          <Pages.SafeInsets>
            <Pages.Content>
              
              <Link to={RootRoute.profile.id.userId[use](authId).profile[full]()}>
                <Card2 css={cardStyle}>
                  <Ava src={ImagesMockData.all[7]}/>
                  <Name>Name</Name>
                  <Eye>Eye</Eye>
                  <Info>Info</Info>
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


