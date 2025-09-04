

/* P.S. - Здесь имена начинаются с 'Set' потому что 'set' - это был бы сеттер */



// Создать новый Set из элементов set, исключая элементы из exclude
export const SetExclude = <T>(set: Set<T>, exclude: Set<any>): Set<T> => {
  return new Set([...set].filter(v => !exclude.has(v)))
}



// Равно ли содержимое двух Set
export const SetEq = (set: Set<any>, otherSet: Set<any>) => {
  if (set === otherSet) return true
  if (!set || !otherSet) return false
  if (set.size !== otherSet.size) return false
  for (const el of set) if (!otherSet.has(el)) return false
  return true
}



/**
 * Если элемент есть во множестве - он удалится.
 * Если элемента нет во множестве - он добавится.
 * @param set Множество
 * @param element Элемент
 * @returns {Set<E>}
 */
export const SetToggle = <E>(set: Set<E>, element: E) => {
  if (set.has(element)) set.delete(element)
  else set.add(element)
  return set
}

