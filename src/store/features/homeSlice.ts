import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StudentsWithNotifications } from "@/types/notifications";

import { getHomeNotifications } from "@/api/home";

interface IHomeSlice {
  notifications: StudentsWithNotifications[];
  loadingNotifications: boolean;
  hasError: boolean;
}

const initialState: IHomeSlice = {
  notifications: [],
  loadingNotifications: false,
  hasError: false,
};

export const getNotifications = createAsyncThunk(
  "home/getNotifications",
  async (id: number) => {
    return await getHomeNotifications(id);
  }
);

export const HomeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setNotifications: (
      state,
      action: PayloadAction<StudentsWithNotifications[]>
    ) => {
      state.notifications = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotifications.fulfilled, (state, action) => {
      if (action.payload) {
        state.notifications = action.payload;
      }
      state.loadingNotifications = false;
      state.hasError = false;
    });
    builder.addCase(getNotifications.pending, (state) => {
      state.loadingNotifications = true;
    });
    builder.addCase(getNotifications.rejected, (state) => {
      state.loadingNotifications = false;
      state.hasError = true;
    });
  },
});

export const {} = HomeSlice.actions;
