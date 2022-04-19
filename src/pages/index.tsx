import { NextPage } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect } from 'react';

import { useAppSelector } from '../app/hooks';

const IndexPage: NextPage = () => {
	const { user } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (user) Router.push("/home");
	});

	return (
		<div className="h-screen w-screen flex items-center justify-center">
			<div className="w-1/3 h-1/2 flex flex-col items-center justify-evenly">
				<h1 className="text-5xl font-black">sup</h1>

				<Link href={"/login"}>
					<button className="btn btn-wide btn-primary">Sign In</button>
				</Link>

				<div className="text-center">
					<p className="mb-2">already have an account?</p>
					<Link href={"/register"}>
						<button className="btn btn-wide btn-outline btn-secondary">
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default IndexPage;
