import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Login from "../screens/Login";
import Register from "../screens/registerComponent/Register";
import home from "../screens/homeComponent/home";
import profile from "../screens/profileComponent/profile";
import detail from "../screens/detailPageComponent/detail";
import list from "../screens/propertyListingComponent/list";
import Dashboard from "../screens/dashboardComponent/dashboard";
import Buffer from "../screens/registerComponent/Buffer";
import AuthLoading from "../screens/AuthLoading";

const stackNavigatorOptions = {
  headerShown: false,
  headerStatusBarHeight: 0,
};
const AppStack = createStackNavigator(
  {
    Dashboard: { screen: Dashboard },
    Home: { screen: home },
    Profile: { screen: profile },
    Detail: { screen: detail },
    PropertyListing: { screen: list },
    Buffer: { screen: Buffer },
  },

  {
    defaultNavigationOptions: stackNavigatorOptions,
  }
);
const AuthStack = createStackNavigator(
  {
    Login: { screen: Login },
    Register: { screen: Register },
  },

  {
    defaultNavigationOptions: stackNavigatorOptions,
  }
);
export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: "AuthLoading",
    }
  )
);
