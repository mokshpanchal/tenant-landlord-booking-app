import React, { useState, Component } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
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
// =====================STYLE_SHEET===========================

class detail extends React.Component {
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
      this.setState({ user: user });
      console.log("user in profile", user);
    });
  }

  render() {
    const { search } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <View style={{ backgroundColor: "#FFF", height: "100%", flex: 1 }}>
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigate("Home")}
          >
            <Image
              source={require("../../../assets/search.png")}
              style={{ width: "50px", height: "50px" }}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigate("")}>
            <Image
              source={require("../../../assets/book_active.png")}
              style={{ width: "50px", height: "50px" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigate("Profile")}
          >
            <Image
              source={require("../../../assets/user.png")}
              style={{ width: "50px", height: "50px" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default detail;
