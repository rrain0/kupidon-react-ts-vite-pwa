import React, { useMemo, useRef, useState } from 'react'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar.tsx'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import {
  ComputedBottomSheetDimens,
  SheetSnapIdx,
  SheetSnapPoints,
  SheetState,
} from 'src/ui/widgets/BottomSheet/useBottomSheet.ts'
import { css } from '@emotion/react'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import row = EmotionCommon.row
import col = EmotionCommon.col
import { Utils } from 'src/util/common/Utils.ts'
import styled from '@emotion/styled'
import BottomSheetDialog from 'src/ui/widgets/BottomSheet/BottomSheetDialog.tsx'
import intOrDefault = Utils.nonNegIntOrDefault;
import OverflowWrapper from 'src/ui/widgets/Scrollbars/OverflowWrapper.tsx'
import { OverflowWrapperStyle } from 'src/ui/widgets/Scrollbars/OverflowWrapperStyle.ts'
import rowWrap = EmotionCommon.rowWrap
import Setter = TypeU.Callback1





const BottomSheetTestPage =
React.memo(
()=>{
  
  
  const bottomSheetFrameRef = useRef<HTMLDivElement>(null)
  const bottomSheetRef = useRef<HTMLDivElement>(null)
  const bottomSheetHeaderRef = useRef<HTMLDivElement>(null)
  const bottomSheetContentRef = useRef<HTMLDivElement>(null)
  
  const [state, setState] = useState<SheetState>('closed')
  const [snapIdx, setSnapIdx] = useState<SheetSnapIdx>(2)
  
  /* const setState = useCallback(
    (s: ValueOrMapper<SheetState>)=>{
      if(s==='closing'){
        console.log('debug closing')
        debugger
      }
      setState_(s)
    },
    [setState_]
  ) */
  
  const [snapPoints, setSnapPoints] = useState<SheetSnapPoints>(
    ['0px','fit-header',200,'fit-content','50%','free','80%','800px']
  )
  const [animationDuration, setAnimationDuration] = useState(400)
  const [closeable, setCloseable] = useState(true)
  const openSnapIdx = useMemo(
    ()=>{
      let openIdx = snapPoints.findIndex(it=>it==='fit-content')
      if (openIdx===-1) openIdx = snapPoints.length-1
      return openIdx
    },
    [snapPoints]
  )
  
  /* const [computedSheetDimens, setComputedSheetDimens] =
    useState<ComputedBottomSheetDimens>({
      frameH: 0,
      sheetH: 0,
      headerH: 0,
      contentH: 0,
      headerAndContentH: 0,
    }) */
  const [snapPointsPx, setSnapPointsPx] = useState<number[] | undefined>(undefined)
  
  const [itemsCnt, setItemsCnt] = useState(12)
  
  const [selectedItem, setSelectedItem] = useState('Выберите')
  
  
  
  return <>
    <Pages.SimplePage>
      
      <div css={css`height: 200px;`}/>
      
      <Pages.ContentFill>
        <div>Bottom Sheet Test Page</div>
        
        <div css={css`
          ${row};
          gap: 10px;
        `}
        >
          <div>Number of items:</div>
          <OverlayInput
            value={itemsCnt}
            onChange={ev => {
              setItemsCnt(intOrDefault(ev.target.value, 12))
            }}
          />
        </div>
        
        <div css={css`
          ${row};
          gap: 10px;
        `}
        >
          <div>Snap points:</div>
          <div>{JSON.stringify(snapPoints)}</div>
        </div>
        
        <div css={css`
          ${row};
          gap: 10px;
        `}
        >
          <div>Snap points px:</div>
          <div>{JSON.stringify(snapPointsPx)}</div>
        </div>
        
        <div css={css`
          ${row};
          gap: 10px;
        `}
        >
          <div>Closeable:</div>
          <div>{JSON.stringify(closeable)}</div>
        </div>
        
        
        <div css={t=>css`
          width: 200px;
          height: 50px;
          border-radius: 16px;
          border: 2px solid ${t.page.content2[0]};
          ${row};
          padding: 0 10px;
          align-items: center;
          cursor: pointer;
        `}
          onClick={ev => {
            //console.log('Choose button clicked')
            setState('opening')
            setSnapIdx(openSnapIdx)
          }}
        >
          {selectedItem}
        </div>
        
        {
          [...Array(itemsCnt).keys()]
            .map(i => <div
              css={css`
                cursor: pointer;
              `}
              key={i}
              onClick={()=>{
                setSelectedItem(`Item ${i + 1}`)
                setState('closing')
              }}
            >
              Item {i + 1}
            </div>)
        }
      
      </Pages.ContentFill>
      
      <div css={css`height: 1000px;`}/>
      
      
      
    </Pages.SimplePage>
    
    <BottomSheetDialog
      bottomSheetFrameRef={bottomSheetFrameRef}
      bottomSheetRef={bottomSheetRef}
      bottomSheetHeaderRef={bottomSheetHeaderRef}
      bottomSheetContentRef={bottomSheetContentRef}
      
      sheetState={state}
      setSheetState={setState}
      snapIdx={snapIdx}
      setSnapIdx={setSnapIdx}
      
      snapPoints={snapPoints}
      animationDuration={animationDuration}
      closeable={closeable}
      defaultOpenIdx={openSnapIdx}
      
      onSnapPointsPx={setSnapPointsPx}
      //onComputedDimens={setComputedSheetDimens}
    >
      {({ sheetDrag })=><>
        <div // Header Component
          // Must be without margins!!!
          css={t=>css`
            background: ${t.bottomSheet.bgc[0]};
            border-radius: 16px 16px 0 0;
            color: ${t.page.content2[0]};
            padding: 10px;
            ${col};
            align-items: center;
            gap: 6px;
            cursor: pointer;
            touch-action: none;
          `}
          ref={bottomSheetHeaderRef as any}
          {...sheetDrag()}
        >
          <div
            css={t=>css`
              width: 60px;
              height: 4px;
              border-radius: 2px;
              background: ${t.bottomSheet.handle[0]};
              ${state==='dragging' && css`background: ${t.page.content2[0]};`}
            `}
          />
          <div>Header</div>
        </div>
        
        <div // Body Component
          // Must be without margins & paddings!!!
          css={t=>css`
            display: flex;
            place-items: center;
            overflow: hidden;
            background: ${t.bottomSheet.bgc[0]};
            color: ${t.page.content2[0]};
          `}
        >
          <OverflowWrapper
            css={OverflowWrapperStyle.page}
            showVertical={
              !([null,'closed','close','closing','open','opening'] as SheetState[]).includes(state)
            }
          >
            <div // scrollable content
              // Must be without margins!!!
              css={css`
                width: 100%;
                padding: 10px;
                ${col};
                gap: 10px;
                height: fit-content;
                min-height: fit-content;
              `}
              ref={bottomSheetContentRef as any}
            >
              {
                [...Array(itemsCnt).keys()]
                  .map(i=><div
                    css={css`
                      cursor: pointer;
                    `}
                    key={i}
                    onClick={()=>{
                      setSelectedItem(`Item ${i+1}`)
                      setState('closing')
                    }}
                  >
                    Item {i+1}
                  </div>)
              }
            </div>
          </OverflowWrapper>
        </div>
      </>}
      
    </BottomSheetDialog>
    
    
    <BottomSheetControlOverlay
      state={state}
      setState={setState}
      snapPoints={snapPoints}
      snapPointsPx={snapPointsPx}
      openSnapIdx={openSnapIdx}
      setSnapIdx={setSnapIdx}
      closeable={closeable}
      setCloseable={setCloseable}
      animationDuration={animationDuration}
      setAnimationDuration={setAnimationDuration}
      itemsCnt={itemsCnt}
      setItemsCnt={setItemsCnt}
    />
    
  </>
})
export default BottomSheetTestPage




