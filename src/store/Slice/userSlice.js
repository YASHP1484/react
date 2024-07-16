import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userListing: [],
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    setUserList: (state, action) => {
      state.userListing = action.payload;
    },
  },
});

export const { setUserList } = userSlice.actions;

export default userSlice.reducer;



