// Explicit to this module
const Movie = require('./movie')
let map = new WeakMap()
let internal = function(object) {
  if (!map.has(object)) map.set(object, {})
  return map.get(object)
}

class Customer {
  constructor(name) {
    internal(this).name = name
    internal(this).rentals = []
    this.getName = this.getName.bind(this)
  }

  addRental(arg) {
    let rentals = internal(this).rentals
    rentals.push(arg)
    internal(this).rentals = rentals
  }
  getName() {
    return internal(this).name
  }
  statement() {
    let totalAmount = 0
    let frequentRenterPoints = 0
    const rentals = internal(this).rentals
    let result = `Rental Record for ${this.getName()} \n`

    rentals.forEach(rental => {
      let thisAmount = 0

      switch (rental.getMovie().getPriceCode()) {
        case Movie.REGULAR:
          thisAmount += 2
          if (rental.getDaysRented() > 2) {
            thisAmount += (rental.getDaysRented() - 2) * 1.5
          }
          break
        case Movie.NEW_RELEASE:
          thisAmount += rental.getDaysRented() * 3
          break
        case Movie.CHILDREN:
          thisAmount += 1.5
          if (rental.getDaysRented() > 3) {
            thisAmount += (rental.getDaysRented() - 3) * 1.5
          }
          break
        default:
          break
      }
      frequentRenterPoints++
      if (
        rental.getMovie().getPriceCode() == Movie.NEW_RELEASE &&
        rental.getDaysRented() > 1
      ) {
        frequentRenterPoints++
      }

      result += `\t ${rental.getMovie().getTitle()} \t ${thisAmount} + \n`
      totalAmount += thisAmount
    })
    result += `Amount owed is: ${totalAmount}
    You earned ${frequentRenterPoints} frequent renter points.`
    return result
  }
}

module.exports = Customer
