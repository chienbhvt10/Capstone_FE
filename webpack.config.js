const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// optimization css bundle file by remove space unnecessary
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// optimization js bundle file by remove space unnecessary
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'js/bundle.[name].js',
    path: path.resolve(__dirname, 'build'),
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  // Add loader
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic',
                },
              ],
              '@babel/preset-typescript',
            ],
            plugins: [
              [
                'module-resolver',
                {
                  alias: {
                    '~': './src',
                  },
                },
              ],
            ],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.s(c|a)ss$/i,
        use: [
          //Load, exec plugin MiniCssExtractPlugin.
          MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  optimization: {
    // optimization when build, if files has duplicates code,auto split duplicates code into another file => down page loader time
    splitChunks: {
      chunks: 'all',
      // commit that when build project bundles file contenthash still keep the original, => don't need load again a lot of file
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    // activate minimize file
    minimize: true,
    minimizer: [
      // Use OptimizeCSSAssetsPlugin to minify CSS.
      new OptimizeCSSAssetsPlugin({}),
      // Use TerserJSPlugin to minify JS.
      new TerserJSPlugin({}),
    ],
  },
  plugins: [
    // tidy up build folder, remove unnecessary files
    new CleanWebpackPlugin(),
    // arrange html file more optimization
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
    }),
    // minify css
    new MiniCssExtractPlugin({
      filename: 'style.min.css',
    }),
  ],
  // find error in source file instead of minify file. default is display error in minify file
  devtool: 'inline-source-map',
  // create server when start project development environment
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
};
