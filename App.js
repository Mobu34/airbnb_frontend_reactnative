import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import Home from "./containers/Home";
import Profile from "./containers/Profile";
import Settings from "./containers/Settings";

const App = () => {
  const [token, setToken] = useState(false);
  return (
    <NavigationContainer>
      {!token ? (
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen
            name="SignIn"
            options={{
              title: "Sign In",
              headerStyle: { backgroundColor: "#EB5A62" },
              headerTitleStyle: { color: "white" },
            }}
          >
            {(props) => <SignInScreen {...props} setToken={setToken} />}
          </Stack.Screen>
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              title: "Sign Up",
              headerStyle: { backgroundColor: "#EB5A62" },
              headerTitleStyle: { color: "white" },
              headerBackTitleStyle: { color: "white" },
            }}
          />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator tabBarOptions={{ activeTintColor: "#EB5A62" }}>
          <Tab.Screen
            name="Home"
            option={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name={"ios-home"} size={size} color={color} />
              ),
            }}
          >
            {() => (
              <Stack.Navigator>
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{
                    headerStyle: { backgroundColor: "#EB5A62" },
                    headerTitleStyle: { color: "white" },
                  }}
                />
                <Stack.Screen
                  name="Profile"
                  component={Profile}
                  options={{
                    headerStyle: { backgroundColor: "#EB5A62" },
                    headerTitleStyle: { color: "white" },
                    headerBackTitleStyle: { color: "white" },
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
                  component={Settings}
                  options={{
                    headerStyle: { backgroundColor: "#EB5A62" },
                    headerTitleStyle: { color: "white" },
                  }}
                />
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
