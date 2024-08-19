import createNextPlugins from "next-intl/plugin"
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverMinification: false,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};
const WithNextIntl = createNextPlugins();
export default WithNextIntl(nextConfig); // adding next intl configuration for use translation
