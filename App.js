import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import Home from "./containers/Home";
import Room from "./containers/Room";
import Profile from "./containers/Profile";
import Settings from "./containers/Settings";

const airbnbLogo = require("./assets/airbnb-logo.png");

const App = () => {
  const [token, setToken] = useState(AsyncStorage.getItem("token") || null);

  const connection = async (userToken) => {
    console.log("connection");
    try {
      if (userToken) {
        await AsyncStorage.setItem("token", userToken);
        setToken(AsyncStorage.getItem("token"));
      } else {
        await AsyncStorage.removeItem("token");
        setToken(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("token =", token);
  return (
    <NavigationContainer>
      {!token ? (
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen
            name="SignIn"
            options={{
              title: "Sign In",
              headerStyle: { backgroundColor: "#EB5A62" },
              headerTintColor: "white",
            }}
          >
            {(props) => (
              <SignInScreen
                {...props}
                setToken={setToken}
                connection={connection}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="SignUp"
            options={{
              title: "Sign Up",
              headerStyle: { backgroundColor: "#EB5A62" },
              headerTintColor: "white",
            }}
          >
            {(props) => <SignUpScreen {...props} connection={connection} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <Tab.Navigator tabBarOptions={{ activeTintColor: "#EB5A62" }}>
          <Tab.Screen
            name="Home"
            option={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name={"ios-settings"} size={size} color={color} />
              ),
            }}
          >
            {() => (
              <Stack.Navigator
              // screenOptions={{ headerStyle: { backgroundColor: "yellow" } }}
              >
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{
                    headerTitle: () => (
                      <Image
                        source={airbnbLogo}
                        style={{ height: 40, resizeMode: "contain" }}
                      />
                    ),
                    headerTitleStyle: { color: "white" },
                  }}
                />
                <Stack.Screen
                  name="Room"
                  component={Room}
                  options={{
                    headerTintColor: "#EB5A62",
                    headerTitle: () => (
                      <Image
                        source={airbnbLogo}
                        style={{ height: 40, resizeMode: "contain" }}
                      />
                    ),
                  }}
                />
              </Stack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Settings"
            options={{
              tabBarLabel: "Settings",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name={"ios-options"} size={size} color={color} />
              ),
            }}
          >
            {() => (
              <Stack.Navigator>
                <Tab.Screen
                  name="Settings"
                  // component={Settings}
                  options={{
                    headerStyle: { backgroundColor: "#EB5A62" },
                    headerTitleStyle: { color: "white" },
                  }}
                >
                  {(props) => <Settings {...props} connection={connection} />}
                </Tab.Screen>
              </Stack.Navigator>
            )}
          </Tab.Screen>
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
