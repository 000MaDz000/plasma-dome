import createNextPlugins from "next-intl/plugin"
/** @type {import('next').NextConfig} */
const nextConfig = {};
const WithNextIntl = createNextPlugins();
export default WithNextIntl(nextConfig); // adding next intl configuration for use translation
