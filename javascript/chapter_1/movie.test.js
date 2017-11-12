const {
  Movie,
  ChildrensPrice,
  NewReleasePrice,
  RegularPrice,
} = require('./movie')

test('can create a movie', () => {
  const firstMovie = new Movie('silence of the lambs', 2)
  expect(firstMovie.getTitle()).toBe('silence of the lambs')
  expect(firstMovie.getPriceCode()).toBeInstanceOf(ChildrensPrice)
})

test('can change set price code', () => {
  const firstMovie = new Movie('silence of the lambs', 2)
  const secondMovie = new Movie('freddy', 1)
  firstMovie.setPriceCode(0)
  expect(firstMovie.getPriceCode()).toBeInstanceOf(ChildrensPrice)
  expect(secondMovie.getPriceCode()).toBeInstanceOf(NewReleasePrice)
})
