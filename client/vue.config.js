module.exports = {
  devServer: {
    proxy: "http://localhost:8080",
    hot: true,
    liveReload: true
  },

  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: ["./src/assets/base/*.scss"]
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");

    svgRule.uses.clear();

    svgRule
      .use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader");
  },

  runtimeCompiler: true,
  transpileDependencies: ["vuetify"]
};
