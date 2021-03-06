import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { User } from '../../models/User';
import { FollowUserDto } from './dto/follow-user-payload.dto';
import { GetUserByIdDto } from './dto/get-user-payload.dto';
import { GetUserByUsernameDto } from './dto/get-username-payload.dto';
import { GetUsersByIdDto } from './dto/get-users-payload.dto';
import { RegisterPayload } from './dto/register-payload.dto';
import { UpdateUserDto } from './dto/update-user-payload.dto';

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
		updateUser: builder.mutation<User, UpdateUserDto>({
			query: (updateReq) => ({
				url: "/",
				method: "PUT",
				body: updateReq,
			}),
		}),
		getMe: builder.query<User, void>({
			query: () => ({
				url: "/me",
				method: "GET",
			}),
		}),
		getUser: builder.query<User, GetUserByUsernameDto>({
			query: (getUserReq) => ({
				url: `/username?username=${getUserReq.username}`,
				method: "GET",
			}),
		}),
		getUserById: builder.query<User, GetUserByIdDto>({
			query: (getUserReq) => ({
				url: `/?_id=${getUserReq._id}`,
				method: "GET",
			}),
		}),
		getUsersById: builder.query<User[], GetUsersByIdDto>({
			query: (getUsersReq) => ({
				url: `/many?_id=${getUsersReq._id.join()}`,
				method: "GET",
			}),
		}),
		followUser: builder.mutation<User, FollowUserDto>({
			query: (followReq) => ({
				url: "/follow",
				method: "PUT",
				body: followReq,
			}),
		}),
		unfollowUser: builder.mutation<User, FollowUserDto>({
			query: (unfollowReq) => ({
				url: "/unfollow",
				method: "PUT",
				body: unfollowReq,
			}),
		}),
	}),
});

export const {
	useRegisterMutation,
	useLazyGetUserQuery,
	useFollowUserMutation,
	useGetMeQuery,
	useGetUserByIdQuery,
	useGetUserQuery,
	useGetUsersByIdQuery,
	useLazyGetMeQuery,
	useLazyGetUserByIdQuery,
	useLazyGetUsersByIdQuery,
	useUnfollowUserMutation,
	useUpdateUserMutation,
} = usersApi;
