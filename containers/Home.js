import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const Home = ({ navigation }) => {
  return (
    <View style={styles.Home}>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
        color="#EB5A62"
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  Home: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
