import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import CustomHeader from "./Components/CustomHeader";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import HomeHeader from "./Components/ScreenHeaders/HomeHeader";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import { TamaguiProvider } from "tamagui";
import appConfig from "./tamagui.config";
import BottomTabs from "./layouts/BottomTabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./utils/routeStacks/HomeStack";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#F2F0EB",
    },
  };
  return (
    <TamaguiProvider config={appConfig}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          // initialRouteName="homeStack"
          // screenOptions={{
          //   headerStyle: {
          //     backgroundColor: "#F2F0EB",
          //   },
          //   headerTintColor: "#fff",
          //   headerTitleStyle: {
          //     fontWeight: "bold",
          //   },
          // }}
        >
          <Stack.Screen
            name="Home"
            component={(props) => (
              <Tab.Navigator>
                <Tab.Screen
                  name="Home"
                  options={{
                    headerTitle: (props) => <HomeHeader {...props} />,
                    headerRight: (props) => (
                      <View
                        style={{
                          backgroundColor: "#803838",
                          borderRadius: 50,
                          padding: 5,
                        }}
                      >
                        <Ionicons name="notifications-outline" size={28} />
                      </View>
                    ),
                  }}
                  component={HomeScreen}
                />
                <Tab.Screen
                  name="Workspaces"
                  // options={{ headerShown: false }}
                  component={ProfileScreen}
                />
                <Tab.Screen
                  name="Chats"
                  // options={{ headerShown: false }}
                  component={ProfileScreen}
                />
                <Tab.Screen
                  name="Profile"
                  // options={{ headerShown: false }}
                  component={ProfileScreen}
                />
              </Tab.Navigator>
            )}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TamaguiProvider>
  );
}

export default App;
