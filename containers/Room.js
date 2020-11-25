import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Image,
} from "react-native";
import axios from "axios";
import SwiperFlatList from "react-native-swiper-flatlist";
import MapView from "react-native-maps";

import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Room = ({ route }) => {
  const { id } = route.params;

  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState({});
  const [showMore, setShowMore] = useState(3);

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < room.ratingValue) {
      stars.push("#FFB107");
    } else {
      stars.push("#BDBDBD");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${id}`
        );

        if (response.status === 200) {
          setRoom(response.data);
          setIsLoading(false);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.Room}>
      {isLoading ? (
        <ActivityIndicator color="#EB5A62" style={styles.Loading} />
      ) : (
        <>
          <View style={styles.Image_container}>
            <SwiperFlatList
              autoplay
              autoplayDelay={2}
              autoplayLoop
              index={0}
              showPagination
            >
              {room.photos.map((photo, index) => {
                return (
                  <Image
                    key={index}
                    source={{ uri: photo.url }}
                    style={styles.Image}
                  />
                );
              })}
            </SwiperFlatList>
          </View>
          <Text style={styles.Price}>{room.price} €</Text>

          <View style={styles.Room_infos_container}>
            <View style={{ flex: 1 }}>
              <Text style={styles.Title} numberOfLines={1}>
                {room.title}
              </Text>
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
                <Text style={{ color: "#BDBDBD" }}>{room.reviews} reviews</Text>
              </View>
            </View>
            <Image
              source={{ url: room.user.account.photo.url }}
              style={styles.User_picture}
            />
          </View>
          <View style={styles.Description_container}>
            <Text numberOfLines={showMore}>{room.description}</Text>
            <TouchableOpacity
              onPress={() => {
                showMore === 3 ? setShowMore(null) : setShowMore(3);
              }}
            >
              <Text style={styles.Show_description}>{`Show ${
                showMore === 3 ? "more" : "less"
              }`}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 400 }}>
            <MapView
              initialRegion={{
                // latitude: 2.3215788,
                // longitude: 48.8480923,
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default Room;

const styles = StyleSheet.create({
  Room: {
    flex: 1,
    backgroundColor: "#fff",
  },
  Loading: {
    marginTop: Dimensions.get("window").height / 3,
  },
  Image_container: {
    height: 300,
  },
  Image: { height: "100%", width: Dimensions.get("window").width },
  Price: {
    position: "absolute",
    top: 250,
    color: "#fff",
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  Room_infos_container: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Title: {
    fontSize: 18,
    // flexWrap: "wrap",
    // width: "100%",
  },
  Stars: {
    marginTop: 15,
    flexDirection: "row",
  },
  User_picture: { height: 80, width: 80, borderRadius: 50, marginLeft: 20 },
  Description_container: {
    paddingHorizontal: 20,
  },
  Show_description: {
    marginTop: 10,
    fontSize: 12,
    color: "#BDBDBD",
  },
});
