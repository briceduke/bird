module.exports = {
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "https://6969-briceduke-birdbackend-aqelaj3hkx2.ws-us42.gitpod.io/:path*",
			},
		];
	},
};
