class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :phone_number, :role, :name, :created_at
  has_one :verification, serializer: VerificationSerializer

  def role
  	object.role
  end
  
  def verification
  	object.verification if object.verification.present?
  end

  def created_at
  	object.created_at.to_date
  end
end
