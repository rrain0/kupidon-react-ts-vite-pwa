import React from 'react'
import { Hdrs } from 'src/ui/0-elements/basic-elements/Hdrs.tsx'




const PageHeader = React.memo((props: { children: string }) => {
  return (
    <Hdrs.Page style={{ paddingBottom: 40 }}>
      {props.children}
    </Hdrs.Page>
  )
})
export default PageHeader