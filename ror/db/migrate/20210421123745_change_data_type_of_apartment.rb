class ChangeDataTypeOfApartment < ActiveRecord::Migration[6.1]
  def change
  	change_column :amenities, :apartment, :integer, default: 0
  end
end
