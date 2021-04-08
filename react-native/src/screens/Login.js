import React, { useState, Component } from "react";
import { Text, View, Image, TextInput, Alert, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/Entypo";

// =====================STYLE_SHEET===========================
const styles = StyleSheet.create({
  view:{
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 0,
    marginTop: 15,
    paddingHorizontal: 10,
    // borderColor: "#5694ca",
    borderRadius: 23,
    paddingVertical: 2,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.7,
    shadowOffset: {width:0 ,height: 3},
    height: 40,
  },
});
// =====================STYLE_SHEET===========================

class Login extends Component {
  state = {
    isValidEmailId: false,
    isValidPassword: false,
    isFormSubmitted: false,
  };
  makeLogin() {
    this.setState({ isFormSubmitted: true });
    console.log("inside func");
    if (!(this.state.isValidEmailId && this.state.isValidPassword)) {
      console.log("I am fired");
      Alert.alert("Error Occured!", "Please enter correct email/password", [
        {
          text: "OK",
        },
      ]);
    }
  }
  render() {
    // console.log(this.state);
    const { navigate } = this.props.navigation;
    const checkValidEmailId = (value) => {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (this.state.isFormSubmitted) {
        if (reg.test(value.trim()) === true) {
          this.setState({ isValidEmailId: true });
        } else {
          this.setState({ isValidEmailId: false });
        }
      }
    };
    const checkValidPassword = (value) => {
      if (this.state.isFormSubmitted) {
        if (value.trim().length >= 5) {
          this.setState({ isValidPassword: true });
        } else {
          this.setState({ isValidPassword: false });
        }
      }
    };
    return (
      <View style={{ backgroundColor: "#FFF", height: "100%", flex: 1 }}>
        <Image
          source={require("../images/asset1.jpg")}
          style={{ width: "100%", height: "40%"}}
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
        <View style={styles.view} >
          <Icon name="mail-with-circle" color="#5694ca" size={24} />
          <TextInput
            style={{ paddingHorizontal: 10, paddingVertical: 2, width: "100%", }}
            onChangeText={(element) => checkValidEmailId(element)}
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
        <View style={styles.view} >
          <Icon name="key" color="#5694ca" size={24} />
          <TextInput
            secureTextEntry
            style={{ paddingHorizontal: 10, width: "100%", }}
            onChangeText={(value) => checkValidPassword(value)}
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
            shadowColor: '#000',
            shadowRadius: 5,
            shadowOpacity: 0.7,
            shadowOffset: {width:0 ,height: 3},
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
