import Head from 'next/head';
import Router from 'next/router';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setAuth } from '../../../features/auth/authSlice';
import { useGetMeQuery } from '../../../features/users/usersApi';
import { LeftSideBar } from '../../sidebars/LeftSideBar';
import { RightSideBar } from '../../sidebars/RightSideBar';
import { DefaultLayoutProps } from './default-layout.props';

export const Layout = ({
	children,
	protectedRoute = false,
	title,
}: DefaultLayoutProps) => {
	const { user } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	const { data, error, isFetching } = useGetMeQuery();

	useEffect(() => {
		if (data) dispatch(setAuth({ user: data }));

		if (error) Router.push("/");
	}, [isFetching]);

	if (protectedRoute && !user)
		return (
			<div className="w-screen h-screen flex items-center justify-center">
				loading
			</div>
		);

	return (
		<div className="w-screen h-screen flex justify-center">
			<Head>
				<title>{title} | Chirper</title>
			</Head>
			<LeftSideBar />
			<div className="w-1/2 overflow-y-scroll">{children}</div>
			<RightSideBar />
		</div>
	);
};
