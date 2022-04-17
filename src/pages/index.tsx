import moment from 'moment';
import { NextPage } from 'next';
import Link from 'next/link';

import { useAppSelector } from '../app/hooks';

const IndexPage: NextPage = () => {
	const { user } = useAppSelector((state) => state.auth);

	return (
		<div className="w-screen h-screen flex items-center justify-center">
			{!user && (
				<Link href="/login">
					<button className="btn">Login</button>
				</Link>
			)}

			{user && (
				<div className="w-1/2 h-1/2">
					<h2 className="text-5xl text-primary">{user.displayName}</h2>
					<h1 className="text-2xl text-secondary">@{user.username}</h1>
					<p>{user.bio}</p>
					<p>Joined {moment(user.joinDate).format("MMMM YYYY")}</p>
				</div>
			)}
		</div>
	);
};

export default IndexPage;
