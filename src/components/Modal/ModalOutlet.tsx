/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useId, useLayoutEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { AppRecoil } from 'src/recoil/state/AppRecoil'




const ModalOutlet =
React.memo(
()=>{
  const reactId = useId()
  const id = `modal-outlet-${reactId}`
  const setAppState = useSetRecoilState(AppRecoil)
  useLayoutEffect(
    ()=>setAppState(s=>({...s, modalOutletId: id})),
    [id, setAppState]
  )
  
  return <div
    css={css`display: contents;`}
    id={id}
  />
})
export default ModalOutlet