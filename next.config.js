module.exports = {
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "http://localhost:6969/:path*",
			},
		];
	},
};
