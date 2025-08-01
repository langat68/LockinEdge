import  type{ Middleware } from '@reduxjs/toolkit';
import { setLogout } from './slices/authSlice';

// Define the auth state interface locally to avoid circular imports
interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: any | null;
  lastActivity: number | null;
}

interface RootState {
  auth: AuthState;
}

// 24 hours in milliseconds
const INACTIVITY_TIMEOUT = 24 * 60 * 60 * 1000;

let inactivityTimer: NodeJS.Timeout | null = null;

const autoLogoutMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  
  // Only proceed if user is authenticated
  if (!state.auth.isAuthenticated || !state.auth.lastActivity) {
    return result;
  }

  // Clear existing timer
  if (inactivityTimer) {
    clearTimeout(inactivityTimer);
    inactivityTimer = null;
  }

  // Check if user should be logged out immediately (for when app starts)
  const now = Date.now();
  const timeSinceLastActivity = now - state.auth.lastActivity;
  
  if (timeSinceLastActivity >= INACTIVITY_TIMEOUT) {
    // User has been inactive for 24+ hours, log them out immediately
    console.log('User has been inactive for 24+ hours, logging out...');
    store.dispatch(setLogout());
    return result;
  }

  // Set new timer for remaining time
  const remainingTime = INACTIVITY_TIMEOUT - timeSinceLastActivity;
  
  inactivityTimer = setTimeout(() => {
    // Double-check that user is still authenticated and get fresh state
    const currentState = store.getState();
    if (currentState.auth.isAuthenticated && currentState.auth.lastActivity) {
      const currentTimeSinceActivity = Date.now() - currentState.auth.lastActivity;
      
      if (currentTimeSinceActivity >= INACTIVITY_TIMEOUT) {
        console.log('Auto-logout: User inactive for 24 hours');
        store.dispatch(setLogout());
      }
    }
  }, remainingTime);

  return result;
};

export default autoLogoutMiddleware;