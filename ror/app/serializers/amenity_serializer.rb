class AmenitySerializer < ActiveModel::Serializer
  attributes :id, :property_id, :bedroom_count, :bathroom_count, :house_area, :floor_no, :lift, :pet_friendly, :garage, :apartment, :free_when

  def free_when
  	return object.free_when.to_formatted_s(:rfc822)[0,16] if object.free_when.class == "ActiveSupport::TimeWithZone" 
  end

  def lift
  	return object.lift == 0 ? "Yes" : "No"
  end

  def pet_friendly
  	return object.pet_friendly == 0 ? "Yes" : "No"
  end

  def garage
  	return object.garage == 0 ? "Yes" : "No"
  end

  def apartment
  	return object.apartment == 0 ? "Yes" : "No"
  end
end
