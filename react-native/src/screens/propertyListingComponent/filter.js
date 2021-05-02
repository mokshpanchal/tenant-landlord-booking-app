import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
  },
  modalView: {
    marginTop: height * 0.06,

    height: height,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    margin: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
  },
  viewOne: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 55,
    marginTop: 30,
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
class Filter extends Component {
  pricing = [
    { value: 1, label: "low to high" },
    { value: 2, label: "high to low" },
  ];
  state = {
    location: "",
    currentPropertyType: "all",
    priceSort: 0,
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let sKey = this.props.searchKey.length
      ? this.props.searchKey.trim().split("=")
      : "";
    this.setState({
      location: sKey.length ? sKey[1].toUpperCase() : "",
      priceSort: this.props.filterPrice,
      currentPropertyType: this.props.filterProperty,
    });
  }
  resetFilter(filter = {}) {
    let filterData = {
      location: "location" in filter ? filter.location : this.state.location,
      currentPropertyType:
        "currentPropertyType" in filter
          ? filter.currentPropertyType
          : this.state.currentPropertyType,
      priceSort:
        "priceSort" in filter ? filter.priceSort : this.state.priceSort,
    };
    this.setState(filterData);
    this.props.filterProperties(filterData);
    this.props.setModal(!this.props.modalVisible);
  }
  render() {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.props.setModal(!this.props.modalVisible);
          }}
        >
          <View>
            <View style={styles.modalView}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  textAlign: "right",
                  justifyContent: "flex-end",
                  alignContent: "flex-end",
                  alignSelf: "flex-end",
                }}
                onPress={() => this.props.setModal(!this.props.modalVisible)}
              >
                X
              </Text>
              <Text style={styles.modalText}>FILTER PROPERTY</Text>

              <Text style={styles.radioText}>PROPERTY TYPE:</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 20,
                  marginLeft: 30,
                }}
              >
                {this.props.propertyTypes.map((data, key) => {
                  return (
                    <View key={key} style={styles.radio}>
                      {this.state.currentPropertyType == data.id ? (
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
                            this.setState({ currentPropertyType: data.id })
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
              <View style={{ marginTop: 30 }}>
                <Text style={styles.radioText}>PRICING:</Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 20,
                    marginLeft: 30,
                  }}
                >
                  {this.pricing.map((data, key) => {
                    return (
                      <View key={key} style={styles.radio}>
                        {this.state.priceSort == data.value ? (
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
                              this.setState({ priceSort: data.value })
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
              </View>
              <View style={styles.viewOne}>
                <Text
                  style={{
                    fontFamily: "SemiBold",
                    color: "#5694ca",
                    marginBottom: 150,
                  }}
                >
                  LOCATION:
                </Text>
                <DropDownPicker
                  items={this.props.stateList}
                  defaultIndex={0}
                  defaultValue={this.state.location}
                  containerStyle={{
                    width: 150,
                    height: 40,
                    marginLeft: 20,
                    marginBottom: 150,
                  }}
                  onChangeItem={(stateItem) =>
                    this.setState({ location: stateItem.value })
                  }
                  placeholder="SELECT CITY"
                  activeLabelStyle={{ color: "green" }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => this.resetFilter()}
                >
                  <Text style={styles.textStyle}>Filter property</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() =>
                    this.resetFilter({
                      location: "",
                      currentPropertyType: 0,
                      priceSort: 0,
                    })
                  }
                >
                  <Text style={styles.textStyle}>Reset Filters</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default Filter;
