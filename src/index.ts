const Metro = require("metro");

const http = require("http");
const MetroConfig = require("metro-config");

// // We first load the config from the file system
// Metro.loadConfig().then(async (config) => {
//   const metroBundlerServer = await Metro.runMetro(config);

//   const httpServer = http.createServer(
//     metroBundlerServer.processRequest.bind(metroBundlerServer),
//   );

//   httpServer.listen(8081);
// });

const path = require("path");
const fs = require("fs");

(async () => {
  const outputFolder = path.join(__dirname, "../dist");
  await fs.promises.mkdir(outputFolder, { recursive: true });
  const projectRoot = __dirname;
  const config = await Metro.loadConfig();

  // const config = MetroConfig.getDefaultConfig.getDefaultValues(projectRoot);

  console.time("bundle");
  await Metro.runBuild(config, {
    entry: path.resolve(__dirname, "../example/index.js"),
    platform: "ios",
    sourceMap: true,
    minify: false,
    out: path.join(outputFolder, "index.js"),
  });
  console.timeEnd("bundle");

  // const metroServer = await Metro.runMetro(config, {
  //     watch: false,
  //   });
})();
