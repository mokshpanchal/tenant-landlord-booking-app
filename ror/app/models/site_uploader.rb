class SiteUploader < CarrierWave::Uploader::Base
  
  def extension_allowlist
    %w(jpg jpeg gif png)
  end

  def store_dir
    # 'public/sites'
		"public/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"    
  end
end