import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  userName: string;
  mail: string;
  token: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userName: '',
  mail: '',
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticationUser: (state, action: PayloadAction<{
      userName: string;
      isAuthenticated: boolean;
      mail: string;
      token: string;
    }>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userName = action.payload.userName;
      state.mail = action.payload.mail;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userName = '';
      state.mail = '';
      state.token = '';
    },
  },
});

export const { setAuthenticationUser, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
export default authSlice.reducer;