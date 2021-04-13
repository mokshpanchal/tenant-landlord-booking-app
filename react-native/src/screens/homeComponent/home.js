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
});
// =====================STYLE_SHEET===========================

class Home extends React.Component {
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
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            letterSpacing: 1.5,
            fontFamily: "Calibri",
          }}
        >
          Get the latest on covid-19 responses
        </Text>

        <Image
          source={require("../../../assets/home_back.jpg")}
          style={{
            width: "100%",
            height: "40%",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
        <View style={styles.main}>
          <View style={styles.property}>
            <Image
              source={require("../../../assets/1.jpg")}
              style={{ width: "50%", height: "100%", borderRadius: "15px" }}
            />
            <Text>Ahmedabad</Text>
          </View>
          <View style={styles.property}>
            <Image
              source={require("../../../assets/2.jpg")}
              style={{ width: "50%", height: "100%", borderRadius: "15px" }}
            />
            <Text>Surat</Text>
          </View>
        </View>

        <View style={styles.main}>
          <View style={styles.property}>
            <Image
              source={require("../../../assets/1.jpg")}
              style={{ width: "50%", height: "100%", borderRadius: "15px" }}
            />
            <Text>Ahmedabad</Text>
          </View>
          <View style={styles.property}>
            <Image
              source={require("../../../assets/2.jpg")}
              style={{ width: "50%", height: "100%", borderRadius: "15px" }}
            />
            <Text>Surat</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Home;
