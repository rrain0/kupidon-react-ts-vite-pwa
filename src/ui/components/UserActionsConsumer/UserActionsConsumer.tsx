import { ReactU } from 'src/util/common/ReactU.ts'
import React from 'react'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import contents = EmotionCommon.contents
import stopPointerAndMouseEvents = ReactU.stopPointerAndMouseEvents
import ChildrenProps = ReactU.ChildrenProps



// Pointer & Wheel events consumer

const UserActionsConsumer = React.memo(
  (props: ChildrenProps) => {
    return (
      <div css={contents} {...stopPointerAndMouseEvents()}>
        {props.children}
      </div>
    )
  }
)
export default UserActionsConsumer


