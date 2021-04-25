import React, { useState, Component } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Utility from "../../common/utility";
import Filter from "./filter";
const { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
  property: {
    // height: "40%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: "5%",
    borderBottomWidth: 2,
    borderWidth: 0,
    borderRadius: 15,
    marginBottom: height * 0.01,
    paddingBottom: height * 0.01,
  },

  main: {
    backgroundColor: "#fff",
    width: "90%",
    display: "flex",
    // maxHeight: "20%",
    flex: 1,
    flexDirection: "column",
    marginTop: "15%",
  },

  corner: {
    height: "10%",
    width: "20%",
    position: "absolute",
    right: 5,
    marginTop: "2%",
  },

  top: {
    width: "100%",
    height: height * 0.06,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#000",
    shadowRadius: 20,
    overflow: "hidden",
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
    color: "#000",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    backgroundColor: "#FFF",
    marginBottom: "5%",
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
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
  },
});
// =====================STYLE_SHEET===========================

class List extends React.Component {
  stateList = [
    { value: "AHMEDABAD", label: "Ahmedabad" },
    { value: "SURAT", label: "Surat" },
    { value: "BARODA", label: "Baroda" },
    { value: "MEHSANA", label: "Mehsana" },
  ];
  propertyTypes = [
    { id: "all", name: "All" },
    { id: "house", name: "House" },
    { id: "shop", name: "Shop" },
    { id: "office", name: "Office" },
  ];
  constructor(props) {
    super(props);
    console.log("list constructor");
    this.utility = new Utility();
  }
  utility;
  state = {
    user: {},
    search: "",
    filterPriceSort: 0,
    filterPropertyType: "all",
    propertyList: [],
    modalVisible: false,
  };

