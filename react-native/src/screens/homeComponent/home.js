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
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: "3%",
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

  button: {
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#fff",
    paddingVertical: 5,
    borderRadius: 23,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    width: "75%",
  },
});
// =====================STYLE_SHEET===========================

class Home extends React.Component {
  utility;

  state = {
    abdCount: 0,
    suratCount: 0,
    mehsanaCount: 0,
    barodaCount: 0,
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
      const apiResponse = this.utility
        .makeGetRequest("search?search=all")
        .then((resp) => {
          resp.map((value, key) => {
            switch (Object.keys(value)[0]) {
              case "Surat":
                this.setState({ suratCount: Object.values(value)[0] });
                break;
              case "Ahmedabad":
                this.setState({ abdCount: Object.values(value)[0] });

                break;
              case "Baroda":
                this.setState({ barodaCount: Object.values(value)[0] });

                break;
              case "Mehsana":
                this.setState({ mehsanaCount: Object.values(value)[0] });

                break;
            }
          });
          console.log("surat", this.suratCount);
        });
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
            // fontFamily: "Calibri",
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
        <View style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          marginTop: "30%",
          left: "5%",
          shadowColor: "#000",
          shadowRadius: 5,
          shadowOpacity: 0.7,
          shadowOffset: { width: 0, height: 3 },
          elevation: 4}}>
          <Text style={{color: "#fff", fontSize: 60, fontWeight: "bold"}}>Go</Text>
          <Text style={{color: "#fff", fontSize: 60, fontWeight: "bold"}}>Near</Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => {
                this.props.pressEvent("location=ahmedabad");
              }}><Text style={{fontFamily: "SemiBold",}}>Explore</Text></TouchableOpacity>
        </View>

        <View style={styles.main}>
          <View style={styles.property}>
            <TouchableOpacity
              style={styles.property}
              activeOpacity={1}
              onPress={() => {
                this.props.pressEvent("location=ahmedabad");
              }}
            >
              <Image
                source={require("../../../assets/1.jpg")}
                style={{ width: "50%", height: "100%", borderRadius: 15 }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                color: "#23b3d5",
                fontWeight: "bold",
                position: "absolute",
                marginLeft: "42%",
              }}
            >
              Ahmedabad{"\n"}
              <Text style={{ fontSize: 12, color: "#057a0f" }}>
                {this.state?.abdCount} properties
              </Text>
            </Text>
          </View>
          <View style={styles.property}>
            <TouchableOpacity
              style={styles.property}
              activeOpacity={1}
              onPress={() => {
                this.props.pressEvent("location=surat");
              }}
            >
              <Image
                source={require("../../../assets/2.jpg")}
                style={{ width: "50%", height: "100%", borderRadius: 15 }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                color: "#23b3d5",
                fontWeight: "bold",
                position: "absolute",
                marginLeft: "42%",
              }}
            >
              Surat{"\n"}
              <Text style={{ fontSize: 12, color: "#057a0f" }}>
                {this.state?.suratCount} properties
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.property}>
            <TouchableOpacity
              style={styles.property}
              activeOpacity={0.5}
              onPress={() => {
                this.props.pressEvent("location=baroda");
              }}
            >
              <Image
                source={require("../../../assets/3.jpg")}
                style={{ width: "50%", height: "100%", borderRadius: 15 }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                color: "#23b3d5",
                fontWeight: "bold",
                position: "absolute",
                marginLeft: "42%",
              }}
            >
              Baroda{"\n"}
              <Text style={{ fontSize: 12, color: "#057a0f" }}>
                {this.state?.barodaCount} properties
              </Text>
            </Text>
          </View>
          <View style={styles.property}>
            <TouchableOpacity
              style={styles.property}
              activeOpacity={0.5}
              onPress={() => {
                this.props.pressEvent("location=mehsana");
              }}
            >
              <Image
                source={require("../../../assets/4.jpg")}
                style={{ width: "50%", height: "100%", borderRadius: 15 }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                color: "#23b3d5",
                fontWeight: "bold",
                position: "absolute",
                marginLeft: "42%",
              }}
            >
              Mehsana{"\n"}
              <Text style={{ fontSize: 12, color: "#057a0f" }}>
                {this.state?.mehsanaCount} properties
              </Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Home;
