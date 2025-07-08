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
    title, checkboxes = [],
    onModal,
    onClose, onBack,
    onCancel,
    onOk: _onOk, onYes: _onYes, onDangerYes: _onDangerYes,
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
  
  const onOk = useAsCallback(() => _onOk?.({ checks }))
  const onYes = useAsCallback(() => _onYes?.({ checks }))
  const onDangerYes = useAsCallback(() => _onDangerYes?.({ checks }))
  
  if (isOpen) return (
    <Modal css={ModalElements.modalCenteredS} onClick={() => onModal?.()}>
      <Card css={[ModalElements.cardBoxInModalS, CardS.card2S]}>
        
        <DialogContent>
          {_onDangerYes && (
            <Flex center sz={50} noShrink>
              <WarnTriangleOutlinedIc css={SvgIconS6.t(warnIcS)}/>
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
          onOk={_onOk && onOk}
          onYes={_onYes && onYes}
          onDangerYes={_onDangerYes && onDangerYes}
        />
        
      </Card>
    </Modal>
  )
  return undefined
})
export default ModalDialog


const warnIcS: AppWidgetStyle = t => [SvgIconS6.Parts.base, {
  iconSz: 50,
  iconColor: t.toast.accentDanger,
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


