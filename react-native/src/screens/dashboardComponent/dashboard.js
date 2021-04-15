import React, { useState, Component, Fragment } from "react";
import { Text, Platform, View } from "react-native";
import Home from "../homeComponent/home";
import List from "../propertyListingComponent/list";
import Profile from "../profileComponent/profile";
import Search from "../../common/search";
import Footer from "../../common/footer";
import Utility from "../../common/utility";
class Dashboard extends Component {
  utility;
  constructor(props) {
    super(props);
    this.utility = new Utility();
  }
  state = {
    defaultScreen: "home",
    screen: "",
    propertyList: "",
    searchKey: "",
  };
  renderElement;
  searchText = (searchKey) => {
    const apiResponse = this.utility
      .makeGetRequest("search?" + searchKey)
      .then((resp) => {
        console.log("response property", resp);
        if (resp?.success) {
          this.setState({
            screen: "property-list",
            propertyList: resp?.data,
            searchKey: searchKey,
          });
        }
      });
  };
  setScreen = (screen) => {
    this.setState({ screen: screen });
  };
  resetKey = (key) => {
    this.setState({ searchKey: key });
  };
  render() {
    console.log(this.state);
    let screen = this.state.screen
      ? this.state.screen
      : this.state.defaultScreen;
    switch (screen) {
      case "home":
        this.renderElement = (
          <Home
            navigation={this.props.navigation}
            pressEvent={this.searchText}
          />
        );
        break;
      case "property-list":
        console.log("search key in dash", this.state.searchKey);
        this.renderElement = (
          <List
            navigation={this.props.navigation}
            propertyList={this.state.propertyList}
            searchKey={this.state.searchKey}
            resetSearch={this.resetKey}
          />
        );
        break;
      case "profile":
        this.renderElement = <Profile navigation={this.props.navigation} />;
        break;
      default:
        this.renderElement = <Text>here</Text>;
        break;
    }
    return (
      <Fragment>
        <View
          style={{ marginTop: Platform.OS === "android" ? "8%" : "" }}
        ></View>
        {this.renderElement}

        {screen != "home" ? (
          <Text>""</Text>
        ) : (
          <Search
            navigation={this.props.navigation}
            changeText={this.searchText}
          />
        )}
        <Footer
          navigation={this.props.navigation}
          pressEvent={this.setScreen}
          initialRouteName={screen}
        />
      </Fragment>
    );
  }
}

export default Dashboard;
