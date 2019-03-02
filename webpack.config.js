require('multi-env')();

const path = require('path');
const webpack = require('webpack');
const Fiber = require('fibers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV;

const devMode = mode !== 'production';

const analysisMode = mode === 'analyze';

const plugins = [
  new webpack.EnvironmentPlugin([
    'NODE_ENV',
    'GIPHY_API_KEY',
    'TICKER_HISTORY_URL',
  ]),
  new HtmlWebpackPlugin({
    title: 'Dynamic Importing with React.lazy()',
    template: path.resolve(__dirname, './src/static/index.template.html'),
    filename: 'index.html',
  }),
  new MiniCssExtractPlugin({
    filename: 'assets/[name].[contenthash].css',
    chunkFilename: 'assets/[id].[contenthash].css'
  }),
  new OptimizeCSSAssetsPlugin({}),
  new webpack.HashedModuleIdsPlugin()
];

if (analysisMode) {
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

  plugins.push(new BundleAnalyzerPlugin());
}

if (!devMode) {
  plugins.push(new CleanWebpackPlugin([path.resolve('./dist')]));
}

module.exports = {
  mode: (analysisMode) ? 'production' : mode,
  plugins,
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  entry: {
    demo: './src/index.jsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/[name].[hash].bundle.js',
    chunkFilename: 'assets/[name].[contenthash].bundle.js',
    publicPath: 'http://localhost:4501/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: (devMode) ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [
                require('autoprefixer')(),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: require('dart-sass'),
              fiber: Fiber,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'assets',
              useRelativePath: false
            }
          }
        ]
      }
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  devServer: {
    port: 4501,
    open: true
  },
};
