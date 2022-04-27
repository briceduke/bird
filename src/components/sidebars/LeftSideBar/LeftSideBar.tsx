import Link from 'next/link';
import Router from 'next/router';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useLogoutMutation } from '../../../features/auth/authApi';
import { setAuth } from '../../../features/auth/authSlice';

export const LeftSideBar = () => {
	const { user } = useAppSelector((state) => state.auth);

	const [logout] = useLogoutMutation();

	const dispatch = useAppDispatch();

	const handleLogoutClick = async () => {
		try {
			await logout({}).unwrap();

			dispatch(setAuth({}));
		} catch (err) {
			return;
		}

		Router.push("/");
	};

	return (
		<div className="w-1/4 h-screen sticky flex justify-end">
			<div className="w-3/4 h-full flex flex-col items-end justify-between">
				{/* Logo and Nav */}
				<div className="w-2/3 h-full flex flex-col">
					{/* Logo */}
					<div className="py-2">
						<button className="btn btn-square btn-ghost">B</button>
					</div>

					{/* Nav */}
					<div className="w-full h-1/3 flex flex-col justify-evenly pr-4">
						{user && (
							<Link href={"/home"}>
								<button className="btn btn-ghost">Home</button>
							</Link>
						)}
						<button className="btn btn-ghost">Explore</button>
						{user && (
							<Link href={`/${user.username}`}>
								<button className="btn btn-ghost">Profile</button>
							</Link>
						)}
						<button className="btn btn-primary">Chirp</button>
					</div>
				</div>

				{/* Profile Button */}
				<div className="w-2/3 p-2">
					{user && (
						<div
							className="btn btn-ghost h-16 flex justify-between items-center"
							onClick={handleLogoutClick}
						>
							<div className="flex items-center">
								<div className="avatar mr-2">
									<div className="w-10 rounded-full">
										<img src={user.avatarUri} alt={user.username} />
									</div>
								</div>
								<div className="text-left">
									<div className="text-sm text-white font-bold">
										{user.displayName}
									</div>
									<p className="text-xs">@{user.username}</p>
								</div>
							</div>
							<div>...</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
