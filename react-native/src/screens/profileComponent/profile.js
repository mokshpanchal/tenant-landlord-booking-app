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
      borderWidth: 0,
      borderBottomLeftRadius: 23,
      borderBottomRightRadius: 23,
      shadowColor: "#000",
      shadowRadius: 1,
      overflow: "hidden",
      shadowOpacity: 0.7,
      shadowOffset: { width: 0, height: 3 },
      elevation: 4,
      color: "#000",
      height: 150,
      backgroundColor: "#fff",
      margin: 0,
      display: "flex",
      flexDirection: "row"
    },

    profile:{
        shadowColor: "#000",
        shadowRadius: 1,
        shadowOpacity: 0.7,
        shadowOffset: { width: 0, height: 3 },
        elevation: 4,
        borderWidth: 0,
        borderRadius: 90,
        overflow: "hidden",
        color: "#000",
        height: 110,
        width: "30%",
        backgroundColor: "#fff",
        marginLeft: "5%",
        marginTop: "5%", 
    }
  });
  // =====================STYLE_SHEET===========================

class Profile extends React.Component {
  utility;
  state = {
    user: {},
    search: "",
  };

  constructor() {
    super();
    this.utility = new Utility();
  }

  componentDidMount() {
    this.utility.getValue("user").then((user) => {
            this.setState({ user: JSON.parse([user])});
            console.log("user in profile", user);
    });
  }

    render() {
        const { search } = this.state;
        const { navigate } = this.props.navigation;
        return(
        <View style={{ backgroundColor: "#FFF", height: "100%", flex: 1 }}>
            <View style={styles.view}>
                <Image
                    source={require("../../../assets/avatar.png")}
                    style={styles.profile}
                />
            </View>
      </View>
    );
  }
}
export default Profile;
