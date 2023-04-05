const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
    return {
        mode: 'development',
        entry: {
            main: '/src/js/index.js',
            install: '/src/js/install.js',
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html',
                title: 'JATE',
            }),
            new WebpackPwaManifest({
                name: 'jate-editor',
                fingerprints: false,
                inject: true,
                short_name: 'je',
                description: 'a note editor pwa that can be installed',
                start_url: '/',
                publicPath: '/',
                background_color: '#17202a',
                display: 'standalone',
                icons: [
                    {
                        src: path.resolve('src/images/logo.png'),
                        sizes: [36, 48, 72, 96, 144, 192, 512],
                        destination: path.join('assets', 'icons'),
                    },
                ],
            }),
            new InjectManifest({
                swSrc: './src-sw.js',
                swDest: 'src-sw.js',
            }),
        ],

        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|ico|jpg)$/,
                    type: 'asset/resource',
                },
            ],
        },
    };
};
