// searchSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface SearchState {
  isSearchOpen: boolean;
}

const initialState: SearchState = {
  isSearchOpen: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    toggleSearchMenu(state) {
      state.isSearchOpen = !state.isSearchOpen;
    },
  },
});

export const { toggleSearchMenu } = searchSlice.actions;
export default searchSlice.reducer;
