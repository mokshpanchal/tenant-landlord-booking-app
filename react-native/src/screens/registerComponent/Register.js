import React, { useState, Component, Fragment } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  Button,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import RegisterStep1 from "./step1_reg";
import RegisterStep2 from "./step2_reg";
import Utility from "../../common/utility";
import { auto } from "async";
// =====================STYLE_SHEET===========================
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexGrow: 1,
    flex: 1,
    overflow: "auto",
  },

  view: {
    backgroundColor: "#FFF",
    flexGrow: 1,
    height: "100%",
    flex: 1,
  },

  frontHead: {
    width: "100%",
    height: "30%",
  },

  mainText: {
    fontSize: 25,
    fontFamily: "SemiBold",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 10,
  },

  subText: {
    fontFamily: "Medium",
    marginHorizontal: 50,
    textAlign: "center",
    marginTop: 5,
    opacity: 0.4,
  },

  textBox: {
    color: "#5694ca",
    textAlign: "right",
    marginRight: "20%",
    fontFamily: "SemiBold",
  },
});
// =====================STYLE_SHEET===========================

class Register extends Component {
  utility;
  constructor(props) {
    super(props);
    this.utility = new Utility();
  }
  //https://www.pluralsight.com/guides/how-to-reference-a-function-in-another-component
  buildingPurpose = [
    { value: "1", label: "Rent" },
    { value: "2", label: "Sell" },
    { value: "3", label: "PG" },
  ];
  state = {
    userTypes: [
      { id: 1, name: "Buyer", value: "buyer" },
      { id: 2, name: "Seller", value: "seller" },
    ],
    formOneData: {},
    formTwoData: {},
    currentUserRole: 1,
    formStep: 1,
    isValidStepOne: false,
    isValidStepTwo: false,
  };
  handleText = (fieldname, fieldvalue, formType) => {
    let category = { ...this.state[formType] };
    category[fieldname] = fieldvalue.trim();
    this.setState({ [formType]: category });
  };
  handlePress = (fieldname, fieldvalue) => {
    if (fieldname != "formStep") {
      this.setState({ [fieldname]: fieldvalue });
      return;
    }
    switch (fieldvalue) {
      case 1:
        this.stepTwoValidation();
        if (this.isValidStepTwo) this.setState({ [fieldname]: fieldvalue });
        break;
      case 2:
        this.setState({ [fieldname]: fieldvalue });

        break;
    }
  };
  stepOneValidation() {
    let formFields = { ...this.state.formOneData };
    this.isValidStepOne =
      formFields["user_name"]?.length > 0 &&
      formFields["user_phone"]?.length > 0 &&
      this.utility.validate("email", formFields["user_email"]) &&
      this.utility.validate("password", formFields["user_password"]) &&
      this.utility.validate("password", formFields["user_cpassword"]);
  }
  stepTwoValidation() {
    let formFields = { ...this.state.formTwoData };
    this.isValidStepOne =
      formFields["user_name"]?.length > 0 &&
      formFields["user_phone"]?.length > 0 &&
      this.utility.validate("email", formFields["user_email"]);
  }
  isBuyer() {
    return this.state.currentUserRole === 1;
  }
  isSeller() {
    return this.state.currentUserRole === 2;
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.view}>
          <Image
            source={require("../../images/asset1.jpg")}
            style={styles.frontHead}
          />
          <Text style={styles.mainText}> Tenant Landlord Booking </Text>
          <Text style={styles.subText}>
            “Real Estate provides the highest returns, the greatest values, and
            the least risk.” –Armstrong Williams, entrepreneur
          </Text>
          {this.state.formStep == 1 ? (
            <RegisterStep1
              formdata={this.state}
              changeText={this.handleText}
              pressEvent={this.handlePress}
            />
          ) : (
            <RegisterStep2
              navigation={this.props.navigation}
              formdata={this.state}
              puposeList={this.buildingPurpose}
              changeText={this.handleText}
              pressEvent={this.handlePress}
            />
          )}
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
              height: 40,
              shadowRadius: 1,
              overflow: "hidden",
              elevation: 4,
              color: "#000",
              backgroundColor: "#fff",
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
              color: "#5694ca",
              textAlign: "center",
            }}
          >
            Already a member?
          </Text>
        </View>
      </ScrollView>
    );
  }

  register() {
    this.stepOneValidation();
    if (!this.isValidStepOne) return;
    const formData = this.state.formOneData;
    const loginData = {
      user: {
        name: formData.user_name,
        email: formData.user_email,
        password: formData.user_password,
        password_confirmation: formData.user_cpassword,
        phone_number: "+91" + formData.user_phone,
        role: this.isBuyer() ? "buyer" : "seller",
      },
    };
    console.log("is buyer", this.isBuyer());

    const apiResponse = this.utility
      .makePostRequest("users/signup", loginData)
      .then((resp) => {
        if (resp?.id) {
          this.utility.setValue("user", resp);
          if (this.isSeller()) {
            return this.handlePress("formStep", 2);
          }
          if (this.isBuyer()) this.props.navigation.navigate("Home");
        }
      });
    if (!apiResponse) {
      Alert.alert(
        "Error Occured!",
        "Error occured while registering, please try again later!",
        [
          {
            text: "OK",
          },
        ]
      );
      return false;
    }
    // console.log(this.util);
    // new Utility().makePostRequest("register", values);
  }
}
export default Register;
