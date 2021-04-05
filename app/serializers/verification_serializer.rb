class VerificationSerializer < ActiveModel::Serializer
  attributes :id, :is_verified, :name, :user_id
end
