class Property < ApplicationRecord
  belongs_to :user
  has_one :property_type
  has_many :property_attachments
  accepts_nested_attributes_for :property_attachments
end

