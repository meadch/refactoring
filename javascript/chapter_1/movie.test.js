const Movie = require('./movie')

test('can create a movie', () => {
  const firstMovie = new Movie('silence of the lambs', 2)
  expect(firstMovie.getTitle()).toBe('silence of the lambs')
  expect(firstMovie.getPriceCode()).toBe(2)
})

test('can change set price code', () => {
  const secondMovie = new Movie('freddy', 1)
  const firstMovie = new Movie('silence of the lambs', 2)
  firstMovie.setPriceCode(0)
  expect(firstMovie.getPriceCode()).toBe(0)
  expect(secondMovie.getPriceCode()).toBe(1)
})
