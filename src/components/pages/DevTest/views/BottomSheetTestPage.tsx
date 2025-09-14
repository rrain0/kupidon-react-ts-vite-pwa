import { arrOfIndices } from '@utils/base/array/ArrayU.ts'
import React, { useMemo, useRef, useState } from 'react'
import Flex from '@libs/short-propsed/components/Flex.tsx'
import Gap from '@libs/short-propsed/components/Gap.tsx'
import { BottomSheetS6 } from 'src/components/widgets/BottomSheet/BottomSheetS6.ts'
import PageContentLayout from 'src/components/components/page/PageContentLayout.tsx'
import PageLayout from 'src/components/components/page/PageLayout.tsx'
import BottomFloatingBar from 'src/components/components/screen-bars/BottomFloatingBar.tsx'
import {
  SheetSnapIdx,
  SheetSnapPoints,
  SheetState,
} from 'src/components/widgets/BottomSheet/useBottomSheet.ts'
import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import row = EmotionCommon.row
import col = EmotionCommon.col
import styled from '@emotion/styled'
import BottomSheet from 'src/components/widgets/BottomSheet/BottomSheet.tsx'
import OverflowWrapper from 'src/components/widgets/Scrollbars/OverflowWrapper.tsx'
import { OverflowWrapperStyle } from 'src/components/widgets/Scrollbars/OverflowWrapperStyle.ts'
import rowWrap = EmotionCommon.rowWrap
import { ifNotNonNegInt, Setter } from '@utils/base/typeUtils.ts'





const BottomSheetTestPage = React.memo(() => {
  
  
  const bottomSheetFrameRef = useRef<HTMLDivElement>(null)
  const bottomSheetRef = useRef<HTMLDivElement>(null)
  const bottomSheetHeaderRef = useRef<HTMLDivElement>(null)
  const bottomSheetContentRef = useRef<HTMLDivElement>(null)
  
  const [state, setState] = useState<SheetState>('closed')
  const [snapIdx, setSnapIdx] = useState<SheetSnapIdx>(2)
  
  /* const setState = useCallback(
    (s: ValueOrMapper<SheetState>) => {
      if(s === 'closing'){
        console.log('debug closing')
        debugger
      }
      setState_(s)
    },
    [setState_]
  ) */
  
  const [snapPoints, setSnapPoints] = useState<SheetSnapPoints>(
    ['0px', 'fit-header', 200, 'fit-content', '50%', 'free', '80%', '800px']
  )
  const [animationDuration, setAnimationDuration] = useState(400)
  const [closeable, setCloseable] = useState(true)
  const openSnapIdx = useMemo(() => {
    let openIdx = snapPoints.findIndex(it => it === 'fit-content')
    if (openIdx === -1) openIdx = snapPoints.length-1
    return openIdx
  }, [snapPoints])
  
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
  
  
  
  return (
    <>
      <PageLayout col data-display-name='BottomSheetTestPage'>
        
        <Gap h={200}/>
        
        <PageContentLayout col>
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
                setItemsCnt(ifNotNonNegInt(ev.target.value, 12))
              }}
            />
          </div>
          
          <Flex row g={10}>
            <div>Snap points:</div>
            <div>{JSON.stringify(snapPoints)}</div>
          </Flex>
          
          <Flex row g={10}>
            <div>Snap points px:</div>
            <div>{JSON.stringify(snapPointsPx)}</div>
          </Flex>
          
          <Flex row g={10}>
            <div>Closeable:</div>
            <div>{JSON.stringify(closeable)}</div>
          </Flex>
          
          
          <div 
            css={t => css`
              width: 200px;
              height: 50px;
              border-radius: 16px;
              border: 2px solid ${t.page.ct2};
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
          
          {arrOfIndices(itemsCnt).map(i => (
            <div
              css={css({ cursor: 'pointer' })}
              key={i}
              onClick={() => {
                setSelectedItem(`Item ${i + 1}`)
                setState('closing')
              }}
            >
              Item {i + 1}
            </div>
          ))}
        
        </PageContentLayout>
        
        <Gap h={1000}/>
        
        
        
      </PageLayout>
      
      <BottomSheet
        css={BottomSheetS6.t(BottomSheetS6.S.bottom.sheet.full.normal)}
        
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
        {({ sheetDrag }) => (
          <>
            <div // Header Component
              // Must be without margins!!!
              css={t => css`
                background: ${t.bottomSheet.bg};
                border-radius: 16px 16px 0 0;
                color: ${t.page.ct2};
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
                css={t => css`
                  width: 60px;
                  height: 4px;
                  border-radius: 2px;
                  background: ${t.bottomSheetHandle.bg};
                  ${state === 'dragging' && css`background: ${t.page.ct2};`}
                `}
              />
              <div>Header</div>
            </div>
            
            <div // Body Component
              // Must be without margins & paddings!!!
              css={t => css`
                display: flex;
                place-items: center;
                overflow: hidden;
                background: ${t.bottomSheet.bg};
                color: ${t.page.ct2};
              `}
            >
              <OverflowWrapper
                css={OverflowWrapperStyle.page}
                showVertical={
                  !([null, 'closed', 'close', 'closing', 'open', 'opening'] as SheetState[]).includes(state)
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
                  {arrOfIndices(itemsCnt).map(i => (
                    <div
                      css={css`
                        cursor: pointer;
                      `}
                      key={i}
                      onClick={() => {
                        setSelectedItem(`Item ${i+1}`)
                        setState('closing')
                      }}
                    >
                      Item {i+1}
                    </div>
                  ))}
                </div>
              </OverflowWrapper>
            </div>
          </>
        )}
        
      </BottomSheet>
      
      
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
  )
})
BottomSheetTestPage.displayName = 'BottomSheetTestPage'
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
}) => {
  return (
    <>
    
      <div
        css={t => css`
        position: fixed;
        top: 0; left: 0;
        z-index: 40;
        ${col};
        background: ${t.page.bg}88;
        color: ${t.page.ct2};
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
          
          {props.snapPoints.map((sp, i) => (
            <OverlayButton
              key={sp}
              onClick={() => {
                props.setState('snap')
                props.setSnapIdx(i)
              }}
            >
              Snap to {sp}
            </OverlayButton>
          ))}
          
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
          
          {props.snapPoints.map((sp, i) => (
            <OverlayButton
              key={sp}
              onClick={() => {
                props.setState('snapping')
                props.setSnapIdx(i)
              }}
            >
              Anim Snap to {sp}
            </OverlayButton>
          ))}
          
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
                  ifNotNonNegInt(ev.target.value, 400),
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
                  ifNotNonNegInt(ev.target.value, 12),
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
              type="checkbox"
              checked={props.closeable}
              onChange={ev => props.setCloseable(ev.currentTarget.checked)}
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
      
      <BottomFloatingBar settingsButton/>
      
    </>
  )
}

const OverlayButton = styled.button`
  flex: 1;
  min-width: 60px;
  height: 30px;
  font: 500 10px/129% Roboto;
  color: ${p => p.theme.page.ct2};
`
const OverlayInput = styled.input`
  font: 500 10px/129% Roboto;
  color: ${p => p.theme.page.ct2};
`
