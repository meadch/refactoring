const Movie = require('./movie')
let map = new WeakMap()

let internal = function(object) {
  if (!map.has(object)) map.set(object, {})
  return map.get(object)
}

class Rental {
  constructor(movie, daysRented) {
    if (!movie instanceof Movie) {
      throw 'this is not a movie'
    }
    internal(this).movie = movie
    internal(this).daysRented = daysRented
    this.getMovie = this.getMovie.bind(this)
  }
  getDaysRented() {
    return internal(this).daysRented
  }
  getMovie() {
    return internal(this).movie
  }
  getCharge() {
    let thisAmount = 0
    switch (this.getMovie().getPriceCode()) {
      case Movie.REGULAR:
        thisAmount += 2
        if (this.getDaysRented() > 2)
          thisAmount += (this.getDaysRented() - 2) * 1.5
        break
      case Movie.NEW_RELEASE:
        thisAmount += this.getDaysRented() * 3
        break
      case Movie.CHILDREN:
        thisAmount += 1.5
        if (this.getDaysRented() > 3)
          thisAmount += (this.getDaysRented() - 3) * 1.5
        break
    }
    return thisAmount
  }
  frequentRenterPoints() {
    if (
      this.getMovie().getPriceCode() == Movie.NEW_RELEASE &&
      this.getDaysRented() > 1
    ) {
      return 2
    }
    return 1
  }
}

module.exports = Rental
