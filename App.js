import React, { useState, useEffect } from "react";
import {} from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { useRoute } from "./router";
import { useFonts } from "expo-font";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";

console.log("auth", auth);

export default function App() {
  const [user, setUser] = useState(null);

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/firebase.User
  //     const uid = user.uid;
  //     (user) => setUser(user);
  //     // console.log("uid", uid);
  //     console.log("user++++++++", user);

  //     // ...
  //   } else {
  //     // User is signed out
  //     // ...
  //   }
  // });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // const uid = user.uid;
      } else {
        setUser(null);
      }
    });

    // Clean up subscription on unmount
    return unsubscribe;
  }, []);

  // console.log("user++++++++", user);

  const routing = useRoute(user);

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}
