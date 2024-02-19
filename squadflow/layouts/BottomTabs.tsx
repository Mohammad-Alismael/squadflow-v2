import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Settings" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
