class CreateVerifications < ActiveRecord::Migration[6.1]
  def change
    create_table :verifications do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :is_verified
      t.string :name
      t.timestamps
    end
  end
end
