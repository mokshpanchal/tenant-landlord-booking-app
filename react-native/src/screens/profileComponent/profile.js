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
import { ScrollView } from "react-native-gesture-handler";

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
    height: 180,
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
    marginTop: "7%",
  },
  button: {
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
    elevation: 4,
    width: "100%",
  },

  logoutbutton: {
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#DC143C",
    paddingVertical: 10,
    borderRadius: 23,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    width: "75%",
    position: "relative",
    marginLeft: "12.5%",
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
      const validated = validateForm();
      this.setState({ errorForm: validated });
      if (
        validated.password_error.length ||
        validated.current_password_error.length ||
        validated.confirm_password_error.length
      ) {
        return false;
      }

      const apiResponse = this.utility
        .makeGetRequest("create_reset_password_token?id=" + user.id)
        .then((resp) => {
          if (resp) {
            return resp.reset_password_token;
          } else {
            return this.utility.showAlert();
          }
        })
        .then((token) => {
          let requestData = {
            password: this.state.password,
            current_password: this.state.current_password,
            password_confirmation: this.state.password_confirmation,
            reset_password_token: token,
          };
          this.utility
            .makePutRequest("users/password", requestData)
            .then((response) => {
              console.log("response user", response);
              return this.utility.showAlert(
                "Password changed!",
                "Your password has been reset successfully"
              );
            });
        });
    };
    const logOutUser = () => {
      this.utility
        .clearAllValues()
        .then((data) => this.props.navigation.navigate("Login"));
    };
    return (
      <View style={{ backgroundColor: "#FFF", height: "100%", flex: 1 }}>
        <View style={styles.view}>
          <Image
            source={require("../../../assets/avatar.png")}
            style={styles.profile}
          />
          {/* </View> */}
          {/* <View style={{display: "flex", flexDirection: "column", position: "absolute"}}> */}
          <Text style={{ margin: 15, paddingHorizontal: 20, marginTop: 30 }}>
          <View style={{display:"flex", flexDirection:"row"}}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                color: "#5694ca",
                paddingLeft: 2,
              }}
            >
              {user?.name}
            </Text>
            {user?.role == "seller" ? (
                      <Image
                      source={require("../../../assets/verified.png")}
                        style={{width: 30, height: 30,}}
                      />):(<Image/>)
                      }
          </View>

            {"\n"}
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>
              {user?.email}
            </Text>
            {"\n"}
            <Text style={{ fontSize: 12, fontWeight: "bold", color: "green" }}>
              {user?.phone_number}
            </Text>
            {"\n"}
            <Text style={{ fontSize: 12, fontWeight: "bold", color: "grey" }}>
              Joined on {user?.created_at}
            </Text>
            {"\n"}
          </Text>
        </View>

        <Text
          style={{
            margin: 20,
            fontWeight: "bold",
            textAlign: "center",
            paddingHorizontal: 10,
            fontSize: 18,
            color: "#5694ca"
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
        <Text style={{color: "#DC143C", textAlign: "center"}}>{this.state.errorForm?.current_password_error}</Text>
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
        <Text style={{color: "#DC143C", textAlign: "center"}}>{this.state.errorForm?.password_error}</Text>
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
        <Text style={{color: "#DC143C", textAlign: "center"}}>{this.state.errorForm?.confirm_password_error}</Text>
        <View
          style={{ paddingVertical: 30, paddingHorizontal: 50, width: "100%" }}
        >
        <TouchableOpacity style={styles.button} onPress={changePassword}>
          {/* <Button title="Change Password" onPress={changePassword}></Button> */}
          <Text
            style={{
              color: "#FFF",
              fontFamily: "SemiBold",
            }}
          >
            Change Password{" "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutbutton} onPress={logOutUser}>
          {/* <Button title="Logout" onPress={logOutUser}></Button> */}
          <Text
            style={{
              color: "#FFF",
              fontFamily: "SemiBold",
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            Logout{" "}
          </Text>
        </TouchableOpacity>
      </View>
        
      <View style={{display:"flex", flexDirection:"row", alignContent: "center", justifyContent: "space-around"}}>
        <View>
          <Image
            source={require("../../../assets/creator1.png")}
                    style={{width: 50, height: 50, borderRadius: 90,}}
                    />
          <Text style={{color: "#5694ca", fontSize: 12,textAlign: "center"}}> Krishna </Text>
        </View>
        <View>
          <Image
            source={require("../../../assets/creator2.png")}
                    style={{width: 50, height: 50, borderRadius: 90,}}
                    />
          <Text style={{color: "#5694ca", fontSize: 12,textAlign: "center"}}> Aditi </Text>
        </View>
        <View>
          <Image
            source={require("../../../assets/creator3.png")}
                    style={{width: 50, height: 50, borderRadius: 90,}}
                    />
          <Text style={{color: "#5694ca", fontSize: 12,textAlign: "center"}}> Pankti </Text>
        </View>
      </View>
      <Text style={{color: "#5694ca", fontSize: 12, textAlign: "center"}}> Version 0.1(Beta)</Text>
      </View>
    );
  }
}
export default Profile;
