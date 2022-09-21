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
exports.MySqlConnectionFilter = void 0;
const paradigm_web_di_1 = require("@miracledevs/paradigm-web-di");
const mysql_connector_1 = require("../core/mysql/mysql.connector");
const mysql_connection_1 = require("../core/mysql/mysql.connection");
/**
 * Requires a mysql connection from the connection pool for the ongoing request.
 */
let MySqlConnectionFilter = class MySqlConnectionFilter {
    constructor(dependencyContainer, mysqlConnector) {
        this.dependencyContainer = dependencyContainer;
        this.mysqlConnector = mysqlConnector;
    }
    beforeExecute(httpContext) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.connection = this.dependencyContainer.resolve(mysql_connection_1.MySqlConnection);
                yield this.mysqlConnector.createScopedConnection(this.connection);
            }
            catch (_a) {
                httpContext.response.sendStatus(500);
            }
        });
    }
    afterExecute() {
        return __awaiter(this, void 0, void 0, function* () {
            this.mysqlConnector.releaseConnection(this.connection);
        });
    }
    onError() {
        return __awaiter(this, void 0, void 0, function* () {
            this.mysqlConnector.releaseConnection(this.connection);
        });
    }
};
MySqlConnectionFilter = __decorate([
    (0, paradigm_web_di_1.Injectable)({ lifeTime: paradigm_web_di_1.DependencyLifeTime.Scoped }),
    __metadata("design:paramtypes", [paradigm_web_di_1.DependencyContainer, mysql_connector_1.MySqlConnector])
], MySqlConnectionFilter);
exports.MySqlConnectionFilter = MySqlConnectionFilter;
