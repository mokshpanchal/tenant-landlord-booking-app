class CreateReservedSlots < ActiveRecord::Migration[6.1]
  def change
    create_table :reserved_slots do |t|
      t.references :property, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.references :slot, null: false, foreign_key: true
      t.references :recipient, null: false, index: true, foreign_key: { to_table: :users }
      t.timestamps
    end
  end
end
