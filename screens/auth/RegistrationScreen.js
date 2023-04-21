import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  SafeAreaView,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const initialState = {
  login: "",
  email: "",
  password: "",
  photoUri: null,
};

export default function RegistrationScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Дайте дозвіл на доступ до камери та галереї!");
        }
      }
    })();
  }, []);

  const handleChoosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setState((prevState) => ({ ...prevState, photoUri: result.uri }));
    }
  };

  const onSignUp = () => {
    console.log(state);
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <ImageBackground
          style={{ ...styles.imageBg, height: "100%" }}
          source={require("../../assets/images/photo-bg.png")}
        >
          <SafeAreaView style={{ flex: 1, justifyContent: "flex-end" }}>
            <View style={styles.container}>
              <TouchableOpacity onPress={handleChoosePhoto}>
                <View style={styles.photo}>
                  {state.photoUri ? (
                    <Image
                      source={{ uri: state.photoUri }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : (
                    <AntDesign
                      name="pluscircleo"
                      size={25}
                      color="#FF6C00"
                      style={styles.avatarIcon}
                    />
                  )}
                </View>
              </TouchableOpacity>
              <Text style={styles.title}>Регистрация</Text>
              <View
                style={{
                  ...styles.form,
                  marginBottom: isShowKeyboard ? 10 : 80,
                }}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Логин"
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.login}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Адрес электронной почты"
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Пароль"
                  secureTextEntry={showPassword}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
                <TouchableOpacity
                  onPressIn={() => setShowPassword(false)}
                  onPressOut={() => setShowPassword(true)}
                >
                  <Text style={styles.btnShowPassword}>Показать</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={onSignUp}
              >
                <Text style={styles.btnTitle}>Зарегистрироваться</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.textLogin}>
                  Уже есть аккаунт? <Text> Войти</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  imageBg: {
    resizeMode: "cover",
    justifyContent: "center",
    // justifyContent: "flex-end",
  },
  container: {
    // flex: 1,
    // justifyContent: "flex-end",
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: "#fff",
    // alignItems: "center",
  },
  photo: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderColor: "#F6F6F6",
    borderRadius: 16,
    position: "absolute",
    left: "47%",
    transform: [{ translateX: -50 }, { translateY: -60 }],
  },
  avatarIcon: {
    position: "absolute",
    top: 81,
    left: 107,
  },
  form: {
    marginHorizontal: 16,
  },
  title: {
    color: "#212121",
    fontFamily: "Roboto-Bold",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    marginTop: 92,
    marginBottom: 33,
  },
  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    color: "#212121",
  },
  btnShowPassword: {
    position: "absolute",
    right: 16,
    top: -50,
    fontSize: 16,
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
  },
  btn: {
    backgroundColor: "#FF6C00",
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
    color: "#FFFFFF",
    fontSize: 16,
  },
  textLogin: {
    fontFamily: "Roboto-Regular",
    marginBottom: 78,
    textAlign: "center",
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
  },
});
