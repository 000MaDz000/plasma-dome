import createNextPlugins from "next-intl/plugin"
/** @type {import('next').NextConfig} */
const nextConfig = {
    postcss: {},
    tailwindcss: {}
};
const WithNextIntl = createNextPlugins();
export default WithNextIntl(nextConfig); // adding next intl configuration for use translation
