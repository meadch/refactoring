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
      frequentRenterPoints += rental.frequentRenterPoints()
      result += `\t ${rental.getMovie().getTitle()} \t ${rental.getCharge()} \n`
      totalAmount += rental.getCharge()
    })
    result += `Amount owed is: ${totalAmount}
    You earned ${frequentRenterPoints} frequent renter points.`
    return result
  }
}

module.exports = Customer
