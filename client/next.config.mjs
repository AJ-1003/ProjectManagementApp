/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        dirs: ['pages', 'utils'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "aj-pm-s3-images.s3.us-east-1.amazonaws.com",
                port: "",
                pathname: "/**"
            }
        ]
    }
};

export default nextConfig;