  async setPropertyList() {
    return (await this.state.propertyList.length)
      ? true
      : this.utility.makeGetRequest("search").then((resp) => {
          console.log("response property", resp);
          if (resp?.success) {
            this.setState({ propertyList: resp?.data });
          }
        });
  }
  filterProperties = (filters) => {
    this.utility.makeGetRequest("search").then((resp) => {
      if (resp?.success) {
        if (resp?.data.length) {
          for (const [key, value] of Object.entries(filters)) {
            console.log(`${key}: ${value}`);
            if (filters.location.length) {
              console.log("inside location detail");
              resp.data = resp.data.filter(function (record) {
                return record.location == filters.location;
              });
            }
            if (
              filters.currentPropertyType.length &&
              filters.currentPropertyType != "all"
            ) {
              console.log("inside currentPropertyType detail");

              resp.data = resp.data.filter(function (record) {
                return (
                  record?.property_type.category == filters.currentPropertyType
                );
              });
            }
            if (filters.priceSort) {
              console.log("inside price sort detail");

              resp.data = resp.data.sort((a, b) => {
                let aPrice = a.rent_detail?.rent_per_month
                  ? a.rent_detail?.rent_per_month
                  : 5000000;
                let bPrice = b.rent_detail?.rent_per_month
                  ? b.rent_detail?.rent_per_month
                  : 5000000;

                return filters.priceSort === 1
                  ? aPrice - bPrice
                  : bPrice - aPrice;
              });
            }
          }
        }
        this.setState({
          propertyList: resp?.data,
          search: "location=" + filters.location.toLowerCase(),
        });
      }
    });
  };
  componentDidMount() {
    this.utility.getValue("api_url").then((res) => {
      if (this.props.searchKey.length > 0) {
        let sKey = this.props.searchKey.trim().split("=");
        return this.setState({
          search: sKey[1],
          propertyList: this.props.propertyList,
        });
      }
      this.setPropertyList();
    });
  }
  componentWillUnmount() {
    this.props.resetSearch("");
  }
  setFilterModal = (visible) => {
    this.setState({ modalVisible: visible });
  };
  render() {
    const { search } = this.state;
    const { navigate } = this.props.navigation;
    let url = this.utility.getApiUrl();
    console.log("url in list", this.utility.getApiUrl());
    return (
      <ScrollView
        style={{
          backgroundColor: "#FFF",
          // height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <View style={styles.top}>
          <Text
            style={{
              fontSize: 16,
              color: "#23b3d5",
              fontWeight: "bold",
              paddingVertical: 10,
            }}
          >
            {this.state.propertyList.length} Available Properties
          </Text>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#5694ca",
              borderRadius: 20,
              width: 70,
            }}
          >
            <Text
              onPress={() => this.setFilterModal(true)}
              style={{
                color: "#FFF",
                fontFamily: "SemiBold",
              }}
            >
              Filter
            </Text>
          </View>
        </View>
        <Filter
          modalVisible={this.state.modalVisible}
          setModal={this.setFilterModal}
          stateList={this.stateList}
          propertyTypes={this.propertyTypes}
          filterProperties={this.filterProperties}
          searchKey={this.props.searchKey}
          filterPrice={this.state.filterPriceSort}
          filterProperty={this.state.filterPropertyType}
        />
        <View style={styles.main}>
          {this.state.propertyList.length ? (
            this.state.propertyList.map((property) => {
              return (
                <View style={styles.property} key={property?.id}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      width: "40%",
                      height: "70%",
                      borderRadius: 15,
                      marginTop: "2.5%",
                      position: "absolute",
                      left: "7%",
                      marginRight: "70%",
                    }}
                    onPress={() => {
                      navigate("Detail", { id: property?.id });
                    }}
                  >
                    <Image
                      key={property?.id}
                      source={
                        !property?.image_url
                          ? require("../../../assets/1.jpg")
                          : {
                              uri: url?.slice(0, -1) + property?.image_url,
                            }
                      }
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 15,
                      }}
                    />
                  </TouchableOpacity>

                  {property?.for_sell == "true" ? (
                    <Image
                      key={property?.for_rent}
                      source={require("../../../assets/sell.png")}
                      style={styles.corner}
                    />
                  ) : (
                    <Image
                      key={property?.for_rent}
                      source={require("../../../assets/rent.png")}
                      style={styles.corner}
                    />
                  )}
                  {console.log()}
                  <View
                    style={{
                      marginLeft: "30%",
                      marginTop: "10%",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      {property?.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#23b3d5",
                        fontWeight: "bold",
                      }}
                    >
                      Location : {property?.location}
                    </Text>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                          color: "#057a0f",
                        }}
                      >
                        {property?.user.name}
                      </Text>
                      {property?.user.role == "seller" ? (
                        <Image
                          source={require("../../../assets/verified.png")}
                          style={{ width: 20, height: 20 }}
                        />
                      ) : (
                        <Image />
                      )}
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        color: "#057a0f",
                      }}
                    >
                      ₹
                      {property?.rent_detail?.rent_per_month == undefined
                        ? "50,00000"
                        : property?.rent_detail?.rent_per_month + "/month"}
                    </Text>
                    {property?.for_rent == "true" ? (
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        Members Allowed:{" "}
                        {property?.rent_detail?.members == undefined
                          ? "2"
                          : property?.rent_detail?.members}
                        {"\n"}
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "bold",
                            position: "absolute",
                            color: "#D3D3D3",
                          }}
                        >
                          {parseInt(property?.created_at) == 0
                            ? "Published Today"
                            : "Published " + property?.created_at + " ago"}
                        </Text>
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                          color: "#D3D3D3",
                        }}
                      >
                        {parseInt(property?.created_at) == 0
                          ? "Published Today"
                          : "Published " + property?.created_at + " ago"}
                      </Text>
                    )}
                  </View>
                </View>
              );
            })
          ) : (
            <Text
              style={{ textAlign: "center", color: "#5694ca", fontSize: 14 }}
            >
              {" "}
              No property matched with your current search!
            </Text>
          )}
        </View>
      </ScrollView>
    );
  }
}
export default List;
