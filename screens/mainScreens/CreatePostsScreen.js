import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

// const initialState = {
//   name: "",
//   location: "",
// };

const CreatePostsScreen = ({ navigation }) => {
  // const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);
  const [location, setLocation] = useState(null);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    console.log("latitude", location.coords.latitude);
    console.log("longitude", location.coords.longitude);
    setPhoto(photo.uri);
    console.log("photo", photo);
  };

  const sendPhoto = () => {
    navigation.navigate("DefaultScreen", { photo });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status);
    })();
  }, []);

  useEffect(() => {
    if (locationPermission === "granted") {
      (async () => {
        try {
          const location = await Location.getCurrentPositionAsync();
          setLocation(location);
        } catch (error) {
          console.log("Error getting location", error);
        }
      })();
    }
  }, [locationPermission]);

  return (
    <View style={styles.container}>
      {/* <View style={styles.cameraContainer}> */}
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ height: 100, width: 100 }}
            />
          </View>
        )}
        <TouchableOpacity style={styles.snapContainer} onPress={takePhoto}>
          <FontAwesome name="camera" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </Camera>
      {/* </View> */}

      <Text style={styles.text}>Загрузити фото</Text>
      <TextInput
        style={styles.inputText}
        placeholder="Назва локації..."
        onFocus={() => setIsShowKeyboard(true)}
        // value={state.name}
        // onChangeText={(value) =>
        //   setState((prevState) => ({ ...prevState, name: value }))
        // }
      />
      <View style={styles.inputContainer}>
        <Feather name="map-pin" size={24} color="#BDBDBD" style={styles.icon} />
        <TextInput
          style={styles.inputText}
          placeholder="Місцевість..."
          onFocus={() => setIsShowKeyboard(true)}
          // value={state.location}
          // onChangeText={(value) =>
          //   setState((prevState) => ({ ...prevState, location: value }))
          // }
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.btn}
        onPress={sendPhoto}
      >
        <Text style={styles.btnTitle}>Опублікувати</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 10,
  },
  // cameraContainer: {
  //   flex: 1,
  //   borderRadius: 8,
  //   overflow: "hidden",
  // },
  camera: {
    height: "50%",
    // width: "100%",

    backgroundColor: "#F6F6F6",

    borderWidth: 10,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    // flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  snap: {
    color: "#fff",
  },
  snapContainer: {
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  takePhotoContainer: {
    position: "absolute",
    top: 50,
    left: 10,
    borderColor: "#fff",
    borderWidth: 1,
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#212121",
    marginTop: 8,
    marginBottom: 48,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 32,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  icon: {
    marginRight: 8,
  },
  inputText: {
    marginTop: 40,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#212121",
    marginTop: 8,
  },
  btn: {
    backgroundColor: "#F6F6F6",
    marginHorizontal: 16,
    borderRadius: 100,
    height: 51,
    marginTop: 27,
    marginBottom: 16,
    paddingTop: 16,
    paddingBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    fontFamily: "Roboto-Regular",
    color: "black",
    fontSize: 16,
  },
});

export default CreatePostsScreen;
