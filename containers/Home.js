import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  View,
} from "react-native";
import axios from "axios";

import RoomList from "../components/RoomList";

const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );

        if (response.status === 200) {
          setRooms(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.Home}>
      {isLoading ? (
        <ActivityIndicator color="#EB5A62" style={styles.Loading} />
      ) : (
        <View>
          <FlatList
            data={rooms}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => (
              <RoomList item={item} index={index} length={rooms.length - 1} />
            )}
          />
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  Home: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  Loading: {
    marginTop: Dimensions.get("window").height / 3,
  },
});
