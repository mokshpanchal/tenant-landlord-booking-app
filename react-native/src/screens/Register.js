import React, { Component } from "react";
import { Text, View, TextInput, Image } from "react-native";
class Register extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
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
            placeholder="Email"
            placeholderTextColor="#00716F"
            style={{ paddingHorizontal: 10 }}
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
            placeholder="Password"
            placeholderTextColor="#00716F"
            style={{
              paddingHorizontal: 10,
            }}
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
            style={{
              color: "#FFF",
              fontFamily: "SemiBold",
            }}
          >
            Register
          </Text>
        </View>
        <Text
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
    );
  }
}

export default Register;
