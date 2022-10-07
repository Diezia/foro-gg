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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthFilter = void 0;
const paradigm_express_webapi_1 = require("@miracledevs/paradigm-express-webapi");
const paradigm_web_di_1 = require("@miracledevs/paradigm-web-di");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configuration_1 = require("../configuration/configuration");
let AuthFilter = class AuthFilter {
    constructor(configurationBuilder) {
        const configuration = configurationBuilder.build(configuration_1.Configuration);
        this.jwt = configuration.jwt;
    }
    beforeExecute(httpContext) {
        try {
            const token = httpContext.request.headers["authorization"];
            if (!token) {
                httpContext.response.sendStatus(401);
            }
            const decoded = jsonwebtoken_1.default.verify(token, this.jwt.secret);
            if (!decoded) {
                httpContext.response.sendStatus(401);
            }
        }
        catch (err) {
            httpContext.response.sendStatus(500);
        }
    }
};
AuthFilter = __decorate([
    (0, paradigm_web_di_1.Injectable)({ lifeTime: paradigm_web_di_1.DependencyLifeTime.Scoped }),
    __metadata("design:paramtypes", [paradigm_express_webapi_1.ConfigurationBuilder])
], AuthFilter);
exports.AuthFilter = AuthFilter;
