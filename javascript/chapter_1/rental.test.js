const Rental = require('./rental')
const { Movie } = require('./movie')

test('can create a rental', () => {
  const firstMovie = new Movie('silence of the lambs', 2)
  const firstRental = new Rental(firstMovie, 2)
  expect(firstRental.getDaysRented()).toBe(2)
  expect(firstRental.getMovie().getTitle()).toBe('silence of the lambs')
})

test('will throw an error if a rental is not a movie', () => {
  try {
    const firstRental = new Rental('firstMovie', 2)
  } catch (err) {
    expect(err).toBeTruthy()
  }
})
