class ReservedSlot < ApplicationRecord
  belongs_to :property
  belongs_to :user

  validate :is_occupied, on: :create

  def is_occupied
  	if(ReservedSlot.pluck(:slot_id).sort.include? self.slot_id)
  		errors.add(:slot_id, "is not available")
  	end
  end
end
