import moment from 'moment';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GoVerified } from 'react-icons/go';
import { MdDateRange, MdOutlineCake, MdOutlineLocationOn } from 'react-icons/md';

import { useAppSelector } from '../../app/hooks';
import { wrapper } from '../../app/store';
import { Layout } from '../../components/layouts/DefaultLayout';
import { useLazyGetUserTimelineQuery } from '../../features/chirps/chirpsApi';
import { useFollowUserMutation, useGetUserQuery, useUnfollowUserMutation } from '../../features/users/usersApi';
import { User } from '../../models/User';

interface ProfileProps {
	user: User;
	error: unknown;
	username: string;
}

const ProfilePage = ({ username }: ProfileProps) => {
	const { user } = useAppSelector((state) => state.auth);

	const { data, refetch } = useGetUserQuery({ username });
	const [getTimeline, { data: timelineData, error }] =
		useLazyGetUserTimelineQuery();
	const [follow] = useFollowUserMutation();
	const [unfollow] = useUnfollowUserMutation();

	const [isFollowing, setIsFollowing] = useState(false);

	useEffect(() => {
		if (!data || !user) return;

		data.followersId.includes(user._id) ? setIsFollowing(true) : null;

		const timeline = async () => {
			await getTimeline({ limit: 20, skip: 0, userId: data._id });
		};

		timeline();
	}, [data, user]);

	const handleFollowClick = async () => {
		if (isFollowing) {
			try {
				await unfollow({ _id: data._id }).unwrap();
			} catch (err) {
				return;
			}
			setIsFollowing(false);
		} else {
			try {
				await follow({ _id: data._id }).unwrap();
			} catch (err) {
				return;
			}
			setIsFollowing(true);
		}
		refetch();
	};

	return (
		<div>
			{data && (
				<Layout
					protectedRoute
					title={`${data.displayName} (@${data.username})`}
				>
					<div className="p-10 h-full">
						{/* Profile card */}
						<div className="w-full h-1/2 flex flex-col justify-evenly">
							{/* Avatar group */}
							<div className="w-full h-1/2 flex items-end justify-between">
								{/* Avatar */}
								<div className="avatar">
									<div className="w-32 rounded-full">
										<img src={data.avatarUri} alt={data.username} />
									</div>
								</div>

								{/* Actions */}
								<div>
									{user && data._id !== user._id && (
										<button className="btn" onClick={handleFollowClick}>
											{isFollowing ? "Following" : "Follow"}
										</button>
									)}
								</div>
							</div>

							{/* Info */}
							<div className="w-full h-1/2 flex flex-col items-start justify-evenly">
								<div>
									<div className="text-white font-bold text-2xl flex items-center gap-2">
										{data.displayName}{" "}
										<span>{data.isVerified && <GoVerified />}</span>
									</div>
									<div className="">@{data.username}</div>
								</div>
								<div className="text-white">{data.bio}</div>
								<div className="flex w-1/2 items-center justify-between">
									{data.location && (
										<div className="flex items-center gap-1">
											<MdOutlineLocationOn /> {data.location}
										</div>
									)}
									{data.birth && (
										<div className="flex items-center gap-1">
											<MdOutlineCake /> Born{" "}
											{moment(data.birth).format("MMM DD YYYY")}
										</div>
									)}
									<div className="flex items-center gap-1">
										<MdDateRange /> Joined{" "}
										{moment(data.joinDate).format("MMMM YYYY")}
									</div>
								</div>
								<div className="flex w-1/4 items-center justify-between">
									<Link href={`/${username}/following`}>
										<div className="link-hover hover:cursor-pointer">
											<span className="text-white font-bold">
												{data.followingCount}
											</span>{" "}
											Following
										</div>
									</Link>
									<Link href={`/${username}/followers`}>
										<div className="link-hover hover:cursor-pointer">
											<span className="text-white font-bold">
												{data.followersCount}
											</span>{" "}
											Followers
										</div>
									</Link>
								</div>
							</div>
						</div>
						<hr className="border-neutral mb-10" />
						{/* Feed */}
						<div className="w-4/6">
							{timelineData &&
								timelineData.map((chirp, idx) => {
									return (
										<div key={idx} className="flex w-full h-32">
											{/* Avatar column */}
											<div className="avatar w-1/6">
												<div className="w-16 h-16 rounded-full">
													<img
														src={chirp.userAvatarUri}
														alt={chirp.userUsername}
													/>
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
															chirp.likedUserIds.includes(data._id)
																? "primary"
																: ""
														}`}
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
			)}
		</div>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (context) => {
		// const { data: user, error } = await store.dispatch(
		// 	usersApi.endpoints.getUser.initiate({
		// 		username: context.query.username.toString(),
		// 	})
		// );

		return {
			props: {
				username: context.query.username.toString(),
				// user: user ? user : null,
				// error: error ? error : null,
			},
		};
	}
);

export default ProfilePage;
