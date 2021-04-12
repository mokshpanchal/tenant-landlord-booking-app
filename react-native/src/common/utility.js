import React, { Component } from "react";
import { ToastAndroid } from "react-native";
const apiUrl = "http://247eafb63aba.ngrok.io/";
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passLength = 5;
const invalidResponseRegex = /^[4-5][0-9][0-9]$/;
class Utility extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log("this is util constructor");
  }
  setValue(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getValue(key) {
    value = localStorage.getItem(key);
    return JSON.parse(value);
  }
  removeValue(key) {
    localStorage.removeItem(key);
  }
  clearAllValues() {
    localStorage.clear();
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
