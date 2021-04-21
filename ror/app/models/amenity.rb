class Amenity < ApplicationRecord
  belongs_to :property
  validate :is_exists, on: :create
  validate :add_free_when, on: :create
  def is_exists
  	if Amenity.pluck(:property_id).sort.include? self.property_id
  		errors.add(:property_id, "Amenities already added")
  	end
  end

  def add_free_when
  	self.free_When = self.property.created_at
  	self.save!
  end
end
