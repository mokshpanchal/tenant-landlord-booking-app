class RentDetail < ApplicationRecord
  belongs_to :property

  enum state_of_property: [:renewed, :untouched]

  validate :is_for_rent, on: :create

  def is_for_rent
  	errors.add("This property is not available for rent") unless self.property.for_rent
  end
end