const BottomSheetControlOverlay = (props:{
  state: SheetState
  setState: Setter<SheetState>
  snapPoints: SheetSnapPoints
  snapPointsPx: number[] | undefined
  openSnapIdx: number
  setSnapIdx: Setter<number>
  closeable: boolean
  setCloseable: Setter<boolean>
  animationDuration: number
  setAnimationDuration: Setter<number>
  itemsCnt: number
  setItemsCnt: Setter<number>
})=>{
  return <>
    
    <div
      css={t => css`
      position: fixed;
      top: 0; left: 0;
      z-index: 40;
      ${col};
      background: ${t.page.bgc[0]}88;
      color: ${t.page.content2[0]};
    `}
    >
      
      <div
        css={css`
        ${rowWrap};
        column-gap: 6px;
      `}
      >
        <OverlayButton
          onClick={() => {
            props.setState('open')
            props.setSnapIdx(props.openSnapIdx)
          }}
        >
          Open
        </OverlayButton>
        
        {props.snapPoints.map((sp, i) => <OverlayButton
          key={sp}
          onClick={() => {
            props.setState('snap')
            props.setSnapIdx(i)
          }}
        >
          Snap to {sp}
        </OverlayButton>)}
        
        <OverlayButton
          onClick={() => props.setState('close')}
        >
          Close
        </OverlayButton>
        
      </div>
      
      
      <div
        css={css`
        ${rowWrap};
        column-gap: 6px;
      `}
      >
        <OverlayButton
          onClick={() => {
            props.setState('opening')
            props.setSnapIdx(props.openSnapIdx)
          }}
        >
          Anim Open
        </OverlayButton>
        
        {props.snapPoints.map((sp, i) => <OverlayButton
          key={sp}
          onClick={() => {
            props.setState('snapping')
            props.setSnapIdx(i)
          }}
        >
          Anim Snap to {sp}
        </OverlayButton>)}
        
        <OverlayButton
          onClick={() => props.setState('closing')}
        >
          Anim Close
        </OverlayButton>
        
      </div>
      
      
      <div
        css={css`
        ${rowWrap};
        gap: 10px;
      `}
      >
        
        <div
          css={css`
          ${row};
          gap: 10px;
        `}
        >
          <div>Animation duration ms:</div>
          <OverlayInput
            value={props.animationDuration}
            onChange={ev => {
              props.setAnimationDuration(
                intOrDefault(ev.target.value, 400),
              )
            }}
          />
        </div>
        
        <div
          css={css`
          ${row};
          gap: 10px;
        `}
        >
          <div>Number of items:</div>
          <OverlayInput
            value={props.itemsCnt}
            onChange={ev => {
              props.setItemsCnt(
                intOrDefault(ev.target.value, 12),
              )
            }}
          />
        </div>
        
        <div
          css={css`
          ${row};
          gap: 10px;
        `}
        >
          <div>Closeable:</div>
          <input
            type='checkbox'
            checked={props.closeable}
            onChange={ev=>props.setCloseable(ev.currentTarget.checked)}
          />
        </div>
      </div>
      
      
      <div
        css={css`
        ${row};
        gap: 10px;
      `}
      >
        <div>State:</div>
        <div>{props.state}</div>
      </div>
    
    
    </div>
    
    <BottomButtonBar settingsBtn/>
    
  </>
}

const OverlayButton = styled.button`
  flex: 1;
  min-width: 60px;
  height: 30px;
  font: 500 10px/129% Roboto;
  color: ${p=>p.theme.page.content2[0]};
`
const OverlayInput = styled.input`
  font: 500 10px/129% Roboto;
  color: ${p=>p.theme.page.content2[0]};
`
