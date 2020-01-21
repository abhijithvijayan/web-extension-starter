/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");
const ZipPlugin = require("zip-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const WebextensionPlugin = require("webpack-webextension-plugin");

const pkg = require("./package.json");

const targetBrowser = process.env.TARGET_BROWSER;

const getExtensionFileType = browser => {
  if (browser === "opera") {
    return "crx";
  }
  if (browser === "firefox") {
    return "xpi";
  }
  return "zip";
};

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  context: path.resolve(__dirname, "src"),
  entry: {
    background: "./scripts/background.ts",
    contentScript: "./scripts/contentScript.ts",
    popup: "./scripts/popup.ts",
    options: "./scripts/options.ts",
    styles: ["./styles/popup.scss", "./styles/options.scss"]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  output: {
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "extension", targetBrowser)
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new FixStyleOnlyEntriesPlugin({ silent: true }),
    new webpack.EnvironmentPlugin(["NODE_ENV", "TARGET_BROWSER"]),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        path.join(process.cwd(), `extension/${targetBrowser}`),
        path.join(
          process.cwd(),
          `extension/${targetBrowser}.${getExtensionFileType(targetBrowser)}`
        )
      ],
      cleanStaleWebpackAssets: false,
      verbose: true
    }),
    new HtmlWebpackPlugin({
      template: "options.html",
      // inject: false,
      chunks: ["options"],
      filename: "options.html"
    }),
    new HtmlWebpackPlugin({
      template: "popup.html",
      // inject: false,
      chunks: ["popup"],
      filename: "popup.html"
    }),
    new CopyWebpackPlugin([{ from: "assets", to: "assets" }]),
    new WebextensionPlugin({
      vendor: targetBrowser,
      manifestDefaults: { version: pkg.version }
    })
  ],

  module: {
    rules: [
      {
        test: /.tsx?$/,
        include: [path.resolve(__dirname, "scripts")],
        use: ["ts-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].css",
              context: "./styles/",
              outputPath: "css/"
            }
          },
          "extract-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              // eslint-disable-next-line global-require
              plugins: [require("autoprefixer")()]
            }
          },
          "resolve-url-loader",
          "sass-loader"
        ]
      }
    ]
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true
      }),
      new ZipPlugin({
        path: path.resolve(__dirname, "extension"),
        extension: `${getExtensionFileType(targetBrowser)}`,
        filename: `${targetBrowser}`
      })
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, "extension")
  }
};
