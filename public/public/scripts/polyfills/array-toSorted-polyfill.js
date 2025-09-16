
// Array.prototype.toSorted polyfill
if (!Array.prototype.toSorted) {
  Array.prototype.toSorted = function(...args) {
    const newArr = [...this]
    newArr.sort(...args)
    return newArr
  }
}
