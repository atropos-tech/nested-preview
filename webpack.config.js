/* eslint-env node */
/* eslint-disable import/no-commonjs */
/* eslint-disable import/no-nodejs-modules */

const { join } = require("path");

module.exports = {
    entry: "./docsrc/index.js",
    devtool: "inline-cheap-source-map",
    output: {
        path: join(__dirname, "docs"),
        filename: "docs-bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            }
        ]
    },
    devServer: {
        contentBase: join(__dirname, "public"),
        host: "0.0.0.0"
    }
};
