import React, { useState, Component } from "react";
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
  },

  viewOne: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 55,
    marginTop: 15,
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
});
// =====================STYLE_SHEET===========================

class RegisterStep2 extends Component {
  state = {};
  render() {
    console.log(this);
    const { navigate } = this.props.navigation;
    return (
      <>
        {this.props.formdata.currentUserRole == 2 ? (
          <View style={{ zIndex: 1 }}>
            <View style={styles.view}>
              <TextInput
                placeholder="Building Name"
                placeholderTextColor="#5694ca"
                style={{ paddingHorizontal: 10 }}
                onChangeText={(building_name) =>
                  this.props.changeText(
                    "user_building_name",
                    building_name,
                    "formTwoData"
                  )
                }
              />
            </View>
            <View style={styles.view}>
              <TextInput
                multiline={true}
                numberOfLines={4}
                placeholder="Bulding Address"
                placeholderTextColor="#5694ca"
                style={{ paddingHorizontal: 10 }}
                onChangeText={(building_address) =>
                  this.props.changeText(
                    "user_building_address",
                    building_address,
                    "formTwoData"
                  )
                }
              />
            </View>
            <View style={styles.viewOne}>
              <Text>Purpose:</Text>
              <DropDownPicker
                items={this.props.puposeList}
                defaultIndex={0}
                containerStyle={{ width: 150, height: 40, marginLeft: 20 }}
                dropDownStyle={{ backgroundColor: "#fafafa" }}
                onChangeItem={(purpose) =>
                  this.props.changeText("purpose", purpose, "formTwoData")
                }
                placeholder="Select Purpose"
                activeLabelStyle={{ color: "green" }}
              />
            </View>
            <View style={styles.view}>
              <TextInput
                keyboardType="phone-pad"
                placeholder="Zipcode"
                placeholderTextColor="#5694ca"
                style={{ paddingHorizontal: 10 }}
                onChangeText={(zipcode) =>
                  this.props.changeText("user_zipcode", zipcode, "formTwoData")
                }
              />
            </View>
          </View>
        ) : null}
        <View style={styles.view}>
          <TextInput
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#5694ca"
            style={{
              paddingHorizontal: 10,
              width: "100%",
            }}
            onChangeText={(password) =>
              this.props.changeText("user_password", password, "formTwoData")
            }
          />
        </View>
        <View style={styles.view}>
          <TextInput
            secureTextEntry
            placeholder="Confirm Password"
            placeholderTextColor="#5694ca"
            style={{ paddingHorizontal: 10, width: "100%" }}
            onChangeText={(cpassword) =>
              this.props.changeText("user_cpassword", cpassword, "formTwoData")
            }
          />
        </View>
        <View
          style={{
            marginHorizontal: 55,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
            backgroundColor: "#5694ca",
            paddingVertical: 10,
            borderRadius: 23,
            shadowColor: "#000",
            shadowRadius: 5,
            shadowOpacity: 0.7,
            shadowOffset: { width: 0, height: 3 },
            height: 40,
          }}
        >
          <Text
            textBreakStrategy="simple"
            style={{
              color: "#FFF",
              fontFamily: "SemiBold",
            }}
            onPress={() => this.props.registerEvent(this.props.formdata)}
          >
            Register
          </Text>
        </View>
      </>
    );
  }
}

export default RegisterStep2;
