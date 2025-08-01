import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import autoLogoutMiddleware from './autologoutmiddleware'; // Adjust path as needed

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here if you have them
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(autoLogoutMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;