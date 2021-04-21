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
import RegisterStep4 from "./step4_reg";
import AssetImage from "./AssetImage";

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
  isValidStepOne = false;
  isValidStepTwo = false;
  isValidStepThree = false;
  isValidStepFour = false;
  buildingPurpose = [
    { value: "1", label: "Rent" },
    { value: "2", label: "Sell" },
    { value: "3", label: "PG" },
  ];
  apartment = [
    { value: "true", label: "Yes" },
    { value: "false", label: "No" },
  ];
  petFriendly = [
    { value: "true", label: "Yes" },
    { value: "false", label: "No" },
  ];
  garage = [
    { value: "true", label: "Yes" },
    { value: "false", label: "No" },
  ];
  liftFacility = [
    { value: "true", label: "Yes" },
    { value: "false", label: "No" },
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
    formOneErrors: {},
    formTwoData: {},
    formTwoErrors: {},
    formThreeData: {},
    formThreeErrors: {},
    formFourData: {
      apartment: "true",
      lift: "true",
      garage: "true",
      pet_friendly: "true",
    },
    formFourErrors: {},
    user: {},
    property: {},
    currentUserRole: 1,
    currentPropertyType: 1,
    currentPropertyStatus: "untouched",
    formStep: 1,
    openImage: false,
    site: [],
    photos: [],
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
      case 3:
      case 4:
        this.setState({ [fieldname]: fieldvalue });
        break;
    }
  };
  handleImagePicker = (modal = false, images = []) => {
    if (!modal && images.length) {
      let siteImages = [];
      let photoUrls = [];
      images.map((image) => {
        siteImages.push(image.base64Url);
        photoUrls.push(image.uri);
      });
      this.setState({ site: siteImages, photos: photoUrls });
      this.handleText("imageSelected", images.length.toString(), "formTwoData");
    }
    this.setState({ openImage: modal });
  };
  stepOneValidation() {
    let formFields = { ...this.state.formOneData };
    let errorKey = {
      user_name_error: "",
      user_phone_error: "",
      email_error: "",
      password_error: "",
      cpassword_error: "",
    };
    this.isValidStepOne = true;
    if (!formFields["user_name"]?.length) {
      this.isValidStepOne = false;
      errorKey["user_name_error"] = "Name can not be empty.";
    }
    if (!formFields["user_phone"]?.length) {
      this.isValidStepOne = false;
      errorKey["user_phone_error"] = "Phone can not be empty.";
    }
    if (!this.utility.validate("email", formFields["user_email"])) {
      this.isValidStepOne = false;
      errorKey["email_error"] = "Email is not valid.";
    }
    if (!this.utility.validate("password", formFields["user_password"])) {
      this.isValidStepOne = false;
      errorKey["password_error"] = "Password is not valid.";
    }
    if (!this.utility.validate("password", formFields["user_cpassword"])) {
      this.isValidStepOne = false;
      errorKey["cpassword_error"] = "Confirm Password is not valid.";
    }
    if (
      formFields["user_password"] &&
      formFields["user_cpassword"] &&
      formFields["user_password"] !== formFields["user_cpassword"]
    ) {
      this.isValidStepOne = false;
      errorKey["cpassword_error"] +=
        "Password and Confirm password do not match.";
    }
    this.setState({ formOneErrors: errorKey });
  }
  stepTwoValidation() {
    let formFields = { ...this.state.formTwoData };
    let errorKey = {
      building_name_error: "",
      address1_error: "",
      zipcode_error: "",
      state_error: "",
      purpose_error: "",
      image_error: "",
    };
    this.isValidStepTwo = true;
    if (!formFields["user_building_name"]?.length) {
      this.isValidStepTwo = false;
      errorKey["building_name_error"] = "Building name can not be empty.";
    }
    if (!formFields["user_building_address1"]?.length) {
      this.isValidStepTwo = false;
      errorKey["address1_error"] = "Address Line 1 can not be empty.";
    }
    if (!this.utility.validate("zipcode", formFields["user_zipcode"])) {
      this.isValidStepTwo = false;
      errorKey["zipcode_error"] = "Zipcode is not valid";
    }
    if (!formFields["stateItem"]?.length) {
      this.isValidStepTwo = false;
      errorKey["state_error"] = "Please select city.";
    }
    if (!formFields["purpose"]) {
      this.isValidStepTwo = false;
      errorKey["purpose_error"] = "Please select purpose.";
    }
    if (!formFields["imageSelected"]) {
      this.isValidStepTwo = false;
      errorKey["image_error"] = "Please select atlease one image.";
    }
    this.setState({ formTwoErrors: errorKey });
  }
  stepThreeValidation() {
    let formFields = { ...this.state.formThreeData };
    let errorKey = {
      deposit_error: "",
      rent_error: "",
      percent_error: "",
      member_error: "",
    };
    this.isValidStepThree = true;
    if (!this.utility.validate("amount", formFields["security_deposit"])) {
      this.isValidStepThree = false;
      errorKey["deposit_error"] = "Deposit amount is not valid.";
    }
    if (!this.utility.validate("amount", formFields["monthly_rent"])) {
      this.isValidStepThree = false;
      errorKey["rent_error"] = "Monthly Rent is not valid.";
    }
    if (!this.utility.validate("amount", formFields["percent_increase"])) {
      this.isValidStepThree = false;
      errorKey["percent_error"] = "Increase Percentage is not valid.";
    }
    if (!formFields["member_space"]) {
      this.isValidStepThree = false;
      errorKey["member_error"] = "Atlease one member space is required.";
    }
    this.setState({ formThreeErrors: errorKey });
  }
  stepFourValidation() {
    let formFields = { ...this.state.formFourData };
    let errorKey = {
      bedroom_error: "",
      bathroom_error: "",
      house_area_error: "",
      floor_error: "",
    };
    this.isValidStepFour = true;
    if (!formFields["bedroom_count"]) {
      this.isValidStepFour = false;
      errorKey["bedroom_error"] = "Please enter valid number of bedrooms.";
    }
    if (!formFields["bathroom_count"]) {
      this.isValidStepFour = false;
      errorKey["bathroom_error"] = "Please enter valid number of bathrooms.";
    }
    if (!formFields["house_area"]) {
      this.isValidStepFour = false;
      errorKey["house_area_error"] = "House area is not valid.";
    }
    if (!formFields["floor_no"]) {
      this.isValidStepFour = false;
      errorKey["floor_error"] = "Floor number is not valid.";
    }
    this.setState({ formFourErrors: errorKey });
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
  showStep() {
    let renderForm = "";
    let buttonItem = "";
    switch (this.state.formStep) {
      case 1:
        renderForm = (
          <RegisterStep1
            formdata={this.state}
            changeText={this.handleText}
            pressEvent={this.handlePress}
            formErrors={this.state.formOneErrors}
          />
        );
        buttonItem = (
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
        );
        break;
      case 2:
        renderForm = (
          <RegisterStep2
            navigation={this.props.navigation}
            formdata={this.state.formTwoData}
            formErrors={this.state.formTwoErrors}
            propertyTypes={this.state.propertyTypes}
            currentUserRole={this.state.currentUserRole}
            puposeList={this.buildingPurpose}
            stateList={this.stateList}
            changeText={this.handleText}
            pressEvent={this.handlePress}
            openImage={this.handleImagePicker}
            currentPropertyType={this.state.currentPropertyType}
          />
        );
        buttonItem = (
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
        );
        break;
      case 3:
        renderForm = (
          <RegisterStep3
            navigation={this.props.navigation}
            formdata={this.state}
            formErrors={this.state.formThreeErrors}
            stateList={this.stateList}
            changeText={this.handleText}
            pressEvent={this.handlePress}
          />
        );
        buttonItem = (
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
        );
        break;
      case 4:
        renderForm = (
          <RegisterStep4
            formdata={this.state.formFourData}
            formErrors={this.state.formFourErrors}
            changeText={this.handleText}
            pressEvent={this.handlePress}
            apartmentOptions={this.apartment}
            liftOptions={this.liftFacility}
            garageOptions={this.garage}
            petOptions={this.petFriendly}
          />
        );
        buttonItem = (
          <Text
            textBreakStrategy="simple"
            style={{
              color: "#FFF",
              fontFamily: "SemiBold",
            }}
            onPress={() => this.setAmenities()}
          >
            Set Amenities
          </Text>
        );
        break;
    }
    let buttoncode = (
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
          marginBottom: 10,
        }}
      >
        <Text>{buttonItem}</Text>
      </View>
    );
    return (
      <Fragment>
        {renderForm}
        {buttoncode}
      </Fragment>
    );
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.state.openImage ? (
          <AssetImage openImage={this.handleImagePicker} />
        ) : (
          <View style={styles.view}>
            <Image
              source={require("../../images/asset1.jpg")}
              style={styles.frontHead}
            />
            <Text style={styles.mainText}> Tenant Landlord Booking </Text>
            <Text style={styles.subText}>
              {this.isBuyer() ? "Buyer" : "Seller"} Registration
            </Text>
            {this.showStep()}

            {this.state.formStep == 1 ? (
              <Text
                textBreakStrategy="simple"
                onPress={() => navigate("Login")}
                style={{
                  color: "#5694ca",
                  textAlign: "center",
                  paddingBottom: 10,
                }}
              >
                Already a member?
              </Text>
            ) : null}
          </View>
        )}
      </ScrollView>
    );
  }

  register() {
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
          user_id: data?.id,
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
          property_attachments_attributes: { site: this.state.site[0] },
        },
      };
      const apiResponse = this.utility
        .makePostRequest("properties", propertyData)
        .then((resp) => {
          if (resp?.success) {
            this.setState({ property: resp.data });
            let formStep = this.forSellPurpose() ? 4 : 3;

            return this.handlePress("formStep", formStep);
          }
        });
    });
  }
  setRentDetail() {
    this.stepThreeValidation();
    if (!this.state.property) return false;
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
    const apiResponse = this.utility
      .makePostRequest("rent_details", rentData)
      .then((resp) => {
        if (resp?.success) {
          this.setState({ rent_detail: resp.data });
          return this.handlePress("formStep", 4);
        }
      });
  }

  setAmenities() {
    this.stepFourValidation();
    if (!this.isValidStepFour) return false;
    if (!this.state.property) return false;
    const formData = this.state.formFourData;
    const amenity_detail = {
      amenity: {
        bedroom_count: parseInt(formData.bedroom_count),
        bathroom_count: parseInt(formData.bathroom_count),
        house_area: formData.house_area + "ft",
        floor_no: parseInt(formData.floor_no),
        lift: formData.lift,
        pet_friendly: formData.pet_friendly,
        garage: formData.garage,
        apartment: formData.apartment,
        property_id: this.state.property.id,
      },
    };
    const apiResponse = this.utility
      .makePostRequest("amenities", amenity_detail)
      .then((resp) => {
        if (resp?.success) {
          this.setState({ amenity_detail: resp.data });
          return this.props.navigation.navigate("Dashboard");
        }
      });
  }
}
export default Register;
