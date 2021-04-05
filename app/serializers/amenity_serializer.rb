class AmenitySerializer < ActiveModel::Serializer
  attributes :id, :property_id, :bedroom_count, :bathroom_count, :house_area, :floor_no, :lift, :pet_friendly, :garagem, :apartment, :free_when
end
