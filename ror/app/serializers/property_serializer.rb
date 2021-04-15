class PropertySerializer < ActiveModel::Serializer
  attributes :id, :user_id, :name, :address_1, :address_2, :email, :contact, :post_code, :latitude, :longitude, :neighbourhood, :location, :image_url, :rented_date, :is_searchable, :status, :for_rent, :for_sell, :created_at
  has_one :property_type, serializer: PropertyTypeSerializer
  has_many :property_attachments, serializer: PropertyAttachmentSerializer
  has_one :rent_detail, serializer: RentDetailSerializer

  def created_at
  	# object.created_at.to_date
  	diff = (Date.today - object.created_at.to_date).to_i
  	if (diff<=30)
  		days = diff
  		return "#{days} Days"
  	elsif (diff>30 && diff<=365)
  		months = diff/30 + ((diff.to_f%30)/10)
  		return "#{months} Months"
  	elsif (diff>365)
  		return "More than 1 year"
 		end
  end
end
