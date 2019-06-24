const chalk = require('chalk');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const package = require('./package.json');

module.exports = (env) => {
    const isProduction = env === 'production' || process.env.NODE_ENV === 'production';
    console.log(chalk.cyan(`Fantoccini v${package.version} [${isProduction ? 'PROD' : 'DEV'}]`));

    return {
        entry: "./src/index.tsx",
        output: {
            filename: "bundle.js",
            path: __dirname + "/public/build"
        },
        mode: "development",
        devtool: isProduction ? undefined : "#inline-source-map",
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json", ".less", ".css"],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "awesome-typescript-loader"
                },
                {
                    enforce: "pre",
                    test: /\.js$/,
                    loader: "source-map-loader"
                },
                { 
                    test: /\.less$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'less-loader',
                      ],
                },
            ]
        },
        plugins: [
            new MiniCssExtractPlugin(),
            ...(isProduction ? [
                new OptimizeCssAssetsPlugin({
                    assetNameRegExp: /.css$/g,
                    cssProcessor: require('cssnano'),
                    cssProcessorPluginOptions: {
                        preset: ['default', { discardComments: { removeAll: true } }],
                    },
                    canPrint: true
                }),
            ] : []),
        ]
    };
}