import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export type ValueType = {
  id: string;
  url: string;
  currentURL: string | null;
  title: string;
  isActive: boolean;
  status?: "Loading" | "Loaded" | "Failed" | null;
};

const initialState = {
  value: [
    {
      id: uuidv4(),
      url: null,
      currentURL: null,
      title: "New Tab",
      isActive: true,
      status: null,
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
    modifyTab: (
      state,
      action: PayloadAction<{
        id: string;
        url?: string | null;
        currentURL?: string | null;
        title?: string;
        isActive?: boolean;
        status?: "Loading" | "Loaded" | "Failed" | null;
      }>
    ) => {
      const { id, url, title, isActive, status, currentURL } = action.payload;
      const targetObject = state.value.find((item) => item.id === id);
      const propertiesToUpdate = {
        url,
        title,
        isActive,
        status,
        currentURL,
      };
      for (const [property, value] of Object.entries(propertiesToUpdate)) {
        if (value !== undefined && property in targetObject) {
          targetObject[property] = value;
        }
      }
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
  modifyTab,
} = Tabs.actions;
export default Tabs.reducer;
