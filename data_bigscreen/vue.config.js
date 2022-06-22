const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8000,
    proxy: {
      "/api": {
        target: "http://192.168.12.62:3222",
        changeOrigin: true,
        pathRewrite: { "^/api": " " },
      },
    },
    // proxy: "http://192.168.12.62:3222",
  },
});
