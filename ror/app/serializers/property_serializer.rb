class PropertySerializer < ActiveModel::Serializer
  attributes :id, :user_id, :name, :address_1, :address_2, :email, :contact, :post_code, :latitude, :longitude, :neighbourhood, :location, :image_url, :rented_date, :is_searchable, :status, :for_rent, :for_sell
  has_one :property_type, serializer: PropertyTypeSerializer
  has_many :property_attachments, serializer: PropertyAttachmentSerializer
end
