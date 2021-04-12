import React, { useState, Component } from "react";
import { Text, View, Image, TextInput, Alert, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/Entypo";
import Utility from "../../common/utility";

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    alignItems: "center",
    //   marginHorizontal: 55,
    borderWidth: 0,
    marginTop: 30,
    paddingHorizontal: 10,
    // borderColor: "#5694ca",
    borderRadius: 23,
    paddingVertical: 2,
    shadowColor: "#000",
    shadowRadius: 1,
    overflow: "hidden",
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    color: "#000",
    height: 40,
    backgroundColor: "#fff",
    position: "absolute",
    width: "90%",
    marginLeft: "5%",
  },
  property: {
    height: "70%",
    width: "70%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  
  main: {
    backgroundColor: "#fff",
    width: "100%",
    display: "flex",
    maxHeight: "20%",
    flex: 1,
    flexDirection: "row",
    marginTop: "5%",
  },

});
// =====================STYLE_SHEET===========================

class home extends React.Component {
  utility;
  state = {
    isValidEmailId: false,
    isValidPassword: false,
    isFormSubmitted: false,
    search: "",
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
    this.utility.makePostRequest("users/login", loginData);
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
    const { search } = this.state;

    const { navigate } = this.props.navigation;
    return (
      <View style={{ backgroundColor: "#FFF", height: "100%", flex: 1 }}>
        <Image
          source={require("../../../assets/home_back.jpg")}
          style={{ width: "100%", height: "40%" }}
        />
        <View style={styles.view}>
          <Icon name="magnifying-glass" color="#5694ca" size={24} />
          <TextInput
            placeholder="WHERE ARE YOU GOING?"
            placeholderTextColor="#5694ca"
            style={{
              paddingHorizontal: 10,
              width: "90%",
              height: "40px",
              marginLeft: "5%",
            }}
          />
        </View>
        <View style={styles.main}>
          <View style={styles.property}>
            <Image
              source={require("../../../assets/1.jpg")}
              style={{ width: "50%", height: "100%", borderRadius: "15px" }}
            />
            <Text>Ahmedabad</Text>
          </View>
          <View style={styles.property}>
            <Image
              source={require("../../../assets/2.jpg")}
              style={{ width: "50%", height: "100%", borderRadius: "15px" }}
            />
            <Text>Surat</Text>
          </View>
        </View>

        <View style={styles.main}>
          <View style={styles.property}>
            <Image
              source={require("../../../assets/1.jpg")}
              style={{ width: "50%", height: "100%", borderRadius: "15px" }}
            />
            <Text>Ahmedabad</Text>
          </View>
          <View style={styles.property}>
            <Image
              source={require("../../../assets/2.jpg")}
              style={{ width: "50%", height: "100%", borderRadius: "15px" }}
            />
            <Text>Surat</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default home;
