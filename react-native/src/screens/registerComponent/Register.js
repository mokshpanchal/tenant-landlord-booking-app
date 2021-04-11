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
// =====================STYLE_SHEET===========================
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
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
      { id: 1, name: "Buyer" },
      { id: 2, name: "Seller" },
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
        this.stepOneValidation();
        if (this.isValidStepOne) this.setState({ [fieldname]: fieldvalue });
        break;
    }
    console.log("in parent handled radio", this.state);
  };
  stepOneValidation() {
    let formFields = { ...this.state.formOneData };
    this.isValidStepOne =
      formFields["user_name"]?.length > 0 &&
      formFields["user_phone"]?.length > 0 &&
      this.utility.validate("email", formFields["user_email"]);
  }
  stepTwoValidation() {
    let formFields = { ...this.state.formTwoData };
    this.isValidStepOne =
      formFields["user_name"]?.length > 0 &&
      formFields["user_phone"]?.length > 0 &&
      this.utility.validate("email", formFields["user_email"]);
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
          <Text style={styles.subText}>Step {this.state.formStep} of 2</Text>
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
              registerEvent={this.register}
            />
          )}

          {this.state.formStep == 1 ? (
            <Text
              textBreakStrategy="simple"
              style={styles.subText}
              disabled={true}
              onPress={() => this.handlePress("formStep", 2)}
            >
              Next
            </Text>
          ) : (
            <Text
              textBreakStrategy="simple"
              style={styles.subText}
              onPress={() => this.handlePress("formStep", 1)}
            >
              Previous
            </Text>
          )}
          <Text
            textBreakStrategy="simple"
            onPress={() => navigate("Login")}
            style={{
              color: "#5694ca",
            }}
          >
            Already a member?
          </Text>
        </View>
      </ScrollView>
    );
  }

  register(values) {
    console.log("from register");
    console.log(this.state, values);
    console.log(this.util);
    new Utility().makePostRequest("register", values);
  }
}

export default Register;
