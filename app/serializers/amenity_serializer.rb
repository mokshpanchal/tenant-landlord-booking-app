class AmenitySerializer < ActiveModel::Serializer
  attributes :id, :property_id, :bedroom_count, :bathroom_count, :house_area, :floor_no, :lift, :pet_friendly, :garage, :apartment, :free_when

  def free_when
  	return object.to_date
  end

  def lift
  	return object.lift == 0 ? "true" : "false"
  end

  def pet_friendly
  	return object.pet_friendly == 0 ? "true" : "false"
  end

  def garage
  	return object.garage == 0 ? "true" : "false"
  end

  def apartment
  	return object.apartment == 0 ? "true" : "false"
  end
end
