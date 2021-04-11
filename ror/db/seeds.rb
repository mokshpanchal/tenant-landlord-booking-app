# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# SEED 1

User.create!(name: "Pankti Patel", email: "pankti@gmail.com", password: "Pankti@123", phone_number: "+918160123456", role: "buyer")
User.create!(name: "Aditi Patel", email: "aditi@gmail.com", password: "Aditi@123", phone_number: "+91816078901", role: "buyer")
User.create!(name: "Krishna Parmar", email: "krishna@gmail.com", password: "Krishna@123", phone_number: "+918160098765", role: "seller")
User.create!(name: "Moksh Panchal", email: "moksh@gmail.com", password: "Moksh@123", phone_number: "+918160864310", role: "seller")
User.create!(name: "Jaini Patel", email: "jaini@gmail.com", password: "Jaini@123", phone_number: "+918160321654", role: "seller")
User.create!(name: "Mamta Desai", email: "mamta@gmail.com", password: "Mamta@123", phone_number: "+918160671231", role: "seller")


Verification.create!(user_id: 3, is_verified: 0, name: "Krishna Parmar")
Verification.create!(user_id: 4, is_verified: 0, name: "Moksh Panchal")
Verification.create!(user_id: 5, is_verified: 0, name: "Jaini Patel")
Verification.create!(user_id: 6, is_verified: 0, name: "Mamta Desai")

PropertyType.create!(category: "house")
PropertyType.create!(category: "shop")
PropertyType.create!(category: "office")


 Property.create!(user_id: 3, name: "Patel's House", address_1: "A-10 Krishna Soc", address_2: "Ranip, Ahmedabad", post_code: "382400", latitude: "23.0810", longitude: "72.5768", location: "Gujarat", status: "available", for_rent: "false", for_sell: "true", property_type_id: 1, email: "krishna@gmail.com", contact: "+918160098765")

 Property.create!(user_id: 4, name: "K showroom", address_1: "A-10 Shiv Arcade", address_2: "Ghatlodia, Ahmedabad", post_code: "382450", latitude: "23.1234", longitude: "72.8765", location: "Gujarat", status: "available", for_rent: "true", for_sell: "true", property_type_id: 2, email: "moksh@gmail.com", contact: "+918160864310")

  Property.create!(user_id: 5, name: "Mark Office", address_1: "GF-10 Business hub", address_2: "Sola, Ahmedabad", post_code: "380016", latitude: "23.1234", longitude: "72.8765", location: "Gujarat", status: "available", for_rent: "false", for_sell: "true", property_type_id: 2, email: "jaini@gmail.com", contact: "+918160321654")

  Property.create!(user_id: 6, name: " New Shop", address_1: "GF-10 market place", address_2: "Vadodara", post_code: "390009", latitude: "22.2563", longitude: "73.2162", location: "Gujarat", status: "available", for_rent: "false", for_sell: "true", property_type_id: 2, email: "mamta@gmail.com", contact: "+918160671231")

  ReservedSlot.create!(property_id: 1, user_id: 1, slot_id: 1, recipient_id: 3)
  ReservedSlot.create!(property_id: 2, user_id: 2, slot_id: 13, recipient_id: 4)
  ReservedSlot.create!(property_id: 3, user_id: 1, slot_id: 25, recipient_id: 5)
  ReservedSlot.create!(property_id: 4, user_id: 2, slot_id: 37, recipient_id: 6)

 Amenity.create!(property_id: 1, bedroom_count: 0, bathroom_count: 2, house_area: "1000ft", floor_no: "2", lift: 0, pet_friendly: 0, garage: 0, apartment: 0, free_when: DateTime.now)
 Amenity.create!(property_id: 2, bedroom_count: 0, bathroom_count: 1, house_area: "3000ft", floor_no: "0", lift: 1, pet_friendly: 1, garage: 1, apartment: 1, free_when: DateTime.now)
 Amenity.create!(property_id: 3, bedroom_count: 0, bathroom_count: 1, house_area: "2000ft", floor_no: "0", lift: 1, pet_friendly: 1, garage: 1, apartment: 1, free_when: DateTime.now)
 Amenity.create!(property_id: 3, bedroom_count: 0, bathroom_count: 1, house_area: "2000ft", floor_no: "0", lift: 1, pet_friendly: 1, garage: 1, apartment: 1, free_when: DateTime.now)

 RentDetail.create!(property_id: 2, state_of_property: :untouched, contract_intial_length: 6, break_clause: 10000, security_deposite: 5000, rent_per_month: 50000, percent_increase: 0.1, members: 4)