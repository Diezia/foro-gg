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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRepository = void 0;
const paradigm_web_di_1 = require("@miracledevs/paradigm-web-di");
const mysql_connection_1 = require("../core/mysql/mysql.connection");
const edit_repository_1 = require("../core/repositories/edit.repository");
const test_1 = require("../models/test");
let TestRepository = class TestRepository extends edit_repository_1.EditRepositoryBase {
    constructor(dependencyContainer, connection) {
        super(dependencyContainer, connection, test_1.Test, 'user');
    }
};
TestRepository = __decorate([
    (0, paradigm_web_di_1.Injectable)({ lifeTime: paradigm_web_di_1.DependencyLifeTime.Scoped }),
    __metadata("design:paramtypes", [paradigm_web_di_1.DependencyContainer, mysql_connection_1.MySqlConnection])
], TestRepository);
exports.TestRepository = TestRepository;
