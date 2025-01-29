import { ReactU } from 'src/util/react/ReactU.ts'
import React from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import contents = EmotionCommon.contents
import stopPointerAndMouseEvents = ReactU.stopPointerAndMouseEvents
import ChildrenProps = ReactU.Children



// Pointer & Wheel events consumer

const UserActionsConsumer = React.memo((props: ChildrenProps) => {
  return (
    <div css={contents} {...stopPointerAndMouseEvents()}>
      {props.children}
    </div>
  )
})
export default UserActionsConsumer


