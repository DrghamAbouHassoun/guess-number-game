import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  status: "authenticated" | "unauthenticated";
  user: {
    name: string;
  }
}

const initialState: InitialState = {
  status: "unauthenticated",
  user: {
    name: "",
  }
}

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    handleRegister: (state: InitialState, action: PayloadAction<{ name: string }>) => {
      state.user = action.payload;
      state.status = "authenticated";
    },
    handleLogout: (state: InitialState) => {
      state.user = { name: "" }
      state.status = "unauthenticated";
    }
  },
})

export const { 
  handleRegister,
  handleLogout,
} = authSlice.actions;

export default authSlice.reducer;