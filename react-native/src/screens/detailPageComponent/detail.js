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
  view: {
    flexDirection: "row",
    alignItems: "center",
    //   marginHorizontal: 55,
    borderWidth: 0,
    marginTop: 30,
    paddingHorizontal: 10,
    // borderColor: "#5694ca",
    borderRadius: 23,
    paddingVertical: 2,
    shadowColor: "#000",
    shadowRadius: 1,
    overflow: "hidden",
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    color: "#000",
    height: 40,
    backgroundColor: "#fff",
    position: "absolute",
    width: "90%",
    marginLeft: "5%",
  },

  property: {
    height: "100%",
    width: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    margin: "5%",
    borderBottomWidth: 2,
    borderWidth: 0,
    borderRadius: 15,
    marginBottom: 20,
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

class detail extends React.Component {
  utility;
  state = {
    user: {},
    search: "",
    property: {},
  };

  constructor() {
    super();
    this.utility = new Utility();
  }

  componentDidMount() {
    this.utility.getValue("user").then((user) => {
      this.setState({ user: JSON.parse(user) });
      this.setState({ property_id: this.props.navigation.getParam("id") });
      const apiResponse = this.utility
        .makeGetRequest("properties/" + this.state.property_id)
        .then((resp) => {
          if (resp.success) {
            this.setState({ property: resp.data });
            console.log(this.state);
          }
        });
      console.log("user in profile", this.state.user);
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    var property = this.state.property;
    return (
      <View style={styles.property} key={property?.id}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: "60%",
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
            style={{ width: "100%", height: "100%", borderRadius: 15 }}
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
        <View
          style={{
            marginLeft: "30%",
            marginTop: "10%",
            justifyContent: "flex-start",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#23b3d5",
              fontWeight: "bold",
            }}
          >
            Location : {property?.location}
          </Text>
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
  }
}
export default detail;
