const path = require("path");
const baseDir = "src";
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@utils": path.resolve(__dirname, `${baseDir}/components/utils/`)
      }
    }
  }
};
