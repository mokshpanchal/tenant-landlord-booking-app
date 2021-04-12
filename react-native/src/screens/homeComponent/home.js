import React, { useState, Component } from "react";
import { Text, View, Image, TextInput, Alert, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/Entypo";
import Utility from "../../common/utility";

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    alignItems: "center",
    //   marginHorizontal: 55,
    borderWidth: 0,
    marginTop: 30,
    paddingHorizontal: 10,
    // borderColor: "#5694ca",
    borderRadius: 23,
    paddingVertical: 2,
    shadowColor: "#000",
    shadowRadius: 1,
    overflow: "hidden",
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    color: "#000",
    height: 40,
    backgroundColor: "#fff",
    position: "absolute",
    width: "90%",
    marginLeft: "5%",
  },
  property: {
    height: "70%",
    width: "70%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  main: {
    backgroundColor: "#fff",
    width: "70%",
    display: "flex",
    maxHeight: "20%",
    flex: 1,
    flexDirection: "row",
    marginTop: "5%",
  },

  footer: {
    minHeight: "10%",
  },
});
// =====================STYLE_SHEET===========================

class home extends React.Component {
  utility;
  state = {
    user: {},
    search: "",
  };

  constructor() {
    super();
    this.utility = new Utility();
  }
  componentDidMount() {
    this.utility.getValue("user").then((user) => {
      this.setState({ user: JSON.parse(user) });
      console.log("user in home", JSON.parse(user));
    });
  }
  render() {
    const { search } = this.state;

    const { navigate } = this.props.navigation;
    return (
      <View style={{ backgroundColor: "#FFF", height: "100%", flex: 1 }}>
        <Text>here {this.state.user.id}</Text>
      </View>
    );
  }
}

export default home;
