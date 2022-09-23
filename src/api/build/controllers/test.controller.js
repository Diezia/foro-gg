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
exports.TestController = void 0;
const paradigm_express_webapi_1 = require("@miracledevs/paradigm-express-webapi");
const valoration_repository_1 = require("../respositories/valoration.repository");
let TestController = class TestController extends paradigm_express_webapi_1.ApiController {
    constructor(repo) {
        super();
        this.repo = repo;
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const some = yield this.repo.getAll();
                console.log(some);
                this.httpContext.response.status(200).send(some);
                return;
            }
            catch (_a) {
                this.httpContext.response.sendStatus(500);
                return;
            }
        });
    }
    getData() {
        try {
            return ["uno", "dos", "test", "cuarto"];
        }
        catch (_a) {
            this.httpContext.response.sendStatus(500);
            return;
        }
    }
    post() {
        try {
            this.httpContext.response.status(200).send(this.httpContext.request.body);
            return;
        }
        catch (_a) {
            this.httpContext.response.sendStatus(500);
            return;
        }
    }
};
__decorate([
    (0, paradigm_express_webapi_1.Action)({ route: "/" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestController.prototype, "get", null);
__decorate([
    (0, paradigm_express_webapi_1.Action)({ route: "data", method: paradigm_express_webapi_1.HttpMethod.GET }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TestController.prototype, "getData", null);
__decorate([
    (0, paradigm_express_webapi_1.Action)({ route: "/" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TestController.prototype, "post", null);
TestController = __decorate([
    (0, paradigm_express_webapi_1.Controller)({ route: "/" }),
    __metadata("design:paramtypes", [valoration_repository_1.ValorationRepository])
], TestController);
exports.TestController = TestController;
