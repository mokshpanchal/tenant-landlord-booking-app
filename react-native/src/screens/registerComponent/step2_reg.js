import React, { useState, Component } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  Button,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { ImageBrowser } from "expo-image-picker-multiple";

// =====================STYLE_SHEET===========================
const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 0,
    marginTop: 15,
    paddingHorizontal: 10,
    // borderColor: "#5694ca",
    borderRadius: 23,
    paddingVertical: 2,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 3 },
    height: 40,
    shadowRadius: 1,
    overflow: "hidden",
    elevation: 4,
    color: "#000",
    backgroundColor: "#fff",
  },

  viewOne: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 55,
    marginTop: 15,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 23,
    paddingVertical: 2,
    zIndex: 1,
  },

  radioText: {
    fontSize: 15,
    fontFamily: "SemiBold",
    textAlign: "center",
    justifyContent: "center",
    marginTop: 10,
    marginHorizontal: 55,
  },
  radio: {
    fontSize: 15,
    fontFamily: "SemiBold",
    textAlign: "center",
    justifyContent: "center",
    color: "#5694ca",
    marginHorizontal: 20,
  },
});
// =====================STYLE_SHEET===========================

class RegisterStep2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
    };
  }
  renderImage(item, i) {
    return (
      <Image
        style={{ height: 100, width: 100 }}
        source={{ uri: item.uri }}
        key={i}
      />
    );
  }
  componentDidUpdate() {
    const { params } = this.props.route;
    if (params) {
      const { photos } = params;
      if (photos) this.setState({ photos });
      delete params.photos;
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <>
          <Button
            title="Open image browser"
            onPress={() => {
              navigate("Buffer");
            }}
          />
          <ScrollView>
            {this.state.photos.map((item, i) => this.renderImage(item, i))}
          </ScrollView>
        </>
      </ScrollView>
    );
  }
}

export default RegisterStep2;
