import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export type ValueType = {
  id: string;
  url: string;
  title: string;
  isActive: boolean;
};

const initialState = {
  value: [
    {
      id: uuidv4(),
      url: "https://google.com",
      title: "Google",
      isActive: true,
    },
  ],
} as { value: ValueType[] };

export const Tabs = createSlice({
  name: "Tabs",
  initialState,
  reducers: {
    addTab: (state, action: PayloadAction<ValueType>) => {
      state.value.push(action.payload);
      state.value.forEach((item) => (item.isActive = false));
      state.value.find((item) => item.id == action.payload.id).isActive = true;
    },
    removeTab: (state, action: PayloadAction<string>) => {
      const index = state.value.findIndex((item) => item.id == action.payload);
      state.value.splice(index, 1);
      if (state.value.length == 1 && state.value[0].isActive == false) {
        state.value[0].isActive = true;
      } else if (state.value.length >= 1) {
        state.value.forEach((item) => (item.isActive = false));
        if (index <= state.value.length - 1) state.value[index].isActive = true;
        else state.value[index - 1].isActive = true;
      }
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      const isAlreadyActive = state.value.find(
        (item) => item.id == action.payload
      );
      if (isAlreadyActive && !isAlreadyActive.isActive) {
        state.value.forEach((item) => (item.isActive = false));
        const foundTab = state.value.find((item) => item.id == action.payload);
        foundTab.isActive = true;
      }
    },
    closeRightTabs: (state, action: PayloadAction<string>) => {
      const index = state.value.findIndex((item) => item.id == action.payload);
      if (index !== -1) {
        for (let i = state.value.length - 1; i > index; i--) {
          state.value.splice(i, 1);
        }
      }
    },
    closeLeftTabs: (state, action: PayloadAction<string>) => {
      const index = state.value.findIndex((item) => item.id == action.payload);
      if (index !== -1) {
        for (let i = index - 1; i >= 0; i--) {
          state.value.splice(i, 1);
        }
      }
    },
    closeAllTabs: (state) => {
      state.value.splice(0, state.value.length);
    },
    closeOtherTabs: (state, action: PayloadAction<string>) => {
      const tab = state.value.find((item) => item.id == action.payload);
      const newArray = tab ? [tab] : [];
      state.value.splice(0, state.value.length, ...newArray);
    },
  },
});

export const {
  addTab,
  removeTab,
  setActiveTab,
  closeRightTabs,
  closeLeftTabs,
  closeAllTabs,
  closeOtherTabs,
} = Tabs.actions;
export default Tabs.reducer;