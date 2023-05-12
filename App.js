import React, { useState, useEffect } from "react";
import {} from "react-native";
import Main from "./components/main";

import { useFonts } from "expo-font";

import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
