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
  getCharge(daysRented) {
    let thisAmount = 0
    switch (this.getPriceCode()) {
      case Movie.REGULAR:
        thisAmount += 2
        if (daysRented > 2) thisAmount += (daysRented - 2) * 1.5
        break
      case Movie.NEW_RELEASE:
        thisAmount += daysRented * 3
        break
      case Movie.CHILDREN:
        thisAmount += 1.5
        if (daysRented > 3) thisAmount += (daysRented - 3) * 1.5
        break
    }
    return thisAmount
  }

  frequentRenterPoints(daysRented) {
    if (this.getPriceCode() == Movie.NEW_RELEASE && daysRented > 1) {
      return 2
    }
    return 1
  }
}

module.exports = Movie
