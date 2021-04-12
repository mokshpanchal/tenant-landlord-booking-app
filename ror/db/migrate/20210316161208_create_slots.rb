class CreateSlots < ActiveRecord::Migration[6.1]
  def change
    create_table :slots do |t|
      t.references :property, null: false, foreign_key: true
      t.integer :time
      t.timestamps
    end
  end
end
