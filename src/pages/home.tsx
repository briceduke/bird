import { NextPage } from 'next';

import { Layout } from '../components/layouts/DefaultLayout';
import { useGetUserQuery } from '../features/users/usersApi';

const HomePage: NextPage = () => {
	const { data } = useGetUserQuery({ username: "brice" });
	return <Layout>{data && <div>{data.joinDate}</div>}</Layout>;
};

export default HomePage;
