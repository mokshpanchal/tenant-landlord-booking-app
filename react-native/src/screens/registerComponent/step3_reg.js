import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

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

class RegisterStep3 extends Component {
  state = {};
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <>
          <View style={{ display: "flex", flexDirection: "row", margin: 20 }}>
            <Text style={styles.radioText}>Initial Contract Length:</Text>
            {this.props.formdata.contractLength.map((data, key) => {
              return (
                <View key={key} style={styles.radio}>
                  {this.props.formdata.selectedContractLength == data ? (
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
                        {data}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      accessible={true}
                      onPress={() =>
                        this.props.pressEvent("selectedContractLength", data)
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
                        {data}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>
          <View style={styles.view}>
            <TextInput
              placeholder="Security Deposite Money"
              keyboardType="phone-pad"
              placeholderTextColor="#5694ca"
              style={{ paddingHorizontal: 10, width: "100%" }}
              onChangeText={(deposit) =>
                this.props.changeText(
                  "security_deposit",
                  deposit,
                  "formThreeData"
                )
              }
            />
          </View>
          <View style={styles.view}>
            <TextInput
              placeholder="Per month rent"
              keyboardType="phone-pad"
              placeholderTextColor="#5694ca"
              style={{ paddingHorizontal: 10, width: "100%" }}
              onChangeText={(monthlyRent) =>
                this.props.changeText(
                  "monthly_rent",
                  monthlyRent,
                  "formThreeData"
                )
              }
            />
          </View>
          <View style={styles.view}>
            <TextInput
              placeholder="Percentage increase annual"
              keyboardType="phone-pad"
              placeholderTextColor="#5694ca"
              style={{ paddingHorizontal: 10, width: "100%" }}
              onChangeText={(percentIncr) =>
                this.props.changeText(
                  "percent_increase",
                  percentIncr,
                  "formThreeData"
                )
              }
            />
          </View>
          <View style={styles.view}>
            <TextInput
              placeholder="Member Space"
              keyboardType="phone-pad"
              placeholderTextColor="#5694ca"
              style={{ paddingHorizontal: 10, width: "100%" }}
              onChangeText={(member) =>
                this.props.changeText("member_space", member, "formThreeData")
              }
            />
          </View>
          <View style={{ display: "flex", flexDirection: "row", margin: 20 }}>
            <Text style={styles.radioText}>Initial Contract Length</Text>
            {this.props.formdata.propertyStatus.map((data, key) => {
              return (
                <View key={key} style={styles.radio}>
                  {this.props.formdata.currentPropertyStatus == data ? (
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
                        {data}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      accessible={true}
                      onPress={() =>
                        this.props.pressEvent("currentPropertyStatus", data)
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
                        {data}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>
        </>
      </ScrollView>
    );
  }
}

export default RegisterStep3;
