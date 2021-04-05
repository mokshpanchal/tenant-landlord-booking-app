class Verification < ApplicationRecord
  belongs_to :user
  has_one_attached :photo_id_proof

  validate :check_file_type, if: :photo_id_proof_attached
  enum is_verified: ["approved", "pending", "declined"]

  def check_file_type
  	if photo_id_proof.content_type.in?(%w(application/pdf image/png image/jpg image/jpeg))
  		return true
  	else
  		errors.add(:photo_id_proof, "Must be a PDF/JPG/PNG file")
  	end
  end

  def photo_id_proof_attached
  	photo_id_proof.attched?
  end
end
