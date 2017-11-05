require_relative './price'

class Movie
  @CHILDRENS = 2
  @REGULAR = 0
  @NEW_RELEASE = 1

  class << self
    attr_accessor :CHILDRENS, :REGULAR, :NEW_RELEASE
  end

  attr_reader :title, :price

  def initialize(title, code)
    @title = title
    set_price(code)
  end

  def price_code
    price.code
  end

  def set_price(code)
    @price = case code
            when Movie.CHILDRENS
              ChildrenPrice
            when Movie.NEW_RELEASE
              NewReleasePrice
            when Movie.REGULAR
              RegularPrice
            end.new
  end

  def charge(days_rented)
    price.get_charge(days_rented)
  end

  def points(days_rented)
    price.get_points(days_rented)
  end
end

class Rental
  attr_reader :movie, :days_rented
  def initialize(movie, days_rented)
    @movie = movie
    @days_rented = days_rented
  end

  def get_charge
    movie.charge(days_rented)
  end

  def get_points
    movie.points(
      days_rented)
  end
end

class Customer
  attr_reader :name, :rentals

  def initialize(name)
    @name = name
    @rentals = []
  end

  def add_rental(rental)
    rentals << rental
  end

  def statement
    result = "Rental Record for #{name} \n"

    rentals.each do |each|    
      result += "\t#{each.movie.title}\t#{each.get_charge}\n"
    end

    result += "Amount owed is #{get_total_charge}\n"
    result += "You earned #{get_rental_points} frequent renter points"
    result
  end

  def html_statement
    result = "<h1>Rental Record for <em>#{name}</em></h1>\n"
    
    rentals.each do |each|    
      result += "<p>#{each.movie.title}: #{each.get_charge}</p>\n"
    end

    result + "<p>You owe #{get_total_charge} and earned #{get_rental_points} frequent renter points</p>\n"
  end

  def get_total_charge
    rentals.reduce(0) do |total, rental|
      total + rental.get_charge
    end
  end

  def get_rental_points
    rentals.reduce(0) do |total, rental|
      total + rental.get_points
    end
  end
end
