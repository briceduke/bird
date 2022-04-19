import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import { authApi } from '../features/auth/authApi';
import authReducer from '../features/auth/authSlice';
import { usersApi } from '../features/users/usersApi';

export function makeStore() {
	return configureStore({
		reducer: {
			auth: authReducer,
			[authApi.reducerPath]: authApi.reducer,
			[usersApi.reducerPath]: usersApi.reducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware()
				.concat(authApi.middleware)
				.concat(usersApi.middleware),
	});
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action<string>
>;

export default store;
