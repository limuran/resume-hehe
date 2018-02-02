const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist/index.html'),
        filename: './dist/bundle.js'
    },
    resolve: {
        // 加快搜索速度
        modules: [path.resolve(__dirname, 'node_modules')]
    },
    plugins: [
        new HtmlWebpackPlugin({filename: 'index.html', template: 'index.html', inject: 'head'}),
        new ExtractTextPlugin({filename: '[name].css', allChunks: true})
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                // 提取出css
                loaders: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                }),
                include: path.resolve(__dirname, 'src')
            }, {
                test: /\.css$/,
                // 提取出css
                loaders: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader']})
            }, {
                test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
                loader: 'base64-inline-loader'
            }
        ]
    },
    devtool: 'source-map'
};
