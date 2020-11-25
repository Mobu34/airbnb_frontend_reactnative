import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { FontAwesome } from "@expo/vector-icons";

const RoomList = ({ item, index, length }) => {
  const navigation = useNavigation();

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < item.ratingValue) {
      stars.push("#FFB107");
    } else {
      stars.push("#BDBDBD");
    }
  }

  return (
    <TouchableOpacity
      style={index === length ? styles.RoomList_lastElt : styles.RoomList}
      onPress={() => navigation.navigate("Room", { id: item._id })}
    >
      <View style={styles.Image_container}>
        <Image
          source={{
            uri: item.photos[0].url,
          }}
          style={styles.Image}
        />
      </View>
      <Text style={styles.Price}>{item.price} €</Text>
      <View style={styles.User_infos}>
        <View>
          <Text>{item.title}</Text>
          <View style={styles.Stars}>
            {stars.map((star, index) => {
              return (
                <FontAwesome
                  key={index}
                  name="star"
                  size={16}
                  color={star}
                  style={{ marginRight: 5 }}
                />
              );
            })}
            <Text style={{ color: "#BDBDBD" }}>{item.reviews} reviews</Text>
          </View>
        </View>
        <Image
          source={{ uri: item.user.account.photo.url }}
          style={styles.User_picture}
        />
      </View>
    </TouchableOpacity>
  );
};

export default RoomList;

const styles = StyleSheet.create({
  RoomList: {
    height: 300,
    width: "100%",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  RoomList_lastElt: {
    height: 300,
    width: "100%",
    marginVertical: 10,
  },
  Image_container: {
    height: "70%",
    position: "relative",
  },
  Image: {
    height: "100%",
    width: "100%",
  },
  Price: {
    position: "absolute",
    color: "#fff",
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    bottom: 100,
  },
  User_infos: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  Stars: {
    flexDirection: "row",
    marginTop: 10,
  },
  User_picture: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
});
