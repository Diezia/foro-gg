import { ApiServer } from "@miracledevs/paradigm-express-webapi";
import { Configuration } from "./configuration";
import express from 'express';
import cors from 'cors';
import { TestController } from "./controllers/test.controller";
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
            TestController
        ]);
    }
}

/* app.get("/", (req, res) => {
  res.json({ a: 1 });
}); */
