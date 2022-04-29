import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RegisterPayload } from './dto/register-payload.dto';

interface FormState {
	data?: RegisterPayload;
	currentPage: number;
}

const initialState: FormState = {
	data: {
		username: "",
		password: "",
		inviteCode: "",
		avatarUri: "",
		bio: "",
		birth: null,
		displayName: "",
		location: "",
		website: "",
	},
	currentPage: 0,
};

const registerFormSlice = createSlice({
	name: "registerForm",
	initialState,
	reducers: {
		setForm: (state, payload: PayloadAction<RegisterPayload>) => {
			{
				state.data = payload.payload;
			}
		},
		incrementPage: (state) => {
			{
				state.currentPage++;
			}
		},
		decrementPage: (state) => {
			{
				state.currentPage--;
			}
		},
	},
});

export const { setForm, decrementPage, incrementPage } =
	registerFormSlice.actions;

export default registerFormSlice.reducer;
