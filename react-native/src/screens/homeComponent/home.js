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
              default:
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
            <Text>
              Ahmedabad{"\n"}
              <Text style={{ fontSize: 12 }}>
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
            <Text>
              Surat{"\n"}
              <Text style={{ fontSize: 12 }}>
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
                source={require("../../../assets/1.jpg")}
                style={{ width: "50%", height: "100%", borderRadius: 15 }}
              />
            </TouchableOpacity>
            <Text>
              Baroda{"\n"}
              <Text style={{ fontSize: 12 }}>
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
                source={require("../../../assets/1.jpg")}
                style={{ width: "50%", height: "100%", borderRadius: 15 }}
              />
            </TouchableOpacity>
            <Text>
              Mehsana{"\n"}
              <Text style={{ fontSize: 12 }}>
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
