import Router from 'next/router';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setAuth } from '../../../features/auth/authSlice';
import { useLazyGetMeQuery } from '../../../features/users/usersApi';
import { User } from '../../../models/User';
import { DefaultLayoutProps } from './default-layout.props';

export const Layout = ({ children }: DefaultLayoutProps) => {
	const { user } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	const [me] = useLazyGetMeQuery();

	useEffect(() => {
		const checkAuth = async () => {
			if (!user) {
				const res = (await me()) as {
					data?: User;
					error: {
						data: { error: string; message: string; statusCode: number };
					};
				};

				if (res.error && res.error.data.statusCode === 401) {
					Router.push("/");
				}

				if (res.data) dispatch(setAuth({ user: res.data }));
			}
		};

		checkAuth();
	}, [user]);

	return (
		<div className="w-screen h-screen flex items-center justify-center">
			{children}
		</div>
	);
};
