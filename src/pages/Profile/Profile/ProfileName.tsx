/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import UseBrowserBack from 'src/components/ActionProviders/UseBrowserBack'
import ItemLabel from 'src/components/FormElements/ItemLabel'
import Modal from 'src/components/Modal/Modal'
import ModalPortal from 'src/components/Modal/ModalPortal'
import { ModalStyle } from 'src/components/Modal/ModalStyle'
import OptionItem from 'src/components/OptionItem/OptionItem'
import UseBool from 'src/components/StateCarriers/UseBool'
import { ProfileUiText } from 'src/pages/Profile/uiText'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import {
  ValidationWrapRenderProps
} from 'src/utils/form-validation/ValidationWrap'
import { ActionUiText } from 'src/utils/lang/ui-values/ActionUiText'
import { useUiValues } from 'src/utils/lang/useUiText'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import Card2 from 'src/views/Card2'
import { SvgIcons } from 'src/views/icons/SvgIcons'
import Input from 'src/views/Inputs/Input/Input'
import { InputStyle } from 'src/views/Inputs/Input/InputStyle'
import NameCardIc = SvgIcons.NameCardIc
import Arrow6NextIc = SvgIcons.ArrowAngledRoundedIc
import row = EmotionCommon.row







const ProfileName =
React.memo(
(props: ValidationWrapRenderProps<string>)=>{
  const uiText = useUiValues(ProfileUiText)
  const uiActionText = useUiValues(ActionUiText)
  
  
  
  return <UseBool>{boolProps =>
    <>
      
      <OptionItem
        icon={<NameCardIc css={css`height: 50%`}/>}
        title={uiText.name.text}
        value={props.value}
        data-error={props.highlight}
        nextIcon={<Arrow6NextIc css={css`height: 44%`}/>}
        onClick={boolProps.setTrue}
      />
      
      { boolProps.value &&
        <UseBrowserBack
          onBack={boolProps.setFalse}
        >
          <ModalPortal><Modal css={ModalStyle.modal}
            onClick={boolProps.setFalse}
          >
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
                onClick={ev => ev.stopPropagation()}
              >
                <ItemLabel>{uiText.name.text}</ItemLabel>
                <Input css={InputStyle.inputSmall}
                  autoFocus
                  placeholder={uiText.name.text.toLowerCase()}
                  {...props.inputProps}
                  hasError={props.highlight}
                  onBlur={ev => {
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
          </Modal></ModalPortal>
        </UseBrowserBack>
      }
    
    </>
  }</UseBool>
})
export default ProfileName


