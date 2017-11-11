// Explicit to this module

let map = new WeakMap()
let internal = function(object) {
  if (!map.has(object)) map.set(object, {})
  return map.get(object)
}

class Movie {
  static get CHILDREN() {
    return 2
  }
  static get REGULAR() {
    return 0
  }
  static get NEW_RELEASE() {
    return 1
  }
  constructor(title, priceCode) {
    internal(this).title = title
    internal(this).priceCode = priceCode
  }
  getPriceCode() {
    return internal(this).priceCode
  }
  setPriceCode(arg) {
    internal(this).priceCode = arg
  }
  getTitle() {
    return internal(this).title
  }
}

module.exports = Movie
