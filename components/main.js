import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../router";
// import { auth } from "../firebase/config";
// import { onAuthStateChanged } from "firebase/auth";
import { authStateChangeUser } from "../redux/auth/authOperations";

const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  //   console.log("state----------------", state);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoute(stateChange);
  console.log("stateChange----------------", stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
