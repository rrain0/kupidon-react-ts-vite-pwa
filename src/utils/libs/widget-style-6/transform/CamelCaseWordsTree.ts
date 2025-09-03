import { StringU } from '@utils/common/StringU.ts'
import { TypeU } from '@utils/common/TypeU.ts'
import { CommonProps } from '@libs/widget-style-6/WidgetCommonEntities.ts'
import RecordRo = TypeU.RecordRo
import camelCaseToWords = StringU.camelCaseToWords




export const nodeValue = Symbol('nodeValue')
export type WordsTree<T> = {
  [word: string]: WordsTree<T>
  [nodeValue]?: T
}
export function createCamelCaseWordsTree<T>(
  namesRecord: RecordRo<string, T>
): WordsTree<T> {
  const tree: WordsTree<T> = { }
  for (const [name, value] of Object.entries(namesRecord)) {
    const words = camelCaseToWords(name)
    let subTree = tree
    for (const word of words) {
      subTree = (subTree[word.toLowerCase()] ??= { })
    }
    subTree[nodeValue] = value
  }
  return tree
}


export function findInWordsTree<T>(
  camelCaseWords: string,
  tree: WordsTree<T>
): T | undefined {
  const words = camelCaseToWords(camelCaseWords)
  let subTree = tree
  for (const word of words) {
    subTree = subTree[word.toLowerCase()]
    if (!subTree) return undefined
  }
  //if (!Object.hasOwn(subTree, nodeValue)) return undefined
  return subTree[nodeValue]
}


export function testWordsTreeFinder() {
  const tree = createCamelCaseWordsTree(CommonProps)
  const selectors = ['minWidth', 'zIndex', 'z', 'gridAutoRows', 'somethingRandom']
  for (const selector of selectors) {
    console.log(selector, findInWordsTree(selector, tree))
  }
}

export function* createWordsTreeFinderGenerator<T>(
  tree: WordsTree<T>,
): Generator<T | undefined, T | undefined, string> {
  let subTree = tree
  while (true) {
    if (!subTree) return undefined
    const word = yield subTree[nodeValue]
    subTree = subTree[word]
  }
}

export function testWordsTreeGenerator() {
  const tree = createCamelCaseWordsTree(CommonProps)
  const selectors = [
    'minWidth',
    'zIndex',
    'z',
    'gridAutoRows',
    'bdWidthSmthrandom',
    'somethingRandom',
    'gridAutoSomethingRandom',
  ]
  for (const selector of selectors) {
    const words = camelCaseToWords(selector)
    const generator = createWordsTreeFinderGenerator(tree)
    
    let stack = ''
    let nodeValueData = generator.next()
    console.log(selector, stack, nodeValueData)
    
    for (const word of words) {
      nodeValueData = generator.next(word.toLowerCase())
      stack += word
      console.log(selector, stack, nodeValueData)
      if (nodeValueData.done) break
    }
  }
}
