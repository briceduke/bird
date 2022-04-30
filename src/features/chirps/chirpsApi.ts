import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Chirp } from '../../models/Chirp';
import { CreateChirpPayload } from './dto/create-chirp-payload.dto';
import { GetChirpDto } from './dto/get-chirp.dto';
import { GetChirpsDto } from './dto/get-chirps.dto';
import { GetHomeTimelineDto } from './dto/get-home-timeline.dto';
import { GetUserTimelineDto } from './dto/get-user-timeline.dto';

export const chirpsApi = createApi({
	reducerPath: "chirpsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api/chirps" }),
	endpoints: (builder) => ({
		get: builder.query<Chirp, GetChirpDto>({
			query: (getReq) => ({
				url: `/?_id=${getReq._id}`,
				method: "GET",
			}),
		}),
		getMany: builder.query<Chirp[], GetChirpsDto>({
			query: (getReq) => ({
				url: `/many?_id=${getReq._id.join()}`,
				method: "GET",
			}),
		}),
		getReplies: builder.query<Chirp[], GetChirpDto>({
			query: (getReq) => ({
				url: `/replies?_id=${getReq._id}`,
				method: "GET",
			}),
		}),
		getUserTimeline: builder.query<Chirp[], GetUserTimelineDto>({
			query: (getReq) => ({
				url: `/timeline/user?userId=${getReq.userId}&skip=${getReq.skip}&limit=${getReq.limit}`,
				method: "GET",
			}),
		}),
		getHomeTimeline: builder.query<Chirp[], GetHomeTimelineDto>({
			query: (getReq) => ({
				url: `/timeline/home?skip=${getReq.skip}&limit=${getReq.limit}`,
				method: "GET",
			}),
		}),
		create: builder.mutation<Chirp, CreateChirpPayload>({
			query: (createReq) => ({
				url: "/",
				method: "POST",
				body: createReq,
			}),
		}),
		delete: builder.mutation<Chirp, GetChirpDto>({
			query: (deleteReq) => ({
				url: "/",
				method: "DELETE",
				body: deleteReq,
			}),
		}),
		like: builder.mutation<Chirp, GetChirpDto>({
			query: (likeReq) => ({
				url: "/like",
				method: "POST",
				body: likeReq,
			}),
		}),
	}),
});

export const {
	useCreateMutation,
	useDeleteMutation,
	useLikeMutation,
	useGetHomeTimelineQuery,
	useGetManyQuery,
	useGetQuery,
	useGetRepliesQuery,
	useGetUserTimelineQuery,
	useLazyGetHomeTimelineQuery,
	useLazyGetManyQuery,
	useLazyGetQuery,
	useLazyGetRepliesQuery,
	useLazyGetUserTimelineQuery,
} = chirpsApi;
