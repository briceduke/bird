import { NextPage } from 'next';

import { Layout } from '../components/layouts/DefaultLayout';
import { useGetUserQuery } from '../features/users/usersApi';

const HomePage: NextPage = () => {
	const { data } = useGetUserQuery({ username: "brice" });
	return (
		<Layout>
			<div>{data && <div>{data.joinDate}</div>}</div>
		</Layout>
	);
};

export default HomePage;
