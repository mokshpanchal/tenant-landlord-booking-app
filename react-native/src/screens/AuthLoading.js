import React, { Component } from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import Utility from "../common/utility";

class AuthLoading extends Component {
  utility;
  constructor(props) {
    super(props);
    this.utility = new Utility();
  }
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const user = this.utility.getValue("user").then((user) => {
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.

      this.props.navigation.navigate(user ? "App" : "Auth");
    });
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthLoading;
