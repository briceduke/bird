import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../../app/store';
import { User } from '../../models/User';

interface AuthState {
	user?: User;
}

const initialState: AuthState = {};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth: (state, payload: PayloadAction<AuthState>) => {
			{
				state.user = payload.payload.user;
			}
		},
	},
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state: AppState) => state.auth.user;
