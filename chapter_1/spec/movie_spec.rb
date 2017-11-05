gem 'rspec'
require_relative '../movie'

describe Movie do
  before(:all) do
    @CHILDRENS = 2
    @REGULAR = 0
    @NEW_RELEASE = 1
  end

  it "can create a children's movie" do
    movie = Movie.new("Finding Nemo", @CHILDRENS)
    expect(movie.title).to eq("Finding Nemo")
    expect(movie.price_code).to eq(@CHILDRENS)
  end

  it "can create a regular movie" do
    movie = Movie.new("Forest Gump", @REGULAR)
    expect(movie.title).to eq("Forest Gump")
    expect(movie.price_code).to eq(@REGULAR)
  end

  it "can create a new release movie" do
    movie = Movie.new("Baby Driver", @NEW_RELEASE)
    expect(movie.title).to eq("Baby Driver")
    expect(movie.price_code).to eq(@NEW_RELEASE)
  end
end

describe Rental do
  before(:all) do
    @finding_nemo = Movie.new("Finding Nemo", Movie.CHILDRENS)
    @forest_gump = Movie.new("Forest Gump", Movie.REGULAR)
    @baby_driver = Movie.new("Baby Driver", Movie.NEW_RELEASE)
  end

  it "can create a rental" do
    rental = Rental.new(@finding_nemo, 3)
    expect(rental.movie).to eq(@finding_nemo)
    expect(rental.days_rented).to eq(3)
  end
end

describe Customer do
  before(:all) do
    @finding_nemo = Movie.new("Finding Nemo", Movie.CHILDRENS)
    @forest_gump = Movie.new("Forest Gump", Movie.REGULAR)
    @baby_driver = Movie.new("Baby Driver", Movie.NEW_RELEASE)
    
    @nemo_rental = Rental.new(@finding_nemo, 3)
  end

  it "can create a customer" do
    customer = Customer.new("Charlie")
    expect(customer.name).to eq("Charlie")
    expect(customer.rentals.any?).to eq(false)
  end

  
  it "can add a rental" do
    @customer = Customer.new("Charlie")
    @customer.add_rental(@nemo_rental)
    expect(@customer.rentals.length).to eq(1)
    rental = @customer.rentals.shift
    expect(rental.movie).to eq(@finding_nemo)
    expect(rental.days_rented).to eq(3)
  end
  
  describe "statements" do
    before(:each) do
      @customer = Customer.new("Charlie")

      @nemo_rental = Rental.new(@finding_nemo, 4)
      @forest_gump_rental = Rental.new(@forest_gump, 6)
      @baby_driver_rental = Rental.new(@baby_driver, 1)
    end

    it "can print a statement with a single rental" do
      @customer.add_rental(@nemo_rental)
      statement = @customer.statement
      expect(statement).to eq(
        "Rental Record for Charlie \n\tFinding Nemo\t3.0\nAmount owed is 3.0\nYou earned 1 frequent renter points"
        )
    end

    it "can print a statement with a multiple rentals" do
      @customer.add_rental(@nemo_rental)
      @customer.add_rental(@forest_gump_rental)
      @customer.add_rental(@baby_driver_rental)

      statement = @customer.statement
      expect(statement).to eq(
        "Rental Record for Charlie \n\tFinding Nemo\t3.0\n\tForest Gump\t8.0\n\tBaby Driver\t3.0\nAmount owed is 14.0\nYou earned 3 frequent renter points"
        )
    end
  end
end