import randomNumberGenerator, { generateRandomNumber } from "@/helpers/randomNumberGenerator";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  randomPoint: number;
  currentPoints: number;
  biddingPoints: number;
  biddingMultiplier: number;
  isRoundStarted: boolean;
  records: {
    biddingPoints: number;
    result: number;
  }[],
  botPlayers: {
    name: string;
    biddingMultiplier: number;
    points: number;
    biddingPoints: number;
  }[];
  currentRound: number;
  isGameEnded: boolean;
  // gameRounds: {
  //   currentRound: number,
  //   gameRecords: {
  //     roundNumber: number;
  //     records: 
  //   }[]
  // }
}

const initialState: InitialState = {
  currentRound: 0,
  randomPoint: 10,
  currentPoints: 400,
  biddingMultiplier: 0,
  biddingPoints: 0,
  isRoundStarted: false,
  isGameEnded: false,
  records: [],
  botPlayers: [
    {
      name: "CPU 1",
      points: 400,
      biddingPoints: 0,
      biddingMultiplier: 1,
    },
    {
      name: "CPU 2",
      points: 400,
      biddingPoints: 0,
      biddingMultiplier: 1,
    },
    {
      name: "CPU 3",
      points: 400,
      biddingPoints: 0,
      biddingMultiplier: 1,
    },
    {
      name: "CPU 4",
      points: 400,
      biddingPoints: 0,
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
    handleStartRound: (state, action: PayloadAction<{ points: number, multiplier: number }>) => {
      state.botPlayers = state.botPlayers.map(item => {
        if (item.points > 50) {
          return ({
            ...item,
            biddingMultiplier: randomNumberGenerator(),
            biddingPoint: generateRandomNumber(item.points),
          })
        } else if (item.points <= 50 && item.points > 0) {
          return ({
            ...item,
            biddingMultiplier: randomNumberGenerator(),
            biddingPoint: item.points,
          })
        } else {
          return item;
        }
      })
      state.randomPoint = randomNumberGenerator();
      state.biddingMultiplier = action.payload.multiplier
      state.biddingPoints = action.payload.points
      state.isRoundStarted = true;
    },
    handleEndRound: (state) => {
      state.isRoundStarted = false;
      state.botPlayers = state.botPlayers.map(item => {
        if (item.biddingMultiplier <= state.randomPoint) {
          return ({
            ...item,
            points: item.points + item.biddingPoints * item.biddingMultiplier,
          })
        } else {
          return ({
            ...item,
            points: item.points - item.biddingPoints,
          })
        }
      })
      if (state.biddingMultiplier <= state.randomPoint) {
        console.log("SUm: ", state.biddingPoints * state.biddingMultiplier)
        state.currentPoints += state.biddingPoints * state.biddingMultiplier;
        state.records.push({ biddingPoints: state.biddingPoints, result: state.biddingPoints * state.biddingMultiplier })
      } else {
        state.currentPoints -= state.biddingPoints;
        state.records.push({ biddingPoints: state.biddingPoints, result: -state.biddingPoints })
      }
      // state.biddingMultiplier = 1;
      // state.biddingPoints = 0;
      state.currentRound += 1;
    },
    handleEndGame: (state) => {
      state.isGameEnded = true;
    }
  }
})

export const {
  handleChangeBiddingMultiplier,
  handleChangeBiddingPoints,
  handleChangeCurrentPoinst,
  handleStartRound,
  handleEndRound,
  handleEndGame,
} = gameSlice.actions;

export default gameSlice.reducer;