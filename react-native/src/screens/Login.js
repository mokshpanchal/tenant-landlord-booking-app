import React, { useState, Component } from "react";
import { Text, View, Image, TextInput, Alert, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/Entypo";
import Utility from "../common/utility";
// =====================STYLE_SHEET===========================
const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 0,
    marginTop: 15,
    paddingHorizontal: 10,
    // borderColor: "#5694ca",
    borderRadius: 23,
    paddingVertical: 2,
    shadowColor: "#000",
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 3 },
    height: 40,
    shadowRadius: 1,
    overflow: "hidden",
    elevation: 4,
    color: "#000",
    backgroundColor: "#fff",
  },
});
// =====================STYLE_SHEET===========================

class Login extends Component {
  utility;
  state = {
    isValidEmailId: false,
    isValidPassword: false,
    isFormSubmitted: false,
  };
  constructor() {
    super();
    this.utility = new Utility();
  }
  makeLogin() {
    this.setState({ isFormSubmitted: true });
    if (!(this.state.isValidEmailId && this.state.isValidPassword)) {
      Alert.alert("Error Occured!", "Please enter correct email/password", [
        {
          text: "OK",
        },
      ]);
      return false;
    }
    const loginData = {
      user: {
        email: this.state.email,
        password: this.state.password,
      },
    };
    const response = this.utility
      .makePostRequest("users/login", loginData)
      .then((resp) => {
        if (resp?.id) {
          this.utility.setValue("user", resp).then((data) => {
            this.props.navigation.navigate("Home");
          });
        }
      });
  }
  checkValidEmailId = (value) => {
    value = value.trim();
    this.setState({ isValidEmailId: false });
    let isValid = this.utility.validate("email", value);
    if (isValid) {
      this.setState({ email: value, isValidEmailId: true });
    }
    return isValid;
  };
  checkValidPassword = (value) => {
    value = value.trim();
    this.setState({ isValidPassword: false });
    let isValid = this.utility.validate("password", value);
    if (isValid) {
      this.setState({ password: value, isValidPassword: true });
    }
    return isValid;
  };
  render() {
    const { navigate } = this.props.navigation;
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
        <View style={styles.view}>
          <Icon name="mail-with-circle" color="#5694ca" size={24} />
          <TextInput
            style={{ paddingHorizontal: 10, paddingVertical: 2, width: "100%" }}
            onChangeText={(element) => this.checkValidEmailId(element)}
          />
        </View>
        <Text
          style={{
            color: "red",
            alignSelf: "center",
          }}
        >
          {this.state.isFormSubmitted && !this.state.isValidEmailId
            ? "Enter valid email"
            : null}
        </Text>
        <View style={styles.view}>
          <Icon name="key" color="#5694ca" size={24} />
          <TextInput
            secureTextEntry
            style={{ paddingHorizontal: 10, width: "100%" }}
            onChangeText={(value) => this.checkValidPassword(value)}
          />
        </View>
        <Text
          style={{
            color: "red",
            alignSelf: "center",
          }}
        >
          {this.state.isFormSubmitted && !this.state.isValidPassword
            ? "Password must be atleast 5 characters long."
            : null}
        </Text>
        <View
          style={{
            marginHorizontal: 55,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
            backgroundColor: "#5694ca",
            paddingVertical: 10,
            borderRadius: 23,
            shadowColor: "#000",
            shadowRadius: 5,
            shadowOpacity: 0.7,
            shadowOffset: { width: 0, height: 3 },
            // width: 100,
            // marginLeft: "38vw"
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
            color: "#5694ca",
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
