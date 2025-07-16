import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: any; // You might want to define a more specific user interface
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<{ token: string; user: any }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('authToken', action.payload.token);
      // You might also want to store user data in localStorage if needed
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem('authToken');
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
