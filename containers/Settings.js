import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const Settings = ({ connection }) => {
  return (
    <View style={styles.Settings}>
      <Text>Settings</Text>
      <Button title="Logout" onPress={() => connection()} />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  Settings: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
