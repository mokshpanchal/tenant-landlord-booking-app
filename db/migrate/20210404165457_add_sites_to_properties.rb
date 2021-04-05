class AddSitesToProperties < ActiveRecord::Migration[6.1]
  def change
    add_column :properties, :sites, :string
  end
end
