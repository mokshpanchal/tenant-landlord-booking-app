import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  ViewBase,
} from "react-native";

// =====================STYLE_SHEET===========================
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexGrow: 1,
    flex: 1,
  },
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
    color: "#5694ca"
  },
  radio: {
    fontSize: 15,
    fontFamily: "SemiBold",
    textAlign: "right",
    color: "#5694ca",
    marginHorizontal: 20,
  },
});
// =====================STYLE_SHEET===========================

class RegisterStep4 extends Component {
  state = {};
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  render() {
    return (
      <ScrollView>
        <View style={{display: "flex", flexDirection: "row", marginTop: 20, marginLeft: 10,}}>
        <Text style={styles.radioText}>Is apartment?</Text>
        {this.props.apartmentOptions.map((data, key) => {
          return (
            <View key={key} style={styles.radio}>
              {this.props.formdata?.apartment == data.value ? (
                <TouchableOpacity accessible={true}>
                  <Image
                    style={{ height: 20, width: 20 }}
                    source={require("../../../assets/selected-radio.png")}
                  />
                  <Text
                    style={{
                      fontFamily: "SemiBold",
                      fontSize: 15,
                      color: "#5694ca",
                    }}
                  >
                    {data?.label}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  accessible={true}
                  onPress={() =>
                    this.props.changeText(
                      "apartment",
                      data?.value,
                      "formFourData"
                    )
                  }
                >
                  <Image
                    style={{ height: 20, width: 20 }}
                    source={require("../../../assets/unselected-radio.png")}
                  />
                  <Text
                    style={{
                      fontFamily: "SemiBold",
                      fontSize: 15,
                      color: "#5694ca",
                    }}
                  >
                    {data?.label}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
        </View>
        <View style={styles.view}>
          <TextInput
            placeholder="Bedrooms"
            keyboardType="phone-pad"
            placeholderTextColor="#5694ca"
            style={{ paddingHorizontal: 10, width: "100%" }}
            onChangeText={(bedrooms) =>
              this.props.changeText("bedroom_count", bedrooms, "formFourData")
            }
          />
        </View>
        <View style={styles.view}>
          <TextInput
            placeholder="Bathrooms"
            keyboardType="phone-pad"
            placeholderTextColor="#5694ca"
            style={{ paddingHorizontal: 10, width: "100%" }}
            onChangeText={(bathrooms) =>
              this.props.changeText("bathroom_count", bathrooms, "formFourData")
            }
          />
        </View>
        <View style={styles.view}>
          <TextInput
            placeholder="Floor number"
            keyboardType="phone-pad"
            placeholderTextColor="#5694ca"
            style={{ paddingHorizontal: 10, width: "100%" }}
            onChangeText={(floorNumber) =>
              this.props.changeText("floor_no", floorNumber, "formFourData")
            }
          />
        </View>
        <View style={styles.view}>
          <TextInput
            placeholder="House Area"
            keyboardType="phone-pad"
            placeholderTextColor="#5694ca"
            style={{ paddingHorizontal: 10, width: "100%" }}
            onChangeText={(houseArea) =>
              this.props.changeText("house_area", houseArea, "formFourData")
            }
          />
        </View>
        <View style={{display: "flex", flexDirection: "row", marginTop: 20, marginLeft: 10, }}>
        <Text style={styles.radioText}>Lift available?</Text>
        {this.props.liftOptions.map((data, key) => {
          return (
            <View key={key} style={styles.radio}>
              {this.props.formdata?.lift == data.value ? (
                <TouchableOpacity accessible={true}>
                  <Image
                    style={{ height: 20, width: 20 }}
                    source={require("../../../assets/selected-radio.png")}
                  />
                  <Text
                    style={{
                      fontFamily: "SemiBold",
                      fontSize: 15,
                      color: "#5694ca",
                    }}
                  >
                    {data?.label}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  accessible={true}
                  onPress={() =>
                    this.props.changeText("lift", data?.value, "formFourData")
                  }
                >
                  <Image
                    style={{ height: 20, width: 20 }}
                    source={require("../../../assets/unselected-radio.png")}
                  />
                  <Text
                    style={{
                      fontFamily: "SemiBold",
                      fontSize: 15,
                      color: "#5694ca",
                    }}
                  >
                    {data?.label}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
        </View>
        <View style={{display: "flex", flexDirection: "row", marginTop: 20, marginLeft: 10, }}>
        <Text style={styles.radioText}>Own Garage?</Text>
        {this.props.garageOptions.map((data, key) => {
          return (
            <View key={key} style={styles.radio}>
              {this.props.formdata?.garage == data.value ? (
                <TouchableOpacity accessible={true}>
                  <Image
                    style={{ height: 20, width: 20 }}
                    source={require("../../../assets/selected-radio.png")}
                  />
                  <Text
                    style={{
                      fontFamily: "SemiBold",
                      fontSize: 15,
                      color: "#5694ca",
                    }}
                  >
                    {data?.label}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  accessible={true}
                  onPress={() =>
                    this.props.changeText("garage", data?.value, "formFourData")
                  }
                >
                  <Image
                    style={{ height: 20, width: 20 }}
                    source={require("../../../assets/unselected-radio.png")}
                  />
                  <Text
                    style={{
                      fontFamily: "SemiBold",
                      fontSize: 15,
                      color: "#5694ca",
                    }}
                  >
                    {data?.label}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
        </View>
        <View style={{display: "flex", flexDirection: "row", marginTop: 20, marginLeft: 10, }}>
        <Text style={styles.radioText}>Pets allowed?</Text>
        {this.props.petOptions.map((data, key) => {
          return (
            <View key={key} style={styles.radio}>
              {this.props.formdata?.pet_friendly == data.value ? (
                <TouchableOpacity accessible={true}>
                  <Image
                    style={{ height: 20, width: 20 }}
                    source={require("../../../assets/selected-radio.png")}
                  />
                  <Text
                    style={{
                      fontFamily: "SemiBold",
                      fontSize: 15,
                      color: "#5694ca",
                    }}
                  >
                    {data?.label}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  accessible={true}
                  onPress={() =>
                    this.props.changeText(
                      "pet_friendly",
                      data?.value,
                      "formFourData"
                    )
                  }
                >
                  <Image
                    style={{ height: 20, width: 20 }}
                    source={require("../../../assets/unselected-radio.png")}
                  />
                  <Text
                    style={{
                      fontFamily: "SemiBold",
                      fontSize: 15,
                      color: "#5694ca",
                    }}
                  >
                    {data?.label}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
        </View>
      </ScrollView>
    );
  }
}

export default RegisterStep4;
