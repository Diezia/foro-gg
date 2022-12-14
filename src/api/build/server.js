"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const paradigm_express_webapi_1 = require("@miracledevs/paradigm-express-webapi");
const configuration_1 = require("./configuration");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const test_controller_1 = require("./controllers/test.controller");
const mysql_filter_1 = require("./filters/mysql.filter");
const echo_controller_1 = require("./controllers/echo.controller");
const game_controller_1 = require("./controllers/game.controller");
const post_controller_1 = require("./controllers/post.controller");
const auth_controller_1 = require("./controllers/auth.controller");
class Server extends paradigm_express_webapi_1.ApiServer {
    configureApplication() {
        this.logger.debug("Configuring application...");
        const configuration = this.configurationBuilder.build(configuration_1.Configuration);
        const port = configuration.port || process.env.PORT || 8080;
        this.expressApplication
            .disable("etag")
            .set("port", port)
            .use((0, cors_1.default)())
            .use((0, cookie_parser_1.default)())
            .use(express_1.default.urlencoded({ extended: true }))
            .use(express_1.default.json())
            .listen(port, () => this.logger.debug(`Server listening on port: ${port}`));
        this.registerControllers([
            test_controller_1.TestController,
            echo_controller_1.EchoController,
            game_controller_1.GameController,
            post_controller_1.PostController,
            auth_controller_1.AuthController,
        ]);
        this.routing.ignoreClosedResponseOnFilters();
        this.routing.registerGlobalFilters([mysql_filter_1.MySqlConnectionFilter]);
    }
}
exports.Server = Server;
