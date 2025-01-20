/** @type {import('next').NextConfig} */


const nextConfig = {
    reactStrictMode:true,
    env: {
        API_ENDPOINT: 'http://localhost:5000/api',

    }
};

export default nextConfig;
