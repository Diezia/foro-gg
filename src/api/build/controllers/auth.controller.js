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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const paradigm_express_webapi_1 = require("@miracledevs/paradigm-express-webapi");
const user_repository_1 = require("../respositories/user.repository");
const auth_service_1 = require("../services/auth.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let AuthController = class AuthController extends paradigm_express_webapi_1.ApiController {
    constructor(repoUser, authService) {
        super();
        this.repoUser = repoUser;
        this.authService = authService;
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findRes = yield this.repoUser.find("email = ?", [
                    this.httpContext.request.body.email,
                ]);
                if (findRes.length === 0) {
                    this.authService.register(this.httpContext.request.body.email, this.httpContext.request.body.name, this.httpContext.request.body.password, this.repoUser);
                    this.httpContext.response.status(200).send("User created");
                    return;
                }
                this.httpContext.response.status(409).send("User already exists");
                return;
            }
            catch (_a) {
                this.httpContext.response.sendStatus(500);
                return;
            }
        });
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.repoUser.find("email = ?", [
                    this.httpContext.request.body.email,
                ]);
                if (user.length === 0) {
                    this.httpContext.response.status(404).send("User not exists");
                    return;
                }
                const match = yield bcrypt_1.default.compare(this.httpContext.request.body.password, user[0].password);
                if (match) {
                    const token = jsonwebtoken_1.default.sign({
                        id: user[0].id,
                        name: user[0].name,
                    }, "my secret", { expiresIn: "3h" });
                    this.httpContext.response.setHeader("Authorization", JSON.stringify(token));
                    this.httpContext.response.cookie("jwt", JSON.stringify(token));
                    const res = {
                        token,
                        name: user[0].name,
                    };
                    this.httpContext.response.status(200).send(JSON.stringify(res));
                    return;
                }
                this.httpContext.response.status(401).send("password incorrect");
            }
            catch (error) {
                console.log(error);
                this.httpContext.response.sendStatus(500);
                return;
            }
        });
    }
};
__decorate([
    (0, paradigm_express_webapi_1.Action)({ route: "/register", method: paradigm_express_webapi_1.HttpMethod.POST }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, paradigm_express_webapi_1.Action)({ route: "/login", method: paradigm_express_webapi_1.HttpMethod.POST }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    (0, paradigm_express_webapi_1.Controller)({ route: "/api/auth" }),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
