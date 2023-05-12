import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
// import { auth } from "../../firebase/config";
import { authSignOutUser } from "../../redux/auth/authOperations";
// import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      <Button title="signOut" onPress={signOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
