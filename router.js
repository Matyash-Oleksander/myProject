import React, { useState } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import PostsScreen from "./screens/mainScreens/PostsScreen";
import CreatePostsScreen from "./screens/mainScreens/CreatePostsScreen";
import ProfileScreen from "./screens/mainScreens/ProfileScreen";
// import DefaultScreenPosts from "./screens/nestedScreens/DefaultScreenPosts";

const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

// import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <MainStack.Navigator>
        <MainStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <MainStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
      </MainStack.Navigator>
    );
  } else {
    return (
      <MainTab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: [{ display: "flex" }, null],
        }}
      >
        <MainTab.Screen
          name="Posts"
          component={PostsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, size, color }) => (
              <Feather name="grid" size={24} color={color} />
            ),
          }}
        />
        <MainTab.Screen
          name="Create"
          component={CreatePostsScreen}
          options={{
            headerTitle: "Публікації",
            headerTitleAlign: "center",
            headerRight: () => (
              <Feather
                name="log-out"
                size={24}
                color="black"
                style={{ marginRight: 16 }}
              />
            ),

            tabBarIcon: ({ focused, size, color }) => (
              <AntDesign name="pluscircleo" size={24} color={color} />
            ),
          }}
        />
        <MainTab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, size, color }) => (
              <Feather name="user" size={24} color={color} />
            ),
          }}
        />
      </MainTab.Navigator>
    );
  }
};
