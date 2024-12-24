import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { ReqUserLogin, FetchedUserLogin } from "@/types/users";

import { tryLogin } from "@/api/auth";

interface IAuthSlice {
  isLogged: boolean;
  isLogging: boolean;
  user: FetchedUserLogin;
}

const initialState: IAuthSlice = {
  isLogged: false,
  isLogging: false,
  user: {
    id: 1,
    nome: "",
    email: "",
    role: "professor",
  },
};

export const login = createAsyncThunk(
  "auth/login",
  async (user: ReqUserLogin, thunkAPI) => {
    return await tryLogin(user);
  }
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLogged: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload;
    },
    setIsLogging: (state, action: PayloadAction<boolean>) => {
      state.isLogging = action.payload;
    },
    setUser: (state, action: PayloadAction<FetchedUserLogin>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload) {
        state.isLogged = true;
        state.user = action.payload;
      }
      state.isLogging = false;
    });
    builder.addCase(login.pending, (state, action) => {
      state.isLogging = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLogged = false;
      state.isLogging = false;
    });
  },
});

export const { setIsLogged, setIsLogging, setUser } = AuthSlice.actions;
