import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateCurrentUser,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { authSlice } from "./authReducer";
import { current } from "@reduxjs/toolkit";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser =
  ({ email, password, nickname }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;

      await updateProfile(user, {
        displayName: nickname,
      });

      const { displayName, uid } = await auth.currentUser;

      // console.log("displayName, uid-----", displayName, uid);

      const userUpdateProfile = {
        nickName: displayName,
        userId: uid,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      // console.log("error", error);
      // console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("user------------------", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.code", error.code);
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  // console.log("user", user);
  dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        nickName: user.displayName,
        userId: user.uid,
      };
      dispatch(authStateChange({ stateChange: true }));

      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};
