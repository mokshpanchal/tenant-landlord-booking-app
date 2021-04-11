class Property < ApplicationRecord
  belongs_to :user
  belongs_to :property_type
  has_many :property_attachments
  has_many :slots
  has_many :reserved_slots
  has_one :amenity
  has_one :rent_detail
  accepts_nested_attributes_for :property_attachments

  enum status: [:available, :occupied, :removed]
  enum for_rent: [:true, :false]
  enum for_sell: [:true, :false],  _prefix: :sell

  validates_presence_of :property_type_id, :name
  after_create :add_slots
  after_create :verified_seller
  after_create :add_phone_number
  after_create :add_email 

  def add_slots
  	for i in 0..11 do
  		Slot.create!(property_id: self.id, time: i)
  	end
  end

  def verified_seller
    Verification.create!(user_id: self.user_id, is_verified: 0, name: self.user.name) if self.user.role == "seller"
  end

  def add_phone_number
    self.update!(contact: self.user.phone_number) if self.user.phone_number
  end

  def add_email
    self.update!(email: self.user.email) if self.user.email
  end
end

