import React from "react";
import PropTypes from "prop-types";
import ROUTES from "../utils/routes";
import HomeHeader from "../Components/ScreenHeaders/HomeHeader";
import { TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../utils/context/AuthContext";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { Text } from "tamagui";

RootLayout.propTypes = {};
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function RootLayout(props) {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#F2F0EB",
    },
  };
  const { user } = useAuth();
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName={user ? ROUTES.HOME : ROUTES.LOGIN}
        screenOptions={{
          headerShown: false,
          // contentStyle: { paddingHorizontal: 10 },
        }}
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
          name={ROUTES.HOME}
          component={(props) => (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarStyle: {
                  marginHorizontal: 10,
                  borderRadius: 20,
                  marginBottom: 20,
                  padding: 5,
                  zIndex: 999,
                  // backgroundColor: backgroundColor,
                },
                tabBarIcon: ({ color, size }) => {
                  let iconName;
                  if (route.name === ROUTES.HOME) {
                    iconName = "home-outline";
                  } else if (route.name === ROUTES.PROJECTS) {
                    iconName = "folder-outline";
                  } else if (route.name === ROUTES.CHAT) {
                    iconName = "chatbubbles-outline";
                  } else if (route.name === ROUTES.PROFILE) {
                    iconName = "person-outline";
                  } else if (route.name === "Add") {
                    iconName = "add-circle-outline";
                  }
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "green", // Set active tab text/icon color to white
                tabBarInactiveTintColor: "#CCCCCC",
                tabBarShowLabel: false,
              })}
            >
              <Tab.Screen
                name={ROUTES.HOME}
                options={{
                  headerTitle: (props) => <HomeHeader {...props} />,
                  headerRight: (props) => (
                    <View
                      style={{
                        backgroundColor: "#bebebe",
                        borderRadius: 50,
                        padding: 8,
                      }}
                    >
                      <Ionicons name="notifications-outline" size={28} />
                    </View>
                  ),
                  headerRightContainerStyle: {
                    paddingRight: 10,
                  },
                }}
                component={HomeScreen}
              />
              <Tab.Screen
                name={ROUTES.PROJECTS}
                options={{
                  headerRight: (props) => (
                    <TouchableOpacity>
                      <SimpleLineIcons name="plus" size={35} />
                    </TouchableOpacity>
                  ),
                }}
                component={ProfileScreen}
              />
              <Tab.Screen
                name={ROUTES.CHAT}
                options={{
                  headerRight: (props) => (
                    <TouchableOpacity>
                      <SimpleLineIcons name="plus" size={35} />
                    </TouchableOpacity>
                  ),
                }}
                component={ProfileScreen}
              />
              <Tab.Screen
                name={ROUTES.PROFILE}
                options={{
                  headerRight: (props) => (
                    <TouchableOpacity>
                      <Text>Sign out</Text>
                    </TouchableOpacity>
                  ),
                  headerRightContainerStyle: {
                    paddingRight: 10,
                  },
                }}
                component={ProfileScreen}
              />
            </Tab.Navigator>
          )}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootLayout;
