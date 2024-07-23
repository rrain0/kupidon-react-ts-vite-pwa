import { ReactU } from 'src/util/common/ReactU.ts'
import React from 'react'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import contents = EmotionCommon.contents
import stopPointerAndMouseEvents = ReactU.stopPointerAndMouseEvents



// Pointer & Wheel events consumer

export type UserActionsConsumerProps = {
  children: React.ReactNode
}

const UserActionsConsumer = React.memo(
  (props: UserActionsConsumerProps) => {
    return (
      <div css={contents} {...stopPointerAndMouseEvents()}>
        {props.children}
      </div>
    )
  }
)
export default UserActionsConsumer



