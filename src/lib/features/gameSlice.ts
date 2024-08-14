import randomNumberGenerator from "@/helpers/randomNumberGenerator";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  randomPoint: number;
  currentPoints: number;
  biddingPoints: number;
  biddingMultiplier: number;
  isGameStarted: boolean;
}

const initialState: InitialState = {
  randomPoint: 10,
  currentPoints: 400,
  biddingMultiplier: 0,
  biddingPoints: 0,
  isGameStarted: false,
}

export const gameSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {
    handleChangeCurrentPoinst: (state, action: PayloadAction<number>) => {
      state.currentPoints = action.payload;
    },
    handleChangeBiddingPoints: (state, action: PayloadAction<number>) => {
      state.biddingPoints = action.payload;
    },
    handleChangeBiddingMultiplier: (state, action: PayloadAction<number>) => {
      state.biddingMultiplier = action.payload;
    },
    handleStartGame: (state, action: PayloadAction<{ points: number, multiplier: number }>) => {
      state.randomPoint = randomNumberGenerator();
      state.biddingMultiplier = action.payload.multiplier
      state.biddingPoints = action.payload.points
      state.isGameStarted = true;
    },
    handleEndGame: (state) => {
      state.isGameStarted = false;
      if (state.biddingPoints <= state.randomPoint) {
        state.currentPoints = state.biddingPoints * state.biddingMultiplier;
      } else {
        state.currentPoints -= state.biddingMultiplier;
      }
    }
  }
})

export const { 
  handleChangeBiddingMultiplier, 
  handleChangeBiddingPoints, 
  handleChangeCurrentPoinst,
  handleStartGame,
  handleEndGame,
} = gameSlice.actions;

export default gameSlice.reducer;