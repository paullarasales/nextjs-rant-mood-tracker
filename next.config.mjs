/** @type {import('next').NextConfig} */
const nextConfig = {};

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

export default nextConfig;
