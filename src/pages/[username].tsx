import { NextPage, NextPageContext } from 'next';

import { Layout } from '../components/layouts/DefaultLayout';
import { usersApi } from '../features/users/usersApi';
import { User } from '../models/User';

interface ProfileProps {
	user: User;
	error: unknown;
}

const ProfilePage: NextPage = ({}, { user, error }: ProfileProps) => {
	return (
		<Layout protectedRoute>
			<div>
				{user && user.username}
				{error && JSON.stringify(error)}
			</div>
		</Layout>
	);
};

export async function getServerSideProps(context: NextPageContext) {
	let { username } = context.query;

	username = username.toString();

	const { data, error } = usersApi.useGetUserQuery({ username });

	return {
		props: {
			user: data,
			error: error,
		},
	};
}

export default ProfilePage;
