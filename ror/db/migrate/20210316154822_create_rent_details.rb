class CreateRentDetails < ActiveRecord::Migration[6.1]
  def change
    create_table :rent_details do |t|
      t.references :property, null: false, foreign_key: true
      t.integer :state_of_property
      t.integer :contract_intial_length
      t.integer :break_clause
      t.integer :security_deposite
      t.integer :period_split
      t.integer :rent_per_month
      t.float :percent_increase
      t.timestamps
    end
  end
end
