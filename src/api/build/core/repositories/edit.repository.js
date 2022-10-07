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
exports.EditRepositoryBase = void 0;
const batch_command_1 = require("./commands/batch.command");
const replace_command_1 = require("./commands/replace.command");
const insert_command_1 = require("./commands/insert.command");
const readonly_repository_1 = require("./readonly.repository");
class EditRepositoryBase extends readonly_repository_1.ReadonlyRepositoryBase {
    constructor(dependencyContainer, connection, entityType, tableName, idColumn = "id") {
        super(dependencyContainer, connection, entityType, tableName, idColumn);
    }
    insertOne(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            this.insert(entity);
            return (yield this.apply());
        });
    }
    insert(entity) {
        const insertCommand = new insert_command_1.InsertDbCommand(this.connection, this.tableName, [
            entity,
        ]);
        this.batch.addCommand(insertCommand, (x) => (entity[this.idColumn] = x.insertId));
    }
    replace(entity) {
        const replaceCommand = new replace_command_1.ReplaceDbCommand(this.connection, this.tableName, [entity]);
        this.batch.addCommand(replaceCommand, (x) => (entity[this.idColumn] = x.insertId));
    }
    apply() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.batch.query) {
                const result = yield this.batch.executeQuery();
                this.batch = new batch_command_1.BatchDbCommand(this.connection);
                return result;
            }
            else {
                throw new Error("Query is null or empty.");
            }
        });
    }
    update(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.connection.query(`UPDATE \`${this.tableName}\` SET ? WHERE \`${this.idColumn}\`=?`, [entity, entity[this.idColumn]]);
            return entity;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.connection.query(`DELETE FROM \`${this.tableName}\` WHERE \`${this.idColumn}\`=?`, [id]);
        });
    }
    truncate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.connection.query(`TRUNCATE \`${this.tableName}\``);
        });
    }
}
exports.EditRepositoryBase = EditRepositoryBase;
