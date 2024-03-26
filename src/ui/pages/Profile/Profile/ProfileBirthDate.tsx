import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import ItemLabel from 'src/ui/components/FormElements/ItemLabel.tsx'
import Modal from 'src/ui/components/Modal/Modal.tsx'
import ModalPortal from 'src/ui/components/Modal/ModalPortal.tsx'
import { ModalStyle } from 'src/ui/components/Modal/ModalStyle.ts'
import OptionItem from 'src/ui/components/OptionItem/OptionItem.tsx'
import UseBool from 'src/ui/components/StateCarriers/UseBool.tsx'
import { ProfileUiText } from 'src/ui/pages/Profile/uiText.ts'
import { EmotionCommon } from 'src/ui/styles/EmotionCommon.ts'
import {
  ValidationWrapRenderProps
} from '@util/form-validation/ValidationWrap.tsx'
import { ActionUiText } from 'src/ui/ui-text/ui-values/ActionUiText.ts'
import { useUiValues } from 'src/ui/ui-text/useUiText.ts'
import Button from 'src/ui/widgets/Buttons/Button.tsx'
import { ButtonStyle } from 'src/ui/widgets/Buttons/ButtonStyle.ts'
import Card2 from 'src/ui/widgets/Card2.tsx'
import { SvgIcons } from 'src/ui/widgets/icons/SvgIcons.tsx'
import Input from 'src/ui/widgets/inputs/Input/Input.tsx'
import { InputStyle } from 'src/ui/widgets/inputs/Input/InputStyle.ts'
import Arrow6NextIc = SvgIcons.ArrowAngledRoundedIc
import row = EmotionCommon.row
import GiftBoxIc = SvgIcons.GiftBoxIc







const ProfileBirthDate =
React.memo(
(props: ValidationWrapRenderProps<string>)=>{
  const uiText = useUiValues(ProfileUiText)
  const uiActionText = useUiValues(ActionUiText)
  
  
  
  return <UseBool>{boolProps =>
    <>
      
      <OptionItem
        icon={<GiftBoxIc css={css`height: 50%`}/>}
        title={uiText.birthDate.text}
        value={props.value}
        data-error={props.highlight}
        nextIcon={<Arrow6NextIc css={css`height: 44%`}/>}
        onClick={boolProps.setTrue}
      />
      
      { boolProps.value && <ModalPortal><Modal css={ModalStyle.modal}
        onClick={boolProps.setFalse}
      >
        {/* todo upgrade & extract modal input */}
        <div css={css`
          width: 100%;
          height: 100%;
          padding: 20px;
          padding-bottom: 140px;
          display: grid;
          place-items: end center;
        `}>
          
          <Card2 css={css`
            min-width: 220px;
            width: 100%;
            max-width: 500px;
            gap: 10px;
          `}
            onClick={ev=>ev.stopPropagation()}
          >
            <ItemLabel>{uiText.birthDate.text}</ItemLabel>
            <Input css={InputStyle.inputSmall}
              autoFocus
              inputMode="numeric"
              placeholder={uiText.birthDatePlaceholder.text.toLowerCase()}
              {...props.inputProps}
              hasError={props.highlight}
              onBlur={ev=>{
                ev.currentTarget.focus()
                props.inputProps.onBlur()
              }}
            />
            <div css={css`
              ${row};
              gap: 10px;
              justify-content: end;
            `}>
              <Button css={ButtonStyle.roundedSmallSecondary}
                onClick={boolProps.setFalse}
                children={uiActionText.ok.text}
              />
            </div>
          </Card2>
        </div>
      </Modal></ModalPortal>}
    
    </>
  }</UseBool>
})
export default ProfileBirthDate


