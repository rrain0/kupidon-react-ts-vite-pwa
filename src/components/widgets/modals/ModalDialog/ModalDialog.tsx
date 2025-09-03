import styled from '@emotion/styled'
import { useAsCallback } from '@utils/react/state/useAsCallback.ts'
import { ReactU } from '@utils/react/ReactU.ts'
import FormFieldWrap from '@libs/form-data/components/FormFieldWrap.tsx'
import { useFormData } from '@libs/form-data/hooks/useFormData.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { StyleVals } from 'src/styles/StyleVals.ts'
import Flex from '@libs/short-propsed/components/Flex.tsx'
import { Hdrs } from 'src/components/elems/basic-elements/Hdrs.tsx'
import Card from 'src/components/elems/Card/Card.tsx'
import { CardS } from 'src/components/elems/Card/CardS.ts'
import InfoCircleOutlinedIc from 'src/components/elems/icons/SvgIcons/pack/ui/InfoCircleOutlinedIc.tsx'
import WarnTriangleOutlinedIc
  from 'src/components/elems/icons/SvgIcons/pack/ui/WarnTriangleOutlinedIc.tsx'
import { SvgIconS6 } from 'src/components/elems/icons/SvgIcons/SvgIconS6.ts'
import CheckboxInput from 'src/components/elems/inputs/CheckboxInput/CheckboxInput.tsx'
import { CheckboxInputStyle } from 'src/components/elems/inputs/CheckboxInput/CheckboxInputStyle.ts'
import DimmedBg from 'src/components/widgets/DimmedBg.tsx'
import DialogButtons from 'src/components/widgets/modals/DialogButtons'
import MountController, { MountControllerRenderProps } from 'src/components/components/animations/MountController.tsx'

import React, { useMemo } from 'react'
import { ModalElements } from 'src/components/components/modal/ModalElements.tsx'
import Modal from 'src/components/components/modal/Modal.tsx'
import { Callback } from '@utils/base/TypeUtils.ts'
import { Pu } from '@utils/base/TypeUtils.ts'
import rowC = EmotionCommon.rowC
import { AppWidgetStyle } from '@libs/widget-style-6/WidgetStyle'
import UseEnterExitTransition from 'src/components/components/animations/UseEnterExitTransition.tsx'




export type ModalDialogProps<T extends string> = Pu<{
  isOpen: boolean
  onModal: Callback
}> & DialogViewProps<T>

const ModalDialog = ReactU.memo(<T extends string>(props: ModalDialogProps<T>) => {
  const {
    isOpen,
    onModal,
  } = props
  
  return (
    <MountController isOpen={isOpen}>
      {mountProps => (
        <Modal noDim noPointer={!isOpen} onClick={() => onModal?.()}>
          <DimmedBg css={ModalElements.modalCenteredS} noPointer={!isOpen} {...mountProps}>
            <Dialog {...props} {...mountProps}/>
          </DimmedBg>
        </Modal>
      )}
    </MountController>
  )
})
// @ts-expect-error
ModalDialog.displayName = 'ModalDialog'
export default ModalDialog







export type DialogCheckProps<T extends string> = {
  name: T
  title?: string | number | undefined
  initialChecked?: boolean | undefined
}

export type DialogOnAccept<T extends string> = (
  (params: { checks: Record<T, boolean> }) => void
)

export type DialogViewProps<T extends string> = Pu<{
  type: 'info' | 'danger'
  title: string | number
  checkboxes: DialogCheckProps<T>[]
  
  onClose: Callback
  onBack: Callback
  
  onCancel: Callback
  
  onOk: DialogOnAccept<T>
  onYes: DialogOnAccept<T>
  onDangerYes: DialogOnAccept<T>
}>

export type DialogProps<T extends string> = DialogViewProps<T> & MountControllerRenderProps

const Dialog = ReactU.memo(<T extends string>(props: DialogProps<T>) => {
  const {
    isOpen,
    allowUnmount,
    
    type,
    title,
    checkboxes = [],
    onClose,
    onBack,
    onCancel,
    onOk: onAcceptOk,
    onYes: onAcceptYes,
  } = props
  
  const onOk = useAsCallback(() => onAcceptOk?.({ checks }))
  const onYes = useAsCallback(() => onAcceptYes?.({ checks }))
  
  
  const defaultChecks = useMemo(() => {
    return checkboxes.reduce((acc, curr) => {
      acc[curr.name] = !!curr.initialChecked
      return acc
    }, { } as Record<T, boolean>)
  }, [])
  
  const {
    values: checks,
    formFieldWrapProps,
  } = useFormData({
    initialValues: defaultChecks,
    validators: [],
  })
  
  
  return (
    <UseEnterExitTransition isOpen={isOpen} allowUnmount={allowUnmount}
      initialStyle={{ opacity: '0' }}
      enterStyle={{
        transition: `opacity ${StyleVals.fadeInTime}ms linear`,
        opacity: '1',
      }}
      exitStyle={{
        transition: `opacity ${StyleVals.fadeOutTime}ms linear`,
        opacity: '0',
      }}
    >
      {transitionProps => (
        <Card css={[ModalElements.cardBoxInModalS, CardS.card2S]}
          data-display-name='Dialog'
          {...transitionProps}
        >
          
          <DialogContent>
            {type === 'danger' && (
              <Flex center sz={50} noShrink>
                <WarnTriangleOutlinedIc css={SvgIconS6.t(warnIcS)}/>
              </Flex>
            )}
            {type === 'info' && (
              <Flex center sz={50} noShrink>
                <InfoCircleOutlinedIc css={SvgIconS6.t(infoIcS)}/>
              </Flex>
            )}
            <TitleBox>
              <Hdrs.ItemTitle>{title}</Hdrs.ItemTitle>
            </TitleBox>
          </DialogContent>
          
          {!!checkboxes.length && (
            <Flex col>
              {checkboxes.map(({ title, name }) => (
                <FormFieldWrap {...formFieldWrapProps} name={name} key={name}>
                  {props => (
                    <Flex as='label' w='ct' row align g={8}>
                      <Flex mv={-14}>
                        <CheckboxInput
                          css={CheckboxInputStyle.roundNormalNormal}
                          {...props.radioInputProps}
                        />
                      </Flex>
                      <Hdrs.ItemTitle>{title}</Hdrs.ItemTitle>
                    </Flex>
                  )}
                </FormFieldWrap>
              ))}
            </Flex>
          )}
          
          <DialogButtons
            //onClear={onClear}
            onClose={onClose}
            onBack={onBack}
            onCancel={onCancel}
            onOk={onAcceptOk && onOk}
            onYes={onAcceptYes && onYes}
          />
        
        </Card>
      )}
    </UseEnterExitTransition>
  )
})
// @ts-expect-error
Dialog.displayName = 'Dialog'



const warnIcS: AppWidgetStyle = t => [SvgIconS6.Parts.base, {
  iconSz: 50,
  iconColor: t.toast.accentDanger,
}]
const infoIcS: AppWidgetStyle = t => [SvgIconS6.Parts.base, {
  iconSz: 50,
  iconColor: t.toast.accentInfo,
}]

const DialogContent = styled.div`
  ${rowC};
  gap: 10px;
`

const TitleBox = styled.div`
  width: 100%;
  min-height: 46px;
  ${rowC};
`

