class Amenity < ApplicationRecord
  belongs_to :property
  validate :is_exists, on: :create
  
  def is_exists
  	if Amenity.pluck(:property_id).sort.include? self.property_id
  		errors.add(:property_id, "Amenities already added")
  	end
  end
end
