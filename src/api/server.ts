import { ApiServer } from "@miracledevs/paradigm-express-webapi";
import { Configuration } from "./configuration";
import express from 'express';
import cors from 'cors';
import { TestController } from "./controllers/test.controller";
import { MySqlConnectionFilter } from "./filters/mysql.filter";
import { EchoController } from "./controllers/echo.controller";
import { GameController } from "./controllers/game.controller";
import { PostController } from "./controllers/post.controller";
// require('dotenv').config() utilizado antes de paradigm 

export class Server extends ApiServer
{
    protected configureApplication(): void
    {
        this.logger.debug("Configuring application...");
        const configuration = this.configurationBuilder.build(Configuration);
        const port = configuration.port || process.env.PORT || 8080; 
        
        this.expressApplication
            .disable('etag')
            .set('port', port)
            .use(cors())
            .use(express.urlencoded({ extended: true }))
            .use(express.json())
            .listen(port, () => this.logger.debug(`Server listening on port: ${port}`));

        this.registerControllers([
            TestController,
            EchoController,
            GameController,
            PostController
        ]);
        this.routing.ignoreClosedResponseOnFilters();
        this.routing.registerGlobalFilters([MySqlConnectionFilter]);

    }
}

/* app.get("/", (req, res) => {
  res.json({ a: 1 });
}); */
