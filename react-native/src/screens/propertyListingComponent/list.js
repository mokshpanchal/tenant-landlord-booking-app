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
import { ScrollView } from "react-native-gesture-handler";
import Utility from "../../common/utility";

const styles = StyleSheet.create({
  property: {
    height: "40%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: "5%",
    borderBottomWidth: 2,
    borderWidth: 0,
    borderRadius: 15,
    marginBottom: 20,
  },

  main: {
    backgroundColor: "#fff",
    width: "90%",
    display: "flex",
    maxHeight: "20%",
    flex: 1,
    flexDirection: "column",
    marginTop: "5%",
  },

  corner: {
    height: "10%",
    width: "20%",
    position: "absolute",
    right: 5,
    marginTop: "2%",
  },
});
// =====================STYLE_SHEET===========================

class List extends React.Component {
  utility;
  state = {
    user: {},
    search: "",
    propertyList: [],
  };

  constructor() {
    super();
    this.utility = new Utility();
  }
  setPropertyList() {
    return this.state.propertyList.length
      ? true
      : this.utility.makeGetRequest("search").then((resp) => {
          console.log("response property", resp);
          if (resp.success) {
            return this.setState({ propertyList: resp.data });
          }
        });
  }
  componentDidMount() {
    console.log(this.props);
    if (this.props.searchKey.length > 0)
      return this.setState({ propertyList: this.props.propertyList });
    this.setPropertyList();
  }
  componentWillUnmount() {
    this.props.resetSearch("");
  }
  render() {
    const { search } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <ScrollView
        style={{
          backgroundColor: "#FFF",
          // height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
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
                              uri:
                                this.utility.getApiUrl().slice(0, -1) +
                                property.image_url,
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
                    <View style={{display:"flex", flexDirection:"row"}}>
                    <Text style={{fontSize: 12, fontWeight: "bold",  color: "#057a0f"}}>
                      {property.user?.name }
                      </Text>
                      {property.user?.role == "seller" ? (
                      <Image
                      source={require("../../../assets/verified.png")}
                        style={{width: 20, height: 20,}}
                      />):(<Image/>)
                      }
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
                        {property.rent_detail?.members == undefined
                          ? "2"
                          : property?.rent_detail?.members}
                        {"\n"}
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "bold",
                            position: "absolute",
                            color: "#D3D3D3"
                          }}
                        >
                          Published {property?.created_at} ago
                        </Text>
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        Published {property?.created_at} ago
                      </Text>
                    )}
                  </View>
                </View>
              );
            })
          ) : (
            <Text>No property matched with your current search!</Text>
          )}
        </View>
      </ScrollView>
    );
  }
}
export default List;
