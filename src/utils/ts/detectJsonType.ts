import {
  isArray,
  isbool,
  isfunction,
  isnull, isnumber,
  isObject, isstring,
  isundef,
} from 'src/utils/base/tsUtils.ts'


export type TupleType = undefined | null | boolean | string | number
export type ObjectType = Record<string, TypeData>

export type TypeData = {
  isArray?: boolean
  type: (string | ObjectType)[]
  tuple: TupleType[]
}

export function detectJsonType(data: unknown): TypeData {
  if (isfunction(data)) {
    return { type: ['function'], tuple: [] }
  }
  else if (isArray(data)) {
    const map = new Map<string, Set<any>>()
    const mapCnt = new Map<string, number>()
    const types = data.map(it => detectJsonType(it))
    // TODO fold types
    return {
      isArray: true,
      type: [],
      tuple: [],
    }
  }
  else if (isObject(data)) {
    return {
      type: [Object.fromEntries(Object.entries(data).map(([k, v]) => {
        return [k, detectJsonType(v)] as const
      }))],
      tuple: [],
    }
  }
  else if (isundef(data)) {
    return { type: ['undefined'], tuple: [undefined] }
  }
  else if (isnull(data)) {
    return { type: ['null'], tuple: [null] }
  }
  else if (isbool(data)) {
    return { type: ['boolean'], tuple: [data] }
  }
  else if (isstring(data)) {
    return { type: ['string'], tuple: [data] }
  }
  else if (isnumber(data)) {
    return { type: ['number'], tuple: [data] }
  }
  else return { type: ['UNKNOWN'], tuple: [] }
}





function getArrayType(types: TypeData[]): TypeData {
  const primitiveTypes = new Set<string>()
  const objectType: ObjectType | undefined = undefined
  const tuple = new Set<TupleType>()
  types.forEach(t => {
    // TODO что делать если массив есть tuple:
    //  isArray убрать
    //  type: [['number'], ['string']], tuple: [[0, 1], [2, 3], ['ok']]
  })
  return {
    isArray: true,
    type: [...primitiveTypes, ...objectType ? [objectType] : []],
    tuple: [...tuple],
  }
}




// Новая идея
export type TypeData2 = {
  type: (any | any[])[]
  tupleType: any[][]
  tuples: any[][]
}
// [1, 2, 3], [1], [2], ['ok', 'error'], [1, 'ok']
const tdArray = {
  type: [
    ['number'], // массив чисел
    ['string'], // массив строк
    ['number', 'string'], // массив чисел и строк
  ],
  tupleType: [
    ['number', 'number', 'number'], // тупл из 3 чисел
    ['number'], // тупл из одного числа
    ['string', 'string'], // тупл из 2 строк
    ['number', 'string'], // тупл из числа и строки
  ],
  // сами конкретные туплы
  tuples: [
    [1, 2, 3],
    [1],
    [2],
    ['ok', 'error'],
    [1, 'ok'],
  ],
}
