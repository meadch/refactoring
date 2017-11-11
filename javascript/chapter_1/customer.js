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
    const rentals = internal(this).rentals
    let result = `Rental Record for ${this.getName()} \n`

    rentals.forEach(rental => {
      result += `\t ${rental.getMovie().getTitle()} \t ${rental.getCharge()} \n`
    })
    result += `Amount owed is: ${getTotalCharge(rentals.slice())}
    You earned ${getFrequentRenterPoints(
      rentals.slice()
    )} frequent renter points.`
    return result
  }
  htmlStatement() {
    const rentals = internal(this).rentals
    let result = `<h1>Rentals for <em> ${this.getName()} </em></h1>\n`

    rentals.forEach(rental => {
      result += `<p>${rental
        .getMovie()
        .getTitle()}: ${rental.getCharge()} </p>\n`
    })
    result += `<p>You owe <em>${getTotalCharge(rentals.slice())}</em></p>\n`
    result += `<p><You earned <em>${getFrequentRenterPoints(
      rentals.slice()
    )}</em> frequent renter points</p>`
    return result
  }
}

function getTotalCharge(rentals, result = 0) {
  if (rentals.length === 0) {
    return result
  }
  result += rentals.pop().getCharge()
  return getTotalCharge(rentals, result)
}

function getFrequentRenterPoints(rentals, result = 0) {
  if (rentals.length === 0) {
    return result
  }
  result += rentals.pop().frequentRenterPoints()
  return getFrequentRenterPoints(rentals, result)
}

module.exports = Customer
