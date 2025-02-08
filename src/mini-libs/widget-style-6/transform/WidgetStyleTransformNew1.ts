import { StringU } from '@util/common/StringU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import {
  createCamelCaseWordsTree, nodeValue, WordsTree,
} from 'src/mini-libs/widget-style-6/transform/CamelCaseWordsTree.ts'
import { WidgetProp, WidgetTransformer } from 'src/mini-libs/widget-style-6/WidgetEntity.ts'
import { isStyleValue, WidgetStyleWithProps } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import camelCaseToWords = StringU.camelCaseToWords
import isArray = TypeU.isArray
import isfunction = TypeU.isfunction
import isobject = TypeU.isobject






// TODO COMPLETED Style split 'selP' by capital letters and check using 'in' operator
// TODO ????????? Style Парсить свойство по чатсям (разделение по словам): bg: { image: '', size: '' }



export type EntitiesRecordTf0 = Record<string, WidgetTransformer>
export type EntitiesRecordArrayTf0 = (EntitiesRecordTf0 | undefined)[]


export type MappedStyle = {
  transformer?: WidgetTransformer | undefined
  entityLvl: number
  nodes?: MappedStyle[] | undefined
}


// Indexes of slots for various contexts

// Search by ===
const ctxCommonPropsI = 0
const ctxWidgetPropsI = 1

// Search by startsWith
const ctxCommonStatesI = 2
const ctxWidgetStatesI = 3

const ctxWidgetElementsI = 4
const ctxWidgetElementStatesI = 5 // record of pseudoClasses, attrs
const ctxWidgetElementStateValuesI = 6 // record of attr values
const ctxWidgetElementPropsI = 7 // record of elem props

const ctxLastI = ctxWidgetElementPropsI



