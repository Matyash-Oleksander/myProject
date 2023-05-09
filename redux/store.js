import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { authSlice } from "./auth/authReducer";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
// ----------------------------------
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { persistReducer, persistStore } from "redux-persist";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// import { authSlice } from "./auth/authReducer";

// const rootReducer = combineReducers({
//   [authSlice.name]: authSlice.reducer,
// });

// const persistConfig = {
//   key: "root",
//   storage: AsyncStorage,
//   whitelist: ["auth"], // persist only the "auth" slice of the state
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
// });

// const persistor = persistStore(store);

// export { store, persistor };

// -----------------------
// import { configureStore } from "@reduxjs/toolkit";
// import  combineReducer  from "./rootReduser";

// const store = configureStore(
//     {
//         reducer: combineReducer,
//     }
// );

// export default store;
