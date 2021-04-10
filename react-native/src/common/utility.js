import React, { Component } from "react";
const apiUrl = "http://local.test.com/";
class Utility extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log("this is util constructor");
  }

  async makePostRequest(path, data) {
    // creates entity
    console.log("from utility fetch", path, data);
    response = await fetch(apiUrl + path, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(response.json());
    // .then((response) => response.json())
    // .then((response) => {
    //   console.log(response);
    //   return "abc";
    // })
    // .catch((err) => {
    //   console.log("error", err);
    // });
  }
}

export default Utility;
