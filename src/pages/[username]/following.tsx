import Link from 'next/link';
import { useEffect } from 'react';

import { wrapper } from '../../app/store';
import { Layout } from '../../components/layouts/DefaultLayout';
import { useGetUserQuery, useLazyGetUsersByIdQuery } from '../../features/users/usersApi';
import { User } from '../../models/User';

interface ProfileProps {
	user: User;
	error: unknown;
	username: string;
}

export const FollowingPage = ({ username }: ProfileProps) => {
	const { data } = useGetUserQuery({ username });
	const [getUsersById, { data: followingData }] = useLazyGetUsersByIdQuery();

	useEffect(() => {
		const getUsers = async () => {
			await getUsersById({ _id: data.followingIds });
		};

		if (data) getUsers();
		else return;
	}, [data]);

	return (
		<div>
			{data && (
				<Layout
					protectedRoute
					title={`People followed by ${data.displayName} (@${data.username})`}
				>
					<div className="p-10">
						<div className="flex justify-between items-center mb-10">
							<div>
								<div className="text-white font-bold text-2xl">
									{data.displayName}
								</div>
								<div className="">@{data.username}</div>
							</div>
							<div>Following</div>
						</div>
						{followingData && (
							<div>
								{/* Header */}

								{followingData.map((user, idx) => (
									<Link key={idx} href={`/${user.username}`}>
										<div className="w-full h-20 cursor-pointer flex items-center justify-start">
											<div className="avatar">
												<div className="w-16 rounded-full">
													<img src={user.avatarUri} alt={user.username} />
												</div>
											</div>
											<div className="h-full flex flex-col items-start ml-4">
												<div className="text-white font-bold text-lg">
													{user.displayName}
												</div>
												<div>@{user.username}</div>
												<div className="text-white">{user.bio}</div>
											</div>
										</div>
									</Link>
								))}
							</div>
						)}
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

export default FollowingPage;
