import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from "./authSlice.js"
import courseSlice from "./courseSlice.js"
import lectureSlice from "./lectureSlice.js"
// import testimonialReducer from "./testimonialSlice"; // Import the reducer
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PURGE,
  REGISTER,
  PERSIST
} from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
  key: "root",
  version :1,
  storage,
}

const rootReducer= combineReducers({
  auth : authSlice,
  course : courseSlice,
  lecture : lectureSlice,
  // testimonials : testimonialReducer,
  
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER]
    },
  })
})

export default store;