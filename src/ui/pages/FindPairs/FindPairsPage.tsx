import { useRefGetSet } from 'src/util/react-state/useRefGetSet.ts'
import React, { useEffect } from 'react'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import TopButtonBar from 'src/ui/components/BottomButtonBar/TopButtonBar'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/widgets/Scrollbars/PageScrollbars'




const FindPairsPage =
React.memo(
()=>{
  /*
  const [getShareElem, , shareElemRef] = useRef2<HTMLDivElement | null>(null)
  
  useEffect(() => {
    const shareElem = getShareElem()
    if (shareElem) {
      const yaShare =
        // @ts-ignore
        Ya
          .share2(shareElem, {
            content: {
              url: 'https://yandex.com',
              title: 'Yandex',
              description: 'All about Yandex',
              image: 'https://yastatic.net/morda-logo/i/logo.svg'
            },
            
            contentByService: {
              twitter: {
                url: 'https://ya.ru',
                title: 'Яндекс',
                hashtags: 'yandex,share'
              }
            }
          })
    }
  }, [getShareElem()])
   */
  
  
  
  return <>
    <Pages.Page>
      <Pages.SafeInsets>
        <Pages.Content>
          
          <div>Здесь будут карточки людей.</div>
          <div className="ya-share2" data-services="vkontakte,twitter,messenger"></div>
          {/* <div ref={shareElemRef} /> */}
        
        </Pages.Content>
      </Pages.SafeInsets>
      
      
      <PageScrollbars/>
    </Pages.Page>
    
    
    <TopButtonBar />
    
    <BottomButtonBar />
    
  </>
})
export default FindPairsPage




