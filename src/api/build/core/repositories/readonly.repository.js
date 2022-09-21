"use strict";
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
exports.ReadonlyRepositoryBase = void 0;
const batch_command_1 = require("./commands/batch.command");
class ReadonlyRepositoryBase {
    constructor(dependencyContainer, connection, entityType, tableName, idColumn = "id") {
        this.dependencyContainer = dependencyContainer;
        this.connection = connection;
        this.entityType = entityType;
        this.tableName = tableName;
        this.idColumn = idColumn;
        this.batch = new batch_command_1.BatchDbCommand(connection);
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.connection.connection.execute(`SELECT * FROM \`${this.tableName}\``);
            return this.map(rows, this.entityType);
        });
    }
    find(where, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.connection.connection.execute(`SELECT * FROM \`${this.tableName}\` WHERE ${where}`, args);
            return this.map(rows, this.entityType);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.connection.connection.execute(`SELECT * FROM \`${this.tableName}\` WHERE \`${this.idColumn}\`=?`, [id]);
            const entities = this.map(rows, this.entityType);
            if (!entities || entities.length === 0)
                throw new Error("Unable to retrieve the entity.");
            return entities[0];
        });
    }
    map(rows, entityType) {
        return rows.map(row => {
            const entity = this.dependencyContainer.resolve(entityType);
            for (const key in row) {
                if (Object.prototype.hasOwnProperty.call(entity, key)) {
                    entity[key] = row[key];
                }
            }
            return entity;
        });
    }
}
exports.ReadonlyRepositoryBase = ReadonlyRepositoryBase;
