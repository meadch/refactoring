const Customer = require('./customer')
const Movie = require('./movie')
const Rental = require('./rental')

const secondMovie = new Movie('freddy', 1)
const firstMovie = new Movie('silence of the lambs', 0)
const kidsMovie = new Movie('Finding Nemo', 2)
const kidsMovie2 = new Movie('Finding Nemo 2', 2)

const firstRental = new Rental(firstMovie, 2)
const secondRental = new Rental(secondMovie, 4)
const kidsMovieRental = new Rental(kidsMovie, 3)
const kidsMovieRental2 = new Rental(kidsMovie2, 7)

test('can create a create a customer', () => {
  const customer = new Customer('bob')
  expect(customer.getName()).toBe('bob')
})

test('customers can rent movies and get a proper receipt', () => {
  const customer = new Customer('bob')
  customer.addRental(firstRental)
  customer.addRental(secondRental)
  customer.addRental(kidsMovieRental)
  customer.addRental(kidsMovieRental2)
  expect(customer.statement()).toMatchSnapshot()
})
