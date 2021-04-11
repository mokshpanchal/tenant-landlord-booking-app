class ReservedSlotsController < ApplicationController
	include ResourceRenderer
	def index
		reserved_slot = ReservedSlot.where(property_id: params[:id]).first
		if reserved_slot.pesent?
			render_success_response(single_serializer(reserved_slot, AmenitySerializer, current_user: current_user), 200)
		else
			render_unprocessable_entity("Something went wrong", 422)
		end
	end

  def create
		reserved_slot = ReservedSlot.new(reserved_slot_params)
		if reserved_slot.save
			render_success_response("Slot has been reserved", 200)
		else
			render_unprocessable_entity("Something went wrong", 422)
		end
  end

  def show		
  	reserved_slot = ReservedSlot.where(property_id: params[:id]).first
		if reserved_slot.pesent?
			render_success_response(single_serializer(reserved_slot, AmenitySerializer, current_user: current_user), 200)
		else
			render_unprocessable_entity("Something went wrong", 422)
		end
  end

  def update
  	reserved_slot = ReservedSlot.where(property_id: params[:id]).first
  	if reserved_slot.update(reserved_slot_update_params)
  		render_success_response(single_serializer(reserved_slot, AmenitySerializer, current_user: current_user),"Reserved slot updated successfully", 200)
		else
			render_unprocessable_entity("Something went wrong", 422)
		end
  end

  def destroy
  	reserved_slot = ReservedSlot.where(property_id: params[:id]).first
  	if reserved_slot.destroy!
  		render_success_response("Reserved slot removed successfully", 200)
		else
			render_unprocessable_entity("Something went wrong", 422)
		end
  end

  private

  def reserved_slot_params
  	params.require(:reserved_slot).permit(:user_id, :recipient_id, :slot_id, :property_id)
  end

  def reserved_slot_update_params
  	params.require(:reserved_slot).permit(:user_id, :recipient_id, :slot_id)
  end

end