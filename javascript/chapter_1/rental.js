const { Movie } = require('./movie')
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
    return internal(this).movie.getCharge(this.getDaysRented())
  }

  frequentRenterPoints() {
    return internal(this).movie.frequentRenterPoints(this.getDaysRented())
  }
}

module.exports = Rental
