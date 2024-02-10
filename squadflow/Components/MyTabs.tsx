import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={LoginScreen} />
      <Tab.Screen name="Settings2" component={LoginScreen} />
      <Tab.Screen name="Settings3" component={LoginScreen} />
    </Tab.Navigator>
  );
}

export default MyTabs;
