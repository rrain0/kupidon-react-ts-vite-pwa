import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons/SvgIcons'
import { SvgIconsStyle } from 'src/ui/elements/icons/SvgIcons/SvgIconsStyle'
import SelectItem from 'src/ui/elements/inputs/SelectItem/SelectItem'
import { SelectItemS } from 'src/ui/elements/inputs/SelectItem/SelectItemS'
import row = EmotionCommon.row
import PlusIc = SvgIcons.PlusIc
import PencilWrite2Ic = SvgIcons.PencilWrite2Ic
import center = EmotionCommon.center
import col = EmotionCommon.col
import abs = EmotionCommon.abs
import colC = EmotionCommon.colC



const ListItem2Test = () => {
  
  
  const variants = [
    'Вариант 1',
    'Вариант 2',
    'Ооооооооооочень длиииииииииииинннннннннннннннннннннный вариант',
    'Невероятно максимально наидлинейше поэтически исторически эпически'
    + 'длиииииииииииииииииииииииииииинный вариант',
  ]
  
  const [options, setOptions] = useState([
    {
      value: '1',
      text: 'Вариант 1',
      isSelected: false,
      isEditable: false,
      isAdd: false,
    },
    {
      value: '2',
      text: 'Вариант 2',
      isSelected: true,
      isEditable: false,
      isAdd: false,
    },
    {
      value: '3',
      text: 'Вариант 3',
      isSelected: false,
      isEditable: false,
      isAdd: false,
    },
    {
      value: '4',
      text: 'Вариант 4',
      isSelected: true,
      isEditable: true,
      isAdd: false,
    },
    {
      value: '5',
      text: 'Вариант 5',
      isSelected: false,
      isEditable: true,
      isAdd: false,
    },
    {
      value: '6',
      text: 'Вариант 6',
      isSelected: false,
      isEditable: true,
      isAdd: true,
    },
  ])
  const toggleOption = (value: string) => {
    setOptions(options.map(it => {
      if (it.value !== value || it.isAdd) return it
      return {
        ...it,
        isSelected: !it.isSelected,
      }
    }))
  }
  
  
  
  return (
    <Pages.SimplePage>
      <Pages.ContentFill>
        
        
        <div>List Item v2</div>
        
        
        <ColumnContent>
          
          { options.map((it, i) => (
            <SelectItem
              css={SelectItemS.normal}
              key={it.value}
              onClick={() => toggleOption(it.value)}
              isSelected={it.isSelected}
              isAdd={it.isAdd}
              isEdit={it.isEditable}
              //isError={false}
              indicatorsSelection={(() => {
                if (i === 0) return options.map(it => it.isSelected)
                return options.map((it, i2) => i === i2 && it.isSelected)
              })()}
            >
              {it.text}
            </SelectItem>
          )) }
          
          
          
          <div>Невыбранный элемент списка:</div>
          
          { variants.map(v => (
            <Frame key={v}>
              
              <IndicatorFrame>
                <IndicatorBox>
                  <Indicator />
                </IndicatorBox>
              </IndicatorFrame>
              
              <TextBox>
                <Text>{v}</Text>
              </TextBox>
            
            </Frame>
          )) }
          
          
          
          <div>Выбранный элемент списка:</div>
          
          { variants.map(v => (
            <Frame key={v}>
              
              <IndicatorFrame>
                <IndicatorBox>
                  <IndicatorSelected />
                </IndicatorBox>
              </IndicatorFrame>
              
              <TextBox>
                <Text>{v}</Text>
              </TextBox>
              
              <Border />
            
            </Frame>
          )) }
          
          
          
          <div>Добавить элемент в список:</div>
          
          <Frame>
            
            <AddIconBox><PlusIc/></AddIconBox>
          
          </Frame>
          
          
          
          <div>Редактируемый невыбранный элемент:</div>
          
          { variants.map((v, i) => (
            <Frame key={v}>
            
              <IndicatorFrame>
                <IndicatorBox>
                  <Indicator />
                </IndicatorBox>
              </IndicatorFrame>
              
              <TextBox>
                <Text>{v}</Text>
              </TextBox>
              
              <PencilIconBox style={{ backgroundColor: i === 0 ? '#ff000011' : undefined }}>
                <PencilWrite2Ic/>
              </PencilIconBox>
            
            </Frame>
          )) }
          
          
          
          <div>Редактируемый выбранный элемент списка:</div>
          
          { variants.map((v, i) => (
            <Frame key={v}>
            
              <IndicatorFrame>
                <IndicatorBox>
                  <IndicatorSelected />
                </IndicatorBox>
              </IndicatorFrame>
              
              <TextBox>
                <Text>{v}</Text>
              </TextBox>
              
              <PencilIconBox style={{ backgroundColor: i === 0 ? '#ff000011' : undefined }}>
                <PencilWrite2Ic/>
              </PencilIconBox>
              
              <Border />
            
            </Frame>
          )) }
          
          
          
          <div>Мультивыбор:</div>
          
          { options.map((v, i, opts) => (
            <Frame key={v.value}>
              
              { v.isAdd && <AddIconBox><PlusIc/></AddIconBox> }
              
              { !v.isAdd && (
                <>
                  <IndicatorFrame>
                    <IndicatorBox>
                      { opts.map(v => (
                        <React.Fragment key={`${v.value} ${v.isSelected}`}>
                          { !v.isSelected
                            ? <Indicator />
                            : <IndicatorSelected />
                          }
                        </React.Fragment>
                      ))}
                    </IndicatorBox>
                  </IndicatorFrame>
                  
                  <TextBox>
                    <Text>{v.text}</Text>
                  </TextBox>
                  
                  { v.isEditable && <PencilIconBox>
                    <PencilWrite2Ic/>
                  </PencilIconBox> }
                  
                  { v.isSelected && <Border /> }
                  
                </>
              ) }
              
              
            </Frame>
          )) }
          
          
          
          <div>Мультивыбор:</div>
          
          { options.map((v, i, opts) => (
            <Frame
              key={v.value}
              isSelected={v.isSelected}
          >
              
              { v.isAdd && <AddIconBox><PlusIc/></AddIconBox> }
              
              { !v.isAdd && (
                <>
                  <IndicatorFrame>
                    <IndicatorBox>
                      { opts.map(v => (
                        <React.Fragment key={`${v.value} ${v.isSelected}`}>
                          { !v.isSelected
                            ? <Indicator />
                            : <IndicatorSelected />
                          }
                        </React.Fragment>
                      ))}
                    </IndicatorBox>
                  </IndicatorFrame>
                  
                  <TextBox>
                    <Text>{v.text}</Text>
                  </TextBox>
                  
                  { v.isEditable && <PencilIconBox>
                    <PencilWrite2Ic/>
                  </PencilIconBox> }
                  
                </>
              ) }
              
              
            </Frame>
          )) }
          
          
        
        </ColumnContent>
      
      
      </Pages.ContentFill>
    </Pages.SimplePage>
  )
}
export default ListItem2Test




