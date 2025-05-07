import { ReactU } from '@util/react/ReactU.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import React, { useEffect, useMemo, useState } from 'react'
import { toast, ToastItem } from 'react-toastify'
import { TypeU } from '@util/common/TypeU.ts'
import { asUiText, UiText } from 'src/mini-libs/ui-text/UiText.ts'
import { ToastBody, ToastType } from 'src/ui/components/Toasts/ToastBody.tsx'
import falsy = TypeU.falsy
import Pu = TypeU.Pu
import Callback1 = TypeU.Callback1
import Callback = TypeU.Callback




export type UseToastDataType = (ToastMsgData | falsy)[]
export type UseToastsProps = Pu<{
  toasts: UseToastDataType
}>



export const useToasts = ({ toasts: data = [] }: UseToastsProps = { }) => {
  
  const [prevData, setPrevData] = useState([] as UseToastDataType)
  
  
  const onData = (data: UseToastDataType) => {
    const show = data.filter(d => !prevData.includes(d))
    const hide = prevData.filter(d => !data.includes(d))
    
    /* console.log(
      'USE_TOASTS: PREV_DATA',prevData,'\n',
      'USE_TOASTS: DATA',data,
    ) */
    
    hide.forEach(d => {
      if (d instanceof ToastMsgData) {
        d.hide()
      }
    })
    
    show.forEach(d => {
      if (d instanceof ToastMsgData) {
        d.show()
      }
    })
    
    setPrevData(data)
  }
  useEffect(() => { onData(data) }, data)
  
  
  const closeOnUnmount = () => {
    prevData.forEach(d => {
      if (d instanceof ToastMsgData) {
        if (d.closeOnUnmount) {
          //toast.dismiss(scope+d.id)
          d.hide()
        }
      }
    })
  }
  useEffect(() => () => closeOnUnmount(), [])
  
}



export class ToastMsgData {
  constructor(data:{
    type: ToastType,
    msg: React.ReactNode,
    lifetime?: number | undefined
    dragToClose?: boolean | undefined
    showCloseButton?: boolean | undefined
    onClose?: (() => void) | undefined
    closeOnUnmount?: boolean | undefined
  }) {
    this.type = data.type
    this.msg = data.msg
    this.lifetime = data.lifetime
    this.dragToClose = data.dragToClose ?? false
    this.showCloseButton = data.showCloseButton ?? false
    this.onClose = data.onClose
    this.closeOnUnmount = data.closeOnUnmount ?? false
  }
  
  type: ToastType
  msg: React.ReactNode
  lifetime: number | undefined
  dragToClose: boolean
  showCloseButton: boolean
  onClose: Callback | undefined
  closeOnUnmount: boolean
  
  id: string | number | undefined = undefined
  runCloseCallback = true
  onChange: Callback1<ToastItem> = (toast: ToastItem) => {
    if (toast.status === 'removed' && toast.data === this) {
      this.id = undefined
      this.unsubscribeOnChange?.()
      if (this.runCloseCallback) {
        //console.log('toast removed',this)
        this.onClose?.()
      }
    }
  }
  unsubscribeOnChange: Callback | undefined = undefined
  show() {
    if (this.id === undefined) {
      this.unsubscribeOnChange = toast.onChange(this.onChange)
      this.id = toast(
        props => (
          <ToastBody
            closeToast={props.closeToast}
            showCloseButton={this.showCloseButton}
            type={this.type}
          >
            {this.msg}
          </ToastBody>
        ),
        {
          data: this,
          draggable: this.dragToClose,
          autoClose: this.lifetime ?? false,
        }
      )
    }
  }
  hide() {
    if (this.id !== undefined) {
      this.runCloseCallback = false
      // it is not working BEFORE toast.dismiss so need to use runCloseCallback = false
      this.unsubscribeOnChange?.()
      toast.dismiss(this.id)
      this.id = undefined
    }
  }
}




export type ToastMsgProps<UO extends UiText> = Pu<{
  uiOption: UO
  defaultText: string
}>
export const ToastMsg = ReactU.memo(<UO extends UiText>(props: ToastMsgProps<UO>) => {
  const { uiOption, defaultText } = props
  const uiValues = useMemo(() => ({
    option: uiOption ?? asUiText(defaultText ?? ''),
  }), [uiOption])
  const uiText = useUiValues(uiValues)
  return <>{uiText.option}</>
})
