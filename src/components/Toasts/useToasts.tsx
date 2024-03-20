import React, { useEffect, useState } from 'react'
import { toast, ToastItem } from 'react-toastify'
import { OnChangeCallback } from 'react-toastify/dist/types'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { UiText } from 'src/utils/lang/UiText'
import { useUiValueArr } from 'src/utils/lang/useUiText'
import { useEffectEvent } from 'src/utils/react/useEffectEvent'
import { ToastBody, ToastType } from 'src/components/Toasts/ToastBody'
import falsy = TypeUtils.falsy
import PartialUndef = TypeUtils.PartialUndef




export type UseToastDataType = (ToastMsgData | falsy)[]
export type UseToastsProps = PartialUndef<{
  toasts: UseToastDataType
}>



export const useToasts = (props?: UseToastsProps)=>{
  const data = props?.toasts??[]
  
  const [prevData, setPrevData] = useState([] as UseToastDataType)
  
  
  const onData = useEffectEvent(
    (data: UseToastDataType)=>{
      const show = data.filter(d=>!prevData.includes(d))
      const hide = prevData.filter(d=>!data.includes(d))
      
      /* console.log(
        'USE_TOASTS: PREV_DATA',prevData,'\n',
        'USE_TOASTS: DATA',data,
      ) */
      
      hide.forEach(d=>{
        if (d instanceof ToastMsgData){
          d.hide()
        }
      })
      
      show.forEach(d=>{
        if (d instanceof ToastMsgData){
          d.show()
        }
      })
      
      setPrevData(data)
    }
  )
  useEffect(
    ()=>{
      onData(data)
    },
    data
  )
  
  
  const closeOnUnmount = useEffectEvent(()=>{
    prevData.forEach(d=>{
      if (d instanceof ToastMsgData){
        if(d.closeOnUnmount){
          //toast.dismiss(scope+d.id)
          d.hide()
        }
      }
    })
  })
  useEffect(
    ()=>()=>closeOnUnmount(),
    []
  )
  
}



export class ToastMsgData {
  constructor(data:{
    type: ToastType,
    msg: React.ReactNode,
    lifetime?: number | undefined
    dragToClose?: boolean | undefined
    showCloseButton?: boolean | undefined
    onClose?: (()=>void) | undefined
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
  onClose: (()=>void) | undefined
  closeOnUnmount: boolean
  
  id: string|number|undefined = undefined
  runCloseCallback = true
  onChange: OnChangeCallback = (toast: ToastItem)=>{
    if(toast.status==='removed' && toast.data===this){
      this.id = undefined
      this.unsubscribeOnChange?.()
      if (this.runCloseCallback){
        //console.log('toast removed',this)
        this.onClose?.()
      }
    }
  }
  unsubscribeOnChange: (()=>void) | undefined = undefined
  show(){
    if (this.id===undefined) {
      this.unsubscribeOnChange = toast.onChange(this.onChange)
      this.id = toast(
        props=><ToastBody
          closeToast={props.closeToast}
          showCloseButton={this.showCloseButton}
          type={this.type}
        >
          {this.msg}
        </ToastBody>,
        {
          data: this,
          draggable: this.dragToClose,
          autoClose: this.lifetime ?? false,
        }
      )
    }
  }
  hide(){
    if (this.id!==undefined) {
      this.runCloseCallback = false
      // it is not working BEFORE toast.dismiss so need to use runCloseCallback = false
      this.unsubscribeOnChange?.()
      toast.dismiss(this.id)
      this.id = undefined
    }
  }
}




export type ToastMsgProps<UO extends UiText<any>[]> = PartialUndef<{
  uiOption: UO
  defaultText: string
}>
export const ToastMsg =
React.memo(
<UO extends UiText<any>[]>(props:ToastMsgProps<UO>)=>{
  const uiOption = useUiValueArr(props.uiOption??[])
  return <>{uiOption?.text ?? props.defaultText}</>
})
