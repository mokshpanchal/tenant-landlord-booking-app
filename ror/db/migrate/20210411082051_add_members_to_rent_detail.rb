class AddMembersToRentDetail < ActiveRecord::Migration[6.1]
  def change
  	add_column :rent_details, :members, :integer
  end
end
