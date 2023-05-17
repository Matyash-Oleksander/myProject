import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Image, Button, Text } from "react-native";
import { storage, db, database } from "../../firebase/config";
import { doc, onSnapshot, collection } from "firebase/firestore";

import { Feather } from "@expo/vector-icons";

const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const getAllPost = () => {
    const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ width: 350, height: 200 }}
            />
            <View>
              <Text style={styles.location}>{item.comment}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Feather
                name="message-circle"
                size={24}
                color="black"
                onPress={() => navigation.navigate("Comments")}
              />

              <Feather
                name="map-pin"
                size={24}
                color="#BDBDBD"
                style={styles.icon}
                onPress={() =>
                  navigation.navigate("Map", { location: item.location })
                }
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
  },
  location: {
    textAlign: "left",
    justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default DefaultScreenPosts;
