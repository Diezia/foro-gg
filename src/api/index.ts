import { ConfigurationBuilder, HostBuilder, Logger, LogType } from "@miracledevs/paradigm-express-webapi";
import { Server } from "./server";


new HostBuilder()
    .useConfiguration((config: ConfigurationBuilder) =>
    {
        config.addJsonFile('config.json')
            .addEnvironmentFile('.env', 'my_app__')
            .addEnvironmentVariables('my_app__');
    })
    .useLogging((logger: Logger) => logger.setMinimumLevel(LogType.Trace))
    .build(Server)
    .start();