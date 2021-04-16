import React, { Component } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
const apiUrl = "http://70d22f3e45fc.ngrok.io/";
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const amountRegex = /^\d+(\.\d{1,2})?$/;
const passLength = 5;
const invalidResponseRegex = /^[4-5][0-9][0-9]$/;
const stateList = ["Ahmedabad", "Surat", "Baroda"];
class Utility extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log("this is util constructor");
  }
  async setValue(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error("Storage set error ", e);
    }
  }
  getValue(key) {
    try {
      const value = AsyncStorage.getItem(key);
      return value;
    } catch (e) {
      console.error("Storage get error ", e);
    }
  }
  async removeValue(key) {
    try {
      const value = await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error("Storage remove item error ", e);
    }
  }
  async clearAllValues() {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error("Storage clear error ", e);
    }
  }
  validate(fieldType, fieldValue) {
    let isValid = false;
    switch (fieldType) {
      case "email": {
        isValid = emailRegex.test(fieldValue);
        break;
      }
      case "password": {
        isValid = fieldValue.length >= passLength;
        break;
      }
      case "amount": {
        isValid = amountRegex.test(fieldValue);
      }
    }
    return isValid;
  }
  async makePostRequest(path, data) {
    // creates entity
    try {
      console.log("inside make post funcc", path, data);
      const apiResponse = await fetch(apiUrl + path, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      let response = await apiResponse.json();

      if (invalidResponseRegex.test(apiResponse.status)) {
        let errors = Object.values(response.errors).join();
        console.log(errors);
        Alert.alert("Error Occured!", errors, [
          {
            text: "OK",
          },
        ]);
        return false;
      }
      console.log("make post", response);
      return response;
    } catch (error) {
      Alert.alert(
        "Error Occured!",
        "Error occured while registering, please try again later!",
        [
          {
            text: "OK",
          },
        ]
      );
    }
  }
  async makeGetRequest(path) {
    // get entity
    const response = await fetch(apiUrl + path, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  }
}

export default Utility;
