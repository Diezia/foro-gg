"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = void 0;
const paradigm_express_webapi_1 = require("@miracledevs/paradigm-express-webapi");
const game_repository_1 = require("../respositories/game.repository");
let GameController = class GameController extends paradigm_express_webapi_1.ApiController {
    constructor(repoGame) {
        super();
        this.repoGame = repoGame;
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.repoGame.getAll();
                this.httpContext.response.status(200).send(data);
                return;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getGame(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { gameId } = this.httpContext.request.params;
                const data = yield this.repoGame.find("id = ?", [gameId]);
                this.httpContext.response.status(200).send(JSON.stringify(data[0]));
                return;
            }
            catch (error) {
                console.log("Error en get game by id", error);
            }
        });
    }
};
__decorate([
    (0, paradigm_express_webapi_1.Action)({ route: "/" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GameController.prototype, "get", null);
__decorate([
    (0, paradigm_express_webapi_1.Action)({ route: ":gameId", method: paradigm_express_webapi_1.HttpMethod.GET }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "getGame", null);
GameController = __decorate([
    (0, paradigm_express_webapi_1.Controller)({ route: "/api/games" }),
    __metadata("design:paramtypes", [game_repository_1.GameRepository])
], GameController);
exports.GameController = GameController;
