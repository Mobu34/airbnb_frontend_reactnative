import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

const airbnbLogo = require("../assets/airbnb-logo.png");

const SignUpScreen = ({ navigation, connection }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);

  const handleSubmit = async () => {
    if (password !== passwordConf) {
      setErrorPassword(true);
    } else {
      if (errorPassword) {
        setErrorPassword(false);
      }

      const regex = new RegExp("@", "i");
      if (regex.test(email) && username && password && passwordConf) {
        try {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              headers: {
                "Content-Type": "application/json",
              },
              email,
              username,
              description,
              password,
            }
          );

          if (response.status === 200) {
            connection(response.data.token);
          }
        } catch (error) {
          console.log(error.response);
        }
      }
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.SignUpScreen}>
      <Image source={airbnbLogo} />
      <View>
        <TextInput
          placeholder="email"
          style={styles.SignUpScreen_input}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="username"
          style={styles.SignUpScreen_input}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          placeholder="Describe yourself in a few words..."
          multiline={true}
          numberOfLines={4}
          style={styles.SignUpScreen_textArea}
          onChangeText={(text) => setDescription(text)}
        />
        <TextInput
          placeholder="password"
          style={styles.SignUpScreen_input}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <TextInput
          placeholder="confirm password"
          style={styles.SignUpScreen_input}
          onChangeText={(text) => setPasswordConf(text)}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.SignUpScreen_btn_container}>
        <Text
          style={
            errorPassword
              ? styles.SignUpScreen_errorPassword
              : styles.SignUpScreen_errorPassword_inactive
          }
        >
          Password must be the same
        </Text>
        <TouchableOpacity
          style={styles.SignUpScreen_loginBtn_container}
          onPress={handleSubmit}
        >
          <Text style={styles.SignUpScreen_loginBtn}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.SignUpScreen_SignupBtn_container}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.SignUpScreen_SignupBtn}>
            Already have an account? Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  SignUpScreen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  SignUpScreen_input: {
    borderBottomColor: "rgba(235, 90, 98, 0.5)",
    borderBottomWidth: 2,
    paddingBottom: 5,
    marginBottom: 20,
    width: 300,
    maxWidth: Dimensions.get("screen").width,
  },
  SignUpScreen_textArea: {
    width: 300,
    height: 100,
    maxWidth: Dimensions.get("screen").width,
    borderColor: "rgba(235, 90, 98, 0.5)",
    borderWidth: 2,
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
  },
  SignUpScreen_btn_container: {
    position: "relative",
    alignItems: "center",
  },
  SignUpScreen_errorPassword: {
    color: "rgb(235, 90, 98)",
    fontSize: 12,
    position: "absolute",
    top: -20,
  },
  SignUpScreen_errorPassword_inactive: {
    display: "none",
  },
  SignUpScreen_loginBtn_container: {
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "rgb(235, 90, 98)",
  },
  SignUpScreen_loginBtn: {
    fontSize: 18,
  },
  SignUpScreen_SignupBtn_container: {
    alignItems: "center",
  },
  SignUpScreen_SignupBtn: {
    fontSize: 12,
    color: "#9C9C9C",
  },
});
