import React, { Component } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
const styles = StyleSheet.create({
  footer: {
    minHeight: "40",
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: "#000",
    shadowRadius: 2,
    overflow: "hidden",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: -3 },
    elevation: 4,
    color: "#000",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
  },
});
class Footer extends Component {
  state = {};
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => this.props.pressEvent("home")}
        >
          <Image
            source={require("../../assets/search_active.png")}
            style={{ width: "50px", height: "50px" }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => this.props.pressEvent("property-list")}
        >
          <Image
            source={require("../../assets/book.png")}
            style={{ width: "50px", height: "50px" }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => this.props.pressEvent("profile")}
        >
          <Image
            source={require("../../assets/user.png")}
            style={{ width: "50px", height: "50px" }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default Footer;
