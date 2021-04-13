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
import Utility from "../../common/utility";

const styles = StyleSheet.create({
  property: {
    height: "70%",
    width: "70%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  main: {
    backgroundColor: "#fff",
    width: "70%",
    display: "flex",
    maxHeight: "20%",
    flex: 1,
    flexDirection: "row",
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
    if (this.props.propertyList.length > 0)
      return this.setState({ propertyList: this.props.propertyList });
  }
  render() {
    const { search } = this.state;
    this.setPropertyList();
    return (
      <View style={{ backgroundColor: "#FFF", height: "100%", flex: 1 }}>
        <View style={styles.main}>
          {this.state.propertyList.length
            ? this.state.propertyList.map((property) => {
                return (
                  <View style={styles.property}>
                    <Image
                      key={property?.id}
                      source={require("../../../assets/1.jpg")}
                      style={{
                        width: "50%",
                        height: "100%",
                        borderRadius: "15px",
                      }}
                    />
                    <Text>{property?.location}</Text>
                  </View>
                );
              })
            : null}
        </View>
      </View>
    );
  }
}
export default List;
