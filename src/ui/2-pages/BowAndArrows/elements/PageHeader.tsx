import React from 'react'
import { Hs } from 'src/ui/0-elements/basic-elements/Hs.tsx'




const PageHeader =
React.memo(
(props: { children: string }) => {
  return <Hs.Page style={{ paddingBottom: 40 }}>
    {props.children}
  </Hs.Page>
})
export default PageHeader