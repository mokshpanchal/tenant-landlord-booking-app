import React, { useState, Component, Fragment } from "react";
import { Text } from "react-native";
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
  };
  renderElement;
  searchText = (searchKey) => {
    const apiResponse = this.utility
      .makeGetRequest("search?search=" + searchKey)
      .then((resp) => {
        console.log("response property", resp);
        if (resp?.success) {
          this.setState({ screen: "property-list", propertyList: resp?.data });
        }
      });
  };
  setScreen = (screen) => {
    this.setState({ screen: screen });
  };
  render() {
    console.log(this.state);
    screen = this.state.screen ? this.state.screen : this.state.defaultScreen;
    switch (screen) {
      case "home":
        this.renderElement = <Home navigation={this.props.navigation} />;
        break;
      case "property-list":
        this.renderElement = (
          <List
            navigation={this.props.navigation}
            propertyList={this.state.propertyList}
          />
        );
        break;
      case "profile":
        this.renderElement = <Profile navigation={this.props.navigation} />;
        break;
      default:
        this.renderElement = <Text></Text>;
        break;
    }
    return (
      <Fragment>
        {this.renderElement}
        {this.state.screen != "home" ? (
          ""
        ) : (
          <Search
            navigation={this.props.navigation}
            changeText={this.searchText}
          />
        )}
        <Footer
          navigation={this.props.navigation}
          pressEvent={this.setScreen}
          initialRouteName = {screen}
        />
      </Fragment>
    );
  }
}

export default Dashboard;
