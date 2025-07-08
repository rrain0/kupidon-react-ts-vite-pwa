import styled from '@emotion/styled'
import { useAsCallback } from '@util/react-state/useAsCallback.ts'
import FormFieldWrap from 'src/mini-libs/form-data/components/FormFieldWrap.tsx'
import { useFormData } from 'src/mini-libs/form-data/hooks/useFormData.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import { Hdrs } from 'src/ui/0-elements/basic-elements/Hdrs.tsx'
import Card from 'src/ui/0-elements/Card/Card.tsx'
import { CardS } from 'src/ui/0-elements/Card/CardS.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import CheckboxInput from 'src/ui/0-elements/inputs/CheckboxInput/CheckboxInput.tsx'
import { CheckboxInputStyle } from 'src/ui/0-elements/inputs/CheckboxInput/CheckboxInputStyle.ts'
import DialogButtons from 'src/ui/1-widgets/modals/DialogButtons'
import { TypeU } from 'src/util/common/TypeU.ts'
import React, { useMemo } from 'react'
import { ModalElements } from 'src/ui/components/modal/ModalElements.tsx'
import Modal from 'src/ui/components/modal/Modal.tsx'
import Callback = TypeU.Callback
import Pu = TypeU.Pu
import rowC = EmotionCommon.rowC
import WarnTriangleOutlinedIc = SvgIconsPack.WarnTriangleOutlinedIc
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle'
import InfoCircleOutlinedIc = SvgIconsPack.InfoCircleOutlinedIc



export type DialogCheckProps = {
  fieldName: string
  title?: string | number | undefined
  initialChecked?: boolean | undefined
}



export type DialogOnAccept = (
  (params: { checks: Record<string, boolean> }) => void
)



export type ModalDialogProps = Pu<{
  isOpen: boolean
  type: 'info' | 'danger'
  title: string | number
  checkboxes: DialogCheckProps[]
  
  onModal: Callback
  
  onClose: Callback
  onBack: Callback
  
  onCancel: Callback
  
  onOk: DialogOnAccept
  onYes: DialogOnAccept
  onDangerYes: DialogOnAccept
}>



const ModalDialog = React.memo((props: ModalDialogProps) => {
  const {
    isOpen,
    type,
    title,
    checkboxes = [],
    onModal,
    onClose,
    onBack,
    onCancel,
    onOk: onAcceptOk,
    onYes: onAcceptYes,
  } = props
  
  const defaultChecks = useMemo(() => {
    return checkboxes.reduce((acc, curr) => {
      acc[curr.fieldName] = !!curr.initialChecked
      return acc
    }, { } as Record<string, boolean>)
  }, [])
  
  const {
    values: checks,
    formFieldWrapProps,
  } = useFormData({
    defaultValues: defaultChecks, validators: [],
  })
  
  const onOk = useAsCallback(() => onAcceptOk?.({ checks }))
  const onYes = useAsCallback(() => onAcceptYes?.({ checks }))
  
  if (isOpen) return (
    <Modal css={ModalElements.modalCenteredS} onClick={() => onModal?.()}>
      <Card css={[ModalElements.cardBoxInModalS, CardS.card2S]} data-display-name='ModalDialog'>
        
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
            {checkboxes.map(({ title, fieldName }) => (
              <FormFieldWrap {...formFieldWrapProps} fieldName={fieldName} key={fieldName}>
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
    </Modal>
  )
  return undefined
})
ModalDialog.displayName = 'ModalDialog'
export default ModalDialog


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


