import React, { useState, Component } from "react";
import { Text, View, Image, TextInput, Alert } from "react-native";
import Icon from "@expo/vector-icons/AntDesign";

class Login extends Component {
  state = {
    isValidEmailId: true,
    isValidPassword: true,
  };
  makeLogin() {
    if (!(this.state.isValidEmailId && this.state.isValidPassword)) {
      Alert.alert("Wrong Validation", "Please enter correct email/password", [
        {
          text: "OK",
        },
      ]);
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    const checkValidEmailId = (value) => {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(value.trim()) === true) {
        this.setState({ isValidEmailId: true });
      } else {
        this.setState({ isValidEmailId: false });
      }
    };
    const checkValidPassword = (value) => {
      if (value.trim().length >= 5) {
        this.setState({ isValidPassword: true });
      } else {
        this.setState({ isValidPassword: false });
      }
    };
    return (
      <View style={{ backgroundColor: "#FFF", height: "100%", flex: 1 }}>
        <Image
          source={require("../images/asset1.jpg")}
          style={{ width: "100%", height: "40%" }}
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
          Make yourself comfortable by becoming member of our app!
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
          <Icon name="mail" color="#00716F" size={24} />
          <TextInput
            style={{ paddingHorizontal: 10, paddingVertical: 2 }}
            onChangeText={(element) => checkValidEmailId(element)}
          />
        </View>
        <Text
          style={{
            color: "red",
            alignSelf: "center",
          }}
        >
          {this.state.isValidEmailId ? null : "Enter valid email"}
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
          <Icon name="lock" color="#00716F" size={24} />
          <TextInput
            secureTextEntry
            style={{ paddingHorizontal: 10 }}
            onChangeText={(value) => checkValidPassword(value)}
          />
        </View>
        <Text
          style={{
            color: "red",
            alignSelf: "center",
          }}
        >
          {this.state.isValidPassword
            ? null
            : "Password must be atleast 5 characters long."}
        </Text>
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
            onPress={() => this.makeLogin()}
            style={{
              color: "#FFF",
              fontFamily: "SemiBold",
            }}
          >
            Login
          </Text>
        </View>
        <Text
          onPress={() => navigate("Register")}
          style={{
            alignSelf: "center",
            color: "#00716F",
            fontFamily: "SemiBold",
            paddingVertical: 30,
          }}
        >
          New User?
        </Text>
      </View>
    );
  }
}

export default Login;
