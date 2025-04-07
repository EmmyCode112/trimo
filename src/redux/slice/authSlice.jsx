import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";

// Retrieve token and userData safely
const token = Cookies.get("authToken") || null;
let userData = null;

try {
  userData = JSON.parse(Cookies.get("userData") || "{}");
} catch (error) {
  userData = null;
}

const initialState = {
  isAuthenticated: !!token, // Authenticated if token exists
  user: userData, // Load user data from cookies
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;

      // Ensure token exists in payload
      if (action.payload.token) {
        Cookies.set("authToken", action.payload.token, { expires: 7 });
      }

      Cookies.set("userData", JSON.stringify(action.payload), { expires: 7 });
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;

      Cookies.remove("authToken");
      Cookies.remove("userData");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
