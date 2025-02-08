import { ArrayU } from '@util/common/ArrayU.ts'
import { StringU } from '@util/common/StringU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import {
  createCamelCaseWordsTree, nodeValue, WordsTree,
} from 'src/mini-libs/widget-style-6/transform/CamelCaseWordsTree.ts'
import { FlatStyleTf1 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform1.ts'
import {
  EntitiesRecordArrayTf2
} from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform2.ts'
import { WidgetProp, WidgetTransformer } from 'src/mini-libs/widget-style-6/WidgetEntity.ts'
import { isStyleValue, WidgetStyleWithProps } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { WidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import uncapitalize = StringU.uncapitalize
import camelCaseToKebabCase = StringU.camelCaseToKebabCase
import RecordRo = TypeU.RecordRo
import camelCaseToWords = StringU.camelCaseToWords
import lastI = ArrayU.lastI
import isArray = TypeU.isArray
import isfunction = TypeU.isfunction
import isobject = TypeU.isobject






// TODO Style split 'selP' by capital letters and check using 'in' operator
// TODO Style Парсить свойство по чатсям (разделение по словам): bg: { image: '', size: '' }



export type EntitiesRecordTf0 = Record<string, WidgetTransformer>
export type EntitiesRecordArrayTf0 = (EntitiesRecordTf0 | undefined)[]


export type MappedStyle = {
  transformer?: WidgetTransformer | undefined
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
  findRest = false,
): MappedStyle | undefined {
  
  if (baseTree) {
    for (let i = 0; i < baseWords.length; i++) {
      const word = baseWords[i]
      baseTree = baseTree[word]
      if (baseTree) {
        const transformer = baseTree[nodeValue]
        if (transformer) {
          let nestedStyle = transformNew1(
            style, styleProps,
            baseContextStack, baseTree, baseWords.slice(i + 1),
            findRest ? [...readyWords, ...baseWords.slice(0, i + 1)] : [], findRest,
          )
          if (nestedStyle) {
            return { transformer, nodes: [nestedStyle] }
          }
          nestedStyle = transformNew1(
            style, styleProps,
            baseContextStack, undefined, baseWords.slice(i + 1),
            findRest ? [...readyWords, ...baseWords.slice(0, i + 1)] : [], findRest,
          )
          if (nestedStyle) {
            return { transformer, nodes: [nestedStyle] }
          }
          return { transformer }
        }
      }
      else if (i >= 1) {
        // Если дерево было и кончилось, то идём рекурсивно дальше с оставшимися словами
        const nestedStyle = transformNew1(
          style, styleProps,
          baseContextStack, undefined, baseWords.slice(i),
          [...readyWords, ...baseWords.slice(0, i)], findRest,
        )
        return nestedStyle
      }
      else break
    }
  }
  
  // 1) Если дерева не было, то идём дальше создавать его из контекста
  // 2) Если слова кончились, а дерево - нет, то идём дальше в следующий объект
  
  if (isStyleValue(style)) {
    /* if (findRest) {
      return {
        transformer: WidgetProp.ofName(readyWords.join('-')),
        nodes: [{
          transformer: { type: 'propValue', value: style },
          nodes: [],
        }],
      }
    } */
    return {
      transformer: { type: 'propValue', value: style },
    }
  }
  else if (isArray(style)) {
  
  }
  else if (isfunction(style)) {
  
  }
  else if (isobject(style)) {
    const mappedStyle: MappedStyle = { nodes: [] }
    for (const [selector, subStyle] of Object.entries(style)) {
      const words = [
        ...baseWords,
        ...camelCaseToWords(selector).map(w => w.toLowerCase()),
      ]
      
      // Если было дерево, то продолжаем его обходить
      // Иначе возвращаемя до ближайшего найденного трансформера,
      // либо в начало запуска дерева, где пробуем следующий контекст
      if (baseTree) {
        const nestedStyle = transformNew1(
          subStyle, styleProps,
          baseContextStack, baseTree, words,
          readyWords, findRest,
        )
        if (nestedStyle) (mappedStyle.nodes ??= []).push(nestedStyle)
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
            const nestedStyle = transformNew1(
              subStyle, styleProps,
              baseContextStack, tree, words,
              readyWords, ctxI === 0,
            )
            if (nestedStyle) {
              (mappedStyle.nodes ??= []).push(nestedStyle)
              break
            }
          }
        }
      }
    }
    return mappedStyle
  }
  return undefined
}






