import React, { Component } from "react";
import { Button, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Utility from "../common/utility";
class Apipath extends Component {
  state = { url: "" };
  utility;
  constructor() {
    super();
    this.utility = new Utility();
  }
  render() {
    const { navigate } = this.props.navigation;
    const proceedAction = () => {
      if (!this.state.url.length) return false;
      this.utility.setValue("api_url", this.state.url);
      return navigate("Login");
    };
    return (
      <View
        style={{
          fontSize: 25,
          fontFamily: "SemiBold",
          justifyContent: "center",
          textAlign: "center",
          marginTop: 10,
        }}
      >
        <TextInput
          style={{ paddingHorizontal: 10, paddingVertical: 2, width: "100%" }}
          onChangeText={(url) => this.setState({ url: url })}
          placeholder="Enter API url"
        ></TextInput>
        <Button title="Proceed" onPress={proceedAction}></Button>
      </View>
    );
  }
}

export default Apipath;
