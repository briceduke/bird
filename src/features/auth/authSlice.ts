import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../../app/store';
import { User } from '../../models/User';

interface AuthState {
	user?: User;
	showModal: boolean;
}

const initialState: AuthState = {
	showModal: false
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth: (state, payload: PayloadAction<AuthState>) => {
			{
				state.user = payload.payload.user;
			}
		},
		toggleModal: (state) => {
			{
				state.showModal = !state.showModal;
			}
		}
	},
});

export const { setAuth, toggleModal } = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state: AppState) => state.auth.user;
