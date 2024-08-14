import randomNumberGenerator from "@/helpers/randomNumberGenerator";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  randomPoint: number;
  currentPoints: number;
  biddingPoints: number;
  biddingMultiplier: number;
  isGameStarted: boolean;
  records: {
    biddingPoints: number;
    result: number;
  }[],
  botPlayers: { 
    name: string;
    biddingMultiplier: number;
    points: number;
    biddingPoint: number;
  }[];
}

const initialState: InitialState = {
  randomPoint: 10,
  currentPoints: 400,
  biddingMultiplier: 0,
  biddingPoints: 0,
  isGameStarted: false,
  records: [],
  botPlayers: [
    {
      name: "CPU 1",
      points: 400,
      biddingPoint: 0,
      biddingMultiplier: 1,
    },
    {
      name: "CPU 2",
      points: 400,
      biddingPoint: 0,
      biddingMultiplier: 1,
    },
    {
      name: "CPU 3",
      points: 400,
      biddingPoint: 0,
      biddingMultiplier: 1,
    },
    {
      name: "CPU 4",
      points: 400,
      biddingPoint: 0,
      biddingMultiplier: 1,
    },
  ]

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
      console.log("Bidding Points: ", state.biddingPoints);
      console.log("Random Point: ", state.randomPoint);
      if (state.biddingMultiplier <= state.randomPoint) {
        console.log("SUm: ",state.biddingPoints * state.biddingMultiplier)
        state.currentPoints += state.biddingPoints * state.biddingMultiplier;
        state.records.push({ biddingPoints: state.biddingPoints, result: state.biddingPoints * state.biddingMultiplier })
      } else {
        state.currentPoints -= state.biddingPoints;
        state.records.push({ biddingPoints: state.biddingPoints, result: -state.biddingPoints })
      }
      state.biddingMultiplier = 0;
      state.biddingPoints = 0;

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