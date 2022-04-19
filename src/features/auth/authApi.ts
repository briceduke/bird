import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { User } from '../../models/User';
import { LoginPayload } from './dto/login-payload.dto';

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api/auth" }),
	endpoints: (builder) => ({
		login: builder.mutation<User, LoginPayload>({
			query: (loginReq) => ({
				url: "/login",
				method: "POST",
				body: loginReq,
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: "/logout",
				method: "POST",
			}),
		}),
		isAuh: builder.query<boolean, void>({
			query: () => ({
				url: "/",
				method: "GET",
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useIsAuhQuery,
	useLazyIsAuhQuery,
	useLogoutMutation,
} = authApi;
