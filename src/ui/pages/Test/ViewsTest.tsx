import styled from '@emotion/styled'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons/SvgIcons'
import row = EmotionCommon.row
import PlusIc = SvgIcons.PlusIc
import RadioActiveIc = SvgIcons.RadioActiveIc
import RadioInactiveIc = SvgIcons.RadioInactiveIc
import CrossInCircleIc = SvgIcons.CrossInCircleIc
import PencilWrite2Ic = SvgIcons.PencilWrite2Ic
import center = EmotionCommon.center
import col = EmotionCommon.col



const ViewsTest = () => {
  
  
  return <Pages.SimplePage>
    <Pages.ContentFill>
      
      
      <div>VIEWS TEST</div>
      
      
      <ColumnContent>
        
        <div>При нажатии на виджет, откроется модальное текстовое поле:</div>
        
        <Frame>
          
          <AddIconBox><PlusIc/></AddIconBox>
          
          <TextBox>
            <Text>Добавьте ваш вариант...</Text>
          </TextBox>
        
        </Frame>
        
        
        <div>При нажатии на иконку карандаша, откроется модальное текстовое поле:</div>
        
        <Frame>
          
          <RadioIconBox><RadioInactiveIc/></RadioIconBox>
          
          <PencilIconBox><PencilWrite2Ic/></PencilIconBox>
          
          <TextBox>
            <Text>Это мой вариант</Text>
          </TextBox>
          
          <RemoveIconBox><CrossInCircleIc/></RemoveIconBox>
        
        </Frame>
        
        <Frame>
          
          <RadioIconBox><RadioActiveIc/></RadioIconBox>
          
          <PencilIconBox><PencilWrite2Ic/></PencilIconBox>
          
          <TextBox>
            <Text>Это мой ооооооооооочень длиииииииииииинннннннннннннннннннннный вариант</Text>
          </TextBox>
          
          <RemoveIconBox><CrossInCircleIc/></RemoveIconBox>
        
        </Frame>
        
        <Frame>
          
          <RadioIconBox><RadioActiveIc/></RadioIconBox>
          
          <PencilIconBox><PencilWrite2Ic/></PencilIconBox>
          
          <TextBox>
            <Text>
              Это мой невероятно максимально наидлинейше поэтически исторически
              длиииииииииииииииииииииииииииинный вариант
            </Text>
          </TextBox>
          
          <RemoveIconBox><CrossInCircleIc/></RemoveIconBox>
        
        </Frame>
        
        
        <div>Без кнопки удалить:</div>
        
        <Frame>
          
          <RadioIconBox><RadioInactiveIc/></RadioIconBox>
          
          <TextBox>
            <Text>Это мой вариант</Text>
          </TextBox>
          
          <PencilIconBox><PencilWrite2Ic/></PencilIconBox>
        
        </Frame>
        
        <Frame>
          
          <RadioIconBox><RadioActiveIc/></RadioIconBox>
          
          <TextBox>
            <Text>Это мой ооооооооооочень длиииииииииииинннннннннннннннннннннный вариант</Text>
          </TextBox>
          
          <PencilIconBox><PencilWrite2Ic/></PencilIconBox>
        
        </Frame>
        
        <Frame>
          
          <RadioIconBox><RadioActiveIc/></RadioIconBox>
          
          <TextBox>
            <Text>
              Это мой невероятно максимально наидлинейше поэтически исторически
              длиииииииииииииииииииииииииииинный вариант
            </Text>
          </TextBox>
          
          <PencilIconBox><PencilWrite2Ic/></PencilIconBox>
        
        </Frame>
        
      </ColumnContent>
    
      
      
    </Pages.ContentFill>
  </Pages.SimplePage>
}
export default ViewsTest




const ColumnContent = styled.div`
  width: 350px;
  ${col};
  gap: 10px;
`


const Frame = styled.article`
  width: 350px;
  height: fit-content;
  ${row};
  align-items: start;
  gap: 10px;
  border-radius: 10px;
  --h-content: 40px;
  padding: 5px 0px;
  background: #00ffff22;
`



const AddIconBox = styled.div`
  width: var(--h-content);
  height: var(--h-content);
  border-radius: 10px;
  background: #ff000011;
  ${center};
  padding: 5px;
`

const RadioIconBox = styled.div`
  width: var(--h-content);
  height: var(--h-content);
  border-radius: 10px;
  background: #ff000011;
  ${center};
  padding: 8px;
`

const PencilIconBox = styled.div`
  width: var(--h-content);
  height: var(--h-content);
  border-radius: 10px;
  background: #ff000011;
  ${center};
  padding: 11px;
`

const RemoveIconBox = styled.div`
  width: var(--h-content);
  height: var(--h-content);
  border-radius: 10px;
  background: #0000ff11;
  ${center};
  padding: 5px;
`



const TextBox = styled.div`
  min-height: var(--h-content);
  height: fit-content;
  flex: 1;
  ${row};
  place-items: center start;
`
const Text = styled.div`
  align-self: center;
  background: #ffff0022;
  overflow-wrap: anywhere;
`
