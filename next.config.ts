import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    devIndicators: false,
    productionBrowserSourceMaps: true,
    webpack(config) {
        const fileLoaderRule = config.module.rules.find(
        (rule: any) => rule.test instanceof RegExp && rule.test.test(".svg")
        );
        if (fileLoaderRule) {
        fileLoaderRule.exclude = /\.svg$/i;
        }
        config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
            {
            loader: "@svgr/webpack",
            options: {
                svgo: true,
                svgoConfig: {
                plugins: [
                    {
                    name: "preset-default",
                    params: {
                        overrides: {
                        mergePaths: false,
                        },
                    },
                    },
                ],
                },
            },
            },
        ],
        });
        return config;
    },
};

export default nextConfig;