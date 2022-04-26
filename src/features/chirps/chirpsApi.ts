import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Chirp } from '../../models/Chirp';
import { CreateChirpDto } from './dto/create-chirp-payload.dto';
import { GetChirpDto } from './dto/get-chirp.dto';

export const chirpsApi = createApi({
	reducerPath: "chirpsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api/chirps" }),
	endpoints: (builder) => ({
		create: builder.mutation<Chirp, CreateChirpDto>({
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
				url: "/",
				method: "PATCH",
				body: likeReq
			}),
		}),
	}),
});

export const {
	useCreateMutation,
	useDeleteMutation,
	useLikeMutation,
} = chirpsApi;
