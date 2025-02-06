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
  nodes: MappedStyle[]
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
  findAnyMode = false,
  readyWords: string[] = [],
  baseWords: string[] = [],
): MappedStyle | undefined {
  
  if (baseTree) {
    let transformer: WidgetTransformer | undefined
    for (let i = 0; i < baseWords.length; i++) {
      const word = baseWords[i]
      baseTree = baseTree[word]
      if (baseTree) {
        transformer = baseTree[nodeValue]
        if (transformer) {
          const nestedStyle = transformNew1(
            style, styleProps,
            baseContextStack, baseTree, findAnyMode,
            [...readyWords, ...baseWords.slice(0, i + 1)], baseWords.slice(i + 1),
          )
          if (nestedStyle) {
            if (nestedStyle.transformer?.type === 'propValue') {
              return { transformer, nodes: [nestedStyle] }
            }
            return nestedStyle
          }
          return { transformer, nodes: [] }
        }
      }
      else return undefined
    }
    // Если слова кончились, а дерево - нет, то идём дальше в следующий объект
  }
  // Если дерева не было, то идём дальше создавать его из контекста
  
  
  
  const mappedStyle: MappedStyle = { nodes: [] }
  
  
  
  if (isStyleValue(style)) {
    return {
      transformer: { type: 'propValue', value: style },
      nodes: [],
    }
  }
  else if (isArray(style)) {
  
  }
  else if (isfunction(style)) {
  
  }
  else if (isobject(style)) {
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
          baseContextStack, baseTree, findAnyMode,
          readyWords, words,
        )
        return nestedStyle
      }
      else {
        const contextStack = [...baseContextStack]
        // Конекст создаёт новое дерево и отправляет его  дальше
        // Если в результате undefined, то берём следующий контекст.
        // Если получили стиль, то добавляем его и переходим к следующему свойству объекта
        
        for (let ctxI = ctxLastI; ctxI >= 0; ctxI--) {
          const context = contextStack[ctxI]
          if (context) {
            const tree = createCamelCaseWordsTree(context)
            const nestedStyle = transformNew1(
              subStyle, styleProps,
              baseContextStack, tree, ctxI === 0,
              readyWords, words,
            )
            if (nestedStyle) {
              mappedStyle.nodes.push(nestedStyle)
            }
          }
        }
      }
    }
  }
  return mappedStyle
}






