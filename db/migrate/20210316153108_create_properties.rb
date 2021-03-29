class CreateProperties < ActiveRecord::Migration[6.1]
  def change
    create_table :properties do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name
    	t.string :address_1
    	t.string :address_2
    	t.string :email
    	t.string :contact
    	t.string :post_code
    	t.float :latitude
    	t.float :longitude
    	t.string :neighbourhood
    	t.string :location
    	t.string :image_url
    	t.datetime :rented_date
    	t.integer :is_searchable
    	t.integer :status
    	t.integer :for_rent
    	t.integer :for_sell
      t.timestamps
    end
  end
end
