import { StringU } from '@utils/common/StringU.ts'
import { TypeU } from '@utils/common/TypeU.ts'
import {
  createCamelCaseWordsTree, nodeValue, WordsTree,
} from 'src/mini-libs/widget-style-6/transform/CamelCaseWordsTree.ts'
import { WidgetProp, WidgetTransformer } from 'src/mini-libs/widget-style-6/WidgetEntity.ts'
import { isStyleValue, WidgetStyleWithProps } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import camelCaseToWords = StringU.camelCaseToWords
import isArray = TypeU.isArray
import isfunction = TypeU.isfunction
import isobject = TypeU.isobject




// TODO Style - проверить это всё на самом сложном элементе - SelectItem

// TODO COMPLETED Style split 'selP' by capital letters and check using 'in' operator
// TODO ????????? Style Парсить свойство по чатсям (разделение по словам): bg: { image: '', size: '' }

// TODO maybe prefix
const allowedNamePrefixes = {
  $button: 'a',
  _button: 'a',
  
  $$button: 'a',
  $_button: 'a',
}




export type EntitiesRecordTf0 = Record<string, WidgetTransformer>
export type EntitiesRecordArrayTf0 = (EntitiesRecordTf0 | undefined)[]


export type MappedStyle = {
  transformer?: WidgetTransformer | undefined
  entityLvl: number
  objectLvl: number
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



// TODO Style - 1) Context
// ✅ 2) Object nesting level
// TODO Style - 3) Put prop value in prop node
// TODO Style - ??? 4) Unpack complex props
// TODO Style - 5) Accept emotion css`` as style part


const log = false


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
  objectLvl = 0,
): MappedStyle | undefined {
  
  if ((baseTree || findRestProp) && baseWords.length) {
    return transformNew1TreeWords(
      style, styleProps,
      baseContextStack, baseTree, baseWords,
      readyWords,
      findRestProp,
      entityLvl, objectLvl,
    )
  }
  
  // Если слова кончились, а дерево - нет, то идём дальше в следующий объект
  if ((baseTree || findRestProp) && !baseWords.length) {
    return transformNew1Tree(
      style, styleProps,
      baseContextStack, baseTree,
      readyWords,
      findRestProp,
      foundExactProp,
      entityLvl, objectLvl,
    )
  }
  
  if (!baseTree && baseWords.length) {
    return transformNew1Words(
      style, styleProps,
      baseContextStack, baseWords,
      readyWords,
      entityLvl, objectLvl,
    )
  }
  
  
  
  if (log) console.log(':', baseTree, baseWords, readyWords, findRestProp, entityLvl)
  
  // No tree + no words => need check style
  // Если дерева не было, то идём дальше искать объект и брать из него слова.
  
  if (isStyleValue(style)) {
    if (findRestProp) {
      const propValue = {
        transformer: { type: 'propValue' as const, value: style },
        entityLvl: entityLvl + 1,
        objectLvl,
      }
      if (!foundExactProp) {
        return {
          transformer: WidgetProp.ofName(readyWords.join('-')),
          entityLvl: entityLvl,
          nodes: [propValue],
          objectLvl,
        }
      }
      return propValue
    }
  }
  else if (isArray(style)) {
  
  }
  else if (isfunction(style)) {
  
  }
  else if (isobject(style)) {
    const mappedStyle: MappedStyle = { entityLvl, objectLvl }
    for (const [selector, subStyle] of Object.entries(style)) {
      const words = camelCaseToWords(selector).map(w => w.toLowerCase())
      // Если получили стиль, то добавляем его и переходим к следующему свойству объекта
      
      const nestedNodes = transformNew1Words(
        subStyle, styleProps,
        [...baseContextStack], words,
        [],
        entityLvl, objectLvl + 1,
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
        }
      }
      
    }
    if (!mappedStyle.transformer && !mappedStyle.nodes) return undefined
    return mappedStyle
  }
  return undefined
}





