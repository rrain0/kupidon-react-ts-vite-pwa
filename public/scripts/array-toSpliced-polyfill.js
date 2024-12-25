
// Array.prototype.toSpliced polyfill
if (!Array.prototype.toSpliced) {
  Array.prototype.toSpliced = function(...args) {
    const newArr = [...this]
    newArr.splice(...args)
    return newArr
  }
}
