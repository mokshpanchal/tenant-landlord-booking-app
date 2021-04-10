class CreateAmenities < ActiveRecord::Migration[6.1]
  def change
    create_table :amenities do |t|
      t.references :property, null: false, foreign_key: true
      t.integer :bedroom_count
      t.float :bathroom_count
      t.string :house_area
      t.string :floor_no
      t.integer :lift
      t.integer :pet_friendly
      t.integer :garage
      t.string :apartment
      t.datetime :free_when
      t.timestamps
    end
  end
end
