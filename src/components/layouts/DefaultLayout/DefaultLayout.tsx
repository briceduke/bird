import Router from 'next/router';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setAuth } from '../../../features/auth/authSlice';
import { useGetMeQuery } from '../../../features/users/usersApi';
import { DefaultLayoutProps } from './default-layout.props';

export const Layout = ({
	children,
	protectedRoute = false,
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
		<div className="w-screen h-screen flex items-center justify-center">
			{children}
		</div>
	);
};
