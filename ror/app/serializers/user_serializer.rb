class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :phone_number, :role
  has_one :verification, serializer: VerificationSerializer

  def role
  	object.role
  end
  
  def verification
  	object.verification if object.verification.present?
  end
end
