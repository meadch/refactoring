// Explicit to this module

let map = new WeakMap()
let internal = function(object) {
  if (!map.has(object)) map.set(object, {})
  return map.get(object)
}

class Movie {
  static get REGULAR() {
    return 0
  }
  static get NEW_RELEASE() {
    return 1
  }
  static get CHILDREN() {
    return 2
  }
  constructor(title, priceCode) {
    internal(this).title = title
    internal(this).price = this.setPriceCode(priceCode)
  }
  getPriceCode() {
    return internal(this).price
  }
  setPriceCode(arg) {
    switch (arg) {
      case Movie.REGULAR:
        return new RegularPrice()
      case Movie.NEW_RELEASE:
        return new NewReleasePrice()
      case Movie.CHILDREN:
        return new ChildrensPrice()
      default:
        throw new Error('Incorrect Price Code')
    }
  }
  getTitle() {
    return internal(this).title
  }
  getCharge(daysRented) {
    return internal(this).price.getCharge(daysRented)
  }

  frequentRenterPoints(daysRented) {
    return internal(this).price.getFrequentRenterPoints(daysRented)
  }
}

class Price {
  constructor() {
    if (this.constructor === Price) {
      throw new Error("Abstract class: can't be directly instantiated")
    }
  }
  getPriceCode() {
    throw new Error('Class instance must overright this method')
  }
  getCharge() {
    throw new Error('Class instance must overright this method')
  }
  getFrequentRenterPoints(daysRented) {
    return 1
  }
}

class ChildrensPrice extends Price {
  getPriceCode() {
    return Movie.CHILDRENS
  }
  getCharge(daysRented) {
    let result = 1.5
    if (daysRented > 3) result += (daysRented - 3) * 1.5
    return result
  }
}
class NewReleasePrice extends Price {
  getPriceCode() {
    return Movie.NEW_RELEASE
  }
  getCharge(daysRented) {
    return daysRented * 3
  }
  getFrequentRenterPoints(daysRented) {
    return daysRented > 1 ? 2 : 1
  }
}
class RegularPrice extends Price {
  getPriceCode() {
    return Movie.REGULAR
  }
  getCharge(daysRented) {
    let result = 2
    if (daysRented > 2) result += (daysRented - 2) * 1.5
    return result
  }
}

module.exports = { Movie, ChildrensPrice, NewReleasePrice, RegularPrice }
