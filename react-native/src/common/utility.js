import React, { Component } from "react";
import AsyncStorage from "@react-native-community/async-storage";
const apiUrl = "http://6050b4ced0e8.ngrok.io/";
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passLength = 5;
const invalidResponseRegex = /^[4-5][0-9][0-9]$/;
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
  async getValue(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return JSON.parse(value);
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

      if (invalidResponseRegex.test(apiResponse.status))
        console.log("Error: ", response.error);

      console.log("make post", response);
      return response;
    } catch (error) {}
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
