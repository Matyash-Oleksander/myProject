import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const authSignUpUser =
  ({ email, password, nickname }) =>
  async (dispatch, getSatte) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      // console.log("user", user);
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
      // console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.code", error.code);
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getSatte) => {};

// ------------------------
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { app } from "../../firebase/config";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   updateProfile,
//   onAuthStateChanged,
// } from "firebase/auth";

// const auth = getAuth(app);

// export const authSignUpUser = createAsyncThunk(
//   "auth/fetchRegisterUser",
//   async (data, thunkAPI) => {
//     try {
//       const { mail, password, login, photo } = data;
//       const result = await createUserWithEmailAndPassword(auth, mail, password);
//       result &&
//         (await updateProfile(auth.currentUser, {
//           displayName: login,
//           photoURL: photo,
//         }));
//       return result.user;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );
