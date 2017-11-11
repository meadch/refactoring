class Price
  attr_reader :code

  def get_charge(days_rented)
  end
  
  def get_points(days_rented)
    1
  end
end

class ChildrenPrice < Price
  def code
    Movie.CHILDRENS
  end

  def get_charge(days_rented)
    result = 1.5
    if days_rented > 3
      result += (days_rented - 3) * 1.5
    end
    result
  end

end

class NewReleasePrice < Price
  def code
    Movie.NEW_RELEASE
  end

  def get_charge(days_rented)
    days_rented * 3.0
  end
  
  def get_points(days_rented)
    (days_rented > 1) ? 2 : 1
  end
end

class RegularPrice < Price
  def code
    Movie.REGULAR
  end

  def get_charge(days_rented)
    result = 2.0
    if days_rented > 2
      result += (days_rented - 2) * 1.5
    end
    result
  end

end