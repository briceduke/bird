module.exports = {
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "https://6969-briceduke-birdbackend-m27vpqvd7cb.ws-us43.gitpod.io/:path*",
			},
		];
	},
};
