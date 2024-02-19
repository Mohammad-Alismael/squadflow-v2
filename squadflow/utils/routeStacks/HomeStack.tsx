import React from "react";
import PropTypes from "prop-types";
import HomeHeader from "../../Components/ScreenHeaders/HomeHeader";
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import LoginScreen from "../../screens/LoginScreen/LoginScreen";
import ProfileScreen from "../../screens/ProfileScreen/ProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

HomeStack.propTypes = {};
const Stack = createNativeStackNavigator();

function HomeStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="homeStack"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#F2F0EB",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        options={{
          headerTitle: (props) => <HomeHeader {...props} />,
          // headerRight: (props) => (
          //   <View
          //     style={{
          //       backgroundColor: "#FFF",
          //       borderRadius: 50,
          //       padding: 5,
          //     }}
          //   >
          //     <Ionicons name="notifications-outline" size={28} />
          //   </View>
          // ),
        }}
        component={HomeScreen}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
