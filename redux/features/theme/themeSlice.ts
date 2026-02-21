import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeState } from "@/types/Theme";

// The initial state of the theme.
const initialState: ThemeState = {
  theme: "light",
};

// The theme slice that defines the theme actions.
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeState["theme"]>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
