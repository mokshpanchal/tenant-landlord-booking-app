class PropertyTypesController < ApplicationController
  include ResourceRenderer
	def index
		property_types = PropertyType.all
		if property_types.pesent?
			render_success_response(array_serializer.new(property_types, PropertyTypeSerializer, current_user: current_user), 200)
		else
			render_unprocessable_entity("Something went wrong", 422)
		end
	end

  # def create
  # end

  # def show		
  # end

  # def update
  # end

  # def destroy
  # end

  private


end
