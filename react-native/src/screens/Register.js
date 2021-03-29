import React, { useState, Component } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

class Register extends Component {
  buildingPurpose = [
    { value: "1", label: "Rent" },
    { value: "2", label: "Sell" },
    { value: "3", label: "PG" },
  ];
  state = {
    userTypes: [
      { id: 1, name: "Buyer" },
      { id: 2, name: "Seller" },
    ],
    currentUserRole: null,
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <View style={{ backgroundColor: "#FFF", height: "100%", flex: 1 }}>
          <Image
            source={require("../images/asset1.jpg")}
            style={{ width: "100%", height: "30%" }}
          />
          <Text
            style={{
              fontSize: 25,
              fontFamily: "SemiBold",
              justifyContent: "center",
              textAlign: "center",
              marginTop: 10,
            }}
          >
            Tenant Landlord Booking
          </Text>
          <Text
            style={{
              fontFamily: "Medium",
              marginHorizontal: 50,
              textAlign: "center",
              marginTop: 5,
              opacity: 0.4,
            }}
          >
            “Real Estate provides the highest returns, the greatest values, and
            the least risk.” –Armstrong Williams, entrepreneur
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 55,
              borderWidth: 2,
              marginTop: 15,
              paddingHorizontal: 10,
              borderColor: "#00716F",
              borderRadius: 23,
              paddingVertical: 2,
            }}
          >
            <TextInput
              placeholder="Name"
              placeholderTextColor="#00716F"
              style={{ paddingHorizontal: 10 }}
              onChangeText={(name) => this.setState({ user_name: name })}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 55,
              borderWidth: 2,
              marginTop: 15,
              paddingHorizontal: 10,
              borderColor: "#00716F",
              borderRadius: 23,
              paddingVertical: 2,
            }}
          >
            <TextInput
              placeholder="Email"
              placeholderTextColor="#00716F"
              style={{ paddingHorizontal: 10 }}
              onChangeText={(email) => this.setState({ user_email: email })}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 55,
              borderWidth: 2,
              marginTop: 15,
              paddingHorizontal: 10,
              borderColor: "#00716F",
              borderRadius: 23,
              paddingVertical: 2,
            }}
          >
            <TextInput
              placeholder="Phone"
              keyboardType="phone-pad"
              placeholderTextColor="#00716F"
              style={{ paddingHorizontal: 10 }}
              onChangeText={(phone) => this.setState({ user_phone: phone })}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 55,
              borderWidth: 2,
              marginTop: 15,
              paddingHorizontal: 10,
              borderColor: "#00716F",
              borderRadius: 23,
              paddingVertical: 2,
            }}
          >
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder="Your Address"
              placeholderTextColor="#00716F"
              style={{ paddingHorizontal: 10 }}
              onChangeText={(address) =>
                this.setState({ user_address: address })
              }
            />
          </View>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "SemiBold",
              textAlign: "center",
              justifyContent: "center",
              marginTop: 10,
              marginHorizontal: 55,
            }}
          >
            Are you?
            {this.state.userTypes.map((data, key) => {
              return (
                <View
                  key={key}
                  style={{
                    marginHorizontal: 55,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 10,
                    borderRadius: 23,
                    paddingLeft: 10,
                  }}
                >
                  {this.state.currentUserRole == data?.id ? (
                    <TouchableOpacity
                      accessible={true}
                      style={{ flexDirection: "row" }}
                    >
                      <Image
                        style={{ height: 20, width: 15 }}
                        source={require("../../assets/selected-radio.png")}
                      />
                      <Text style={{ fontFamily: "SemiBold", fontSize: 15 }}>
                        {data?.name}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      accessible={true}
                      onPress={() => {
                        this.setState({ currentUserRole: data?.id });
                      }}
                      style={{ flexDirection: "row" }}
                    >
                      <Image
                        style={{ height: 15, width: 15 }}
                        source={require("../../assets/unselected-radio.png")}
                      />
                      <Text style={{ fontFamily: "SemiBold", fontSize: 15 }}>
                        {data?.name}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </Text>
          {this.state.currentUserRole == 2 ? (
            <View style={{ zIndex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 55,
                  borderWidth: 2,
                  marginTop: 15,
                  paddingHorizontal: 10,
                  borderColor: "#00716F",
                  borderRadius: 23,
                  paddingVertical: 2,
                }}
              >
                <TextInput
                  placeholder="Building Name"
                  placeholderTextColor="#00716F"
                  style={{ paddingHorizontal: 10 }}
                  onChangeText={(building_name) =>
                    this.setState({ user_building_name: building_name })
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 55,
                  borderWidth: 2,
                  marginTop: 15,
                  paddingHorizontal: 10,
                  borderColor: "#00716F",
                  borderRadius: 23,
                  paddingVertical: 2,
                }}
              >
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  placeholder="Bulding Address"
                  placeholderTextColor="#00716F"
                  style={{ paddingHorizontal: 10 }}
                  onChangeText={(building_address) =>
                    this.setState({ user_building_address: building_address })
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginHorizontal: 55,
                  marginTop: 15,
                  paddingHorizontal: 10,
                  borderRadius: 23,
                  paddingVertical: 2,
                  zIndex: 1,
                }}
              >
                <Text>Purpose:</Text>
                <DropDownPicker
                  items={this.buildingPurpose}
                  defaultIndex={0}
                  containerStyle={{ width: 150, height: 40, marginLeft: 20 }}
                  dropDownStyle={{ backgroundColor: "#fafafa" }}
                  onChangeItem={(item) => {
                    console.log(item.label, item.value);
                    this.setState({ purpose: purpose });
                  }}
                  placeholder="Select Purpose"
                  activeLabelStyle={{ color: "green" }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 55,
                  borderWidth: 2,
                  marginTop: 15,
                  paddingHorizontal: 10,
                  borderColor: "#00716F",
                  borderRadius: 23,
                  paddingVertical: 2,
                }}
              >
                <TextInput
                  keyboardType="phone-pad"
                  placeholder="Zipcode"
                  placeholderTextColor="#00716F"
                  style={{ paddingHorizontal: 10 }}
                  onChangeText={(zipcode) =>
                    this.setState({ user_zipcode: zipcode })
                  }
                />
              </View>
            </View>
          ) : null}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 55,
              borderWidth: 2,
              marginTop: 15,
              paddingHorizontal: 10,
              borderColor: "#00716F",
              borderRadius: 23,
              paddingVertical: 2,
            }}
          >
            <TextInput
              secureTextEntry
              placeholder="Password"
              placeholderTextColor="#00716F"
              style={{
                paddingHorizontal: 10,
              }}
              onChangeText={(password) =>
                this.setState({ user_password: password })
              }
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 55,
              borderWidth: 2,
              marginTop: 15,
              paddingHorizontal: 10,
              borderColor: "#00716F",
              borderRadius: 23,
              paddingVertical: 2,
            }}
          >
            <TextInput
              secureTextEntry
              placeholder="Confirm Password"
              placeholderTextColor="#00716F"
              style={{ paddingHorizontal: 10 }}
            />
          </View>
          <View
            style={{
              marginHorizontal: 55,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
              backgroundColor: "#00716F",
              paddingVertical: 10,
              borderRadius: 23,
            }}
          >
            <Text
              textBreakStrategy="simple"
              style={{
                color: "#FFF",
                fontFamily: "SemiBold",
              }}
              onPress={() => this.register()}
            >
              Register
            </Text>
          </View>
          <Text
            textBreakStrategy="simple"
            onPress={() => navigate("Login")}
            style={{
              alignSelf: "center",
              color: "#00716F",
              fontFamily: "SemiBold",
              paddingVertical: 30,
            }}
          >
            Already a member?
          </Text>
        </View>
      </ScrollView>
    );
  }

  register() {
    console.log("from register");
    console.log(this.state);
  }
}

export default Register;
