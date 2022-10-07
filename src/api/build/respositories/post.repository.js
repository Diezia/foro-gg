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
exports.PostRepository = void 0;
const paradigm_web_di_1 = require("@miracledevs/paradigm-web-di");
const mysql_connection_1 = require("../core/mysql/mysql.connection");
const edit_repository_1 = require("../core/repositories/edit.repository");
const post_1 = require("../models/post");
let PostRepository = class PostRepository extends edit_repository_1.EditRepositoryBase {
    constructor(dependencyContainer, connection) {
        super(dependencyContainer, connection, post_1.Post, "posts");
    }
    getOrderedPostsByDateByGameId(where, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.connection.connection.execute(`SELECT * FROM \`${this.tableName}\` WHERE ${where} ORDER BY created_at DESC`, args);
            return this.map(rows, this.entityType);
        });
    }
};
PostRepository = __decorate([
    (0, paradigm_web_di_1.Injectable)({ lifeTime: paradigm_web_di_1.DependencyLifeTime.Scoped }),
    __metadata("design:paramtypes", [paradigm_web_di_1.DependencyContainer,
        mysql_connection_1.MySqlConnection])
], PostRepository);
exports.PostRepository = PostRepository;
