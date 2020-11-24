import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

const airbnbLogo = require("../assets/airbnb-logo.png");

const SignInScreen = ({ navigation, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (email && password) {
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            headers: {
              "content-type": "application/json",
            },
            email,
            password,
          }
        );

        if (response.status === 200) {
          console.log(response.data);
          alert("Connected");
          setToken(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.SignInScreen}>
      <Image source={airbnbLogo} />
      <View>
        <TextInput
          placeholder="email"
          style={styles.SignInScreen_input}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="password"
          style={styles.SignInScreen_input}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.SignInScreen_loginBtn_container}
          onPress={handleSubmit}
        >
          <Text style={styles.SignInScreen_loginBtn}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.SignInScreen_SignupBtn_container}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.SignInScreen_SignupBtn}>
            No account ? Register
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  SignInScreen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 5,
  },
  SignInScreen_input: {
    borderBottomColor: "rgba(235, 90, 98, 0.5)",
    borderBottomWidth: 2,
    paddingBottom: 5,
    marginBottom: 20,
    width: 300,
    maxWidth: Dimensions.get("screen").width,
  },
  SignInScreen_loginBtn_container: {
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "rgb(235, 90, 98)",
  },
  SignInScreen_loginBtn: {
    fontSize: 18,
  },
  SignInScreen_SignupBtn_container: {
    alignItems: "center",
  },
  SignInScreen_SignupBtn: {
    fontSize: 12,
    color: "#9C9C9C",
  },
});
