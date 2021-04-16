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
import RegisterStep3 from "./step3_reg";
import Utility from "../../common/utility";
// =====================STYLE_SHEET===========================
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexGrow: 1,
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
  stateList;
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
  stateList = [
    { value: "AHMEDABAD", label: "Ahmedabad" },
    { value: "SURAT", label: "Surat" },
    { value: "BARODA", label: "Baroda" },
    { value: "MEHSANA", label: "Mehsana" },
  ];
  state = {
    userTypes: [
      { id: 1, name: "Buyer", value: "buyer" },
      { id: 2, name: "Seller", value: "seller" },
    ],
    propertyStatus: ["untouched", "renewed"],
    propertyTypes: [
      { id: 1, name: "House" },
      { id: 2, name: "Shop" },
      { id: 3, name: "Office" },
    ],
    contractLength: [6, 12],
    selectedContractLength: 6,
    formOneData: {},
    formTwoData: {},
    formThreeData: {},
    user: {},
    property: {},
    currentUserRole: 1,
    currentPropertyType: 1,
    currentPropertyStatus: "untouched",
    formStep: 1,
    isValidStepOne: false,
    isValidStepTwo: false,
    isValidStepThree: false,
  };
  handleText = (fieldname, fieldvalue, formType) => {
    if (!fieldvalue) return;
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
      this.utility.validate("password", formFields["user_cpassword"]) &&
      formFields["user_password"] === formFields["user_cpassword"];
  }
  stepTwoValidation() {
    let formFields = { ...this.state.formTwoData };
    console.log("second step form fields", formFields);
    this.isValidStepTwo =
      formFields["user_building_name"]?.length > 0 &&
      formFields["user_building_address1"]?.length > 0 &&
      formFields["user_zipcode"]?.length > 0 &&
      formFields["stateItem"]?.length > 0 &&
      formFields["purpose"] > 0;
  }
  stepThreeValidation() {
    let formFields = { ...this.state.formThreeData };
    console.log("third step form fields", formFields);
    this.isValidStepThree =
      this.state.contractLength.includes(this.state.selectedContractLength) &&
      this.utility.validate("amount", formFields["security_deposit"]) &&
      this.utility.validate("amount", formFields["monthly_rent"]) &&
      this.utility.validate("amount", formFields["percent_increase"]) &&
      this.utility.validate("amount", formFields["percent_increase"]) &&
      formFields["member_space"] > 0;
    console.log("step 3 validation", this.isValidStepThree);
  }
  isBuyer() {
    return this.state.currentUserRole === 1;
  }
  isSeller() {
    return this.state.currentUserRole === 2;
  }
  forSellPurpose() {
    return this.state.formTwoData.purpose == 2;
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
          ) : this.state.property?.id ? (
            <RegisterStep3
              navigation={this.props.navigation}
              formdata={this.state}
              stateList={this.stateList}
              changeText={this.handleText}
              pressEvent={this.handlePress}
            />
          ) : (
            <RegisterStep2
              navigation={this.props.navigation}
              formdata={this.state}
              puposeList={this.buildingPurpose}
              stateList={this.stateList}
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
              backgroundColor: "#5694ca",
            }}
          >
            {this.state.property?.id ? (
              <Text
                textBreakStrategy="simple"
                style={{
                  color: "#FFF",
                  fontFamily: "SemiBold",
                }}
                onPress={() => this.setRentDetail()}
              >
                Set Rent Details
              </Text>
            ) : this.state.formStep == 1 ? (
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
            ) : (
              <Text
                textBreakStrategy="simple"
                style={{
                  color: "#FFF",
                  fontFamily: "SemiBold",
                }}
                onPress={() => this.createProperty()}
              >
                Create Property
              </Text>
            )}
          </View>
          {this.state.formStep == 1 ? (
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
          ) : null}
        </View>
      </ScrollView>
    );
  }

  register() {
    return this.handlePress("formStep", 2);
    this.stepOneValidation();
    if (!this.isValidStepOne) return;
    const formData = this.state.formOneData;
    const regData = {
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
    console.log(regData);
    const apiResponse = this.utility
      .makePostRequest("users/signup", regData)
      .then((resp) => {
        if (resp?.id) {
          this.utility.setValue("user", resp);
          if (this.isBuyer()) {
            return this.props.navigation.navigate("Dashboard");
          }
          return this.handlePress("formStep", 2);
        }
      });
  }
  createProperty() {
    this.utility.getValue("user").then((data) => {
      if (!data) return false;
      data = JSON.parse(data);
      this.stepTwoValidation();
      if (!this.isValidStepTwo) return false;
      const formData = this.state.formTwoData;
      const propertyData = {
        property: {
          user_id: data.id,
          name: formData.user_building_name,
          address_1: formData.user_building_address1,
          address_2: formData.user_building_address2
            ? formData.user_building_address2
            : "",
          post_code: formData.user_zipcode,
          location: formData.stateItem,
          status: "available",
          for_rent: (!this.forSellPurpose()).toString(),
          for_sell: this.forSellPurpose().toString(),
          property_type_id: this.state.currentPropertyType,
        },
      };
      console.log("prepared property data", propertyData);
      const apiResponse = this.utility
        .makePostRequest("properties", propertyData)
        .then((resp) => {
          console.log("response property", resp);
          if (resp?.success) {
            this.setState({ property: resp.data });
            if (this.forSellPurpose()) {
              return this.props.navigation.navigate("Dashboard");
            }
          }
        });
    });
  }
  setRentDetail() {
    this.stepThreeValidation();
    if (!this.isValidStepThree) return false;
    const formData = this.state.formThreeData;
    const rentData = {
      rent_detail: {
        state_of_property: this.state.currentPropertyStatus,
        contract_intial_length: this.state.selectedContractLength,
        security_deposite: formData.security_deposit,
        rent_per_month: formData.monthly_rent,
        percent_increase: formData.percent_increase,
        property_id: this.state.property.id,
        members: formData.member_space,
      },
    };
    console.log("prepared rent data", rentData);
    const apiResponse = this.utility
      .makePostRequest("rent_details", rentData)
      .then((resp) => {
        console.log("response property", resp);
        if (resp?.success) {
          return this.props.navigation.navigate("Dashboard");
        }
      });
  }
}
export default Register;
