import React, { Component } from "react";
const apiUrl = "http://local.test.com/";
class Utility extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log("this is util constructor");
  }
  makePostRequest(path, data) {
    // creates entity
    console.log("from utility fetch", path, data);
    // fetch(apiUrl + path, {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //     accept: "application/json",
    //   },
    //   body: JSON.stringify({
    //     name: this.state.name,
    //     notes: this.state.notes,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }
}

export default Utility;
