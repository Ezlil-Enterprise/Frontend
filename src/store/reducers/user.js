import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: { 
    username: "",
    email: "",
    password: "",
    isAdmin: false,
  },
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.userInfo = initialState.userInfo;
      state.isLoggedIn = false;
    },
    updateFormValue(state, action) {
      const { field, value } = action.payload;
      state.userInfo[field] = value;
    },
  },
});

export const { setUser, logout, updateFormValue } = userSlice.actions;
export default userSlice.reducer;
