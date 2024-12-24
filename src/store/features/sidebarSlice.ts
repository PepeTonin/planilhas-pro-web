import { getAllGroupsByIdProfessor } from "@/api/sidebar";
import { FetchedGroup } from "@/types/groups";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISelectedItem {
  parentId: number;
  itemId: number;
}

interface ISidebarSlice {
  isManagementSelected: boolean;
  accordionGroupOpened: number;
  itemGroupSelected: ISelectedItem;
  groups: FetchedGroup[];
  loadingGroups: boolean;
  hasError: boolean;
}

const initialState: ISidebarSlice = {
  isManagementSelected: false,
  accordionGroupOpened: -1,
  itemGroupSelected: { parentId: -1, itemId: -1 },
  groups: [],
  loadingGroups: false,
  hasError: false,
};

export const getSidebarGroups = createAsyncThunk(
  "sidebar/getGroups",
  async (id: number) => {
    const response = await getAllGroupsByIdProfessor(id);
    return response;
  }
);

export const SidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setIsManagementSelected: (state, action: PayloadAction<boolean>) => {
      state.isManagementSelected = action.payload;
    },
    setAccordionGroupOpened: (state, action: PayloadAction<number>) => {
      state.accordionGroupOpened = action.payload;
    },
    setItemSubGroupSelected: (state, action: PayloadAction<ISelectedItem>) => {
      state.itemGroupSelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSidebarGroups.fulfilled, (state, action) => {
      if (action.payload) {
        state.groups = action.payload;
      }
      state.loadingGroups = false;
      state.hasError = false;
    });
    builder.addCase(getSidebarGroups.pending, (state) => {
      state.loadingGroups = true;
    });
    builder.addCase(getSidebarGroups.rejected, (state) => {
      state.loadingGroups = false;
      state.hasError = true;
    });
  },
});

export const {
  setIsManagementSelected,
  setAccordionGroupOpened,
  setItemSubGroupSelected,
} = SidebarSlice.actions;