// CREATE TREE
export function transformNew1Words<Props>(
  style: WidgetStyleWithProps<Props>,
  styleProps: NoInfer<Props>,
  baseContextStack: EntitiesRecordArrayTf0,
  baseWords: string[] = [],
  readyWords: string[] = [],
  entityLvl = 0,
  objectLvl = 0,
): MappedStyle | undefined {
  
  if (!baseWords.length) {
    throw new Error('No base words were found')
  }
  
  if (log) console.log('Words:', undefined, baseWords, readyWords, false, entityLvl)
  
  // No tree + have words
  // Создаём дерево из контекста.
  
  // Контекст создаёт новое дерево и отправляет его дальше.
  // Если в результате undefined, то берём следующий контекст.
  
  for (let ctxI = ctxLastI; ctxI >= 0; ctxI--) {
    const context = baseContextStack[ctxI]
    if (context) {
      const tree = createCamelCaseWordsTree(context)
      const nestedNodes = transformNew1(
        style, styleProps,
        baseContextStack, tree, baseWords,
        [],
        ctxI === 0, false,
        entityLvl + 1, objectLvl,
      )
      if (nestedNodes) return nestedNodes
    }
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
  objectLvl = 0,
): MappedStyle | undefined {
  
  if (log) console.log('Tree:', baseTree, [], readyWords, findRestProp, entityLvl)
  
  
  if (!(baseTree || findRestProp)) {
    throw new Error('baseTree must not be empty')
  }
  
  
  
  if (isStyleValue(style)) {
    if (findRestProp) {
      const propValue = {
        transformer: { type: 'propValue' as const, value: style },
        entityLvl: entityLvl + 1,
        objectLvl,
      }
      if (!foundExactProp) {
        return {
          transformer: WidgetProp.ofName(readyWords.join('-')),
          entityLvl: entityLvl,
          nodes: [propValue],
          objectLvl,
        }
      }
      return propValue
    }
  }
  else if (isArray(style)) {
  
  }
  else if (isfunction(style)) {
  
  }
  else if (isobject(style)) {
    const mappedStyle: MappedStyle = { entityLvl, objectLvl }
    for (const [selector, subStyle] of Object.entries(style)) {
      const words = camelCaseToWords(selector).map(w => w.toLowerCase())
      let nestedNodes: MappedStyle | undefined
      nestedNodes = transformNew1(
        subStyle, styleProps,
        baseContextStack, baseTree, words,
        readyWords,
        findRestProp, false,
        entityLvl, objectLvl + 1,
      )
      if (!nestedNodes) {
        nestedNodes = transformNew1(
          subStyle, styleProps,
          baseContextStack, undefined, words,
          readyWords,
          findRestProp, false,
          entityLvl, objectLvl + 1,
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
  baseTree: WordsTree<WidgetTransformer> | undefined,
  baseWords: string[],
  readyWords: string[] = [],
  findRestProp = false,
  entityLvl = 0,
  objectLvl = 0,
): MappedStyle | undefined {
  
  if (log) console.log('TreeWords:', baseTree, baseWords, readyWords, findRestProp, entityLvl)
  
  if (!(baseTree || findRestProp) || !baseWords.length) {
    throw new Error('baseTree && baseWords must not be empty')
  }
  
  const word = baseWords[0]
  baseTree = baseTree?.[word]
  const transformer = baseTree?.[nodeValue]
  
  let nestedNodes: MappedStyle | undefined
  const nextWords = baseWords.slice(1)
  if (transformer || findRestProp) {
    nestedNodes = transformNew1(
      style, styleProps,
      baseContextStack, baseTree, nextWords,
      [...readyWords, word],
      findRestProp, findRestProp && !!transformer,
      entityLvl, objectLvl,
    )
  }
  
  if (!transformer) {
    if (!nestedNodes) return undefined
    else return nestedNodes
  }
  
  // TODO новый контекст будет добавляться здесь при принятии нового transformer
  else if (transformer) {
    if (!nestedNodes) {
      nestedNodes = transformNew1(
        style, styleProps,
        baseContextStack, undefined, nextWords,
        [],
        false, false,
        entityLvl, objectLvl,
      )
    }
    
    const merge = (nestedNodes: MappedStyle | undefined): MappedStyle | undefined => {
      if (!nestedNodes) return { transformer, entityLvl, objectLvl }
      else if (nestedNodes) {
        if (nestedNodes.transformer) {
          if (nestedNodes.entityLvl > entityLvl) {
            return { transformer, entityLvl, objectLvl, nodes: [nestedNodes] }
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
              entityLvl: nestedNodes.entityLvl, objectLvl,
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
      const nodes = nestedNodes.nodes!.map(n => merge(n)).filter(it => !!it)
      const merged = [] as MappedStyle[]
      nodes.forEach(n => {
        const last = merged.at(-1)
        if (n && last && n.transformer === last.transformer && n.entityLvl === last.entityLvl) {
          (last.nodes ??= []).push(...n.nodes ?? [])
        }
        else if (n) {
          merged.push({
            transformer: n.transformer,
            entityLvl: n.entityLvl, objectLvl: n.objectLvl,
            nodes: n.nodes,
          })
        }
      })
      return {
        entityLvl, objectLvl,
        nodes: merged,
      }
    }
    else {
      return merge(nestedNodes)
    }
  }
  
}






