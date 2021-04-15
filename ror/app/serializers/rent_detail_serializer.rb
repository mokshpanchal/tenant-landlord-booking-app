class RentDetailSerializer < ActiveModel::Serializer
  attributes :id, :state_of_property, :contract_intial_length, :security_deposite, :rent_per_month,
  :percent_increase, :members
end
