import React, { useState, Component } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Button,
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
    flexDirection: "row",
  },
  form_view: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 0,
    marginTop: 20,
    paddingHorizontal: 10,
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
  profile: {
    borderWidth: 0,
    borderRadius: 90,
    overflow: "hidden",
    height: 110,
    width: "30%",
    backgroundColor: "#fff",
    marginLeft: "5%",
    marginTop: "5%",
  },
});
// =====================STYLE_SHEET===========================

class Profile extends React.Component {
  utility;
  state = {
    user: {},
    errorForm: {
      password_error: "",
      current_password_error: "",
      confirm_password_error: "",
    },
    search: "",
    isFormSubmitted: false,
    validData: false,
  };

  constructor(props) {
    super(props);
    this.utility = new Utility();
  }

  componentDidMount() {
    this.utility.getValue("user").then((user) => {
      let loggedUser = JSON.parse(user);
      this.setState({ user: loggedUser });
      // const apiResponse = this.utility
      //   .makeGetRequest("users/" + loggedUser.id)
      //   .then((resp) => {
      //     console.log("user api response", resp);
      //     if (resp.success) {
      //       this.setState({ user: resp.data });
      //     }
      //   });
      console.log("user in profile", JSON.parse(user));
    });
  }

  render() {
    const { search } = this.state;
    const { navigate } = this.props.navigation;
    const validateForm = () => {
      var errorKey = {
        password_error: "",
        current_password_error: "",
        confirm_password_error: "",
      };
      const { current_password, password, password_confirmation } = this.state;
      console.log(current_password);
      console.log(password);

      console.log(password_confirmation);

      if (!(current_password && current_password.length)) {
        errorKey.current_password_error = "Please enter current password.";
      }
      if (!(password && password.length)) {
        errorKey.password_error = "Please enter password.";
      }
      if (!(password_confirmation && password_confirmation.length)) {
        errorKey.confirm_password_error = "Please enter confirm password.";
      }
      if (password !== password_confirmation) {
        errorKey.confirm_password_error +=
          "Password and Confirm password doesn't match.";
      }
      return errorKey;
    };
    var user = this.state.user;
    const changePassword = () => {
      this.setState({ isFormSubmitted: true });
      const validated = validateForm();
      console.log("validates", validated);
      this.setState({ errorForm: validated });
      if (
        validated.password_error.length ||
        validated.current_password_error.length ||
        validated.confirm_password_error.length
      ) {
        return false;
      }
      console.log(this.state);
      let requestData = {
        password: this.state.password,
        current_password: this.state.current_password,
        password_confirmation: this.state.password_confirmation,
      };
      const apiResponse = this.utility
        .makePutRequest("users/password", requestData)
        .then((resp) => {
          console.log("response user", resp);
          if (resp?.success) {
          }
        });
    };
    const logOutUser = () => {
      this.utility
        .clearAllValues()
        .then((data) => this.props.navigation.navigate("Auth"));
    };
    return (
      <View style={{ backgroundColor: "#FFF", height: "100%", flex: 1 }}>
        <View style={styles.view}>
          <Image
            source={require("../../../assets/avatar.png")}
            style={styles.profile}
          />
          <Text style={{ margin: 20, paddingHorizontal: 10 }}>
            {user?.name}
            {"\n"}
            {user?.email}
            {"\n"}
            {user?.phone_number}
            {"\n"}
            {user?.created_at}
            {"\n"}
            <Button title="Logout" onPress={logOutUser}></Button>
          </Text>
        </View>
        <Text
          style={{
            margin: 20,
            fontWeight: "bold",
            textAlign: "center",
            paddingHorizontal: 10,
          }}
        >
          Change Your Password:{"\n"}
        </Text>
        <View style={styles.form_view}>
          <TextInput
            secureTextEntry
            placeholder="Current Password"
            placeholderTextColor="#5694ca"
            style={{ paddingHorizontal: 10, width: "100%" }}
            onChangeText={(current_password) =>
              this.setState({ current_password: current_password })
            }
          />
        </View>
        <Text>{this.state.errorForm?.current_password_error}</Text>
        <View style={styles.form_view}>
          <TextInput
            secureTextEntry
            placeholder="New Password"
            placeholderTextColor="#5694ca"
            style={{ paddingHorizontal: 10, width: "100%" }}
            onChangeText={(new_password) =>
              this.setState({ password: new_password })
            }
          />
        </View>
        <Text>{this.state.errorForm?.password_error}</Text>
        <View style={styles.form_view}>
          <TextInput
            secureTextEntry
            placeholder="Confirm Password"
            placeholderTextColor="#5694ca"
            style={{ paddingHorizontal: 10, width: "100%" }}
            onChangeText={(c_password) =>
              this.setState({ password_confirmation: c_password })
            }
          />
        </View>
        <Text>{this.state.errorForm?.confirm_password_error}</Text>
        <View
          style={{ paddingVertical: 30, paddingHorizontal: 50, width: "100%" }}
        >
          <Button title="Change Password" onPress={changePassword}></Button>
        </View>
      </View>
    );
  }
}
export default Profile;
