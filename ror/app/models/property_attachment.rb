class PropertyAttachment < ApplicationRecord
  belongs_to :property
  mount_base64_uploader :site, SiteUploader
end
