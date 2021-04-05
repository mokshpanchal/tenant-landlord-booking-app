class SlotsController < ApplicationController

	def index
		amenity = Amenity.where(property_id: params[:id]).first
		if amenity.pesent?
			render_success_response(single_serializer(amenity, AmenitySerializer, current_user: current_user), 200)
		else
			render_unprocessable_entity("Something went wrong", 422)
		end
	end

  def create
		amenity = Amenity.new(amenity_params)
		if aminity.save
			render_success_response("Aminities added successfully", 200)
		else
			render_unprocessable_entity("Something went wrong", 422)
		end
  end

  def show		
  	amenity = Amenity.where(property_id: params[:id]).first
		if amenity.pesent?
			render_success_response(single_serializer(amenity, AmenitySerializer, current_user: current_user), 200)
		else
			render_unprocessable_entity("Something went wrong", 422)
		end
  end

  def update
  	amenity = Amenity.where(property_id: params[:id]).first
  	if amenity.update(amenity_update_params)
  		render_success_response(single_serializer(amenity, AmenitySerializer, current_user: current_user),"Amenities updated successfully", 200)
		else
			render_unprocessable_entity("Something went wrong", 422)
		end
  end

  def destroy
  	amenity = Amenity.where(property_id: params[:id]).first
  	if amenity.destroy!
  		render_success_response("Amenities details deleted successfully", 200)
		else
			render_unprocessable_entity("Something went wrong", 422)
		end
  end

  private

  def amenity_params
  	params.require(:amenity).permit(:bedroom_count, :bathroom_count, :house_area, :floor_no, :lift, :pet_friendly, :garage, :apartment, :free_when, :property_id)
  end

  def amenity_update_params
  	params.require(:amenity).permit(:bedroom_count, :bathroom_count, :house_area, :floor_no, :lift, :pet_friendly, :garage, :apartment, :free_when)
  end
end