export function transformNew1<Props>(
  style: WidgetStyleWithProps<Props>,
  styleProps: NoInfer<Props>,
  baseContextStack: EntitiesRecordArrayTf0,
  baseTree: WordsTree<WidgetTransformer> | undefined = undefined,
  baseWords: string[] = [],
  readyWords: string[] = [],
  findRestProp = false,
  foundExactProp = false,
  entityLvl = 0,
): MappedStyle | undefined {
  
  //console.log(baseTree, baseWords, readyWords, findRestProp, entityLvl)
  
  {
    const word = baseWords[0]
    if (baseTree && word) {
      baseTree = baseTree[word]
      const transformer = baseTree?.[nodeValue]
      let nestedNodes: MappedStyle | undefined
      const nextWords = baseWords.slice(1)
      if (transformer || findRestProp) {
        nestedNodes = transformNew1(
          style, styleProps,
          baseContextStack, baseTree, nextWords,
          findRestProp ? [...readyWords, word] : [],
          findRestProp, findRestProp && !!transformer,
          entityLvl,
        )
      }
      if (!transformer && !nestedNodes) return undefined
      if (transformer && !nestedNodes) return { transformer, entityLvl }
      if (!transformer && nestedNodes) return nestedNodes
      if (transformer && nestedNodes) {
        if (nestedNodes.transformer) {
          if (nestedNodes.entityLvl > entityLvl) {
            return { transformer, entityLvl, nodes: [nestedNodes] }
          }
          if (nestedNodes.entityLvl === entityLvl) {
            return nestedNodes
          }
        }
        if (!nestedNodes.transformer) {
          if (nestedNodes.entityLvl === entityLvl) {
            return nestedNodes
          }
        }
        nestedNodes.transformer = transformer
        return nestedNodes
      }
    }
  }
  
  
  
  /*
  if (baseTree && baseWords[0]) {
    baseTree = baseTree?.[baseWords[0]]
    if (baseTree) {
      const transformer = baseTree[nodeValue]
      if (transformer) {
        let nestedNodes = transformNew1(
          style, styleProps,
          baseContextStack, baseTree, baseWords.slice(1),
          findRestProp ? [...readyWords, ...baseWords.slice(0, 1)] : [],
          findRestProp, entityLvl,
        )
        if (nestedNodes) {
          if (nestedNodes.entityLvl > entityLvl || !nestedNodes.transformer) {
            return { transformer, entityLvl, nodes: [nestedNodes] }
          }
          return nestedNodes
        }
        nestedNodes = transformNew1(
          style, styleProps,
          baseContextStack, undefined, baseWords.slice(1),
          findRestProp ? [...readyWords, ...baseWords.slice(0, 1)] : [],
          findRestProp, entityLvl + 1,
        )
        if (nestedNodes) {
          if (nestedNodes.entityLvl > entityLvl || !nestedNodes.transformer) {
            return { transformer, entityLvl, nodes: [nestedNodes] }
          }
          return nestedNodes
        }
        return { transformer, entityLvl }
      }
    }
    else {
      // Если дерево было и кончилось, то идём рекурсивно дальше с оставшимися словами
      const nestedNodes = transformNew1(
        style, styleProps,
        baseContextStack, undefined, baseWords,
        findRestProp ? readyWords : [],
        findRestProp, entityLvl + 1,
      )
      return nestedNodes
    }
    
    // Мы прошлись по циклу, слова закончились, а дерево ещё нет
    readyWords = [...readyWords, ...baseWords]
    baseWords = []
  }
   */
  
  // 1) Если дерева не было, то идём дальше создавать его из контекста
  // 2) Если слова кончились, а дерево - нет, то идём дальше в следующий объект
  
  if (isStyleValue(style) && findRestProp && !baseWords.length) {
    if (readyWords.length && !foundExactProp) {
      return {
        transformer: WidgetProp.ofName(readyWords.join('-')),
        entityLvl: entityLvl,
        nodes: [{
          transformer: { type: 'propValue', value: style },
          entityLvl: entityLvl + 1,
        }],
      }
    }
    return {
      transformer: { type: 'propValue', value: style },
      entityLvl: entityLvl + 1,
    }
  }
  else if (isArray(style)) {
  
  }
  else if (isfunction(style)) {
  
  }
  else if (isobject(style)) {
    //entityLvl++
    const mappedStyle: MappedStyle = { entityLvl }
    for (const [selector, subStyle] of Object.entries(style)) {
      const words = [
        ...baseWords,
        ...camelCaseToWords(selector).map(w => w.toLowerCase()),
      ]
      
      // Если было дерево, то продолжаем его обходить
      // Иначе возвращаемя до ближайшего найденного трансформера,
      // либо в начало запуска дерева, где пробуем следующий контекст
      if (baseTree) {
        //const transformer = baseTree[nodeValue]
        const nestedNodes = transformNew1(
          subStyle, styleProps,
          baseContextStack, baseTree, words,
          readyWords,
          findRestProp, false,
          entityLvl,
        )
        if (nestedNodes) {
          const nn = nestedNodes
          const { transformer: t, nodes: n } = nn
          if (!t && n) {
            if (!mappedStyle.nodes) mappedStyle.nodes = n
            else mappedStyle.nodes.push(...n)
          }
          else if (t) {
            (mappedStyle.nodes ??= []).push(nn)
          }
        }
      }
      else {
        baseContextStack = [...baseContextStack]
        // Конекст создаёт новое дерево и отправляет его  дальше
        // Если в результате undefined, то берём следующий контекст.
        // Если получили стиль, то добавляем его и переходим к следующему свойству объекта
        
        for (let ctxI = ctxLastI; ctxI >= 0; ctxI--) {
          const context = baseContextStack[ctxI]
          if (context) {
            const tree = createCamelCaseWordsTree(context)
            const nestedNodes = transformNew1(
              subStyle, styleProps,
              baseContextStack, tree, words,
              [],
              ctxI === 0, false,
              entityLvl + 1,
            )
            if (nestedNodes) {
              const nn = nestedNodes
              const { transformer: t, nodes: n } = nn
              if (!t && n) {
                if (!mappedStyle.nodes) mappedStyle.nodes = n
                else mappedStyle.nodes.push(...n)
                break
              }
              else if (t) {
                (mappedStyle.nodes ??= []).push(nn)
                break
              }
            }
          }
        }
      }
    }
    if (!mappedStyle.transformer && !mappedStyle.nodes) return undefined
    return mappedStyle
  }
  return undefined
}