const ColumnContent = styled.div`
  width: 350px;
  ${col};
  gap: 10px;
`


const Frame = styled.article<{ isSelected?: boolean }>`
  width: 300px;
  min-height: 80px;
  height: fit-content;
  border-radius: 20px;
  
  background: #eeeeee;
  ${p => p.isSelected && css`background: #bbbbbb;`}
  
  position: relative;
  padding: 20px 26px;
  display: grid;
  grid-auto-flow: column;
  place-items: stretch center;
  gap: 10px;
`
const Border = styled.div`
  ${abs};
  border-radius: inherit;
  border-width: 2px;
  border-style: solid;
  border-color: #444444;
`



const AddIconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  
  place-self: center;
  //background: #ff000011;
  ${center};
  padding: 2px;
`



const IndicatorFrame = styled.div`
  pointer-events: none;
  ${abs};
  ${colC};
  padding: 6px;
`
const IndicatorBox = styled.div`
  width: 75%;
  align-self: center;
  height: 6px;
  ${row};
  gap: 6px;
`
const Indicator = styled.div`
  flex: 1;
  height: 100%;
  border-radius: 999999px;
  background: #cccccc;
`
const IndicatorSelected = styled.div`
  flex: 1;
  height: 100%;
  border-radius: 999999px;
  background: #444444;
`



const PencilIconBox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: inherit;
  ${center};
  padding: 11px;
  
  ${SvgIconsStyle.El.icon.props.color.set('#444444')}
`



const TextBox = styled.div`
  width: 100%;
  min-height: 100%;
  ${center};
`
const Text = styled.div`
  align-self: center;
  //background: #ffff0022;
  overflow-wrap: anywhere;
`
