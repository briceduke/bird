export const LeftSideBar = () => {
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
						<button className="btn btn-ghost">Home</button>
						<button className="btn btn-ghost">Explore</button>
						<button className="btn btn-ghost">Profile</button>
						<button className="btn btn-primary">Chirp</button>
					</div>
				</div>

				{/* Profile Button */}
				<div className="w-2/3 p-2">
					<div className="btn btn-ghost h-20 flex justify-between items-center">
						<div className="flex items-center">
							<div className="mr-2">img</div>
							<div>
								<div className="text-sm">Brice Duke</div>
								<p className="text-xs text-neutral">@bricewduke</p>
							</div>
						</div>
						<div>...</div>
					</div>
				</div>
			</div>
		</div>
	);
};
