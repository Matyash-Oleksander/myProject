import React, { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { useRoute } from "./router";
import { useFonts } from "expo-font";

export default function App() {
  const routing = useRoute({});
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <NavigationContainer>{routing}</NavigationContainer>;
}
