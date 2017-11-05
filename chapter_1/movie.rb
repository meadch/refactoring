class Movie
  @CHILDRENS = 2
  @REGULAR = 0
  @NEW_RELEASE = 1

  class << self
    attr_accessor :CHILDRENS, :REGULAR, :NEW_RELEASE
  end

  attr_reader :title
  attr_accessor :price_code

  def initialize(title, price_code)
    @title = title
    @price_code = price_code
  end
end

class Rental
  attr_reader :movie, :days_rented
  def initialize(movie, days_rented)
    @movie = movie
    @days_rented = days_rented
  end

  def get_charge
    result = 0
    case movie.price_code
    when Movie.REGULAR
      result += 2.0
      if days_rented > 2
        result += (days_rented - 2) * 1.5
      end
    when Movie.NEW_RELEASE
      result += days_rented * 3.0
    when Movie.CHILDRENS
      result += 1.5
      if days_rented > 3
        result += (days_rented - 3) * 1.5
      end
    end
    result
  end

  def get_points
    if movie.price_code == Movie.NEW_RELEASE && days_rented > 1
      2
    else
      1
    end
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
