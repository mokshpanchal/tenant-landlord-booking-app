import React, { Component } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
const styles = StyleSheet.create({
  footer: {
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: "#000",
    shadowRadius: 20,
    overflow: "hidden",
    shadowOpacity: 1,
    shadowOffset:{width:0, height: 0},
    elevation: 10,
    color: "#000",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    position: "relative",
    bottom: 0,
    backgroundColor: "#FFF"
  },
});
class Footer extends Component {
  state = {};
  render() {
    const { navigate } = this.props.navigation;
    let screen = this.props.initialRouteName;
    let search_img = require("../../assets/search.png");
    let profile_img = require("../../assets/user.png");
    let book_img = require("../../assets/book.png");
    switch (screen) {
      case "home":
        search_img = require("../../assets/search_active.png");
        break;
      case "profile":
        profile_img = require("../../assets/user_active.png");
        break;
      case "property-list":
        book_img = require("../../assets/book_active.png");
        break;
    }
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          accessible={true}
          activeOpacity={0.5}
          onPress={() => this.props.pressEvent("home")}
        >
          <Image source={search_img} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>

        <TouchableOpacity
          accessible={true}
          activeOpacity={0.5}
          onPress={() => this.props.pressEvent("property-list")}
        >
          <Image source={book_img} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>
        <TouchableOpacity
          accessible={true}
          activeOpacity={0.5}
          onPress={() => this.props.pressEvent("profile")}
        >
          <Image source={profile_img} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default Footer;
