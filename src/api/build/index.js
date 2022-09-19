"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paradigm_express_webapi_1 = require("@miracledevs/paradigm-express-webapi");
const server_1 = require("./server");
new paradigm_express_webapi_1.HostBuilder()
    .useConfiguration((config) => {
    config.addJsonFile('config.json')
        .addEnvironmentFile('.env', 'my_app__')
        .addEnvironmentVariables('my_app__');
})
    .useLogging((logger) => logger.setMinimumLevel(paradigm_express_webapi_1.LogType.Trace))
    .build(server_1.Server)
    .start();
