"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestController = void 0;
const paradigm_express_webapi_1 = require("@miracledevs/paradigm-express-webapi");
let TestController = class TestController extends paradigm_express_webapi_1.ApiController {
    constructor() {
        super();
    }
    get() {
        try {
            this.httpContext.response.status(200).send("home");
            return;
        }
        catch (_a) {
            this.httpContext.response.sendStatus(500);
            return;
        }
    }
};
__decorate([
    (0, paradigm_express_webapi_1.Action)({ route: "/" })
], TestController.prototype, "get", null);
TestController = __decorate([
    (0, paradigm_express_webapi_1.Controller)({ route: "/" })
], TestController);
exports.TestController = TestController;
