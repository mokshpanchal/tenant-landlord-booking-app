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
  },

  radioText: {
    fontSize: 15,
    fontFamily: "SemiBold",
    textAlign: "center",
    justifyContent: "center",
    marginTop: 10,
    marginHorizontal: 55,
    color: "#5694ca",
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
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <>
          {this.props.currentUserRole == 2 ? (
            <View style={{ zIndex: 1 }}>
              <View style={styles.view}>
                <TextInput
                  placeholder="Building Name"
                  placeholderTextColor="#5694ca"
                  style={{ paddingHorizontal: 10, width: "100%" }}
                  defaultValue={this.props?.formdata?.user_building_name}
                  onChangeText={(building_name) =>
                    this.props.changeText(
                      "user_building_name",
                      building_name,
                      "formTwoData"
                    )
                  }
                />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  margin: 20,
                  flexWrap: "wrap",
                }}
              >
                <Text style={styles.radioText}>Property type:</Text>
                <View style={{display: "flex", flexDirection: "row", marginTop: 20, marginLeft: 30}}>
                {this.props.propertyTypes.map((data, key) => {
                  return (
                    <View key={key} style={styles.radio}>
                      {this.props.currentPropertyType == data.id ? (
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
                            {data?.name}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          accessible={true}
                          onPress={() =>
                            this.props.pressEvent(
                              "currentPropertyType",
                              data?.id
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
                            {data?.name}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                })}
              </View>
              </View>
              <View style={styles.view}>
                <TextInput
                  placeholder="Building Address Line 1"
                  placeholderTextColor="#5694ca"
                  style={{ paddingHorizontal: 10, width: "100%" }}
                  defaultValue={this.props?.formdata?.user_building_address1}
                  onChangeText={(building_address) =>
                    this.props.changeText(
                      "user_building_address1",
                      building_address,
                      "formTwoData"
                    )
                  }
                />
              </View>
              <View style={styles.view}>
                <TextInput
                  placeholder="Building Address Line 2"
                  placeholderTextColor="#5694ca"
                  style={{ paddingHorizontal: 10, width: "100%" }}
                  defaultValue={this.props?.formdata?.user_building_address2}
                  onChangeText={(building_address) =>
                    this.props.changeText(
                      "user_building_address2",
                      building_address,
                      "formTwoData"
                    )
                  }
                />
              </View>
              <View style={styles.viewOne}>
                <Text style={{
                  fontFamily: "SemiBold",
                  color: "#5694ca",
                  marginBottom: 150,
                  }}>Location:</Text>
                <DropDownPicker
                  items={this.props.stateList}
                  defaultIndex={0}
                  defaultValue={this.props?.formdata?.stateItem}
                  containerStyle={{ width: 150, height: 40, marginLeft: 20, marginBottom: 150, }}
                  onChangeItem={(stateItem) =>
                    this.props.changeText(
                      "stateItem",
                      stateItem.value,
                      "formTwoData"
                    )
                  }
                  placeholder="Select City"
                  activeLabelStyle={{ color: "green" }}
                />
              </View>
              <View style={styles.viewOne}>
                <Text style={{
                  fontFamily: "SemiBold",
                  color: "#5694ca",
                  marginBottom: 100,
                  }}>
                    Purpose:</Text>
                <DropDownPicker
                  items={this.props.puposeList}
                  defaultIndex={0}
                  defaultValue={this.props?.formdata?.purpose}
                  containerStyle={{
                    width: 150,
                    height: 40,
                    marginLeft: 20,
                    marginBottom: 100,
                  }}
                  zindex={10}
                  onChangeItem={(purpose) =>
                    this.props.changeText(
                      "purpose",
                      purpose.value,
                      "formTwoData"
                    )
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
                  defaultValue={this.props?.formdata?.user_zipcode}
                  style={{width: "100%"}}
                  onChangeText={(zipcode) =>
                    this.props.changeText(
                      "user_zipcode",
                      zipcode,
                      "formTwoData"
                    )
                  }
                />
              </View>
              <Text style={styles.radioText}>Upload Image:</Text>
              <Button
                title="Add image of property"
                style={{ paddingVertical: 10, marginHorizontal: 55,}}
                onPress={() => {
                  this.props.openImage(true);
                }}
              />
              <Text>
                {this.props?.formdata?.imageSelected
                  ? this.props?.formdata?.imageSelected
                  : 0}{" "}
                images selected
              </Text>
            </View>
          ) : null}
        </>
      </ScrollView>
    );
  }
}

export default RegisterStep2;
