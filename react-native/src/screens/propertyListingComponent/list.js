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
    height: "70%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: "5%",
    shadowColor: "#000",
    shadowRadius: 1,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    borderWidth: 0,
    borderRadius: 15,
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
    return (
      <ScrollView
        style={{
          backgroundColor: "#FFF",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <View style={styles.main}>
          {this.state.propertyList.length ? (
            this.state.propertyList.map((property) => {
              return (
                <View style={styles.property} key={property?.id}>
                  <Image
                    key={property?.id}
                    source={require("../../../assets/1.jpg")}
                    style={{
                      width: "40%",
                      height: "80%",
                      borderRadius: 15,
                      marginTop: "2.5%",
                    }}
                  />
                  <Text>Location : {property?.location}</Text>
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
