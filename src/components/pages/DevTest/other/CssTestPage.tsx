import { css } from '@emotion/react'
import React from 'react'
import Flex from '@libs/style-as-short-props/elems/Flex.tsx'
import Gap from '@libs/style-as-short-props/elems/Gap.tsx'
import Grid from '@libs/style-as-short-props/elems/Grid.tsx'
import { Hdrs } from 'src/components/elems/basic-elements/Hdrs.tsx'
import PageContentLayout from 'src/components/components/page/PageContentLayout.tsx'
import PageLayout from 'src/components/components/page/PageLayout.tsx'
import BottomFloatingBar from 'src/components/components/screen-bars/BottomFloatingBar.tsx'
import BackButton from 'src/components/components/screen-bars/parts/BackButton.tsx'




/*
При создании стиля через css, имя его класса можно взять через:
`css-${cssStyle.name}`
Но чтобы стиль был отправлен браузеру, его надо дать элементу.
 */
const cssStyle = css({ width: '100%' })
//console.log('cssStyle', cssStyle)
//console.log('cssStyle.name', cssStyle.name)
//console.log('cssStyle.next', cssStyle.next)

const cssStyle2 = css([cssStyle, { height: '100%' }])
//console.log('cssStyle2.name', cssStyle2.name)
//console.log('cssStyle2.next', cssStyle2.next)





