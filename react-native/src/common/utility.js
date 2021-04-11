import React, { Component } from "react";
const apiUrl = "http://73bfceaa722c.ngrok.io/";
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passLength = 5;

class Utility extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log("this is util constructor");
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
    console.log("from utility fetch", path, data);
    const response = await fetch(apiUrl + path, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  }
  async makeGetRequest(path, data) {
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
