class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :phone_number, :role
  has_one :verification, serializer: VerificationSerializer
end
