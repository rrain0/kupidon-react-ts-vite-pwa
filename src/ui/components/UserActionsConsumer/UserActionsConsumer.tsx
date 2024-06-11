import { ReactUtils } from '@util/common/ReactUtils.ts'
import React from 'react'
import { EmotionCommon } from 'src/ui-props/styles/EmotionCommon.ts'
import contents = EmotionCommon.contents
import stopPointerAndMouseEvents = ReactUtils.stopPointerAndMouseEvents



// Pointer & Wheel events consumer

export type UserActionsConsumerProps = {
  children: React.ReactNode
}

const UserActionsConsumer =
React.memo(
(props: UserActionsConsumerProps)=>{
  return <div css={contents} {...stopPointerAndMouseEvents()}>
    {props.children}
  </div>
})
export default UserActionsConsumer