const CssTestPage = React.memo(() => {
  
  
  
  return (
    <>
      
      <PageLayout col css={{ '*': { userSelect: 'text' } }}>
        <PageContentLayout col>
          
          
          <Grid cols='38px 1fr 38px' stretch>
            <Flex centerStart m={-13}><BackButton/></Flex>
            {/* TODO Translation */}
            <Flex center><Hdrs.Page>{'SCSS Test'}</Hdrs.Page></Flex>
            <Gap w={38}/>
          </Grid>
          
          
          
          <div css={cssStyle}>cssStyle</div>
          <div className={`css-${cssStyle.name}`}>{`css-${cssStyle.name}`}</div>
          
          <div
            css={{
              width: 100, height: 100,
              backgroundColor: 'black',
              position: 'relative',
              '::after': {
                content: '""',
                position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
              },
            }}
          />
          
          <button
            css={{
              width: 100, height: 100,
              '&': [
                { ':hover': { backgroundColor: 'black' } },
                [
                  { ':active': { backgroundColor: 'black' } },
                  { ':focus-visible': { backgroundColor: 'black' } },
                ],
              ],
            }}
          />
          
          
          
          <Gap h={30}/>
          
          
          <Flex row wrap g={30}>
            <Flex sz={200}
              data-selected
              className='clss clss2'
              css={[
                { backgroundColor: '#ff000077' },
                
                // variant by tagged template literal
                css`
                  &.clss {
                    &:hover {
                      @media (hover: hover) and (pointer: fine) {
                        &.clss2 {
                          background-color: #00ff0077;
                        }
                      }
                    }
                  }
                `,
              ]}
            >
              :hover @media hoverable
            </Flex>
            
            
            <Flex sz={200}
              data-selected
              className='clss clss2'
              css={[
                { backgroundColor: '#ff000077' },
                
                // variant by object
                {
                  '&.clss': {
                    '&:hover': {
                      '@media (hover: hover) and (pointer: fine)': {
                        '&.clss2': {
                          backgroundColor: '#0000ff77',
                        },
                      },
                    },
                  },
                },
              ]}
            >
              :hover @media hoverable
            </Flex>
            
            
            <Flex sz={200}
              data-selected
              className='clss clss2'
              css={[
                { backgroundColor: '#ff000077' },
                
                // @media { - inlined
                {
                  '&.clss': {
                    '&:hover': {
                      '@media (hover: hover) and (pointer: fine) { &.clss2': {
                        backgroundColor: '#ff00ff77',
                        '}': { },
                        // !!! Это свойство не затерёт предыдущее, если в css передавать инлайновый объект
                        // В следующем варианте всё нормально
                        // @ts-ignore
                        backgroundColor: '#ffff0077',
                      },
                    },
                  },
                },
              ]}
            >
              :hover @media hoverable
            </Flex>
            
            
            {(() => {
              const style = {
                '&.clss': {
                  '&:hover': {
                    '@media (hover: hover) and (pointer: fine) { &.clss2': {
                      backgroundColor: '#ff00ff77',
                      '}': { },
                      // @ts-ignore
                      backgroundColor: '#ffff0077',
                    },
                  },
                },
              }
              return (
                <Flex sz={200}
                  data-selected
                  className='clss clss2'
                  css={[
                    { backgroundColor: '#ff000077' },
                    
                    // @media { - referenced
                    style,
                  ]}
                >
                  :hover @media hoverable
                </Flex>
              )
            })()}
          </Flex>
          
          
          <Gap h={100}/>
          
          
          <Flex row wrap g={30}>
            
            
            <Flex sz={200}
              data-selected
              className='clss clss2'
              css={[
                { backgroundColor: '#ff000077' },
                {
                  ':hover': {
                    backgroundColor: '#0000ff77',
                  },
                },
              ]}
            >
              {':hover  { ... }'}
            </Flex>
            
            
            <Flex sz={200}
              data-selected
              className='clss clss2'
              css={[
                { backgroundColor: '#ff000077' },
                {
                  ':where(:hover)': {
                    backgroundColor: '#0000ff77',
                  },
                  // doesn't work
                  /* ':where(': { ':hover)': {
                    backgroundColor: '#00ff0077',
                  } }, */
                },
              ]}
            >
              {':where ... :hover { ... } }'}
            </Flex>
            
            
            <Flex sz={200}
              data-selected
              className='clss clss2'
              css={[
                { backgroundColor: '#ff000077' },
                {
                  position: 'relative',
                  ':hover': {
                    '::after': {
                      content: '""',
                      position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
                      backgroundColor: '#0000ff77',
                    },
                  },
                },
              ]}
            >
              {'::after { :hover  { ... } }'}
            </Flex>
            
            
            <Flex sz={200}
              data-selected
              className='clss clss2'
              css={[
                { backgroundColor: '#ff000077' },
                {
                  // need '&.class' to work
                  '.clss': {
                    ':hover': {
                      backgroundColor: '#0000ff77',
                    },
                  },
                },
              ]}
            >
              {'.clss { :hover { ... } }'}
            </Flex>
            
            
            <Flex sz={200}
              data-selected
              id='some-id-73824789'
              className='clss clss2'
              css={[
                { backgroundColor: '#ff000077' },
                {
                  // need '&#id' to work
                  '#some-id-73824789': {
                    ':hover': {
                      backgroundColor: '#0000ff77',
                    },
                  },
                },
              ]}
            >
              {'#id { :hover { ... } }'}
            </Flex>
            
            
            <Flex sz={200}
              data-selected
              className='clss clss2'
              css={[
                { backgroundColor: '#ff000077' },
                {
                  // need 'div&' to work
                  'div': {
                    ':hover': {
                      backgroundColor: '#0000ff77',
                    },
                  },
                },
              ]}
            >
              {'div { :hover { ... } }'}
            </Flex>
            
            
            
            <Flex sz={200}
              data-selected
              className='clss clss2'
              css={[
                { backgroundColor: '#ff000077', whiteSpace: 'pre' },
                
                // variant by object
                {
                  '&.clss': {
                    '@media (hover: hover) and (pointer: fine)': {
                      ':hover': {
                        '&.clss2': {
                          backgroundColor: '#0000ff77',
                        },
                      },
                    },
                  },
                },
              ]}
            >
              {'&.clss { \n' +
              '  @media hoverable { \n' +
              '    :hover { \n' +
              '      &.clss2 { ... } \n' +
              '    }\n' +
              '  }\n' +
              '}'}
            </Flex>
          </Flex>
          
          
          
          
          
          <Gap h={100}/>
          
          
          
          
          
          <Flex row wrap g={30}>
            <Flex sz={200}
              data-selected
              className='clss clss2'
              css={{ '& { backgroundColor': '#ff000077' }}
            >
              CSS prop in object prop name
            </Flex>
            
            
            {(() => {
              const style = { '& { backgroundColor': '#ff000077' }
              return (
                <Flex sz={200}
                  data-selected
                  className='clss clss2'
                  css={style}
                >
                  CSS prop in object prop name
                </Flex>
              )
            })()}
            
            
            {(() => {
              // Не работает
              const style = {
                '& { backgroundColor: #ff000077': { },
                '& { backgroundColor: #ff000077 }': { },
              }
              return (
                <Flex sz={200}
                  data-selected
                  className='clss clss2'
                  css={style}
                >
                  CSS prop in object prop name
                </Flex>
              )
            })()}
          </Flex>
          
          
          <Gap h={100}/>
        
        
        </PageContentLayout>
      </PageLayout>
      
      <BottomFloatingBar settingsButton/>
    
    
    </>
  )
})
CssTestPage.displayName = 'CssTestPage'
export default CssTestPage


