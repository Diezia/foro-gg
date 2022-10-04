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
const paradigm_web_di_1 = require("@miracledevs/paradigm-web-di");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let AuthFilter = class AuthFilter {
    constructor() { }
    beforeExecute(httpContext) {
        try {
            const token = httpContext.request.headers["authorization"];
            console.log("token 1", token);
            if (!token) {
                httpContext.response.sendStatus(401);
            }
            const decoded = jsonwebtoken_1.default.verify(token, 'my secret');
            if (!decoded) {
                httpContext.response.sendStatus(401);
            }
            console.log("decoded", decoded);
        }
        catch (err) {
            console.log(err);
            httpContext.response.sendStatus(500);
        }
    }
    afterExecute(httpContext, routingContext) {
        try {
            const decoded = jsonwebtoken_1.default.verify(httpContext.request.headers["authorization"], 'my secret');
            httpContext.request.headers["authorization"] = jsonwebtoken_1.default.sign({
                id: decoded.id,
                name: decoded.name
            }, "my secret", { expiresIn: '3h' });
            console.log(httpContext.request.headers["authorization"]);
        }
        catch (error) {
            console.log(error);
            httpContext.response.sendStatus(500);
        }
    }
};
AuthFilter = __decorate([
    (0, paradigm_web_di_1.Injectable)({ lifeTime: paradigm_web_di_1.DependencyLifeTime.Scoped }),
    __metadata("design:paramtypes", [])
], AuthFilter);
exports.AuthFilter = AuthFilter;
