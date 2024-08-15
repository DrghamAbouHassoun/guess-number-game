import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import gameReducer from './features/gameSlice';
import authReducer from './features/authSlice';
import chatReducer from './features/chatSlice';
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"]
}


const rootReducer= combineReducers({
  game: gameReducer,
  auth: authReducer,
  chat: chatReducer,
})


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
  })

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

