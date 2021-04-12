class PropertyAttachment < ApplicationRecord
  belongs_to :property
  mount_uploader :site, SiteUploader
end
