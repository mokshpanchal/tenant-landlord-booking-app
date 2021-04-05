class SiteUploader < CarrierWave::Uploader::Base
  
  def extension_allowlist
    %w(jpg jpeg gif png)
  end

  def store_dir
    'public/sites'
  end
end