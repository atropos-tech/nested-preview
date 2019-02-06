/* eslint-env node */

const { join } = require('path');

module.exports = {
    entry: "./src/sandbox.js",
    devtool: "inline-cheap-source-map",
    output: {
        path: join(__dirname, "dist"),
        filename: "sandbox-bundle.js"
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