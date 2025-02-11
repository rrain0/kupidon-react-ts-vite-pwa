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
  
  if (baseTree && baseWords.length) {
    return transformNew1TreeWords(
      style, styleProps,
      baseContextStack, baseTree, baseWords,
      readyWords,
      findRestProp,
      entityLvl,
    )
  }
  
  // Если слова кончились, а дерево - нет, то идём дальше в следующий объект
  if (baseTree) {
    return transformNew1Tree(
      style, styleProps,
      baseContextStack, baseTree,
      readyWords,
      findRestProp,
      foundExactProp,
      entityLvl,
    )
  }
  
  console.log(':', baseTree, baseWords, readyWords, findRestProp, entityLvl)
  
  // No tree + no words
  // Если дерева не было, то идём дальше создавать его из контекста
  
  if (isStyleValue(style)) {
    if (findRestProp) {
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
  }
  else if (isArray(style)) {
  
  }
  else if (isfunction(style)) {
  
  }
  else if (isobject(style)) {
    const mappedStyle: MappedStyle = { entityLvl }
    for (const [selector, subStyle] of Object.entries(style)) {
      const words = [
        ...baseWords,
        ...camelCaseToWords(selector).map(w => w.toLowerCase()),
      ]
      
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
    if (!mappedStyle.transformer && !mappedStyle.nodes) return undefined
    return mappedStyle
  }
  return undefined
}





export function transformNew1Tree<Props>(
  style: WidgetStyleWithProps<Props>,
  styleProps: NoInfer<Props>,
  baseContextStack: EntitiesRecordArrayTf0,
  baseTree: WordsTree<WidgetTransformer> | undefined = undefined,
  readyWords: string[] = [],
  findRestProp = false,
  foundExactProp = false,
  entityLvl = 0,
): MappedStyle | undefined {
  
  console.log('Tree:', baseTree, [], readyWords, findRestProp, entityLvl)
  
  
  if (!baseTree) {
    throw new Error('baseTree must not be empty')
  }
  
  
  
  if (isStyleValue(style)) {
    if (findRestProp) {
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
  }
  else if (isArray(style)) {
  
  }
  else if (isfunction(style)) {
  
  }
  else if (isobject(style)) {
    const mappedStyle: MappedStyle = { entityLvl }
    for (const [selector, subStyle] of Object.entries(style)) {
      const words = camelCaseToWords(selector).map(w => w.toLowerCase())
      
      let nestedNodes = transformNew1(
        subStyle, styleProps,
        baseContextStack, baseTree, words,
        readyWords,
        findRestProp, false,
        entityLvl,
      )
      // я создал слова, но не дал дерево и нифига не сработало
      if (!nestedNodes) {
        nestedNodes = transformNew1(
          // TODO - это костыль
          { [selector]: subStyle }, styleProps,
          baseContextStack, undefined, words,
          readyWords,
          findRestProp, false,
          entityLvl,
        )
      }
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
    
    if (!mappedStyle.transformer && !mappedStyle.nodes) return undefined
    return mappedStyle
  }
  return undefined
}






export function transformNew1TreeWords<Props>(
  style: WidgetStyleWithProps<Props>,
  styleProps: NoInfer<Props>,
  baseContextStack: EntitiesRecordArrayTf0,
  baseTree: WordsTree<WidgetTransformer>,
  baseWords: string[],
  readyWords: string[] = [],
  findRestProp = false,
  entityLvl = 0,
): MappedStyle | undefined {
  
  console.log('TreeWords:', baseTree, baseWords, readyWords, findRestProp, entityLvl)
  
  if (!baseTree || !baseWords.length) {
    throw new Error('baseTree && baseWords must not be empty')
  }
  
  const word = baseWords[0]
  baseTree = baseTree[word]
  const transformer = baseTree?.[nodeValue]
  
  let nestedNodes: MappedStyle | undefined
  const nextWords = baseWords.slice(1)
  if (transformer || findRestProp) {
    nestedNodes = transformNew1(
      style, styleProps,
      baseContextStack, baseTree, nextWords,
      [...readyWords, word],
      findRestProp, findRestProp && !!transformer,
      entityLvl,
    )
  }
  
  if (!transformer) {
    if (!nestedNodes) return undefined
    else return nestedNodes
  }
  
  else if (transformer) {
    if (!nestedNodes) {
      nestedNodes = transformNew1(
        style, styleProps,
        baseContextStack, undefined, nextWords,
        [],
        findRestProp, false,
        entityLvl,
      )
    }
    
    const merge = (nestedNodes: MappedStyle | undefined) => {
      if (!nestedNodes) return { transformer, entityLvl }
      else if (nestedNodes) {
        if (nestedNodes.transformer) {
          if (nestedNodes.entityLvl > entityLvl) {
            return { transformer, entityLvl, nodes: [nestedNodes] }
          }
          if (nestedNodes.entityLvl === entityLvl) {
            return nestedNodes
          }
          return undefined // must be unreachable
        }
        if (!nestedNodes.transformer) {
          if (nestedNodes.entityLvl > entityLvl) {
            return {
              transformer,
              entityLvl: nestedNodes.entityLvl,
              nodes: nestedNodes.nodes,
            }
          }
          if (nestedNodes.entityLvl === entityLvl) {
            return undefined // must be unreachable
          }
          return undefined // must be unreachable
        }
        return undefined // must be unreachable
      }
    }
    
    
    if (nestedNodes && !nestedNodes.transformer
      && nestedNodes.entityLvl === entityLvl
    ) {
      return {
        entityLvl,
        nodes: nestedNodes.nodes!.map(n => merge(n)).filter(it => !!it),
      }
    }
    else {
      // TODO Нужно не тупо прокидывать текущее свойство вниз,
      //   а выделять все группы одинаковых верхних свойств
      return merge(nestedNodes)
    }
  }
  
}






