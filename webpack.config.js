module.exports = {
    entry: {
        app: __dirname + '/example/main.js'
    },
    output: {
        filename: __dirname + '/example/app.js'
    },
    module: {
        loaders: [
            {test: /\.html$/, loader: 'raw-loader'},
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },
    devtool: 'source-map'
};