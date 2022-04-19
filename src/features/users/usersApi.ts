import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { User } from '../../models/User';
import { GetUserByUsernameDto } from './dto/get-username-payload.dto';
import { RegisterPayload } from './dto/register-payload.dto';

export const usersApi = createApi({
	reducerPath: "usersApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api/users" }),
	endpoints: (builder) => ({
		register: builder.mutation<User, RegisterPayload>({
			query: (registerReq) => ({
				url: "/",
				method: "POST",
				body: registerReq,
			}),
		}),
		getUser: builder.query<User, GetUserByUsernameDto>({
			query: (getUserReq) => ({
				url: "/username",
				method: "GET",
				body: getUserReq,
			}),
		}),
	}),
});

export const { useRegisterMutation, useLazyGetUserQuery } = usersApi;
