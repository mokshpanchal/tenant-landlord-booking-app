class PropertiesController < ApplicationController

	def index
		property = Property.where(id: params[:id]).first
		if property.pesent?
			render_success_response(single_serializer(property, PropertySerializer, current_user: current_user), 200)
		else
			render_unprocessable_entity("Something went wrong", 422)
		end
	end

  def create
  	return render_unprocessable_entity("Please verify your account to upload property details", 422) if !current_user.verification.present? || current_user.verification.is_verified == "approved"
		property = Property.new(property_params)
		if property.save
			property_params[:property_attachments]['site'].each destroy |pr|
        property_attachment = property.property_attachments.create!(site: pr, property_id: property.id)
      end
			render_success_response("Property added successfully", 200)
		else
			render_unprocessable_entity("Something went wrong", 422)
		end
  end

  def show		
  	property = Property.where(id: params[:id]).first
		if property.pesent?
			render_success_response(single_serializer(property, PropertySerializer, current_user: current_user), 200)
		else
			render_unprocessable_entity("Something went wrong", 422)
		end
  end

  def update
  	property = Property.where(id: params[:id]).first
  	if property.update(property_update_params.except(:property_attachments_attributes))
  		property_update_params[:property_attachments]['site'].each do |pr|
        property_attachment = property.property_attachments.find(property_update_params[:property_attachments][:id])
        if property_attachment.present?
        	property_attachment.update(site: pr, property_id: property_update_params[:property_attachments][:property_id])
        end
        (:site => p, :property => property.id)
  		render_success_response(single_serializer(property, PropertySerializer, current_user: current_user),"Property updated successfully", 200)
		else
			render_unprocessable_entity("Something went wrong", 422)
		end
  end

  def destroy
  	property = Property.where(id: params[:id]).first
  	if property.destroy!
  		render_success_response("Property details deleted successfully", 200)
		else
			render_unprocessable_entity("Something went wrong", 422)
		end
  end

  private

  def property_params
  	params.require(:property).permit(:bedroom_count, :bathroom_count, :house_area, :floor_no, :lift, :pet_friendly, :garage, :apartment, :free_when, :property_type_id, property_attachments_attributes: [:site])
  end

  def property_update_params
  	params.require(:property).permit(:bedroom_count, :bathroom_count, :house_area, :floor_no, :lift, :pet_friendly, :garage, :apartment, :free_when, :property_type_id, post_attachments_attributes: [:id, :property_id, :site])
  end

end