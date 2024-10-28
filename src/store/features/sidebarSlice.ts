import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISelectedItem {
  parentId: number;
  itemId: number;
}

interface ISidebarSlice {
  isManagementSelected: boolean;
  accordionGroupOpened: number;
  itemGroupSelected: ISelectedItem;
}

const initialState: ISidebarSlice = {
  isManagementSelected: false,
  accordionGroupOpened: -1,
  itemGroupSelected: { parentId: -1, itemId: -1 },
};

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
});

export default SidebarSlice.reducer;

export const {
  setIsManagementSelected,
  setAccordionGroupOpened,
  setItemSubGroupSelected,
} = SidebarSlice.actions;
