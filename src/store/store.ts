import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { SidebarSlice } from "./features/sidebarSlice";
import { AuthSlice } from "./features/authSlice";
import { HomeSlice } from "./features/homeSlice";

export const store = configureStore({
  reducer: {
    sidebar: SidebarSlice.reducer,
    auth: AuthSlice.reducer,
    home: HomeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
