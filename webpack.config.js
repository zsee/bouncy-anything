
module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: {
        app: "./app.ts",
    },
    output: {
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "ts-loader",
                    },
                    {
                        loader: "tslint-loader",
                    },
                ],
            }
        ]
    },
};
