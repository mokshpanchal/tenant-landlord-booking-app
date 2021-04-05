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

class RegisterStep2 extends Component {
  state = {};
  render() {
    return (
      <>
        {this.props.formdata.currentUserRole == 2 ? (
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
                  this.props.changeText("user_building_name", building_name)
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
                  this.props.changeText(
                    "user_building_address",
                    building_address
                  )
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
                items={this.props.puposeList}
                defaultIndex={0}
                containerStyle={{ width: 150, height: 40, marginLeft: 20 }}
                dropDownStyle={{ backgroundColor: "#fafafa" }}
                onChangeItem={(purpose) =>
                  this.props.changeText("purpose", purpose)
                }
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
                  this.props.changeText("user_zipcode", zipcode)
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
              this.props.changeText("user_password", password)
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
            onChangeText={(cpassword) =>
              this.props.changeText("user_cpassword", cpassword)
            }
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
            onPress={() => this.props.registerEvent(this.props.formdata)}
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
      </>
    );
  }
}

export default RegisterStep2;
