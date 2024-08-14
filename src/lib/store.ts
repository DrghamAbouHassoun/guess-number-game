import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './features/gameSlice';
import authReducer from './features/authSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      game: gameReducer,
      auth: authReducer
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore['dispatch'];