import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Login from "../screens/Login";
import Register from "../screens/registerComponent/Register";
import home from "../screens/homeComponent/home";
import profile from "../screens/profileComponent/profile";
import detail from "../screens/detailPageComponent/detail";
import list from "../screens/propertyListingComponent/list";
import Dashboard from "../screens/dashboardComponent/dashboard";
import Buffer from "../screens/registerComponent/buffer";

const stackNavigatorOptions = {
  headerShown: false,
};
const AppNavigator = createStackNavigator(
  {
    Login: { screen: Login },
    Register: { screen: Register },
    Home: { screen: home },
    Profile: { screen: profile },
    Detail: { screen: detail },
    PropertyListing: { screen: list },
    Dashboard: { screen: Dashboard },
    Buffer: { screen: Buffer },
  },

  {
    defaultNavigationOptions: stackNavigatorOptions,
  }
);

export default createAppContainer(AppNavigator);
