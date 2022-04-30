import { Field, Form, Formik, FormikHelpers } from 'formik';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Layout } from '../components/layouts/DefaultLayout';
import { toggleModal } from '../features/auth/authSlice';
import { useCreateMutation, useGetHomeTimelineQuery, useLikeMutation } from '../features/chirps/chirpsApi';
import { CreateChirpPayload } from '../features/chirps/dto/create-chirp-payload.dto';
import { useGetUserQuery } from '../features/users/usersApi';
import { CreateChirpSchema } from '../models/schemas/create.schema';

const HomePage: NextPage = () => {
	const [page, setPage] = useState(0);

	const [inviteCode, setInviteCode] = useState();

	const { user } = useAppSelector((state) => state.auth);

	const { data } = useGetUserQuery({ username: "brice" });
	const {
		data: timelineData,
		error,
		refetch,
	} = useGetHomeTimelineQuery({ limit: 20, skip: 0 });

	const [createChirp, { isError, error: createError }] = useCreateMutation();
	const [likePost] = useLikeMutation();

	const dispatch = useAppDispatch();

	const handleToggleModal = () => dispatch(toggleModal());

	const handleToggleLike = async (postId: string) => {
		try {
			await likePost({ _id: postId });
		} catch (err) {
			console.log(err);
		}

		refetch();
	};

	const handleGenInvite = async () => {
		const res = await fetch("/api/invites", {
			method: "POST",
		});

		const json = await res.json();

		setInviteCode(json);
	};

	return (
		<Layout title="Latest Chirps">
			<div className="p-4">
				<div className="w-full h-72">
					<Formik
						initialValues={{ content: "" }}
						validationSchema={CreateChirpSchema}
						onSubmit={(
							values: CreateChirpPayload,
							{ setSubmitting }: FormikHelpers<CreateChirpPayload>
						) => {
							const handleCreate = async () => {
								const chirp = await createChirp({
									content: values.content,
								})
									.unwrap()
									.catch(() => {});

								setSubmitting(false);
							};

							handleCreate();
						}}
					>
						{({ isSubmitting, errors, touched }) => (
							<Form className="h-full flex justify-evenly flex-col">
								<h1 className="text-4xl">create a chirp!</h1>

								<div className="w-full">
									<Field
										as="textarea"
										name="content"
										className="textarea textarea-bordered w-full h-5/6"
										placeholder="what's up dawg"
									/>
									{errors.content && touched.content && (
										<div className="text-error">{errors.content}</div>
									)}
								</div>

								<button
									type="submit"
									disabled={isSubmitting}
									className={`btn btn-primary ${
										isSubmitting ? "loading" : ""
									} w-20`}
								>
									Chirp
								</button>

								{isError && (
									<div className="text-error">
										<p>
											{(createError as any).data &&
											(createError as any).data.message
												? (createError as any).data.message
												: JSON.stringify(createError)}
										</p>
									</div>
								)}
							</Form>
						)}
					</Formik>
				</div>
				<hr className="border-neutral mb-10" />
				{/* <div>
					<button className="btn btn-primary" onClick={handleGenInvite}>
						Create Invite Code
					</button>
					{inviteCode && (inviteCode as any).inviteCode}
				</div> */}
				<div className="w-4/6">
					{error && <p className="text-error">{JSON.stringify(error)}</p>}
					{data &&
						timelineData &&
						timelineData.map((chirp, idx) => {
							return (
								<div key={idx} className="flex w-full h-32">
									{/* Avatar column */}
									<div className="avatar w-1/6">
										<div className="w-16 h-16 rounded-full">
											<img src={chirp.userAvatarUri} alt={chirp.userUsername} />
										</div>
									</div>

									{/* Content column */}
									<div className="flex flex-col items-baseline justify-evenly w-5/6">
										{/* Name and username */}
										<div className="flex">
											<p className="text-white font-bold">
												{chirp.userUsername}
											</p>
										</div>

										<Link href={`/chirp/${chirp._id}`}>
											{/* Content */}
											<div className="h-full cursor-pointer">
												{chirp.content}
											</div>
										</Link>
										{/* Actions */}
										<div className="w-full flex items-center z-10">
											<button className={`btn w-24 mr-4`}>
												{chirp.subChirpCount} Replies
											</button>

											<button
												className={`btn w-24 btn-${
													chirp.likedUserIds.includes(user._id) ? "primary" : ""
												}`}
												onClick={() => handleToggleLike(chirp._id)}
											>
												{chirp.likeCount} Likes
											</button>
										</div>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</Layout>
	);
};

export default HomePage;
