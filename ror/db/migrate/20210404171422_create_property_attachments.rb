class CreatePropertyAttachments < ActiveRecord::Migration[6.1]
  def change
    create_table :property_attachments do |t|
      t.string :site
      t.references :property, null: false, foreign_key: true

      t.timestamps
    end
  end
end
