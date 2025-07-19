import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// optionally define a User type
interface User {
  email: string;
  name?: string;
  id?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
}

// Function to get initial state from localStorage
const getInitialState = (): AuthState => {
  try {
    const token = localStorage.getItem("authToken");
    const userStr = localStorage.getItem("authUser");
    
    if (token && userStr) {
      const user = JSON.parse(userStr);
      return {
        isAuthenticated: true,
        token,
        user,
      };
    }
  } catch (error) {
    console.error("Error loading auth state from localStorage:", error);
  }
  
  return {
    isAuthenticated: false,
    token: null,
    user: null,
  };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (
      state,
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;

      localStorage.setItem("authToken", action.payload.token);
      localStorage.setItem("authUser", JSON.stringify(action.payload.user));
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;

      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
    },
    // Optional: Action to restore auth state manually if needed
    restoreAuth: (state) => {
      try {
        const token = localStorage.getItem("authToken");
        const userStr = localStorage.getItem("authUser");
        
        if (token && userStr) {
          const user = JSON.parse(userStr);
          state.isAuthenticated = true;
          state.token = token;
          state.user = user;
        }
      } catch (error) {
        console.error("Error restoring auth state:", error);
      }
    },
  },
});

export const { setLogin, setLogout, restoreAuth } = authSlice.actions;
export default authSlice.reducer;