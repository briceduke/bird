import moment from 'moment';
import { NextPage } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect } from 'react';

import { useAppSelector } from '../app/hooks';

const IndexPage: NextPage = () => {
	const { user } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (!user) Router.push("/login");
	}, [user]);

	return (
		<div className="w-screen h-screen flex items-center justify-center">
			{!user && (
				<>
					<Link href="/login">
						<button className="btn">Login</button>
					</Link>

					<Link href="/register">
						<button className="btn">Register</button>
					</Link>
				</>
			)}

			{user && (
				<div className="w-1/2 h-1/2">
					{/* <Image src={user.avatarUri} alt="Avatar URI" width={60} height={60} /> */}
					<h2 className="text-5xl text-primary">{user.displayName}</h2>
					<h1 className="text-2xl text-secondary">@{user.username}</h1>
					<p>{user.bio}</p>
					<p>Joined {moment(user.joinDate).format("MMMM YYYY")}</p>
					<p>
						{user.birth && `Born ${moment(user.birth).format("MMMM DD, YYYY")}`}
					</p>
				</div>
			)}
		</div>
	);
};

export default IndexPage;
