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
  lastActivity: number | null; // Added for auto-logout tracking
}

// Function to get initial state from localStorage
const getInitialState = (): AuthState => {
  try {
    const token = localStorage.getItem("authToken");
    const userStr = localStorage.getItem("authUser");
    const lastActivity = localStorage.getItem("lastActivity");
    
    if (token && userStr) {
      const user = JSON.parse(userStr);
      return {
        isAuthenticated: true,
        token,
        user,
        lastActivity: lastActivity ? parseInt(lastActivity) : Date.now(),
      };
    }
  } catch (error) {
    console.error("Error loading auth state from localStorage:", error);
  }
  
  return {
    isAuthenticated: false,
    token: null,
    user: null,
    lastActivity: null,
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
      const now = Date.now();
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.lastActivity = now;

      localStorage.setItem("authToken", action.payload.token);
      localStorage.setItem("authUser", JSON.stringify(action.payload.user));
      localStorage.setItem("lastActivity", now.toString());
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.lastActivity = null;

      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      localStorage.removeItem("lastActivity");
    },
    // New action to update activity timestamp
    updateActivity: (state) => {
      if (state.isAuthenticated) {
        const now = Date.now();
        state.lastActivity = now;
        localStorage.setItem("lastActivity", now.toString());
      }
    },
    // Optional: Action to restore auth state manually if needed
    restoreAuth: (state) => {
      try {
        const token = localStorage.getItem("authToken");
        const userStr = localStorage.getItem("authUser");
        const lastActivity = localStorage.getItem("lastActivity");
        
        if (token && userStr) {
          const user = JSON.parse(userStr);
          state.isAuthenticated = true;
          state.token = token;
          state.user = user;
          state.lastActivity = lastActivity ? parseInt(lastActivity) : Date.now();
        }
      } catch (error) {
        console.error("Error restoring auth state:", error);
      }
    },
  },
});

export const { setLogin, setLogout, updateActivity, restoreAuth } = authSlice.actions;
export default authSlice.reducer;