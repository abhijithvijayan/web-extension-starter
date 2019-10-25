const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');


module.exports = {
    mode: 'development',

    entry: {
        background: './src/scripts/background.js',
        popup: './src/scripts/popup.js',
        options: './src/scripts/options.js',
        styles: ['./src/styles/popup.scss', './src/styles/options.scss'],
    },

    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'extension'),
    },

    plugins: [new FixStyleOnlyEntriesPlugin(), new webpack.ProgressPlugin(), new HtmlWebpackPlugin()],

    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                include: [path.resolve(__dirname, 'src/scripts')],
                loader: 'babel-loader',

                options: {
                    plugins: ['syntax-dynamic-import'],

                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                modules: false,
                            },
                        ],
                    ],
                },
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].css',
                            context: './src/styles/',
                            outputPath: 'css/',
                        },
                    },
                    'extract-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    'resolve-url-loader',
                    'sass-loader',
                ],
            },
        ],
    },

    optimization: {},

    devServer: {
        open: true,
    },
};
