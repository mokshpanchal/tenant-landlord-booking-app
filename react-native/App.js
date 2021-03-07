import React, { Component } from "react";
import AppNavigator from "./src/navigations/Navigator";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

export default class App extends Component {
  state = {
    isFontLoaded: false,
  };
  async _cacheResourcesAsync() {
    await Font.loadAsync({
      SemiBold: require("./src/fonts/Montserrat-SemiBold.otf"),
      Medium: require("./src/fonts/Montserrat-Medium.otf"),
      Regular: require("./src/fonts/Montserrat-Regular.otf"),
    });
  }
  render() {
    return this.state.isFontLoaded === true ? (
      <AppNavigator />
    ) : (
      <AppLoading
        startAsync={this._cacheResourcesAsync}
        onFinish={() => this.setState({ isFontLoaded: true })}
        onError={console.warn}
      />
    );
  }
}
