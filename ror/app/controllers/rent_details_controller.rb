class RentDetailsController < ApplicationController
	include ResourceRenderer
	def index
		rent_detail = RentDetail.where(property_id: params[:id]).first
		if rent_detail.pesent?
			render_success_response(single_serializer(rent_detail, RentDetailSerializer, current_user: current_user), 200)
		else
			render_unprocessable_entity("Something went wrong", 422)
		end
	end

  def create
		rent_detail = RentDetail.new(rent_detail_params)
		if rent_detail.save
			render_success_response("RentDetails added successfully", 200)
		else
			render_unprocessable_entity("Something went wrong", 422)
		end
  end

  def show		
  	rent_detail = RentDetail.where(property_id: params[:id]).first
		if rent_detail.pesent?
			render_success_response(single_serializer(rent_detail, RentDetailSerializer, current_user: current_user), 200)
		else
			render_unprocessable_entity("Something went wrong", 422)
		end
  end

  def update
  	rent_detail = RentDetail.where(property_id: params[:id]).first
  	if rent_detail.update(rent_detail_update_params)
  		render_success_response(single_serializer(rent_detail, RentDetailSerializer, current_user: current_user),"RentDetails updated successfully", 200)
		else
			render_unprocessable_entity("Something went wrong", 422)
		end
  end

  def destroy
  	rent_detail = RentDetail.where(property_id: params[:id]).first
  	if rent_detail.destroy!
  		render_success_response("RentDetails details deleted successfully", 200)
		else
			render_unprocessable_entity("Something went wrong", 422)
		end
  end

  private

  def rent_detail_params
  	params.require(:rent_detail).permit(:state_of_property, :contract_intial_length, :break_clause, :security_deposite, :period_split, :rent_per_month, :percent_increase, :property_id, :members)
  end

  def rent_detail_update_params
  	params.require(:rent_detail).permit(:state_of_property, :contract_intial_length, :break_clause, :security_deposite, :period_split, :rent_per_month, :percent_increase, :members)
  end
end
