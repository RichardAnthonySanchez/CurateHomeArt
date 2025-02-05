const HtmlWebpackPlugin = require("html-webpack-plugin");
const MarkdownIt = require("markdown-it");
const fs = require("fs");
const path = require("path");
const glob = require("glob");
const matter = require("gray-matter");

const md = new MarkdownIt();
const markdownFiles = glob.sync("./src/markdown/products/*.md");

const markdownPages = markdownFiles.map((file) => {
  const content = fs.readFileSync(file, "utf8");
  const { data, content: body } = matter(content); // Extract front matter

  return new HtmlWebpackPlugin({
    filename: `${path.basename(file, ".md")}.html`,
    template: "./src/template.html",
    templateParameters: { title: data.title, body: md.render(body) },
  });
});

module.exports = {
  entry: {
    app: "./src/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        use: "raw-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    ...markdownPages,
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/template.html",
    }),
  ],
  devServer: {
    historyApiFallback: true, // ✅ Allows direct linking to /art1
    static: path.resolve(__dirname, "dist"),
    port: 8080,
  },
};
