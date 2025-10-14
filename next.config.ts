import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i0.wp.com",
			},
		],
	},
};

export default nextConfig;
