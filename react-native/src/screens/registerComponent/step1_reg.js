import React, { useState, Component, Fragment } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
class RegisterStep1 extends Component {
  state = {};
  render() {
    console.log("props ion step 1", this.props);
    return (
      <Fragment>
        {this.props.children}
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
            onChangeText={(name) => this.props.changeText("user_name", name)}
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
            onChangeText={(email) => this.props.changeText("user_email", email)}
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
            onChangeText={(phone) => this.props.changeText("user_phone", phone)}
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
              this.props.changeText("user_address", address)
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
          {this.props.formdata.userTypes.map((data, key) => {
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
                {this.props.formdata.currentUserRole == data?.id ? (
                  <TouchableOpacity
                    accessible={true}
                    style={{ flexDirection: "row" }}
                  >
                    <Image
                      style={{ height: 20, width: 15 }}
                      source={require("../../../assets/selected-radio.png")}
                    />
                    <Text style={{ fontFamily: "SemiBold", fontSize: 15 }}>
                      {data?.name}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    accessible={true}
                    onPress={() =>
                      this.props.pressEvent("currentUserRole", data?.id)
                    }
                    style={{ flexDirection: "row" }}
                  >
                    <Image
                      style={{ height: 15, width: 15 }}
                      source={require("../../../assets/unselected-radio.png")}
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
      </Fragment>
    );
  }
}

export default RegisterStep1;
